let size, font, game
let images = []

function preload() {
    font = loadFont("https://cdn.jsdelivr.net/gh/GreyBeard42/spaceinvaders@main/space.ttf")
    //aliens
    for(i=0; i<6; i++) {
        images.push(loadImage("https://cdn.jsdelivr.net/gh/GreyBeard42/spaceinvaders@main/images/alien_"+i+".png"))
    }
    //sprites
    for(i=0; i<4; i++) {
        images.push(loadImage("https://cdn.jsdelivr.net/gh/GreyBeard42/spaceinvaders@main/images/sprite_"+i+".png"))
    }
    //bullets
    for(i=0; i<8; i++) {
        images.push(loadImage("https://cdn.jsdelivr.net/gh/GreyBeard42/spaceinvaders@main/images/pow_"+i+".png"))
    }

    images.push(loadImage("https://cdn.jsdelivr.net/gh/GreyBeard42/spaceinvaders@main/images/barrier.png"))
}

function setup() {
    size = round(min(windowWidth, windowHeight)/18)
    let cnvs = createCanvas(size*13, size*16)
    cnvs.parent("canvas")
    imageMode(CENTER)
    rectMode(CORNERS)
    textFont(font)
    noSmooth()
    noStroke()
    frameRate(60)

    game = new Game()
    draw = () => {game.draw()}
}

function lengthify(txt, len) {
    //don't use this; it's really messy and over-complicated
    txt = JSON.stringify(JSON.parse(txt)).split("").reverse()
    let output = ""
    for(i=0; i<len; i++) {
        if(txt[i]) output += txt[i]
        else output += "0"
    }
    return output.split("").reverse().join("")
}

function spaceify(txt) {
    let output = ""
    txt.split("").forEach((c) => {
        output += c
        output += ' '
    })
    return output
}
