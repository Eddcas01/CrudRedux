import { type userId, deleteUsersById, addNewUser } from '../store/Users/slice'
import { useAppDispatch } from './store'

export const useUserActions = () => {
  const dispatch = useAppDispatch()

  const adduser = ({ name, email, github }) => {
    dispatch(addNewUser({ name, email, github }))
  }
  const removeUser = (id: userId) => {
    dispatch(deleteUsersById(id))
  }

  return { removeUser, adduser }
}
