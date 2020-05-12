var H=window.innerHeight;

document.querySelector(".canvas_box").style.height=H-4+"px";
document.querySelector(".restart_box").style.height=H-4+"px";
document.querySelector(".multiplayer1").style.height=H-4+"px";
document.querySelector(".multiplayer2").style.height=H-4+"px";

document.querySelector(".morepens")

var cvs=[];

cvs[0]=document.querySelector("#game");
cvs[0].height=H-4;

cvs[1]=document.querySelector("#game1");
cvs[1].height=H-4;

cvs[2]=document.querySelector("#game2");
cvs[2].height=H-4;

var pen=[];

pen[0]=cvs[0].getContext("2d");
pen[0].globalAlpha=1;
pen[0].lineWidth=15;

pen[1]=cvs[1].getContext("2d");
pen[1].globalAlpha=1;
pen[1].lineWidth=15;

pen[2]=cvs[2].getContext("2d");
pen[2].globalAlpha=1;
pen[2].lineWidth=15;

particles=[];
particles[0]=[];
particles[1]=[];
particles[2]=[];

var colors=["red","green","yellow","blue","black"];

var modAng = function(x)
{
    var y = x;
    while(y < 0)
    {
        y += Math.PI*2;
    }
    return y%(Math.PI*2);
}

//obstacles

var lines=function(x,y,cn)
{
	var c={x:x,y:y};
	c.spd=0;
	c.acc=0;
	c.color=Math.floor(Math.random()*4);
	c.colortype=colors[c.color];
	c.cn=cn;
	c.k=[0,0,0,0];
	c.r=0;
	c.pos=true;
	c.neg=false;
	c.draw=function()
	{
		for(let i=0;i<4;i++)
		{
			pp=(c.color+i)%4;
			pen[c.cn].beginPath();
			pen[c.cn].strokeStyle=colors[pp];
			pen[c.cn].moveTo(c.x+c.k[i]-10,c.y+(i-1)*30);
			pen[c.cn].lineTo(c.x+c.k[i]-110,c.y+(i-1)*30);
			pen[c.cn].stroke();
		}
		if(c.pos)
		{
			c.k[c.r]+=5*rotatespd[c.cn];
		}
		if(c.neg)
		{
			c.k[c.r]-=5*rotatespd[c.cn];
		}
		if(c.k[c.r]>120||c.k[c.r]<0)
		{
			if(c.k[c.r]>120)
				c.k[c.r]=123;
			else
				c.k[c.r]=0;
			c.r=c.r+1;
		}
		
		if(c.r>3)
		{
			c.r=0;
			if(c.neg)
			{
				c.neg=false;
				c.pos=true;
			}
			else if(c.pos)
			{
				c.neg=true;
				c.pos=false;
			}
		}
		c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
	}
	c.hit=function()
	{
		po=gamept[c.cn].y-(c.y+(c.r-1)*30);
		if(po<0)
			po=-po;
		if(colors[(c.color+c.r)%4]!=gamept[c.cn].colortype&&po<=15)
		{
			gameover(cn);
		}
	}
	c.hits=function(){}
	particles[c.cn].push(c);
}

var dicircle = function(x,y,cn)
{
	var c={x:x,y:y};
	c.r1=120;
	c.r2=90;
	c.spd=0;
	c.acc=0;
	c.startColor=Math.floor(Math.random()*4);
	c.Angle1=Math.PI*2;
	c.Angle2=Math.PI;
	c.cn=cn;
	c.draw = function ()
	{
		for(let i=0;i<4;i++)
		{
			pen[c.cn].beginPath();
			pen[c.cn].strokeStyle=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle1+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen[c.cn].arc(c.x,c.y,c.r1,st_angle,end_angle);
			pen[c.cn].stroke();	
		}
		for(let i=0;i<4;i++)
		{
			pen[c.cn].beginPath();
			pen[c.cn].strokeStyle=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle2+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen[c.cn].arc(c.x,c.y,c.r2,st_angle,end_angle);
			pen[c.cn].stroke();	
		}
		c.Angle1+=3*(Math.PI/180)*rotatespd[c.cn];
		c.Angle2-=2*(Math.PI/180)*rotatespd[c.cn];
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
			if(clr!=gamept[c.cn].colortype)
			{
				kp=(gamept[c.cn].y-c.y);
				if(kp<0)
					kp*=-1;
				if(kp+gamept[c.cn].r > c.r1-7.5 && kp-gamept[c.cn].r < c.r1+7.5)
				{
					kp=(gamept[c.cn].y-c.y);
					if(kp<0)
						ang=3*(Math.PI/2);
					else
						ang=(Math.PI/2);
					if(ang>st_angle&&ang<end_angle)
					{
						gameover(c.cn);
					}
				}
			}
		}
		for(let i=0;i<4;i++)
		{
			clr=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle2+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			if(clr!=gamept[c.cn].colortype)
			{
				kp=(gamept[c.cn].y-c.y);
				if(kp<0)
					kp*=-1;
				if(kp+gamept[c.cn].r > c.r2-7.5 && kp-gamept[c.cn].r < c.r2+7.5)
				{
					kp=(gamept[c.cn].y-c.y);
					if(kp<0)
						ang=3*(Math.PI/2);
					else
						ang=(Math.PI/2);
					if(ang>st_angle&&ang<end_angle)
					{
						gameover(c.cn);
					}
				}
			}
		}
	}
	c.hits=function(){}
	particles[c.cn].push(c);
}


var circle = function(x,y,d,cn)
{
	var c={x:x,y:y,d:d};
	c.r=100;
	c.spd=0;
	c.acc=0;
	c.max=0;
	c.startColor=Math.floor(Math.random()*4);
	c.Angle=Math.PI*2;
	c.cn=cn;
	c.draw = function ()
	{
		for(let i=0;i<4;i++)
		{
			pen[c.cn].beginPath();
			pen[c.cn].strokeStyle=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen[c.cn].arc(c.x,c.y,c.r,st_angle,end_angle);
			pen[c.cn].stroke();	
		}
		c.Angle+=3*c.d*(Math.PI/180)*rotatespd[c.cn];
		c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
		if(c.spd>c.max)
			c.max=c.spd;
	}
	c.hit=function()
	{
		for(let i=0;i<4;i++)
		{
			clr=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			if(clr!=gamept[c.cn].colortype)
			{
				kp=(gamept[c.cn].y-c.y);
				if(kp<0)
					kp*=-1;
				if(kp+gamept[c.cn].r > c.r-7.5 && kp-gamept[c.cn].r < c.r+7.5)
				{
					kp=(gamept[c.cn].y-c.y);
					if(kp<0)
						ang=3*(Math.PI/2);
					else
						ang=(Math.PI/2);
					if(ang>st_angle&&ang<end_angle)
					{
						gameover(c.cn);
					}
				}
			}
		}
	}
	c.hits=function(){}
	particles[c.cn].push(c);
}

var bicircle=function(x,y,cn)
{
	var c={x:x,y:y};
	c.r1=50;
	c.r2=40;
	c.spd=0;
	c.acc=0;
	c.startColor=2;
	c.Angle1=Math.PI*2;
	c.Angle2=Math.PI;
	c.cn=cn;
	c.draw = function ()
	{
		for(let i=0;i<4;i++)
		{
			pen[c.cn].beginPath();
			pen[c.cn].strokeStyle=colors[(c.startColor+i)%4];
			var st_angle=modAng(c.Angle1+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen[c.cn].arc(c.x-c.r1-7.5,c.y,c.r1,st_angle,end_angle);
			pen[c.cn].stroke();	
		}
		for(let i=0;i<4;i++)
		{
			pen[c.cn].beginPath();
			var ll=(c.startColor+i-1)%4;
			if(ll%2==0)
			{
				ll=ll+2;
				ll%=4;
			}
			pen[c.cn].strokeStyle=colors[ll];
			var st_angle=modAng(c.Angle2+((Math.PI/2)*i));
			var end_angle=modAng(st_angle+Math.PI/2);
			pen[c.cn].arc(c.x+c.r2+7.5,c.y,c.r2,st_angle,end_angle);
			pen[c.cn].stroke();	
		}
		c.Angle1+=rotatespd[c.cn]*2*Math.PI/180;
		c.Angle2-=rotatespd[c.cn]*2*Math.PI/180;
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
			if(clr!=gamept[c.cn].colortype)
			{
				kp=(gamept[c.cn].y-c.y);
				if(kp<0)
					kp=kp*-1;
				if(kp-gamept[c.cn].r < 15)
				{
					ang=Math.PI;
					if(ang>st_angle&&ang<end_angle)
					{
						gameover(c.cn);
					}
				}
			}
		}
	}
	c.hits=function(){}
	particles[c.cn].push(c);
}

// other particles

var star= function(x,y,cn)
{
	var c={x:x,y:y};
	c.y=y;
	c.spd=0;
	c.r=10;
	c.used=false;
	c.colortype="white";
	c.cn=cn;
	c.acc=0;
	c.draw=function()
	{
		pen[c.cn].strokeStyle = c.colortype;
	    pen[c.cn].beginPath();
	    pen[c.cn].lineWidth=2;
	    for(var j = 0; j <= 5; j++)
	    {
	        var a1 = j*Math.PI*2/5-Math.PI/2;
	        var a2 = a1+Math.PI/5;
	        pen[c.cn].lineTo(c.x+c.r*Math.cos(a1),c.y+c.r*Math.sin(a1));
	        pen[c.cn].lineTo(c.x+c.r/2*Math.cos(a2),c.y+c.r/2*Math.sin(a2));
	    };
	   	pen[c.cn].stroke();
	   	pen[c.cn].lineWidth=15;
	    c.spd=c.spd+c.acc;
		c.y=c.y+c.spd;
	}
	c.hits=function()
	{
		kp=(gamept[c.cn].y-c.y);
		if(kp<0)
			kp*=-1;
		if(kp<(gamept[c.cn].r+c.r)&&!c.used)
		{
			document.querySelector(".point").play();
			c.used=true;
			c.colortype="transparent";
			s[c.cn]++;
			rotatespd[c.cn]*=1.05;
		}
	}
	c.hit=function(){}
	particles[c.cn].push(c);
}

var colorchange=function(x,y,cn)
{
	var c={x:x,y:y};
	c.color=Math.floor(Math.random()*4);
	c.colortype=colors[c.color];
	c.spd=0;
	c.acc=0;
	c.cn=cn;
	c.draw=function()
	{
		pen[c.cn].beginPath();
		pen[c.cn].fillStyle=colors[c.color];
		pen[c.cn].arc(c.x,c.y,10,0,Math.PI*2);
		pen[c.cn].fill();
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
		kp=(gamept[c.cn].y-c.y);
		if(kp<0)
			kp*=-1;
		if(kp<(gamept[c.cn].r+10) &&c.color!=4)
		{
			gamept[c.cn].color=(gamept[c.cn].color+1)%4;
			gamept[c.cn].colortype=colors[gamept[c.cn].color];
			c.color=4;
		}
	}
	c.hit=function(){}
	particles[c.cn].push(c);
}


var gamepoint=function(x,y,cn)
{
	var c={x:x,y:y};
	c.r=10;
	c.spd=0;
	c.acc=0;
	c.color=Math.floor(Math.random()*4);
	c.colortype=colors[c.color];
	c.cn=cn;
	c.draw=function()
	{
		pen[c.cn].beginPath();
		pen[c.cn].fillStyle=c.colortype;
		pen[c.cn].arc(c.x,c.y,10,0,Math.PI*2);
		pen[c.cn].fill();
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
	gamept[c.cn]=c;
}

var burst=[];
var bursting = function(cn)
{
	var c={x:gamept[cn].x,y:gamept[cn].y};
	c.r=4;
	c.spdx=Math.random()*20-10;
	c.spdy=-Math.random()*40;
	c.acc=1.5;
	c.cn=cn;
	c.colortype=colors[Math.floor(Math.random()*4)];
	c.draw = function()
	{
		pen[c.cn].beginPath();
		pen[c.cn].lineWidth=2;
		pen[c.cn].fillStyle=c.colortype;
		pen[c.cn].arc(c.x,c.y,c.r,0,Math.PI*2);
		pen[c.cn].fill();
		c.x=c.x+c.spdx;
		c.y=c.y+c.spdy;
		c.spdy=c.spdy+c.acc;
	}
	burst[cn].push(c);
}
var moved=[];
var slowclicked=[];
var multiclicked=[];
var click=[];
var rotatespd=[];
var X=175;
var gamept=[];
var s=[];
var Ts=[];
var Tm=[];
function start(cn)
{
	click[cn]=false;
	moved[cn]=0;
	rotatespd[cn]=2;
	particles[cn]=[];
	burst[cn]=[];
	pen[cn].lineWidth=15;
	new gamepoint(X,3*H/4,cn);
	new circle(X,3*H/4-200,-1,cn);
	new star(X,3*H/4-200,cn);
	new colorchange(X,particles[cn][particles[cn].length-1].y-200,cn);
	new lines(X,particles[cn][particles[cn].length-1].y-200,cn);
	new star(X,particles[cn][particles[cn].length-1].y,cn);
	new colorchange(X,particles[cn][particles[cn].length-1].y-200,cn);
	new dicircle(X,particles[cn][particles[cn].length-1].y-200,cn);
	new star(X,particles[cn][particles[cn].length-1].y,cn);
	new colorchange(X,particles[cn][particles[cn].length-1].y-200,cn);
	slowclicked[cn]=false;
	multiclicked[cn]=false;
	s[cn]=0;
	Ts[cn]=0;
	Tm[cn]=0;
	document.querySelector("#multicolor"+cn).style.display="block";
	document.querySelector("#slow"+cn).style.display="block";
	over[cn]=false;
}

function looper(cn)
{
	pen[cn].fillStyle="black";
	pen[cn].fillRect(0,0,350,H);
	cvs[cn].addEventListener("click",function(){click[cn]=true;});
	window.addEventListener('keydown',function(e)
	{
		if(e.keyCode==32||e.keyCode==38)
		click[0]=true;
		if(e.keyCode==32)
			click[1]=true;
		if(e.keyCode==38)
			click[2]=true;
	});
	if(moved[cn]>H+100)
	{
		no=Math.floor(Math.random()*6)
		switch(no)
		{
			case 0:
				new circle(X,particles[cn][particles[cn].length-1].y-200,1,cn);
				break;
			case 1:
				new dicircle(X,particles[cn][particles[cn].length-1].y-200,cn);
				break;
			case 2:
				new bicircle(X,particles[cn][particles[cn].length-1].y-200,cn);
				break;
			case 3:
				new circle(X,particles[cn][particles[cn].length-1].y-200,-1,cn);
				break;
			default:
				new lines(X,particles[cn][particles[cn].length-1].y-200,cn);
		}
		new star(X,particles[cn][particles[cn].length-1].y,cn);
		new colorchange(X,particles[cn][particles[cn].length-1].y-200,cn);	
		particles[cn].splice(0,3);
	}
	if(click[cn])
	{
		gamept[cn].spd=-6.5;
		if(gamept[cn].acc == 0)
        	{
           	 	gamept[cn].spd *= 1.2;
            		gamept[cn].acc = 0.3;
        	}
	}
	if(gamept[cn].y==H/2)
	{
		for(var i in particles[cn])
		{
			particles[cn][i].spd=2*Math.max(-gamept[cn].spd,0);
			particles[cn][i].acc=2*Math.max(-gamept[cn].acc,0);
		}
	}
	else
	{
		for(var i in particles[cn])
		{
			particles[cn][i].spd=Math.max(-gamept[cn].spd,0);
			particles[cn][i].acc=Math.max(-gamept[cn].acc,0);
		}
	}
	moved[cn]=particles[cn][0].y;
	if(!multiclicked[cn])
	{	
		for(var i in particles[cn])
			particles[cn][i].hit();
	}
	for(var i in particles[cn])
	{
		particles[cn][i].hits();
	}
	for(var i in particles[cn])
		particles[cn][i].draw();
	gamept[cn].draw();
	click[cn]=false;
	document.querySelector("#scrdisp"+cn).innerHTML=s[cn];
	if(s[0]>hs)
	{
		hs=s[0];
		var str=JSON.stringify(hs);
    	localStorage.setItem("highscore",str);
	}
	document.querySelector('#hscrdisp').innerHTML=hs;
	if(s[cn]>=100)
	{
		document.querySelector("#score"+cn).style.fontSize="30px";
	}
	if(hs>=100)
	{
		document.querySelector("#highscore").style.fontSize="30px";
	}
	Ts[cn]++;
	Tm[cn]++;
	if(Ts[cn]>200&&slowclicked[cn])
	{
		rotatespd[cn]=rotatespdthen[cn];
		slowclicked[cn]=false;
	}
	if(Tm[cn]>200&&multiclicked[cn])
		multiclicked=false;
	if(slowclicked[cn])
	{
		pen[cn].font="30px Arial";
		pen[cn].fillStyle="white";
		pen[cn].textAlign="center";
		pen[cn].fillText("SLOW Power-up",175,H/2);
	}
	if(multiclicked[cn])
	{
		pen[cn].font="30px Arial";
		pen[cn].fillStyle="white";
		pen[cn].textAlign="center";
		pen[cn].fillText("Multicolor Power-up",175,H/2);
		gamept[cn].color=(gamept[cn].color+1)%4;
		gamept[cn].colortype=colors[gamept[cn].color];
	}
	if(cn==2)
	{
		pen[cn].lineWidth=1;
		pen[cn].font="20px Arial";
		pen[cn].strokeStyle="white";
		pen[cn].textAlign="center";
		pen[cn].strokeText("Use up-button or click",175,H-25);
	}
	if(cn==1)
	{
		pen[cn].lineWidth=1;
		pen[cn].font="20px Arial";
		pen[cn].strokeStyle="white";
		pen[cn].textAlign="center";
		pen[cn].strokeText("Use spacebar or click",175,H-25);
	}
	if(cn==0)
	{
		pen[cn].lineWidth=0.5;
		pen[cn].font="20px Arial";
		pen[cn].strokeStyle="white";
		pen[cn].textAlign="center";
		pen[cn].strokeText("Use spacebar or up or click",175,H-25);
	}
	pen[cn].lineWidth=15;
}
var run=[];
run[0]=true;
document.querySelector("#pause0").onclick=function()
{
	if(run[0]==true)
	{
		pl();
		clearInterval(loop[0]);
		run[0]=false;
	}
}
document.querySelector("#play0").onclick = function()
{
	if(run[0]==false)
	{
		pl();
		loop[0]=setInterval("looper("+0+")",60);
		run[0]=true;
	}
}
var rotatespdthen=[];
document.querySelector("#slow0").onclick=function()
{
	if(!multiclicked[0])
	{
		pl();
		document.querySelector("#slow0").style.display="none";
		Ts[0]=0;
		rotatespdthen[0]=rotatespd[0];
		rotatespd[0]=0.5;
		slowclicked[0]=true;
	}
}
document.querySelector("#multicolor0").onclick=function()
{
	if(!slowclicked[0])
	{
		pl();
		document.querySelector("#multicolor0").style.display="none";
		Tm[0]=0;
		multiclicked[0]=true;
	}
}
document.querySelector("#slow2").onclick=function()
{
	if(!multiclicked[2])
	{
		pl();
		document.querySelector("#slow2").style.display="none";
		Ts[2]=0;
		rotatespdthen[2]=rotatespd[2];
		rotatespd[2]=0.5;
		slowclicked[2]=true;
	}
}
document.querySelector("#multicolor2").onclick=function()
{
	if(!slowclicked[2])
	{
		pl();
		document.querySelector("#multicolor2").style.display="none";
		Tm[2]=0;
		multiclicked[2]=true;
	}
}
document.querySelector("#slow1").onclick=function()
{
	if(!multiclicked[1])
	{
		pl();
		document.querySelector("#slow1").style.display="none";
		Ts[1]=0;
		rotatespdthen[1]=rotatespd[1];
		rotatespd[1]=0.5;
		slowclicked[1]=true;
	}
}
document.querySelector("#multicolor1").onclick=function()
{
	if(!slowclicked[1])
	{
		pl();
		document.querySelector("#multicolor1").style.display="none";
		Tm[1]=0;
		multiclicked[1]=true;
	}
}
var kr=[];
kr[0]=0;
kr[1]=0;
kr[2]=0;
var over=[];
function gameoverer(cn)
{ 	
	if(cn==0)
	{
		document.querySelector(".canvas_box").style.display="none";
		document.querySelector(".restart_box").style.display="block";
		document.querySelector(".scorewriter").innerHTML="Your Score : " + s[cn];
	}
	else
	{
		pen[cn].beginPath();
		pen[cn].font="30px Arial";
		pen[cn].fillStyle="white";
		pen[cn].textAlign="center";
		pen[cn].fillText("Your Score : "+ s[cn],175,H/3);
		pen[cn].fillText("Wait for Other Player",175,2*H/3);
	}
	if(over[1]==true&&over[2]==true)
	{
		document.querySelector(".multiplayer1").style.display="none";
		document.querySelector(".multiplayer2").style.display="none";
		document.querySelector(".restart_box").style.display="block";
		if(s[1]>s[2])
		{
			ans="Player1 won"
		}
		else if(s[1]==s[2])
		{
			ans="Tie";
		}
		else
		{
			ans="Player2 won"
		}
		var str="Player1 : "+s[1]+"<br>"+"Player2 : "+s[2]+"<br>"+ans;
		document.querySelector(".scorewriter").innerHTML=str;
		over[1]=false;
		over[2]=false;
	}
}
var br=[];
function gameover(cn)
{
	over[cn]=true;
	if(cn==0)
	{
		document.querySelector(".back").pause();
		document.querySelector(".gameo").play();
	}
	clearInterval(loop[cn]);
	for(var i=0;i<40;i++)
		new bursting(cn);
	br[cn]=setInterval(function()
	{
		pen[cn].fillStyle="black";
		pen[cn].fillRect(0,0,350,H);
		for(var i=0;i<40;i++)
			burst[cn][i].draw();
		kr[cn]++;
		if(kr[cn]>50)
		{
			clearInterval(br[cn]);
			gameoverer(cn);
			kr[cn]=0;
		}
	},60);
}
var res=function restart()
{
	document.querySelector(".gameo").pause();
	document.querySelector(".gameo").currentTime=0;
	document.querySelector(".back").play();
	document.querySelector(".first").style.display="block";
	document.querySelector(".restart_box").style.display="none";
}
document.querySelector("#restart").onclick=res;
var loop=[];
loop[0]=[];
loop[1]=[];
loop[2]=[];
document.querySelector(".btn1").onclick = function()
{
	document.querySelector(".first").style.display="none";
	document.querySelector(".multiplayer1").style.display="block";
	document.querySelector(".multiplayer2").style.display="block";
	document.querySelector(".back").play();
	start(1);
	start(2);
	loop[1]=setInterval("looper("+1+")",60);
	loop[2]=setInterval("looper("+2+")",60);
}
function pl()
{
  document.querySelector(".aud").play();
}
var W;
document.querySelector(".btn").onclick = function()
{
	document.querySelector(".first").style.display="none";
	document.querySelector(".canvas_box").style.display="block";
	document.querySelector(".back").play();
	start(0);
	loop[0]=setInterval("looper("+0+")",60);
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
