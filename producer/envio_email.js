const nodemailer = require("nodemailer");

async function envio_email(corpo_email) {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "4cc42ef727a39b",
      pass: "ceaaecb4a7e4f4"
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Gabriel Julian" <gluisjulian@gmail.com>', // sender address
    to: "gluisjulianti@gmail.com", // list of receivers
    subject: "Oláaa ✔", // Subject line
    text: "Pedido Enviado !", // plain text body
    html: "<b>Pedido Enviado !</b>"+
          "</br>"+
          "<p>"+corpo_email+"</p>"
  });

  console.log(" Email enviado: %s", info.messageId);
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = envio_email;