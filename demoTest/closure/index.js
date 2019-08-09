
(function () {
	// 我是汪洋老师
	function prepare() {

		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const canvasDom = document.getElementById('content')
		
		 const context = canvasDom.getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg'),
		]);

		return {
			/**
			 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
			 */
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(canvasDom,context, heroImg, allSpriteImg);
				});
			}
		};
	}

	function clearCanvas()  
       {  
		const c = document.getElementById('content');
		const context = c.getContext('2d');
		context.clearRect(0,0,c.width,c.height);  
     } 
	// 我是袁鑫老师
	function drawHero(context, heroImg, allSpriteImg,initX,initY) {

		var draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
		}
        function Hero () {
			this.img = heroImg;
			this.context =  context;
			this.imgPos= {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			};

			this.rect={
				x: initX,
				y: initY,
				width: 32,
				height: 32
			};
		}
       function Monster(initPos) {
		 this.img = allSpriteImg;
		 this.context = context;
		 this.imgPos = {
			 x:858,
			 y:529,
			 width:32,
			 height:32
		 };
		 this.rect = {
			x:initPos.x,
			y:initPos.y,
			width:32,
			height:32
		 }
	   }

      Monster.prototype.draw = draw;
	  Hero.prototype.draw = draw;
         
	  function RedMonster(initPos){
		  Monster.call(this,initPos);
          this.imgPos =  {
			 x:858,
			 y:497,
			 width:32,
			 height:32
		  }
	  };

	  RedMonster.prototype = Object.create(Monster.prototype);
       
      var hero = new Hero();
	  var monster1 = new RedMonster({x:96,y:96});
	  var monster2 = new Monster({x:96,y:128});
	  var monster3 = new RedMonster({x:128,y:256});
	  var monster4 = new Monster({x:96,y:288});
	  var monster5 = new Monster({x:512,y:160});
		hero.draw();
		monster1.draw();
		monster2.draw();
		monster3.draw();
		monster4.draw();
		monster5.draw();
	}

	var resourceManager = prepare();
	let initX = 0, initY =0;

	let monsterArr= [{x:96,y:96},{x:96,y:128},{x:128,y:256},{x:96,y:288},{x:512,y:160}];
    //let monsterArr= [{x:96,y:96}];

	let monsterAreaArr = monsterArr.map(item =>{
		 item.minX = item.x -32;
		 item.maxX = item.x+32;
		 item.minY = item.y -32;
		 item.maxY = item.y+32;
        return item;
	})
	resourceManager.getResource(function (Dom,context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg,initX,initY);
        
		window.addEventListener('keydown',e=>{
			console.log(Dom.height,Dom.width);
			var e = window.event || e; //左上右下 37 38 39 40
			let keyCode = e.keyCode;
			console.log('initX',initX);
			let flag = monsterAreaArr.some(item =>{
				console.log(item,initX,initY);
				return item.minX < initX && item.maxX > initX && item.minY < initY && item.maxY > initY;
			 });
			 if(flag){
				return;
			 }
			switch(keyCode){
			  case 37:
				initX = initX < 32 ? initX : initX -32;
				break;
              case 38:
				initY = initY < 32 ? initY : initY -32;
				break;
			  case 39:
				initX = initX < (Dom.width - 64 )? (initX + 32 ): initX;
				break;
			  case 40:
				initY = initY < (Dom.height - 64) ? (initY + 32) : initY;
				break;
			}
             
            clearCanvas();
			drawHero(context, heroImg, allSpriteImg,initX,initY);
		});


	});
})();