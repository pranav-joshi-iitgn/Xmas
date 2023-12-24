const can = document.getElementById("C")
const c = can.getContext("2d")
c.strokeStyle = "white"
const colors = ['red','blue','green','orange','yellow']
var Sx = []
var Sy = []
var Sr = []
var Sc = []
var Lx = []
var Ly = []
var Ls = []
function resize(){
    can.width = window.innerWidth
    can.height = window.innerHeight
}
window.onresize = resize
function populate(X,Y,R=20,N=3){
    for(var i=0;i<N;i++){
        var r = R*Math.random()
        var theta = 2*Math.PI*Math.random()
        var x = X + r*Math.cos(theta)
        var y = Y + r*Math.sin(theta)
        var color = Math.floor(0.99*Math.random()*colors.length)
        Sx.push(x)
        Sy.push(y)
        Sr.push(3)
        Sc.push(colors[color])
    }
}
function Draw(){
    c.clearRect(0,0,can.width,can.height)
    c.fillStyle = "white"
    c.strokeStyle = "white"
    c.lineWidth = 8
    c.lineCap = 'round'
    for(var j=Lx.length-1;j>-1;j--){
        if(Lx[j].length){
            //if(Ls[j][Ls.length-1] < 0.1){
            //    Lx.splice(j,1)
            //    Ly.splice(j,1)
            //    Ls.splice(j,1)
            //    continue
            //}
            c.beginPath()
            c.lineWidth = Ls[j][0]
            if(Ls[j][0]>1){
                Ls[j][0] *= 0.8
            }
            c.moveTo(Lx[j][0],Ly[j][0])
        }
        c.fillStyle = 'red'
        for(var i=1;i<Lx[j].length;i+=2){
            c.quadraticCurveTo(Lx[j][i-1],Ly[j][i-1],Lx[j][i],Ly[j][i])
            c.stroke()
            c.lineWidth = Ls[j][i]
            c.beginPath()
            if(Ls[j][i]>1+8*1.1**(i-Ls[j].length)){
                Ls[j][i] *= 0.8
                Ls[j][i-1] *= 0.8

            }
            c.moveTo(Lx[j][i],Ly[j][i])
        }
        c.stroke()
    }
    for(var i=Sx.length-1;i>0;i--){
        c.fillStyle = Sc[i]
        c.beginPath()
        c.arc(Sx[i],Sy[i],Sr[i],0,2*Math.PI)
        c.fill()
        Sy[i] += 5
        Sr[i] *= 0.9
        if((Sr[i] < 1)||(Sy[i]>can.height)){
            Sx.splice(i,1)
            Sy.splice(i,1)
            Sr.splice(i,1)
        }
    }   
}
window.onload = function(){
    resize()
    down = false
    can.onpointerdown = function(e){
        down = true
        populate(e.clientX,e.clientY)
        Lx.push([e.clientX])
        Ly.push([e.clientY])
        Ls.push([8])
    }
    can.onpointerup = function(){
        down = false
    }
    can.onpointermove = function(e){
        if(!down){return;}
        populate(e.clientX,e.clientY)
        LxL = Lx[Lx.length-1]
        LyL = Ly[Ly.length-1]
        LsL = Ls[Ls.length-1]
        LxL.push(e.clientX)
        LyL.push(e.clientY)
        LsL.push(8)
        LxL.push(2*e.clientX-LxL[LxL.length-1])
        LyL.push(2*e.clientY-LyL[LyL.length-1])
        LsL.push(8)
    }
    setInterval(Draw,100)
}