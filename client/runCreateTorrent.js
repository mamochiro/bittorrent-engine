var nodemon = require('nodemon')
var fs = require('fs')
var path = require('path')
var fileForTorrent = path.join(__dirname, '../' ,  'filefortorrent/' )
var fileName = new Array() 


fs.readdirSync(fileForTorrent).forEach(file => {
  fileName.push(file)
})

function start(){
	nodemon({ script: 'createTorrent.js' }).on('start', function () {
	  console.log('app started');
	}).on('crash', function () {
		//restart()
		process.stdout.on('error', function( err ) {
	    if (err.code == "write EPIPE") {
	        //restart()
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
		//fileName=null
	 	//newfileName=null
	})
	//check new file
	var checkApp = setInterval(checkNewFile, 10000)
	//restart every 30 mins
	//var reApp = setInterval(restart, 1800000)
}

function checkNewFile() {
	var count = 0 
	var newfileName = new Array()
	 fs.readdirSync(fileForTorrent).forEach(file => {
	  	newfileName.push(file)
	})
	
	//check for restart 
	if(fileName.length == newfileName.length){
		for(var i = 0; i <fileName.length; i++){
			if(fileName[i] !== newfileName[i]){
				count++
			}
		}
	}

	if((fileName.length !== newfileName.length) || (count > 0)){
		fileName = newfileName
		count = 0 
	 	restart()
	}

}

function restart(){
	//clearTimeout(reApp)
	nodemon.emit('restart');

}

start()