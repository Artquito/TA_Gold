import Paho from 'paho-mqtt.js'

export default {
  name: 'Controller',
  data () {
    return {
      client: new Paho.MQTT.Client('localhost', 9001, 'webclient'),
      topic: 'test'
    }
  },
  methods: {
    onConnectedLost : function(responseObject){  
      console.log("onConnectionLost:"+responseObject.errorMessage);
    },
    onMessageArrived : function (message) {
      console.log("onMessageArrived:"+message.payloadString);
    },
    onConnect:function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      this.client.subscribe(this.topic);
      message = new Paho.MQTT.Message("Hello");
      message.destinationName = "World";
      client.send(message);
    },
  },
  created: function() {
    this.client.connect({
      onSuccess: this.onConnect,
    });
    this.client.onConnectedLost = this.onConnectedLost;
    this.client.onMessageArrived = this.onMessageArrived;
  }
}