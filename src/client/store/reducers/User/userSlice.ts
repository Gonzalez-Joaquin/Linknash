import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { UserDTO } from "../../../@types"

const EmptyUserState: UserDTO = { id: "", name: "", email: "", password: "" }

const initialState: UserDTO = localStorage.getItem("Linknash-user")
  ? JSON.parse(localStorage.getItem("Linknash-user") as string)
  : EmptyUserState

const persistLocalStorageUserState = (user: UserDTO) => {
  localStorage.setItem("Linknash-user", JSON.stringify({ ...user }))
}

const clearLocalStorageUserState = () => {
  localStorage.removeItem("Linknash-user")
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (_state, action: PayloadAction<UserDTO>) => {
      persistLocalStorageUserState({
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        password: ""
      })
      return { ...action.payload, password: "" }
    },
    updateUser: (state, action: PayloadAction<UserDTO>) => {
      const result = { ...state, ...action.payload }
      persistLocalStorageUserState(result)
      return result
    },
    resetUser: () => {
      clearLocalStorageUserState()
      return EmptyUserState
    }
  }
})

export const { createUser, resetUser, updateUser } = userSlice.actions
export default userSlice.reducer
