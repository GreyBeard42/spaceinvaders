class Game {
    constructor() {
        this.score = 0
        this.hiscore = localStorage.getItem('hiscore')
        if(!this.hiscore) this.hiscore = 0
        this.lives = 3
        this.pause = true
        this.isStart = true
        this.restartTime = 0
        this.speed = 60

        this.player = new Player(size*0.75, 50)

        this.ecount = 0
        this.enemies = []
        this.tick = setInterval(()=>{}, 10)
        this.setTick()
        this.dirs = []
        this.setupEnemies()
        this.switch = false

        this.bullets = []
        this.walls = []

        this.ufo = new Ufo()
        
        this.setupWall(size*2, height-size*3.25)
        this.setupWall(size*5, height-size*3.25)
        this.setupWall(size*8, height-size*3.25)
        this.setupWall(size*11, height-size*3.25)

        this.setupBar()
    }
    draw() {
        background(0)
        push()
        textAlign(CENTER, TOP)
        fill('white')
        textSize(size*0.42)
        text(spaceify('SCORE <1> HI-SCORE SCORE <2>'), width/2, 2)
        text(spaceify(lengthify(this.score, 4)), size*2.22, size)
        text(spaceify(lengthify(this.hiscore, 4)), size*6.1, size)
        pop()
        push()
        textAlign(CORNERS)
        fill('white')
        textSize(size*0.45)
        text(this.lives, 0, height)
        translate(size/2, 0)
        text(spaceify("CREDIT"), width-size*5, height)
        rectMode(CORNERS)
        rect(width-size*1.5, height-size*0.4, width-size*1.4, height-size*0.1)
        rect(width-size*1.4, height-size*0.1, width-size*1.1, height-size*0)
        rect(width-size*1.4, height-size*0.5, width-size*1.1, height-size*0.4)
        rect(width-size*1.1, height-size*0.4, width-size*1, height-size*0.1)
        rect(width-size*1, height-size*0.1, width-size*0.7, height-size*0)
        rect(width-size*1, height-size*0.5, width-size*0.7, height-size*0.4)
        rect(width-size*0.6, height-size*0.4, width-size*0.7, height-size*0.1)
        for(i=0; i<this.lives-1; i++) {
            image(images[8], size*(i+1)*1.25, height-size/4, size, size/2)
        }
        pop()

        //use wasd or arrow keys and space
        push()
        if(this.isStart && this.pause) {
            fill('white')
            textAlign(CENTER, ENTER)
            textSize(size/3)
            text(spaceify("USE WASD/ARROW KEYS AND SPACE"), width/2, size*9)
            if(keyIsPressed) {
                this.isStart = false
                this.pause = false
            }
        }
        pop()

        //walls
        push()
        fill('#04ff16')
        this.walls.forEach((w) => {if(w.alive) w.draw()})
        pop()

        //enemies
        this.enemies.forEach((e) => {if(e.alive) e.draw()})
        if(this.switch) {
            this.switch = false
            this.enemies.forEach((e) => {
                e.y += size/2
                this.dirs[e.row] = -this.dirs[e.row]
            })
            this.speed -= 3
            this.setTick()
        }

        //player
        this.player.draw()

        this.ufo.draw()

        //bullets
        this.bullets.forEach((b) => {if(b.alive) b.draw()})

            
        fill('#04ff16')
        this.gbar.forEach((b) => {if(b.alive) b.draw()})
    }
    setupEnemies() {
        this.enemies = []
        let y, x
        for(y=0; y<5; y++) {
            for(x=0; x<11; x++) {
                let img
                if(y == 0) img = 0
                else if(y < 3) img = 2
                else img = 4
                this.enemies.push(new Enemy(x*size+size*2, y*size+size*4, img, y))
                this.ecount++
            }
            this.dirs.push(1)
        }
    }
    setupWall(x, y) {
        //should have been automated o.o
        this.walls.push(new Wall(-size*0.8+x, -size*0.5+y, -size*0.9+x, size/2+y))
        this.walls.push(new Wall(-size*0.7+x, -size*0.6+y, -size*0.8+x, size/2+y))
        this.walls.push(new Wall(-size*0.6+x, -size*0.7+y, -size*0.7+x, size/2+y))
        this.walls.push(new Wall(-size*0.5+x, -size*0.8+y, -size*0.6+x, size/2+y))
        this.walls.push(new Wall(-size*0.4+x, -size*0.8+y, -size*0.5+x, size*0.1+y))
        this.walls.push(new Wall(-size*0.3+x, -size*0.8+y, -size*0.4+x, size*0+y))
        this.walls.push(new Wall(-size*0.2+x, -size*0.8+y, -size*0.3+x, size*0+y))
        this.walls.push(new Wall(-size*0.1+x, -size*0.8+y, -size*0.2+x, size*0+y))
        this.walls.push(new Wall(size*0+x, -size*0.8+y, -size*0.1+x, size*0+y))
        this.walls.push(new Wall(size*0.1+x, -size*0.8+y, size*0+x, size*0+y))
        this.walls.push(new Wall(size*0.2+x, -size*0.8+y, size*0.1+x, size*0+y))
        this.walls.push(new Wall(size*0.3+x, -size*0.8+y, size*0.2+x, size*0+y))
        this.walls.push(new Wall(size*0.4+x, -size*0.8+y, size*0.3+x, size*0.1+y))
        this.walls.push(new Wall(size*0.5+x, -size*0.8+y, size*0.4+x, size/2+y))
        this.walls.push(new Wall(size*0.6+x, -size*0.7+y, size*0.5+x, size/2+y))
        this.walls.push(new Wall(size*0.7+x, -size*0.6+y, size*0.6+x, size/2+y))
        this.walls.push(new Wall(size*0.8+x, -size*0.5+y, size*0.7+x, size/2+y))
    }
    setupBar() {
        this.gbar = []
        for(let x=0; x<65; x++) {
            this.gbar.push(new Wall(x*size/5, height-size*0.5, (x+1)*size/5, height-size*0.6))
        }
    }
    setTick() {
        clearInterval(this.tick)
        this.tick = setInterval(() => {
            if(!document.hidden) game.enemies.forEach((e) => {if(e.alive && !game.pause) e.move()})
        }, this.speed*10)
    }
    updateScore(v) {
        this.score += v
        if(this.score > localStorage.getItem("hiscore")) {
            this.hiscore = this.score
            localStorage.setItem("hiscore", this.score)
        }
    }
    die() {
        this.lives--
        this.pause = true
        this.player.img = 9
        if(this.lives > 0) {
            setTimeout(() => {
                game.pause = false
                this.player = new Player(size*0.75, 50)
            }, 3000)
        } else {
            this.over()
        }
    }
    over() {
        this.restartTime = 300
        draw = () => {
            push()
            rectMode(CENTER)
            fill(0)
            rect(width/2-size*0.06, height/2+size*0.06, size*3.8, size*0.8)
            fill('white')
            textAlign(CENTER, CENTER)
            textSize(size/2)
            text("Game Over", width/2, height/2)
            game.restartTime--
            if(game.restartTime <= 0) setup()
            pop()
        }
    }
}