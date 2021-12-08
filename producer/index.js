var amqp  = require('amqplib/callback_api');
var email = require('./envio_email');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        console.error('Erro: ', error0);
        throw error0;
    }
    console.log('Conectado com sucesso !');

    connection.createChannel(function (error1, channel) {
        if (error1) {
            console.error('Erro: ', error1);
            throw error1;
        }

        var queue = 'pedidos_node';
        channel.assertQueue(queue, {
            durable: true
        });

        setInterval(() => { //Produzindo mensagens a cada 1 segundo
            var msg = {
                data: new Date().toISOString,
                nome: "Gabriel Julian",
                servicos: [
                    {
                        descricao: "Instalação do motor de arranque"
                    },
                    {
                        descricao: "Instalação do amortecedor"
                    },
                    {
                        descricao: "Troca da bomba de gasolina"
                    }
                ]
            };

            channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
            
            corpo_email = "Pedido realizado ! Segue detalhes: " + Buffer.from(JSON.stringify(msg));
            email(corpo_email);            
            
            console.log(" [x] Enviado para a fila %s", msg);
        }, 10000); 
    });
});