var hei=window.innerHeight;
document.querySelector(".canvas_box").style.height=hei-4+"px";
var wid=window.innerWidth;
var is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
var canvas=document.querySelector("#game");
canvas.height=hei-4;
var pen=canvas.getContext("2d");
pen.globalAlpha=1;
pen.lineWidth=15;
var H=hei;
var colors=["red","green","yellow","blue","black"];
document.querySelector(".restart_box").style.height=H-4+"px";
var modAng = function(x)
{
    var y = x;
    while(y < 0)
    {
        y += Math.PI*2;
    };
    return y%(Math.PI*2);
}
var k=[0,0,0,0],r=0,pos=true,neg=false;
var lines =function (x,y)
{
	c={x:x,y,y};
	c.color=Math.floor(Math.random()*4);
	c.spd=0;
	c.acc=0;
	c.colortype=colors[c.color];
	c.draw=function()
	{
		for(var i=0;i<4;i++)
		{
			p=(c.color+i)%4;
			pen.beginPath();
			pen.strokeStyle=colors[p];
			pen.moveTo(c.x-10+k[i],c.y+(i-1)*30);
			pen.lineTo(c.x-10-100+k[i],c.y+(i-1)*30);
			pen.stroke();
		}
		if(k[r]<120&&pos)
		{
			k[r]=k[r]+2.5*rotatespd;
		}
		if(k[r]>0&&neg)
		{
			k[r]=k[r]-2.5*rotatespd;
		}
		if(k[r]>=120||k[r]<=0)
		{
			r++;
		}
		if(r>3)
		{
			if(pos)
			{
				pos=false;
				neg=true;
			}
			else
			{
				pos=true;
				neg=false;
			}
			r=0;
		}
		c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
	}
	c.hit=function()
	{
		po=gamept.y-(c.y+(r-1)*30);
		if(po<0)
			po=-po;
		if(colors[(c.color+r)%4]!=gamept.colortype&&po<=7.5)
		{
			gameover();
		}
	}
	c.hits=function(){}
	particles.push(c);
}
var dicircle = function(x,y)
{
	var c={x:x,y:y};
	c.r1=100;
	c.r2=70;
	c.spd=0;
	c.acc=0;
	c.startColor=Math.floor(Math.random()*4);
	c.Angle1=Math.PI*2;
	c.Angle2=Math.PI;
	c.draw = function ()
	{
		for(let i=0;i<4;i++)
		{
			pen.beginPath();
			pen.strokeStyle=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle1+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen.arc(c.x,c.y,c.r1,st_angle,end_angle);
			pen.stroke();	
		}
		for(let i=0;i<4;i++)
		{
			pen.beginPath();
			pen.strokeStyle=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle2+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen.arc(c.x,c.y,c.r2,st_angle,end_angle);
			pen.stroke();	
		}
		c.Angle1+=3*(Math.PI/180)*rotatespd;
		c.Angle2-=2*(Math.PI/180)*rotatespd;
		c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
	}
	c.hit=function()
	{
		for(let i=0;i<4;i++)
		{
			clr=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle1+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			if(clr!=gamept.colortype)
			{
				kp=(gamept.y-c.y);
				if(kp<0)
					kp*=-1;
				if(kp+gamept.r > c.r1-7.5 && kp-gamept.r < c.r1+7.5)
				{
					kp=(gamept.y-c.y);
					if(kp<0)
						ang=3*(Math.PI/2);
					else
						ang=(Math.PI/2);
					if(ang>st_angle&&ang<end_angle)
					{
						gameover();
					}
				}
			}
		}
		for(let i=0;i<4;i++)
		{
			clr=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle2+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			if(clr!=gamept.colortype)
			{
				kp=(gamept.y-c.y);
				if(kp<0)
					kp*=-1;
				if(kp+gamept.r > c.r2-7.5 && kp-gamept.r < c.r2+7.5)
				{
					kp=(gamept.y-c.y);
					if(kp<0)
						ang=3*(Math.PI/2);
					else
						ang=(Math.PI/2);
					if(ang>st_angle&&ang<end_angle)
					{
						gameover();
					}
				}
			}
		}
	}
	c.hits=function(){}
	particles.push(c);
}

var circle = function(x,y,d)
{
	var c={x:x,y:y,d:d};
	c.r=100;
	c.spd=0;
	c.acc=0;
	c.startColor=Math.floor(Math.random()*4);
	c.Angle=Math.PI*2;
	c.draw = function ()
	{
		for(let i=0;i<4;i++)
		{
			pen.beginPath();
			pen.strokeStyle=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen.arc(c.x,c.y,c.r,st_angle,end_angle);
			pen.stroke();	
		}
		c.Angle+=3*c.d*(Math.PI/180)*rotatespd;
		c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
	}
	c.hit=function()
	{
		for(let i=0;i<4;i++)
		{
			clr=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			if(clr!=gamept.colortype)
			{
				kp=(gamept.y-c.y);
				if(kp<0)
					kp*=-1;
				if(kp+gamept.r > c.r-7.5 && kp-gamept.r < c.r+7.5)
				{
					kp=(gamept.y-c.y);
					if(kp<0)
						ang=3*(Math.PI/2);
					else
						ang=(Math.PI/2);
					if(ang>st_angle&&ang<end_angle)
					{
						gameover();
					}
				}
			}
		}
	}
	c.hits=function(){}
	particles.push(c);
}
var star= function(x,y)
{
	var c={x:x,y:y};
	c.y=y;
	c.spd=0;
	c.r=10;
	c.used=false;
	c.colortype="white";
	c.draw=function()
	{
		pen.strokeStyle = c.colortype;
	    pen.beginPath();
	    pen.lineWidth=2;
	    for(var j = 0; j <= 5; j++)
	    {
	        var a1 = j*Math.PI*2/5-Math.PI/2;
	        var a2 = a1+Math.PI/5;
	        pen.lineTo(c.x+c.r*Math.cos(a1),c.y+c.r*Math.sin(a1));
	        pen.lineTo(c.x+c.r/2*Math.cos(a2),c.y+c.r/2*Math.sin(a2));
	    };
	   	pen.stroke();
	   	pen.lineWidth=15;
	    c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
	}
	c.hits=function()
	{
		kp=(gamept.y-c.y);
		if(kp<0)
			kp*=-1;
		if(kp<(gamept.r+c.r)&&!c.used)
		{
			document.querySelector(".point").play();
			c.used=true;
			c.colortype="transparent";
			s++;
			rotatespd*=1.05;
		}
	}
	c.hit=function(){}
	particles.push(c);
}
var bicircle=function(x,y)
{
	var c={x:x,y:y};
	c.r1=50;
	c.r2=40;
	c.spd=0;
	c.acc=0;
	c.startColor=2;
	c.Angle1=Math.PI*2;
	c.Angle2=Math.PI;
	c.draw = function ()
	{
		for(let i=0;i<4;i++)
		{
			pen.beginPath();
			pen.strokeStyle=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle1+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen.arc(c.x-c.r1-7.5,c.y,c.r1,st_angle,end_angle);
			pen.stroke();	
		}
		for(let i=0;i<4;i++)
		{
			pen.beginPath();
			var ll=(c.startColor+i-1)%4;
			if(ll%2==0)
			{
				ll=ll+2;
				ll%=4;
			}
			pen.strokeStyle=colors[ll];
			var st_angle=modAng(c.Angle2+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen.arc(c.x+c.r2+7.5,c.y,c.r2,st_angle,end_angle);
			pen.stroke();	
		}
		c.Angle1+=rotatespd*2*Math.PI/180;
		c.Angle2-=rotatespd*2*Math.PI/180;
		c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
	}
	c.hit=function()
	{
		for(let i=0;i<4;i++)
		{
			clr=colors[(c.startColor+i+2)%4];
			var st_angle=modAng(c.Angle1+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			if(clr!=gamept.colortype)
			{
				kp=(gamept.y-c.y);
				if(kp<0)
					kp=kp*-1;
				if(kp-gamept.r < 15)
				{
					ang=Math.PI;
					if(ang>st_angle&&ang<end_angle)
					{
						gameover();
					}
				}
			}
		}
	}
	c.hits=function(){}
	particles.push(c);
}
var gamept;
var colorchange=function(x,y)
{
	var c={x:x,y:y};
	c.color=Math.floor(Math.random()*4);
	c.colortype=colors[c.color];
	c.spd=0;
	c.acc=0;
	c.draw=function()
	{
		pen.beginPath();
		pen.fillStyle=colors[c.color];
		pen.arc(c.x,c.y,10,0,Math.PI*2);
		pen.fill();
		if(c.color!=4)
		{
			c.color+=1;
			c.color%=4;
		}
		c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
	}
	c.hits=function()
	{
		kp=(gamept.y-c.y);
		if(kp<0)
			kp*=-1;
		if(kp<(gamept.r+10) &&c.color!=4)
		{
			gamept.color=(gamept.color+1)%4;
			gamept.colortype=colors[gamept.color];
			c.color=4;
		}
	}
	c.hit=function(){}
	particles.push(c);
}
var gamepoint=function(x,y)
{
	var c={x:x,y:y};
	c.r=10;
	c.spd=0;
	c.acc=0;
	c.color=Math.floor(Math.random()*4);
	c.colortype=colors[c.color];
	c.draw=function()
	{
		pen.beginPath();
		pen.fillStyle=c.colortype;
		pen.arc(c.x,c.y,10,0,Math.PI*2);
		pen.fill();
		c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
		if(c.y>31*H/32)
		{
			c.y=31*H/32;
			c.spd=0;
			c.acc=0;
		}
		if(c.y<H/2)
			c.y=H/2;
	}
	gamept=c;
}
var burst=[];
var bursting = function()
{
	var c={x:gamept.x,y:gamept.y};
	c.r=4;
	c.spdx=Math.random()*8-4;
	c.spdy=-Math.random()*12;
	c.acc=1;
	c.colortype=colors[Math.floor(Math.random()*4)];
	c.draw = function()
	{
		pen.beginPath();
		pen.lineWidth=2;
		pen.fillStyle=c.colortype;
		pen.arc(c.x,c.y,c.r,0,Math.PI*2);
		pen.fill();
		c.x=c.x+c.spdx;
		c.y=c.y+c.spdy;
		c.spdy=c.spdy+c.acc;
	}
	burst.push(c);
}
var particles=[];
var moved;
var click;
var Ts=0,Tm=0;
var slowclicked=false;
var multiclicked=false;
var s=0;
var rotatespd=1.1;
var X=175;
function start()
{
	moved=0;
	rotatespd=1.1;
	particles=[];
	burst=[];
	pen.lineWidth=15;
	new gamepoint(X,3*H/4);
	new circle(X,150,1);
	new star(X,150);
	new colorchange(X,-50);
	new bicircle(X,-250);
	new star(X,-250);
	new colorchange(X,-450);
	new dicircle(X,-650);
	new star(X,-650);
	new colorchange(X,-850);
	slowclicked=false;
	multiclicked=false;
	s=0;
	k=[0,0,0,0],r=0,pos=true,neg=false;
	
	document.querySelector("#multicolor").style.display="block";
	document.querySelector("#slow").style.display="block";
}
start();
var looper=function()
{	
	pen.clearRect(0,0,350,H);
	if(moved>H-50)
	{
		switch(Math.floor(Math.random()*7))
		{
			case 0:
				new circle(X,particles[particles.length-1].y-200,1);
				break;
			case 1:
				new dicircle(X,particles[particles.length-1].y-200);
				break;
			case 2:
				new bicircle(X,particles[particles.length-1].y-200);
				break;
			case 3:
				new lines(X,particles[particles.length-1].y-200);
				break;
			case 4:
				new circle(X,particles[particles.length-1].y-200,-1);
				break;
			default:
				new circle(X,particles[particles.length-1].y-200,-1);
		}
		new star(X,particles[particles.length-1].y);
		new colorchange(X,particles[particles.length-1].y-200);	
		particles.splice(0,3);
	}
	if(click)
	{
		gamept.spd=-1*5;
		gamept.acc=-0.25*4;
	}
	if(!click)
	{
		gamept.acc=+0.1*5;
	}
	if(gamept.y<13*H/16)
	{
		if(gamept.y==H/2)
		{
			for(var i in particles)
			{
				particles[i].spd=2*Math.max(-gamept.spd,0);
				particles[i].acc=2*Math.max(-gamept.acc,0);
			}
		}
		else
		{
			for(var i in particles)
			{
				particles[i].spd=Math.max(-gamept.spd,0);
				particles[i].acc=Math.max(-gamept.acc,0);
			}
		}
		moved=particles[0].y-150;
	}
	else
	{
		for(var i in particles)
		{
			particles[i].spd=0;
			particles[i].acc=0;
		}
	}
	if(!multiclicked)
	{	
		for(var i in particles)
			particles[i].hit();
	}
	for(var i in particles)
	{
		particles[i].hits();
	}
	for(var i in particles)
		particles[i].draw();
	gamept.draw();
	canvas.addEventListener("click",function(){click=true;});
	window.addEventListener('keydown',function(e)
	{
		if(e.keyCode==32||e.keyCode==38)
		click=true;
	})
	click=false;
	document.querySelector("#scrdisp").innerHTML=s;
	if(s>hs)
	{
		hs=s;
		var str=JSON.stringify(hs);
    	localStorage.setItem("highscore",str);
	}
	document.querySelector('#hscrdisp').innerHTML=hs;
	if(s>=100)
	{
		document.querySelector("#score").style.fontSize="30px";
	}
	if(hs>=100)
	{
		document.querySelector("#highscore").style.fontSize="30px";
	}
	Ts++;
	Tm++;
	if(Ts>200&&slowclicked)
	{
		rotatespd=rotatespdthen;
		slowclicked=false;
	}
	if(Tm>200&&multiclicked)
	{
		multiclicked=false;
	}
	if(slowclicked)
	{
		pen.font="30px Arial";
		pen.fillStyle="white";
		pen.textAlign="center";
		pen.fillText("SLOW Power-up",175,H/2);
	}
	if(multiclicked)
	{
		pen.font="30px Arial";
		pen.fillStyle="white";
		pen.textAlign="center";
		pen.fillText("Multicolor Power-up",175,H/2);
		gamept.color=(gamept.color+1)%4;
		gamept.colortype=colors[gamept.color];
	}
};
var run=true;
var loop=setInterval(looper,100);;
var kr=0;
function gameover()
{
	document.querySelector(".back").pause();
	document.querySelector(".gameo").play();
	clearInterval(loop);
	for(var i=0;i<40;i++)
		new bursting();
	var br=setInterval(function()
	{
		pen.fillStyle="black";
		pen.fillRect(0,0,350,H);
		for(var i=0;i<40;i++)
			burst[i].draw();
		kr++;
		if(kr>50)
		{
			clearInterval(br);
			gameoverer();
			kr=0;
		}
	},100);
}
function gameoverer()
{ 	
	document.querySelector(".canvas_box").style.display="none";
	document.querySelector(".restart_box").style.display="block";
	document.querySelector(".scorewriter").innerHTML="Your Score : " + s;
}
document.querySelector("#pause").onclick=function()
{
	if(run==true)
	{
		clearInterval(loop);
		run=false;
	}
}
document.querySelector("#play").onclick = function()
{
	if(run==false)
	{
		loop=setInterval(looper,50);
		run=true;
	}
}
var rotatespdthen;
document.querySelector("#slow").onclick=function()
{
	if(!multiclicked)
	{
		document.querySelector("#slow").style.display="none";
		Ts=0;
		rotatespdthen=rotatespd;
		rotatespd=0.5;
		slowclicked=true;
	}
}
document.querySelector("#multicolor").onclick=function()
{
	if(!slowclicked)
	{
		document.querySelector("#multicolor").style.display="none";
		Tm=0;
		multiclicked=true;
	}
}

document.querySelector("#restart").onclick=function()
{
	document.querySelector(".gameo").pause();
	document.querySelector(".gameo").currentTime=0;
	document.querySelector(".back").play();
	document.querySelector(".canvas_box").style.display="block";
	document.querySelector(".restart_box").style.display="none";
	start();
	loop=setInterval(looper,100);
}

var hs;

window.onload
{
	highscore=JSON.parse(localStorage.getItem("highscore"));
	if(!highscore)
	{
		hs=0;
	}
	else
	{
		hs=highscore;
	}
}
function pl()
{
  document.querySelector(".aud").play();
}
document.querySelector(".btn").onclick = function()
{
	document.querySelector(".first").style.display="none";
	document.querySelector(".canvas_box").style.display="block";
	document.querySelector(".back").play();
}