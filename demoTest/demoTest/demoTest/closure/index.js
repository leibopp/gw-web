;(function () {
  function prepare () {
    const imgTask = (img, src) => {
      return new Promise(function (resolve, reject) {
        img.onload = resolve
        img.onerror = reject
        img.src = src
      })
    }

    const canvasDom = document.getElementById('content')

    const context = canvasDom.getContext('2d')
    const heroImg = new Image()
    const allSpriteImg = new Image()

    const allresourceTask = Promise.all([
      imgTask(heroImg, './hero.png'),
      imgTask(allSpriteImg, './all.jpg')
    ])

    return {
      /**
       * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
       */
      getResource(callback) {
        allresourceTask.then(function () {
          callback && callback(canvasDom, context, heroImg, allSpriteImg)
        })
      }
    }
  }

  function clearCanvas () {
    const c = document.getElementById('content')
    const context = c.getContext('2d')
    context.clearRect(0, 0, c.width, c.height)
  }
  function drawHero (context, heroImg, allSpriteImg, initX, initY) {
    function Hero () {
      this._entityWidth = 40
      this.img = heroImg
      this.context = context
      this.imgPos = {
        x: 0,
        y: 0,
        width: 32,
        height: 32
      }

      this.rect = {
        x: initX,
        y: initY,
        width: 32,
        height: 32
      },
      this.blood = 50000
      this.attack = 400
      this.defense = 400
    }
    function Monster (initPos) {
			this._entityWidth = 40
      this.img = allSpriteImg
      this.context = context
      this.imgPos = {
        x: 858,
        y: 529,
        width: 32,
        height: 32
      }
      this.rect = {
        x: initPos.x,
        y: initPos.y,
        width: 32,
        height: 32
      },
      this.blood = 1000
      this.attack = 300
      this.defense = 300
    }
    function draw() {
			this.drawBlood();
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
			)
		}
		function drawBlood () {
			this.context.font = '16px "微软雅黑"'
			this.context.fillStyle = 'red'
			this.context.fillText('血量：' + this.blood,
			this.rect.x + this.rect.height - this._entityWidth,
			this.rect.y + this.rect.width + this._entityWidth / 2,
			this._entityWidth * 2, 5)
		}
		Monster.prototype={
			draw,
			drawBlood
		}
    Hero.prototype = {
			draw,
			drawBlood
		}
    function RedMonster (initPos) {
      Monster.call(this, initPos)
      this.imgPos = {
        x: 858,
        y: 497,
        width: 32,
        height: 32
      }
    }

    RedMonster.prototype = Object.create(Monster.prototype)

    var hero = new Hero();
    var monster1 = new RedMonster({x: 96,y: 96})
    var monster2 = new Monster({x: 96,y: 128})
    var monster3 = new RedMonster({x: 128,y: 256})
    var monster4 = new Monster({x: 96,y: 288})
    var monster5 = new Monster({x: 512,y: 160})
    hero.draw()
    monster1.draw()
    monster2.draw()
    monster3.draw()
    monster4.draw()
    monster5.draw()
  }

  let initX = 0, initY = 0;
  let monsterArr = [{x: 96,y: 96}, {x: 96,y: 128}, {x: 128,y: 256}, {x: 96,y: 288}, {x: 512,y: 160}]

  let monsterAreaArr = monsterArr.map(item => {
    item.minX = item.x - 32
    item.maxX = item.x + 32
    item.minY = item.y - 32
    item.maxY = item.y + 32
    return item
  })
  function impactTest (initX, initY) { // 检测是否可以向前走
    let flag = monsterAreaArr.some(item => {
      return item.minX < initX && item.maxX > initX && item.minY < initY && item.maxY > initY
    })
    return flag
  }
  var resourceManager = prepare()
  resourceManager.getResource(function (Dom, context, heroImg, allSpriteImg) {
    drawHero(context, heroImg, allSpriteImg, initX, initY)

    window.addEventListener('keydown', e => {
      console.log(Dom.height, Dom.width)
      var e = window.event || e; // 左上右下 37 38 39 40
      let keyCode = e.keyCode
      console.log('initX', initX)

      switch (keyCode) {
        case 37:
          if (impactTest(initX - 32, initY)) return
          initX = initX < 32 ? initX : initX - 32
          break
        case 38:
          if (impactTest(initX, initY - 32)) return
          initY = initY < 32 ? initY : initY - 32
          break
        case 39:
          if (impactTest(initX + 32, initY)) return
          initX = initX < (Dom.width - 64) ? (initX + 32) : initX
          break
        case 40:
          if (impactTest(initX, initY + 32)) return
          initY = initY < (Dom.height - 64) ? (initY + 32) : initY
          break
      }

      clearCanvas()
      drawHero(context, heroImg, allSpriteImg, initX, initY)
    })
  })
})()
