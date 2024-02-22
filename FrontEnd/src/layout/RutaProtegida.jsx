import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {

  const navigate = useNavigate();

  const {auth, cargando} = useAuth();
  if(cargando) return 'cargando...'

  return (
    <>
       <Header/>
        {auth.perfil?._id ? (
          <main className="container mx-auto mt-10">
            <Outlet/>
          </main> ) :  navigate('/')}
        {console.log(auth, cargando)}
      <Footer/>
    </>
   
  )
}

export default RutaProtegida