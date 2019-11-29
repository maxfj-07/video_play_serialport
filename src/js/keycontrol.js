const serialport = require('serialport')
var Port = new serialport("COM3", {
  baudRate: 9600
});

var http=require('http')
var fs=require('fs')

// 创建一个本地服务器,127.0.0.1:3000
http.createServer((req,res)=>{
    var mp4='src/img/vida.mp4'
    var stat=fs.statSync(mp4)

    res.writeHead(200,{
        'Content-Type':'video/mp4',
        'Content-Length':stat.size
    })

    //创建可读流
    var readableStream=fs.createReadStream(mp4)
    // 管道pipe流入
    readableStream.pipe(res);
}).listen(3000)
console.log('服务器运行在 127.0.0.1:3000端口')


var t5=window.setTimeout(playVideo,1500);
function playVideo(){
  document.getElementById("first").play();
}
document.getElementById("first").load();
//document.getElementById("v1").load();
serialport.list((err, ports, data) => {
  var usd = [];
  console.log('ports', ports);
  if (err) {
    console.log("error")
    return
  } else {
    //监听data
    console.log("打开端口成功，正在监听数据中");

    Port.on('data', function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        usd.push(data[i]);
      }
      console.log(usd)
      if (usd.length >= 7) {
        if (usd.length !== 7 || usd[usd.length-1] !== 255) {
          console.error("data ignored")
        } else {
          console.log("data processed")
      if (usd[0] == 221 && usd[1] == 19 && usd[2] == 1 && usd[3] == 1 && usd[4] == 1 && usd[5] == 17 && usd[6] == 255) {
        //播放视频
        console.log("串口通讯正常");
        document.getElementById("first").pause();
        document.getElementById("v1").play();
        document.getElementById("first").style.display = "none";
        document.getElementById("videoa").style.display = "block";
        if (document.getElementById("first").style.display == "none"){
          document.getElementById("first").pause();
        }     
        
          document.getElementById("v1").addEventListener('ended', function () {
         // var t3 =window.setTimeout(reload,1500)
         // function reload (){
         //   document.getElementById("v1").load();
         // }
         // document.getElementById("v1").load()
          var t1 = window.setTimeout(backToImg, 10000);
        });
        function backToImg() {
          if (document.getElementById("videoa").style.display == "block" && document.getElementById("v1").paused){
            document.getElementById("first").play();
          //  document.getElementById("v1").load();
            document.getElementById("videoa").style.display = "none";
            document.getElementById("first").style.display = "block";
          } 
        }
      }
        }
        usd = [];
      } else {
        console.log("waiting for more data")
      }
    })
  }
})


var fs = require('fs'),
path = require('path');

var rs = fs.createReadStream(__dirname + '/img/vida.mp4');

var ws = fs.createWriteStream(__dirname + '/img/vidd.mp4');
rs.pipe(ws);
rs.on('data', function (data) {
  console.log('数据可读')
});
rs.on('end', function () {
  console.log('文件读取完成');
  //ws.end('再见')
});
