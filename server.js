const express = require('express');
const nodemailer = require('nodemailer');
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
      user: 'postmaster@sandbox4d1fb2cc731c493486f2f68016aea7be.mailgun.org',
      pass: 'b70903812a5dbcf25db3d2f95a213c14-3750a53b-98a120ac'
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
      res.send('Hubo un error al enviar el mensaje.');
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.redirect('/confirmacion.html');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
