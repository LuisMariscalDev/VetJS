import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Login = () => {
  
  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-bold text-7xl">Inicia Sesión y Administra tus{""}<span className="text-black"> Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          <form action="">
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email de registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
            </div>
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña de acceso"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
            </div>

            <input
              type="submit"
              value={"Iniciar Sesión"}
              className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar">¿Aún no tienes una cuenta? Regístrate con nosotros</Link>
            <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password">Olvidé mi contraseña</Link>
          </nav>
        </div>
    </>
  )
}

export default Login