var path = require('path')
var pathConfigFile = path.join(__dirname,'trackerConfig.env')
var config = require('dotenv').config({path: pathConfigFile})
var array = eval("[" + process.env.announceList  + "]");

module.exports.array = array