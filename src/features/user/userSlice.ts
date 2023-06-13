import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        account: "",
        name: "",
        avatar: "",
        token: "",
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload.account
            state.name = action.payload.name
            state.avatar = action.payload.avatar
            state.token = action.payload.token
        },
        clearAccount: state => {
            state.account = ""
            state.name = ""
            state.avatar = ""
            state.token = ""
        },
        setName: (state, action) => {
            state.name = action.payload
        },
    },
})

export const { setAccount, clearAccount } = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
