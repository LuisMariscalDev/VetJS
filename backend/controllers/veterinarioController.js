import Veterinario from "../models/Veterinario.js";

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

        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }

};

const perfil = (req, res) => {
    res.json({ msg: "Mostrando perfil"})
}

const confirmar = (req, res) => {
    console.log(req.params.token);

    
    res.json({msg: "Confirmando cuenta..."})
}
export {
    registrar,
    perfil,
    confirmar,
}