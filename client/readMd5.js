var fs = require('fs');
var xml2js = require('xml2js');
var path = require('path')
var parser = new xml2js.Parser();


var xml1 = fs.readFileSync('../XmlFile/torrentlist.xml', {encoding: 'utf-8'})

var parseString = require('xml2js').parseString;

var fileForTorrent = path.join(__dirname, '../' ,  'torrentfile/')
var numFile
var fileName = new Array()
var md5Code = new Array()
var pathFile = new Array()

    parser.parseString(xml1, function (err, result) {
    //console.dir(result['Files']['File'][loop]['md5']);
        //md5Code = result['Files']['File'][i]['md5'][0]
        //console.log(result.Files.File.length)
        checkId = result.Files.File
        //md5Code.push(result['Files']['File'][i]['md5'][0])
        readNumFile(checkId)
        readMd5(checkId)
        readPathFile(checkId)
        readNameFile(checkId)
    })



function readMd5(result) {
for(var i = 0; i <result.length; i++)
	{	
    	//console.log(result[i].name)
        md5Code.push(result[i].md5[0])
    }
   return md5Code
}

function readPathFile(result) {
for(var i = 0; i <result.length; i++)
    {  
        //console.log(result[i].pathFile[0])
        pathFile.push(result[i].pathFile[0])
    }
   return pathFile
}


function readNumFile(result){
    numFile =  result.length
    return numFile
}

function readNameFile(result){
    for(var i = 0; i <result.length; i++)
    {
    //console.log(result[i].name[0])
    fileName.push(result[i].name[0])
    }
    return fileName
}
//readMd5()


module.exports.md5Code = md5Code
module.exports.numFile = numFile
module.exports.fileName = fileName
module.exports.pathFile = pathFile