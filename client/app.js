var fs = require('fs')
var path = require('path');
var md5 = require('md5');


var fileForTorrent = path.join(__dirname, '../' ,  'torrentfile/')
var fileForDownload = path.join(__dirname, '../' ,  'download/')
var fileForXml = path.join(__dirname, '../' ,  'XmlFile/')
var parseTorrent = require('parse-torrent')
var downloadTorrent = require('./downloadTorrent.js')

var numFile = fs.readdirSync(fileForTorrent, 'utf8')
var numXmlFile = fs.readdirSync(fileForXml, 'utf8')
var name = []
var md5File = []
var fileDownload = []
var fileList = new Array()

//in folder
fs.readdirSync(fileForTorrent).forEach(file => {
  name.push(file)
})

fs.readdirSync(fileForDownload).forEach(file => {
  fileDownload.push(file)
})

//1st check 
function checkFileinFolder() {
	if(name.length != 0 ){
		if(numXmlFile != 0){
			//in xml file
			console.log('checkNewFile')
			var checkMd5 = require('./readMd5.js')
			var md5Code = checkMd5.md5Code
			numFileXml = checkMd5.numFile
			var fileName = checkMd5.fileName
			var pathFile = checkMd5.pathFile
			//checklostfile
			var diff = checkLostFile(name, fileName , pathFile)
			//checkNewFil
			checkNewFile()
		}else{
		//createxml
		console.log('createxml')
		var checkXml = require('./createXml.js')
		//start download
		console.log('Start Download')
		downloadTorrent.downloadTorrent()
		}
	}else{
		//no torrent in fordel  delete all file
		checkFileDownload()
	}
}
   
var loop = -1;
function checkNewFile(){
	//console.log('checkNewFile')
	var checkMd5 = require('./readMd5.js')
	var md5Code = checkMd5.md5Code
	numFileXml = checkMd5.numFile
	var fileName = checkMd5.fileName
	++loop;
	if(loop >= name.length){
	downloadTorrent.downloadTorrent()	
	var checkXml = require('./createXml.js')
		return;
	}
	
	fs.readFile(fileForTorrent+name[loop], function(err, buf) {
		for(var i = 0; i <name.length; i++){
			//console.log(md5Code[loop] , md5(buf))
	  	    //console.log(name[loop] , fileName[i])
			if(name[loop]==fileName[i]){
				if(md5Code[i] !== md5(buf)){
			  	    deleteFile(name[loop])
					//console.log('Start Download')
							}
			}
		}
   	checkNewFile()
	});	
}


function checkFileDownload(){
	if (fileDownload.length !== 0){
		for (var i = 0  ; i < fileDownload.length ; i++) {
			if(fileDownload[i] !== '' ){
				fs.unlink(fileForDownload+fileDownload[i])
			}
		}
	}
	
}

function deleteFile(name){
var pathForDelete = path.join(fileForTorrent, name)
var buf = parseTorrent(fs.readFileSync(pathForDelete)).files
var fileForDownload = path.join(__dirname, '../' ,  'download/')
	for (var j = 0  ; j < buf.length ; j++) {
	    var pathfile =parseTorrent(fs.readFileSync(pathForDelete)).files[j].path
	    var namefile =parseTorrent(fs.readFileSync(pathForDelete)).files[j].name
	    //console.log(pathfile)
	     //console.log(namefile)
	    fs.readdirSync(fileForDownload).forEach(file => {
	    	//console.log(file)
	    	//console.log(namefile)
	     var pathForder = path.join(file ,'/' ,namefile )
	     //console.log(pathForder)
	 	 if(file == pathfile){
	 		//console.log(fileForDownload+pathfile)
	 	   fs.unlinkSync(fileForDownload+pathfile)
	 	  
	        console.log('delete file (old File ): ' , fileForDownload+pathfile)
	 	 }else if (pathForder == pathfile ){
	 	   //console.log(fileForDownload+pathForder)
	 	   fs.unlinkSync(fileForDownload+pathForder)
	 	 	console.log('delete Forder (old File ) : ' , fileForDownload+pathfile)
	 			 }	 	 
			})
		}
}


function checkLostFile(a1 , a2 ,pathFile){
    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }
    
    for (var i = 0; i < diff.length; i++) {
    	for (var j = 0; j < a2.length; j++) {
        if (diff[i] == a2[j]) {
        	//delete lostfile
           deleteFile2(pathFile[j])
        } else {

        	}
   		 }
	}
    return diff;
}

//edit funtion deletefilemedaie 
function deleteFile2(pathfile){
	for (var i = 0; i < fileDownload.length; i++) {
		pathForDeleteFile  = path.join(fileForDownload, fileDownload[i])
		if (pathForDeleteFile == pathfile) {
			console.log('delete' , pathfile)
			fs.unlinkSync(pathfile)
		}
	}
}

checkFileinFolder()