import { Toaster } from 'sonner'
import './App.css'
import { CreateNewUsers } from './components/CreateNewUsers'
import ListaUsuarios from './components/ListaUsuarios'
function App () {
  return (
    <>
     <h1>Nuestro proyecto con Redux</h1>
     <ListaUsuarios></ListaUsuarios>
     <CreateNewUsers></CreateNewUsers>
     <Toaster richColors></Toaster>
    </>
  )
}

export default App
