import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { supabase } from "../store/supabase";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';
import * as Linking from 'expo-linking'

export default function Account() {
  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.user.user)
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [password, setPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const authCtx = useContext(AuthContext);

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

  const resetPassword = async (email) => {
    const resetPasswordURL = Linking.createURL("/ResetPassword");

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetPasswordURL,
    });

    return { data, error };
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");
        const { data, error } = await supabase.auth
          .updateUser({ password: newPassword })

        if (data) alert("Password updated successfully!")
        if (error) alert("There was an error updating your password.")
      }
    })
  }, [])

  return (
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

      {/* <View style={[styles.verticallySpaced]}>
        <Button
          title={loading ? 'Loading ...' : 'Reset Password'}
          onPress={() => resetPassword()}
          disabled={loading}
        />
      </View> */}

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => {
          supabase.auth.signOut()
          authCtx.logout()
        }} />
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
})