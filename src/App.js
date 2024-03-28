import React, { useState } from 'react';
import mqtt from 'mqtt';

const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');
// const client = mqtt.connect('mqtt://thingspeak.com', {
//   username: 'JAIAMgUTMy8IBx8JEjskHQ4',
//   password: 'vLYOyy9Eihd4NYvqaYi0XGvh'
// });

const App = () => {
  const [temperature, setTemperature] = useState('');
  const [humidiy, setHumidiy] = useState('');
  const [co2, setCo2] = useState('');
  client.on('message', function (topic, payload, packet) {
    console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`)
  })
  client.on("connect", (err) => {
    console.log("Connected to MQTT broker", err);
  });

  const handleSubmit = (e) => {
    // Publish temperature data to ThingSpeak
    e.preventDefault();
    // random data 
    setTemperature((Math.floor(Math.random() * 100) - 50));
    setHumidiy((Math.floor(Math.random() * 100)));
    setCo2((Math.floor(Math.random() * 1700) + 300));

    const payload = `field1=${temperature}&field2=${humidiy}&field3=${co2}`;
    client.publish('channels/2487012/publish/0VCD3W464Z78EI2B/', payload);
    
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center"
    }}>
      <h1>Cloud-based Project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Temperature (Random): {temperature} <br />
          Humidity (Random) : {humidiy} <br />
          Co2 (Random) : {co2} <br/>
        </label>
        <button type="submit" style={{
          marginTop : "4%"
        }}>Click to send data</button>
      </form>
    </div>
  );
};

export default App;