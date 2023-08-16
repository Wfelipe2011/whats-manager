const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one",  }),
	puppeteer: {
		args: ['--no-sandbox'],
	}
})

function main(){

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('message', (message) => {
        console.log(`Received message from ${message.notifyName}: ${message.body}`);
        // if(message.from.includes('status@broadcast')) return;
        if(message.body.toLowerCase() === 'ping') {
            client.sendMessage(message.from, '[IA]: pong!');
        }
        fs.writeFileSync('data.json', JSON.stringify(message,null,2));
    });    
    
    client.initialize();
}

main();
