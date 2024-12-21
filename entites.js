class Enemy {
    constructor(x, y, img, row) {
        this.x = round(x-size/2)
        this.y = round(y-size/2)
        this.imgs = []
        this.imgs.push(images[img])
        this.imgs.push(images[img+1])
        this.img = 0
        this.row = row
        this.dtime = 0
        this.alive = true
    }
    draw() {
        if(this.img == 2) image(images[7], this.x+size/8, this.y-size/8, size*1.2, size*0.6)
        else image(this.imgs[this.img], this.x, this.y, size*0.8, size*0.8)
        if(height-this.y < size*2) game.die()
        if(this.img == 2 && this.dtime == 0) {
            this.alive = false
            game.ecount--
            if(game.ecount == 0) {
                game.speed = 45
                game.setupEnemies()
                game.walls = []
                game.setupWall(size*2, height-size*3.25)
                game.setupWall(size*5, height-size*3.25)
                game.setupWall(size*8, height-size*3.25)
                game.setupWall(size*11, height-size*3.25)
            }
        }
        if(this.dtime > 0) this.dtime--
        this.hit()
        if(!game.pause) if(Math.random() < 0.002 && this.canShoot()) game.bullets.push(new Bullet(this.x, this.y+size*0.45, game.speed/15, round(random(2, 3))))
    }
    move() {
        if(this.img < 2) {
            this.x += size/10*game.dirs[this.row]
            if(this.img == 0) this.img++
            else this.img--
            if(width-this.x < size*0.6 || this.x < size*0.6) game.switch = true
            if(this.y > height-size*2) game.over()
        }
    }
    hit() {
        game.bullets.forEach((b) => {
            if(b.alive) {
                if(abs(b.x-this.x) < size/2) {
                    if(abs(b.y-this.y) < size/2) {
                        this.img = 2
                        this.dtime = 30
                        b.alive = false
                        if(this.row == 0) game.updateScore(30)
                        else if(this.row == 4) game.updateScore(10)
                        else game.updateScore(20)
                    }
                }    
            }
        })
    }
    canShoot() {
        let output = true
        game.enemies.forEach((e) => {
            if(e.alive && abs(e.x-this.x) < size*0.5 && e.y > this.y) output = false
        })
        return output
    }
}

class Player {
    constructor(x, y) {
        this.x = x
        this.y = height-size*1.5
        this.img = 8

        //shoot
        this.ps = false
        this.st = 0
    }
    draw() {
        image(images[this.img], this.x, this.y, size*1.5, size*0.75)
        if(!game.pause) this.move()

        game.bullets.forEach((b) => {
            if(b.alive) if(b.x-size/4 < this.x+size/2 && b.x+size/4 > this.x-size/2) {
                if(b.y-size/4 < this.y+size/4 && b.y+size/4 > this.y-size/4) {
                    b.alive = false
                    game.die()
                }
            }
        })
    }
    move() {
        if(keyIsDown(39) || keyIsDown(68)) {
            if(this.x < width-size*0.75) this.x += size/16
        } else if(keyIsDown(37) || keyIsDown(65)) {
            if(this.x > size*0.75) this.x -= size/16
        }

        if(keyIsDown(32)) {
            if(!this.ps && this.st <= 0) {
                game.bullets.push(new Bullet(this.x, this.y-size/2, -size/10))
                this.st = 20
            }
            this.ps = true
        } else {
            this.ps = false
            this.st--
        }
    }
}

class Bullet {
    constructor(x, y, v, t=1) {
        this.x = x
        this.y = y
        this.v = v
        this.type = t
        if(t == 1) this.img = 10
        else if(t == 2) this.img = 11
        else this.img = 15
        this.alive = true
    }
    draw() {
        image(images[this.img], this.x, this.y, size/4, size/2)
        this.y += this.v
        if(this.y < -size*2) this.alive = false
        if(frameCount%10 == 0) {
            if(this.type == 2) {
                this.img++
                if(this.img>14) this.img = 11
            } else if(this.type == 3) {
                this.img++
                if(this.img>17) this.img = 15
            }
        }

        game.bullets.forEach((b) => {
            if(b.alive && b.x-size/4 < this.x+size/4 && b.x+size/4 > this.x-size/4) {
                if(b.y-size/4 < this.y+size/4 && b.y+size/4 > this.y-size/4) {
                    if(b != this) {
                        this.alive = false
                        b.alive = false
                    }
                }
            }
        })
    }
}

class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = round(x1)
        this.y1 = y1
        this.x2 = round(x2)
        this.y2 = y2
        this.alive = true
    }
    draw() {
        rect(this.x1, this.y1, this.x2, this.y2)
        game.bullets.forEach((b) => {
            if(b.alive) if(b.x-size/4 < this.x2 && b.x+size/4 > this.x1) {
                if(b.y-size/4 < this.y2 && b.y+size/4 > this.y1) {
                    this.alive = false
                    b.alive = false
                }
            }
        })
    }
}

class Ufo {
    constructor() {
        this.x = -size*2
        this.y = size*2
        this.v = 0
    }
    draw() {
        image(images[6], this.x, this.y, size*1.25, size*0.75)
        this.x += this.v
        if(Math.random() < 0.0005 && this.v == 0) {
            if(this.x < 0) this.v = size/50
            else this.v = -size/50
        }

        game.bullets.forEach((b) => {
            if(b.alive) if(b.x-size/4 < this.x+size*0.6 && b.x+size/4 > this.x-size*0.6) {
                if(b.y-size/4 < this.y+size/3 && b.y+size/4 > this.y-size*0.6) {
                    b.alive = false
                    this.die()
                }
            }
        })

        if(this.x < -size*2 || this.x > width+size*2) this.die()
    }
    die() {
        if(random() > 0.5) {
            this.x = -size*2
        } else {
            this.x = width+size*2
        }
        this.v = 0
        game.updateScore(100)
    }
}