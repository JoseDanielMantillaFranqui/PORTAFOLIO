const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname));

app.post('/enviar', (req, res) => {
  const { nombre, correoelectronico, asunto, mensaje } = req.body;

  // Configura el transporte de Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER, // Usa la variable de entorno en lugar de las credenciales directamente
      pass: process.env.MAILGUN_PASS
    }
  });

  // Configura el correo electrónico
  const mailOptions = {
    from: 'drkt4731@gmail.com',
    to: 'danielfranqui016@gmail.com',
    subject: asunto,
    text: `Nombre: ${nombre}\nCorreo Electrónico: ${correoelectronico}\nMensaje:\n${mensaje}`
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.redirect('/denegacion.html');
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.redirect('/confirmacion.html');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
