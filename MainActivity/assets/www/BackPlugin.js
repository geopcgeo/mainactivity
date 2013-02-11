cordova.define("cordova/plugin/js/BackPlugin", function(require, exports, module) {      

var exec = require("cordova/exec");
var BackPlugin = function () {};





BackPlugin.prototype.back = function() {
    cordova.exec(null, null, 'BackPlugin', 'back', new Array());
};


var BackPlugin = new BackPlugin();
module.exports = BackPlugin;
});