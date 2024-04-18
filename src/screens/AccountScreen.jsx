import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { AuthContext } from '../store/auth-context';
import { supabase } from "../store/supabase";

import * as Linking from "expo-linking";
import PopUpAnimation from '../components/PopUpAnimation';


export default function Account() {
  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.user.user)
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [password, setPassword] = useState('')
  const [showAnimation, setShowAnimation] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('')
  const authCtx = useContext(AuthContext);

  const url = Linking.useURL();
  console.log({ url });


  useEffect(() => {
    if (user) getProfile()
  }, [user])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user?.user) throw new Error('No user on the user!')

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      if (!user?.user) throw new Error('No user on the user!')

      const updates = {
        id: user?.user.id,
        first_name: firstName,
        last_name: lastName
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function resetPassword() {
    const redirect = 'http://localhost:8081'
    const { data, error } = await supabase.auth.resetPasswordForEmail(user.user.email, {
      redirectTo: 'http://localhost:3000/'
    });
    setTimeout(() => {
      setShowAnimation(false);
    }, 4000);
    return { data, error };
  };
  useEffect(() => { }, [showAnimation])

  // replicate from server
  supabase.channel('profiles').on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'profiles'
  },
    (payload) => {
      console.log('from payload', payload);
      const eventType = payload.eventType
      const newRecord = payload.new
      const oldRecord = payload.old
      setShowAnimation(true)
      console.log(eventType);
      console.log(newRecord);
    }
  ).subscribe()

  return (
    <View style={{height: '100%'}}>
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../lottie/successful.json")}
        />
      ) : null}
      <View style={styles.container}>


        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input label="Email" value={user?.user?.email} />
        </View>
        <View style={styles.verticallySpaced}>
          <Input label="First name" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
        </View>
        <View style={styles.verticallySpaced}>
          <Input label="Last name" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? 'Loading ...' : 'Update'}
            onPress={() => updateProfile()}
            disabled={loading}
          />
        </View>

        <View style={[styles.verticallySpaced]}>
          <Button
            title={loading ? 'Loading ...' : 'Reset Password'}
            onPress={() => {
              resetPassword()
            }}
            disabled={loading}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Button title="Sign Out" onPress={() => {
            supabase.auth.signOut()
            authCtx.logout()
          }} />
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  LottieAnimation: {
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex:10
  },
})