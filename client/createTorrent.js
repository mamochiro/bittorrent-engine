var createTorrent = require('create-torrent')
var fs = require('fs')
var path = require('path');
var fileForTorrent = path.join(__dirname, '../' ,  'filefortorrent/' )
var name = new Array() 
var filePath= new Array() 
fs.readdirSync(fileForTorrent).forEach(file => {
  name.push(file)
})

//loop for create
var loop = -1;
function check(){
	++loop;
	if(loop >= name.length){
		return;
	}

	var torrentName = name[loop];
	var fileTorrentPath = path.join(fileForTorrent,torrentName);
	createTorrent(fileTorrentPath,function (err, torrent) {
  		if (!err) {
    	// `torrent` is a Buffer with the contents of the new .torrent file
   		fs.writeFileSync(__dirname + '/../torrentcreate/'+torrentName + '.torrent', torrent)
    	//console.log('CreateTorrent Complete : ' , torrentName)
    	console.log('CreateTorrent :' , torrentName + '.torrent' )
 				 }
 				 check();
		});
}
//console.log(createTorrent.announceList)
check();
