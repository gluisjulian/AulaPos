var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    console.log("Ocorreu um erro ao criar a conexão: ", error0);
    throw error0;
  }

  console.log('Conectado com sucesso !');

  connection.createChannel(function(error1, channel) {
    if (error1) {
      console.log("Ocorreu um erro ao criar o canal: ", error0);
      throw error1;
    }

    var queue      = 'pedidos_node',
        numPedidos = 0;

    channel.assertQueue(queue, {
        durable: true
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    //Consome de três em três mensagens
    channel.prefetch(3);
    
    //Consumir
    channel.consume(queue, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
        numPedidos += 1;

        console.log(numPedidos.toString());
        //Temporarizador 2 segundos
        setTimeout(() => {
          console.log(" [x] Done %s");
          channel.ack(msg);
        }, 2000);

        if (numPedidos === 10)
        {
          console.log("Número máximo de pedidos(10) foi atingindo.");
          connection.close();
          process.exit(1);
        }        
    }, {
        noAck: false
    });
  });
});