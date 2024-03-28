const mqtt = require('mqtt');

const mqttOptions = {
  username: 'JAIAMgUTMy8IBx8JEjskHQ4',
  password: 'vLYOyy9Eihd4NYvqaYi0XGvh'
};

const mqttTopic = 'channels/2487012/publish/0VCD3W464Z78EI2B';

// Connect to the MQTT broker
const client = mqtt.connect('mqtt://mqtt.thingspeak.com',mqttOptions);

client.on('connect', function () {
  console.log('Connected to ThingSpeak MQTT');
  
  // Subscribe to the MQTT topic
  client.subscribe(mqttTopic, function (err) {
    if (err) {
      console.error('Subscription error:', err);
    } else {
      console.log('Subscribed to topic:', mqttTopic);
    }
  });
});

client.on('message', function (topic, message) {
  console.log('Received message:', message.toString());
});
