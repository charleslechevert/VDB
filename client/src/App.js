import {Route, Routes} from "react-router-dom"

import { Login } from "./pages/Login"
import { Trip } from "./pages/Trip"
import { Admin } from "./pages/Admin"

function App () {
  return <Routes>

      {/* PUBLIC ROUTES */}
      <Route path='/login' element={<Login />}/>

      {/* PRIVATE ROUTES */}
      <Route path='/trip' element={<Trip />}/>
      <Route path='/admin' element={<Admin />}/>


  </Routes>
}

export default App;