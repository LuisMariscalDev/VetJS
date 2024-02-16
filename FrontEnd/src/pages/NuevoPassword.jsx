import { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom";
import Alerta from '../components/Alerta.jsx'
import clienteAxios from "../config/axios.jsx";
const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModified, setPasswordModified] = useState(false);

  const params = useParams();
  const {token} = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: 'Coloca tu nueva contraseña',
        })
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }
    comprobarToken()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6) {
      setAlerta({
        msg: 'La contraseña debe ser mayor a 6 caracteres',
        error: true
      })
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const {data} = await clienteAxios.post(url, {password});

      console.log(data);

      setAlerta({
        msg: data.msg
      })
      setPasswordModified(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-bold text-7xl">Reestablece tu contraseña y Administra {""}<span className="text-black">tus Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg &&  <Alerta
          alerta={alerta}
        />}

        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
                <label
                  className="uppercase text-gray-600 block text-xl font-bold"
                >
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Nueva contraseña de acceso"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={ e => setPassword(e.target.value)}
                />
            </div>  
            <input
              type="submit"
              value={"Guardar contraseña"}
              className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form> 
        )}

        {passwordModified && 
          <nav className="mt-10 lg:flex lg:justify-between">
            <Link
            className="block text-center my-5 text-gray-500"
            to="/">Iniciar Sesión</Link>
          </nav>}
      </div>
    </>
  )
}

export default NuevoPassword;