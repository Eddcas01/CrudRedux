import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type userId = string
export interface User {
  name: string
  email: string
  github: string

}

const DEFAULT_STATE = [

  {
    id: 'eddcas01',
    name: 'Edgar Casasola',
    email: 'eddcas01@gmail.com',
    github: 'Eddcas01'
  },

  {
    id: 'Ggarcia',
    name: 'Gustavo Garcia',
    email: 'ggarcia@gmail.com',
    github: 'Gus657'
  },
  {
    id: 'rchoc',
    name: 'Randy Choc',
    email: 'rchoc@gmail.com',
    github: 'chocrandy'
  }
]

export interface UserWithId extends User {

  id: userId

}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__REDUX__STATE')

  if (persistedState != null) return JSON.parse(persistedState).users
  return DEFAULT_STATE
})()

export const usersSlice = createSlice({

  name: 'users',
  initialState,
  reducers: {

    addNewUser: (state, action: PayloadAction<userId>) => {
      const id = crypto.randomUUID()
      console.log('🚀 ~ file: slice.ts:56 ~ action:', action)
      return [...state, { id, ...action.payload }]
    },
    deleteUsersById: (state, action: PayloadAction<userId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    }

  }

})
// reducer
export default usersSlice.reducer

// actions

export const { addNewUser, deleteUsersById } = usersSlice.actions
