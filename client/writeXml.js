var builder = require('xmlbuilder')
var fs = require('fs')
var path = require('path')
var md5 = require('md5');
var parseTorrent = require('parse-torrent')
var name = new Array() 
var md5File = new Array()
var pathFile = []
var fileForTorrent = path.join(__dirname, '../' ,  'torrentfile/')

//readname
fs.readdirSync(fileForTorrent).forEach(file => {
  name.push(file)
})

//read files torrent
for (var i = 0  ; i < name.length ; i++) {

var buf = parseTorrent(fs.readFileSync(fileForTorrent+name[i])).files
var fileForDownload = path.join(__dirname, '../' ,  'download/')
	for (var j = 0  ; j < buf.length ; j++) {
	    var pathfile =parseTorrent(fs.readFileSync(fileForTorrent+name[i])).files[j].path
	    var namefile =parseTorrent(fs.readFileSync(fileForTorrent+name[i])).files[j].name
	    fs.readdirSync(fileForDownload).forEach(file => {
	     var pathForder = path.join(file ,'/' ,namefile )
	 	 if(file == pathfile){
	        //console.log('delete file : ' , fileForDownload+pathfile)
	        pathFile.push(fileForDownload+pathfile)
	 	 }else if (pathForder == pathfile ){
	 	 	pathFile.push(fileForDownload+pathfile)
	 	 	//console.log('delete Forder : ' , fileForDownload+pathfile)
	 			 }
	 
	 	 
			})

	    
		}

	}
///////////////
//write xml file infolder
var xml = builder.create('Files',  { encoding: 'utf-8' })

function writeXML(md5File) {
	
for(var i = 0; i <name.length ; i++)
	{		
  		
		var filexml = xml.ele('File', {'id': i})/*.att('id', i)*/
		 filexml.ele('name', name[i]).up()
		 filexml.ele('path', fileForTorrent).up()
		 filexml.ele('pathFile', pathFile[i]).up()
		 filexml.ele('md5', md5File[i]).up().up() 
 		 //xml.importDocument(builder);

	}
	xml.end({ pretty: true })
	//console.log(xml.end())
	fs.writeFileSync(__dirname + '/../XmlFile/'+'torrentlist.xml', xml.end({ pretty: true }))
	//fs.close()
}
exports.writeXML = writeXML;



