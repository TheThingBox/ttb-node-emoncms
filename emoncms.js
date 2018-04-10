module.exports = function(RED) {
  var request = require('request');

  function feedEmoncms(key, value, apikey, timestamp) {
    timestamp = Math.round(timestamp/1000);
    request.get('http://emoncms.org/input/post.json?time=' + timestamp + '&json={"' + key + '":"' + value + '"}&apikey=' + apikey, function(error, response, body) {
      console.log("emoncs---" + key + ": " + value + "---" + body);
    });
  }

  function EmoncmsNode(n) {
    RED.nodes.createNode(this, n);
    this.on("input", function(msg) {
      var key = msg.key || n.key||msg.topic;
      var value = msg.payload;
      var apikey = msg.apikey || n.apikey;
      var timestamp = msg.timestamp || Date.now();
      feedEmoncms(key, value, apikey, timestamp);
    });
  }
  RED.nodes.registerType("emoncms", EmoncmsNode);
}
