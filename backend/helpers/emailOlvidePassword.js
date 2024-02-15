import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
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
        subject: "Reestablece tu contraseña",
        text: "Reestablece tu contraseña",
        html: `<p>Hola ${nombre}, has solicitado reestablecer tu contraseña</p>

         <p>Entra al siguiente enlace para generar una nueva contraseña de acceso:
         <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer contraseña</a></p>
            
        <p>Si tú no solicitaste cambiar la contraseña, ignora este correo</p>
        `
      });

      console.log("Mensaje enviado: %s", info.messageId)
};

export default emailOlvidePassword