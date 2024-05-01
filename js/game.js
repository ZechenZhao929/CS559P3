let can = document.getElementById("canvas");
let msg = document.getElementById("msg");
let cxt = can.getContext("2d");
let w = 35,h = 35;
let curMap;//current map
let curLevel;//current level
let curMan;//
let iCurlevel = 0;
let moveTimes = 0;
let diceState = 1;
let goal = 0;
let game_time = 0;
let in_game = 0;
let dictMoveMap = [
	[1,2,6,5],
	[1,4,6,3]
	]

	document.getElementById('menuButton').addEventListener('click', function() {
      console.log('Menu button clicked!');
    });
	let tt;
	function gamepause(){
		if(in_game==1){
		in_game = 0;
		clearInterval(tt);
		}else{
			in_game=1;
			tt = setInterval(gameTime,1000);
		}
	}

	function drawMainMenu() {
		document.getElementById('menuButton').setAttribute("style","visibility:hidden")
		cxt.clearRect(0, 0, canvas.width, canvas.height);
		clearInterval(tt);
		in_game = 0;
		cxt.fillStyle = 'yellow';
    	cxt.fillRect(120, 20, 230, 40);
		cxt.fillStyle = 'cyan';
    	cxt.fillRect(120, 70, 230, 40);
		cxt.fillStyle = 'pink';
    	cxt.fillRect(120, 120, 230, 80);
		cxt.fillStyle = 'black';
		cxt.font = '30px Arial';
		cxt.fillText('Main Menu', 150, 50);
		cxt.font = '20px Arial';
		cxt.fillText('Start Game', 150, 100);
		cxt.fillText('Last '+
		 'move times: '+moveTimes, 150,150);
		 cxt.fillText('Consume '+game_time+" seconds",
		  150,170);
		  cxt.fillText('Highest level: '+iCurlevel,
		  150,190);
		 moveTimes = 0;
		 game_time=0;
		//  showMoveInfo();
		
    };

	function gameTime(){
		game_time+=1;
		showMoveInfo();
		
	}

	

	can.addEventListener('click', function(event) {
      const x = event.offsetX;
      const y = event.offsetY;

      if (x >= 150 && x <= 270 && y >= 70 && y <= 100) {
        // Start game button clicked
		tt = setInterval(gameTime,1000);
		document.getElementById('menuButton').setAttribute("style","visibility:visible")

		in_game = 1;
        initLevel();
		showMoveInfo();
      }
    });

	function rotateDice(action){
		if(action=="up"){
			dictMoveMap[1] = [dictMoveMap[1][1],dictMoveMap[1][2],dictMoveMap[1][3],dictMoveMap[1][0]];
			dictMoveMap[0] = [dictMoveMap[1][0],dictMoveMap[0][1],dictMoveMap[1][2],dictMoveMap[0][3]]
		}else if(action=="down"){
			dictMoveMap[1] = [dictMoveMap[1][3],dictMoveMap[1][0],dictMoveMap[1][1],dictMoveMap[1][2]];
			dictMoveMap[0] = [dictMoveMap[1][0],dictMoveMap[0][1],dictMoveMap[1][2],dictMoveMap[0][3]]
		}
		else if(action=="right"){
			dictMoveMap[0] = [dictMoveMap[0][1],dictMoveMap[0][2],dictMoveMap[0][3],dictMoveMap[0][0]];
			dictMoveMap[1] = [dictMoveMap[0][0],dictMoveMap[1][1],dictMoveMap[0][2],dictMoveMap[1][3]]
		}else if(action=="left"){
			dictMoveMap[0] = [dictMoveMap[0][3],dictMoveMap[0][0],dictMoveMap[0][1],dictMoveMap[0][2]];
			dictMoveMap[1] = [dictMoveMap[0][0],dictMoveMap[1][1],dictMoveMap[0][2],dictMoveMap[1][3]]
		}
		

	}
		//load all images
		let oImgs = {
			"block" : "images/block.gif",
			"wall" : "images/wall.png",
			"box" : "images/box.png",
			"ball" : "images/ball.png",
			"up" : "images/up.png",
			"down" : "images/down.png",
			"left" : "images/left.png",
			"right" : "images/right.png",
			"dice1" : "images/1.png",
			"dice2" : "images/2.png",
			"dice3" : "images/3.png",
			"dice4" : "images/4.png",
			"dice5" : "images/5.png",
			"dice6" : "images/6.png",
			"w1" : "images/w1.png",
			"w2" : "images/w2.png",
			"w3" : "images/w3.png",
			"w4" : "images/w4.png",
			"w5" : "images/w5.png",
			"w6" : "images/w6.png",
		}
		function imgPreload(srcs,callback){
			let count = 0,imgNum = 0,images = {};

			for(src in srcs){
				imgNum++;
			}
			for(src in srcs ){
				images[src] = new Image();
				images[src].onload = function(){
					if (++count >= imgNum)
					{
						callback(images);
					}
				}
				images[src].src = srcs[src];
			}
		}
		let block,wall,box,ball,up,down,left,right,d1,d2,d3,d4,d5,d6,w1,w2,w3,w4,w5,w6;
		imgPreload(oImgs,function(images){
			block = images.block;
			wall = images.wall;
			box = images.box;
			ball = images.ball;
			up = images.up;
			down = images.down;
			left = images.left;
			right = images.right;
			d1 = images.dice1;
			d2 = images.dice2;
			d3 = images.dice3;
			d4 = images.dice4;
			d5 = images.dice5;
			d6 = images.dice6;
			w1 = images.w1;
			w2 = images.w2;
			w3 = images.w3;
			w4 = images.w4;
			w5 = images.w5;
			w6 = images.w6;

			init();
		});
		//init game
		function init(){
			//InitMap();
			//DrawMap(levels[0]);
			drawMainMenu();
			// initLevel();
			// showMoveInfo();
		}
		//draw floor
		function InitMap(){
			for (let i=0;i<9 ;i++ )
			{
				for (let j=0;j<12 ;j++ )
				{
					// cxt.drawImage(block,w*j,h*i,w,h);
				}
			}
		}
		//character's position
		function Point(x,y){
			this.x = x;
			this.y = y;
		}
		let perPosition = new Point(5,5);
		//draw level
		function DrawMap(level){
			for (let i=0;i<level.length ;i++ )
			{
				for (let j=0;j<level[i].length ;j++ )
				{
					let pic = block;
					switch (level[i][j])
					{
					case 1:
						pic = wall;
						break;
					case 2:
					switch(goal){
						case 1:pic=w1;break;
						case 2:pic=w2;break;
						case 3:pic=w3;break;
						case 4:pic=w4;break;
						case 5:pic=w5;break;
						case 6:pic=w6;break;
					}
						break;
					case 3:
						switch(dictMoveMap[0][0]){
							case 1:pic=d1;break;
							case 2:pic=d2;break;
							case 3:pic=d3;break;
							case 4:pic=d4;break;
							case 5:pic=d5;break;
							case 6:pic=d6;break;
						}
						break;
					case 4:
						pic = curMan;
						perPosition.x = i;
						perPosition.y = j;
						break;
					case 5:
						pic = box;
						break;
					}
					cxt.drawImage(pic,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height)
				}
			}
		}
		function initLevel(){
			curMap = copyArray(levels[iCurlevel]);
			curLevel = levels[iCurlevel];
			curMan = down;
			goal = goals[iCurlevel];
			InitMap();
			DrawMap(curMap);
		}
		function NextLevel(i){
			dictMoveMap = [
			[1,2,6,5],
			[1,4,6,3]
		]
			iCurlevel = iCurlevel + i;
			if (iCurlevel<0)
			{
				iCurlevel = 0;
				return;
			}
			let len = levels.length;
			if (iCurlevel > len-1)
			{
				iCurlevel = len-1;
			}
			initLevel();
			moveTimes = 0;
			showMoveInfo();
		}
		function go(dir){
			let p1,p2;
			switch (dir)
			{
			case "up":
				curMan = up;
				p1 = new Point(perPosition.x-1,perPosition.y);
				p2 = new Point(perPosition.x-2,perPosition.y);
				break;
			case "down":
				curMan = down;
				p1 = new Point(perPosition.x+1,perPosition.y);
				p2 = new Point(perPosition.x+2,perPosition.y);
				break;
			case "left":
				curMan = left;
				p1 = new Point(perPosition.x,perPosition.y-1);
				p2 = new Point(perPosition.x,perPosition.y-2);
				break;
			case "right":
				curMan = right;
				p1 = new Point(perPosition.x,perPosition.y+1);
				p2 = new Point(perPosition.x,perPosition.y+2);
				break;
			}
			if (Trygo(p1,p2,dir))
			{
				moveTimes ++;
				showMoveInfo();
			}
			InitMap();
			DrawMap(curMap);
			if (checkFinish())
			{
        setTimeout(()=>{
          alert("NEXT LEVEL!");
				  NextLevel(1);
        },0)
				
			}
		}
		function checkFinish(){
			for (let i=0;i<curMap.length ;i++ )
			{
				for (let j=0;j<curMap[i].length ;j++ )
				{
					if (curLevel[i][j] == 2 && curMap[i][j] != 3 || curLevel[i][j] == 5 && curMap[i][j] != 3)
					{
						return false;
					}
				}
			}
			if(dictMoveMap[0][0]==goal){
				return true;
			}
			return false;
		}
		function Trygo(p1,p2,dir){
			if(p1.x<0) return false;
			if(p1.y<0) return false;
			if(p1.x>curMap.length) return false;
			if(p1.y>curMap[0].length) return false;
			if(curMap[p1.x][p1.y]==1) return false;
			if (curMap[p1.x][p1.y]==3 || curMap[p1.x][p1.y]==5)
			{
				if (curMap[p2.x][p2.y]==1 || curMap[p2.x][p2.y]==3)
				{
					return false;
				}
				rotateDice(dir);
				curMap[p2.x][p2.y] = 3;
			}
			
			curMap[p1.x][p1.y] = 4;
			let v = curLevel[perPosition.x][perPosition.y];
			if (v!=2)
			{
				if (v==5)
				{
					v=2;
				}else{
					v=0;
				}
			}
			curMap[perPosition.x][perPosition.y] = v;
			perPosition = p1;
			return true;
		}
		function doKeyDown(event){
			if(in_game==0){
				return
			}
			switch (event.keyCode)
			{
			case 37:
      case 65:
				go("left");
				break;
			case 38:
      case 87:
				go("up");
				break;
			case 39:
      case 68:
				go("right");
				break;
			case 40:
      case 83:
				go("down");
				break;
			}

		}
		function showMoveInfo(){
			msg.innerHTML = "Level " + (iCurlevel+1) +"/5,  move times: "+ moveTimes+", game time: "+game_time + " seconds";
		}
		let showhelp = false;


		function copyArray(arr){
			let b=[];
			for (let i=0;i<arr.length ;i++ )
			{
				b[i] = arr[i].concat();
			}
			return b;
		}