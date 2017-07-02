
var gqurl = '';
var suiji = Math.ceil(Math.random()*4);
var audio = document.querySelector("#music audio");
var source = document.querySelector("#music source");
var xia = document.querySelector("#music .xia");
var shang = document.querySelector("#music .shang");
xia.addEventListener("click",function(){
    suiji == 4 ? suiji =1 : suiji++;
    bofan(suiji);
})
shang.addEventListener("click",function(){
    suiji == 1 ? suiji =4 : suiji--;
    bofan(suiji);
})
bofan(suiji);
//根据数字播放歌曲
function bofan(suiji){
    switch(suiji){
        case 1: 
            gqurl = "./music/7!! - オレンジ.mp3";
            break;
        case 2: 
            gqurl = "./music/松たか子 - 梦のしずく.mp3";
            break;
        case 3: 
            gqurl = "./music/高橋優 - 光の破片.mp3";
            break;
        case 4: 
            gqurl = "./music/さユり - 平行線.mp3";
            break;
    }
    source.setAttribute("src",gqurl);
    audio.load();
}
//显示隐藏播放器
var ycmusic = document.querySelector(".ycmusic");
var music = document.querySelector("#music");
ycmusic.addEventListener("click",function(){
    // music.style.bottom="50px";
    music.style.display=="none" ? music.style.display="flex" : music.style.display="none";
})