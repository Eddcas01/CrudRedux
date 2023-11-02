import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer from './Users/slice'
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

    next(action)

    if (type === 'users/deleteUsersById') {
      fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (response.ok) toast.success('Usuario Eliminado')
        })
        .catch(() => {
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
