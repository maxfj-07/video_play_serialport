const serialport = require('serialport')
var Port = new serialport("COM3", {
  baudRate: 9600
});
  document.getElementById("first").play();
 // document.getElementById("first").addEventListener('ended', function () {
  //document.getElementById("first").play();
//});
document.onkeydown = function (event) {

  if (event.keyCode === 49) {
    console.log(11); 
      //document.getElementById("first").style.display = "none";
      //document.getElementById("videoa").style.display = "block";
      document.getElementById("v1").play();
      document.getElementById("first").style.display = "none";
      document.getElementById("videoa").style.display = "block";
      //var time = window.setTimeout(delay, 1000);
      //function delay(){
      // document.getElementById("first").pause();
     // }
  }
  if (event.keyCode === 50) {
    console.log(12);
    document.getElementById("first").src="./img/index.mp4";
  }
}

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
        
        //s document.getElementById("v1").muted="false";
          document.getElementById("v1").addEventListener('ended', function () {
          var t3 =window.setTimeout(reload,1500)
          function reload (){
            document.getElementById("v1").load();
          }
          document.getElementById("v1").load()
          var t1 = window.setTimeout(backToImg, 6000);
        });
        function backToImg() {
          if (document.getElementById("videoa").style.display == "block" && document.getElementById("v1").paused){
            document.getElementById("first").play();
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