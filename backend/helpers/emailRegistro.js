import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const {email, nombre, token} = datos;

      // Enviar el Email

      const info = await transporter.sendMail({
        from: "APV - Administrador de Paciente de Veterinaria",
        to: email,
        subject: "Comprueba tu cuenta",
        text: "Comprueba tu cuenta en APV",
        html: `<p>Hola ${nombre}, por favor confirma tu cuenta en APV</p>
         <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
         <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
            
        <p>Si tú no creaste esta cuenta, ignora este correo</p>
        `
      });

      console.log("Mensaje enviado: %s", info.messageId)
};

export default emailRegistro