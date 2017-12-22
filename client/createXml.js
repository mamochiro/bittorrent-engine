var fs = require('fs')
var path = require('path')
var b = __filename 
var md5 = require('md5');
var md5File = new Array() 
var createXml = require('./writeXml.js')

var fileForTorrent = path.join(__dirname, '../' ,  'torrentfile/')
var name = new Array() 


fs.readdirSync(fileForTorrent).forEach(file => {
  name.push(file)

})

var loop = -1;
function createXmlFile(){
	++loop;
	if(loop >= name.length){
		 //console.log(md5File)
		 createXml.writeXML(md5File)
		return;
	}
	fs.readFile(fileForTorrent+name[loop], function(err, buf) {
  	    //console.log(md5(buf))
  	    md5File.push(md5(buf))

   createXmlFile();
	});	
}
//createXmlFile()

exports.createXmlFile = createXmlFile();
