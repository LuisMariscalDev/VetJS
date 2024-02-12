import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";

const registrar = async (req, res) => {
    const { nombre,  email, password } = req.body;

    // Prevenir usuarios duplicados
    const existeUsusario = await Veterinario.findOne({email});

    if(existeUsusario) {
        const error = new Error('Usuario ya existente');
        return res.status(400).json({ msg: error.message})
    }

    try {
        // Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })

        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }

};

const perfil = (req, res) => {
    const {veterinario} = req;

    res.json({ perfil : veterinario});
}

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token});

    if(!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: "Usuario confirmado correctamente"});
    } catch (error) {
        console.log(error);
    }
    
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobando si el usuario existe
    const usuario = await Veterinario.findOne({email});

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si el usuario está confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    // Revisar el password
    if( usuario.comprobarPassword(password)) {
        // Autenticar
        res.json({token: generarJWT(usuario.id)});
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }
};

const olvidePassword = async (req, res) => {
    const {email} = req.body;

    const existeVeterinario = await Veterinario.findOne({email});
    if(!existeVeterinario) {
        const error = new Error('El Usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({msg: "Hemos enviado un email con las instrucciones a seguir"});
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if(tokenValido) {
        return res.status(200).json({msg: `el token es ${token}`});
    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }
}

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});
    if(!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: "PAssword modiciada correctamente"});
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
}