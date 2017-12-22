var WebTorrent = require('webtorrent-hybrid')
var WebTorrent = require('../index')
var fs = require('fs')
var path = require('path');
var client = new WebTorrent()
var nodemon = require('nodemon');
var client = new WebTorrent()
var torrentFile = path.join(__dirname, '../' ,  'torrentfile/')
var torrentDownload = path.join(__dirname, '../' ,  'download/')
var torrentFileName = '../torrentfile';
var name = new Array() 

//push file name in
fs.readdirSync(torrentFileName ).forEach(file => {
  name.push(file)
})


var EventEmitter = require('events').EventEmitter
EventEmitter.defaultMaxListeners = Infinity


///////////////
//loop for download
var loop = -1;
function downloadTorrent(){
  ++loop;
  if(loop >= name.length){
    return;
  }
  var filePath = path.join(torrentFile,name[loop])
  client.add(filePath,{path: torrentDownload  },function (torrent) {

  var files = torrent.files
  var length = files.length
  // Stream each file to the disk
  //torrent.addPeer('192.168.8.7:22178')
  files.forEach(function (file) {
    //var source = file.createReadStream()
    //var destination = fs.createWriteStream(file.name)
    var interval = setInterval(function () {
            if((torrent.progress * 100).toFixed(1) != 100)
            console.log()
            for (var i=0; i < torrent.files.length ; ++i){
              console.log('Filename :' , torrent.files[i].name)
              console.log('Filepath :' , torrent.files[i].path)
             
            }
            console.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
            console.log('Number of peers :' , torrent.numPeers)
            console.log('total downloaded: ' + (torrent.downloaded / 1048576 ).toFixed(2) , 'MB')
            console.log('download speed: ' + (torrent.downloadSpeed / 1024).toFixed(2) , 'KB/Sec')
           //console.log('client ratio :' , client.ratio.toFixed(3))
            console.log('client uploadSpeed :' , (client.uploadSpeed / 1024 ).toFixed(2) , 'KB/Sec')
            console.log('client.address : ' , client.address())
            console.log()
          }, 10000)
    torrent.on('error', function (err) {})
    torrent.on('done', function () {
      console.log('torrent download finished : ' , file.name)
      //torrent.destroy();
    })
    
    nodemon.on('restart', function () {
      //torrent.removePeer()
      clearInterval(interval)
      //torrent.destroy();
      client.destroy([function callback (err) {
        torrent.destroy();
      }])
    });

  })
  downloadTorrent()
})
}

//downloadTorrent()
module.exports.downloadTorrent = downloadTorrent;