import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer, { rollBackUser } from './Users/slice'
import { toast } from 'sonner'
const userData = {
  name: 'nombre',
  email: 'correo@example.com',
  github: 'nombredeusuario'
}
const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    // despues de la accion eliminar
    next(action)
    localStorage.setItem('__REDUX__STATE', JSON.stringify(store.getState()))
  }
const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action
    const prevState = store.getState()

    next(action)

    if (type === 'users/deleteUsersById') {
      const UserIdToRemove = payload
      const userToRemove = prevState.users.find(user => user.id === UserIdToRemove)
      console.log('🚀 ~ file: index.ts:25 ~ userToRemove:', userToRemove)
      fetch(`https://jsonplaceholder.typicode.com/users/${UserIdToRemove}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Usuario Eliminado')
          }
 
          throw new Error('Error al eliminar el usuario')
        })
        .catch((err) => {
          console.log('🚀 ~ file: index.ts:36 ~ err:', err)

          toast.error(`Error deleting user${UserIdToRemove}`)
          if (userToRemove) store.dispatch(rollBackUser(userToRemove))
          console.log('🚀 ~ file: index.ts:38 ~ userToRemove:', userToRemove)
          console.log('error')
        })
    }
    if (type === 'users/addNewUser') {
      fetch('https://jsonplaceholder.typicode/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then((response) => {
          if (response.ok) toast.success('Usuario Guardado Correctamente')
        })
        .catch(() => {
          console.log('error')
        })
    }
  }

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware]
})

export type RootState = ReturnType<typeof store.getState> // estado de la store
export type AppDispatch = typeof store.dispatch // dispathc del store tipado para las acciones
