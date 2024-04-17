import { createSlice } from "@reduxjs/toolkit"
import { UPDATE_CURRENT_USER } from "./actions"


const initialState = {
  user: {}
}

export const userSlice = createSlice({
  name: UPDATE_CURRENT_USER,
  initialState,
  reducers: {
    UPDATE_CURRENT_USER: (state, action) =>{
      state.user = action.payload
      return state
    }
  }
})
