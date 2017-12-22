var fs = require('fs')
var path = require('path');
var name = [] 
var fileForTorrent = path.join(__dirname, '../' ,  'torrentfile/')
var nodemon = require('nodemon');
var downloadTorrent = require('./downloadTorrent.js')
var fileForDownload = path.join(__dirname, '../' ,  'download/')
var fileForXml = path.join(__dirname, '../' ,  'XmlFile/')


function testName() {

	var numFile = fs.readdirSync(fileForTorrent, 'utf8')
	var checkMd5 = require('./readMd5.js')
	var md5Code = checkMd5.md5Code
	numFileXml = checkMd5.numFile
	var fileName = checkMd5.fileName

	fs.readdirSync(fileForTorrent).forEach(file => {
  	name.push(file)
	})

	//console.log('name : ' , name.length)
	//console.log('numFileXml :' , numFileXml)

	var xml2js = require('xml2js');
	var parser = new xml2js.Parser();
	var parseString = require('xml2js').parseString;
	var xml1 = fs.readFileSync('../XmlFile/torrentlist.xml', {encoding: 'utf-8'})
	var count = 0 

    parser.parseString(xml1, function (err, result) {
    checkId = result.Files.File
    //console.log(checkId)
    //console.log('XmlNumFile :' , checkId.length )
    //readNumFile(checkId)
    for(var i = 0; i <checkId.length; i++){
				//console.log(checkId[i][0].pathFile)
				if(checkId[i].pathFile[0] == ''){
					count++
				}if(checkId[i].name[0] !== name[i]){
					count++
				}

	}

    if( (name.length !== checkId.length) || (count > 0) ){
		console.log('restartApp')
		var reApp = setTimeout(restart , 5000)
		//restart()
	}else{
		//checkNewFile()
	}
	checkId.length = null 
    })

	name = []
	numFileXml = null 
}

function start(){
	nodemon({ script: 'app.js' }).on('start', function () {
	  console.log('app started');
	}).on('crash', function () {
		//restart()
		process.stdout.on('error', function( err ) {
	    if (err.code == "write EPIPE") {
	        restart()
	    }
	});
	console.log('script crashed for some reason');
	}).on('restart', function () {
		process.once('SIGUSR2', function () {
		gracefulShutdown(function () {
		   process.kill(process.pid, 'SIGUSR2');
		   //process.kill(process.pid, 'SIGHUP');
			})
		})
	})
	//check new file
	var checkApp = setInterval(testName, 30000)
	//restart every 30 mins
	//var reApp = setInterval(restart, 1800000)
}

function restart(){
	//clearTimeout(reApp)
	nodemon.emit('restart');
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
		return 
	}
	
	fs.readFile(fileForTorrent+name[loop], function(err, buf) {
		for(var i = 0; i <name.length; i++){
			//console.log(md5Code[loop] , md5(buf))
	  	    //console.log(name[loop] , fileName[i])
			if(name[loop]==fileName[i]){
				if(md5Code[i] !== md5(buf)){
					//console.log('restart app ')
					console.log('restartApp')
					//clearInterval(start)
					nodemon.emit('quit');
					setTimeout(restart , 5000)
				}
			}else {
				
			}
		}
   	checkNewFile()
	});
	name = []	
}


start()