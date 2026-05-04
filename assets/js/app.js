let plr = document.getElementById("plr")

let spike = document.getElementById("spike")
let meto = document.getElementById("meto")

let scoret = document.getElementById("scoret")
let highscoret = document.getElementById("highscoret")

let cog = document.getElementById("cog")
let cogdiv = document.getElementById("cogdiv")

let muteb = document.getElementById("muteb")

let menudiv = document.getElementById("menu")
let menub = document.getElementById("menubutton")
let header = document.getElementById("headerdiv")
let prom = 43
let st = document.getElementById("st")

let rb = document.getElementById("playb")

let beep = document.getElementById("beep")
let death = document.getElementById("death")
let death2 = document.getElementById("death2")
let click = document.getElementById("click")
let reward = document.getElementById("reward")
let jump = document.getElementById("jump")

let m1 = document.getElementById("music1")
let m2 = document.getElementById("music2")
let m3 = document.getElementById("music3")

let highscore = Number(localStorage.getItem("highscoresave")) || 0
let score = 0

let hp = 3
let ranhp = false

let hp1 = document.getElementById("hp1")
let hp2 = document.getElementById("hp2")
let hp3 = document.getElementById("hp3")

let grav = 0
let ground = 300

let menu = true
let pause = true
let pe = false
let mutebool = Number(localStorage.getItem("muteboolsave")) || false

document.addEventListener("keydown", keydown)
cog.addEventListener("click", cogclick)
muteb.addEventListener("click", mutee)
menub.addEventListener("click", menue)
rb.addEventListener("click", restart)

function reset() {
    spike.style.left = "100%"
    hp = 3
    ranhp = false
    score = 0
    grav = 0
    pause = false
}

function saveall() {
    localStorage.setItem("highscoresave", highscore)
    localStorage.setItem("muteboolsave", mutebool)
}

function mute() {
    //sounds
    beep.volume = 0
    death.volume = 0
    death2.volume = 0
    click.volume = 0
    reward.volume = 0
    jump.volume = 0

    //music
    m1.volume = 0
    m2.volume = 0
    m3.volume = 0
}

function unmute() {
    //sounds
    beep.volume = 1
    death.volume = 1
    death2.volume = 1
    click.volume = 1
    reward.volume = 1
    jump.volume = 1

    //music
    m1.volume = 1
    m2.volume = 1
    m3.volume = 1
}

function touchplr1(plr, spike) {
    let rect1 = plr.getBoundingClientRect();
    let rect2 = spike.getBoundingClientRect();

    return !(
        rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom
    );
}

function touchplr2(plr, meto) {
    let rect1 = plr.getBoundingClientRect();
    let rect2 = meto.getBoundingClientRect();

    return !(
        rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom
    );
}

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        pause = true
        console.log("Game paused due to inactivity/not on the tab")
    }
})

function keydown(key) {
    if (pause === true) {return}

    let top = parseInt(plr.style.top) || ground;

    if (key.key === " ") {
        if (top === 300) {
            jump.currentTime = 0
            grav = 20
            jump.play()
        }
    }
}

function menue() {
    if (menu === true) {
        menu = false
        header.style.opacity = 0

        click.play()
        st.play()

        menub.style.left = `${prom - 5}%`
        setTimeout(function() {
            menub.style.left = `${prom + 5}%`

            setTimeout(function() {
                menub.style.left = `${prom - 3}%`

                setTimeout(function() {
                    menub.style.left = `${prom + 3}%`

                    setTimeout(function() {
                        menub.style.left = `${prom - 2}%`

                        setTimeout(function() {
                            menub.style.left = `${prom + 2}%`

                            setTimeout(function() {
                                menub.style.left = `${prom - 1}%`

                                setTimeout(function() {
                                    menub.style.left = `${prom + 1}%`

                                    setTimeout(function() {
                                        menub.style.left = `${prom}%`

                                        setTimeout(function() {
                                            menudiv.style.visibility = "hidden"

                                            pause = false
                                        }, 100)
                                    }, 50)
                                }, 50)
                            }, 50)
                        }, 50)
                    }, 50)
                }, 50)
            }, 50)
        }, 50)
    }
}

function cogclick() {
    click.currentTime = 0
    
    if (pause === true) {
        pause = false
        pe = false
    } else {
        pause = true
        pe = true
    }

    click.play()
}

function mutee() {
    click.currentTime = 0
    if (mutebool === true) {
        mutebool = false
    } else {
        mutebool = true
    }
    click.play()
}

function restart() {
    reset()
    rb.style.visibility = "hidden"

    pause = false
}

setInterval(function() {
    if (pause === true) {return}

    let top = parseInt(plr.style.top) || ground;

    let newTop = top - grav;

    plr.style.top = newTop + "px";

    if (newTop >= ground) {
        plr.style.top = ground + "px";
        grav = 0;
    } else {
        grav -= 1;
    }
}, 16)

setInterval(function() {
    if (pause === false) {
        score += 1
    }
}, 100)

setInterval(function() {
    if (pause === true) {return}

    plr.src = "assets/img/pixelspacecat2fix.png"

    setTimeout(function() {
        plr.src = "assets/img/pixelspacecat1fix.png"
    }, 200);
}, 400)

setInterval(function() {
    if (pe === true) {
        cogdiv.style.visibility = "visible"
    } else {
        cogdiv.style.visibility = "hidden"
    }
}, 16)

setInterval(function() {
    if (mutebool === true) {
        mute()
        muteb.src = "assets/img/pixelmutedbutton.png"
    } else {
        unmute()
        muteb.src = "assets/img/pixelmutebutton.png"
    }
}, 16)

setInterval(function() {
    highscoret.innerHTML = "HIGHSCORE " + highscore
    scoret.innerHTML = "SCORE " + score
}, 16)

setInterval(function() {
    if (touchplr1(plr, spike)) {
        hp -= 1
        beep.currentTime = 0
        beep.play()
        spike.src = "assets/img/pixelspike2.png" || "assets/img/pixelspike.png"
        spike.style.left = "100%"
    }

    if (touchplr2(plr, meto)) {
        hp -= 1
        meto.style.left = "100%"
        meto.style.visibility = "hidden"
    }

    if (hp === 3) {
        hp3.src = "assets/img/pixelheart.png"
        hp2.src = "assets/img/pixelheart.png"
        hp1.src = "assets/img/pixelheart.png"
    }

    if (hp === 2) {
        hp3.src = "assets/img/notpixelheart.png"
        hp2.src = "assets/img/pixelheart.png"
        hp1.src = "assets/img/pixelheart.png"
    }

    if (hp === 1) {
        hp3.src = "assets/img/notpixelheart.png"
        hp2.src = "assets/img/notpixelheart.png"
        hp1.src = "assets/img/pixelheart.png"
    }

    if (hp === 0) {
        hp3.src = "assets/img/notpixelheart.png"
        hp2.src = "assets/img/notpixelheart.png"
        hp1.src = "assets/img/notpixelheart.png"
    }

     if (hp < 0) {
        hp = 0
    }
}, 16)

spike.style.left = "100%"

setInterval(function() {
    if (pause === true) {return}

    let val = parseFloat(spike.style.left)
    val -= 1

    let valt = `${val}%`

    spike.style.left = valt

    if (val < -10) {
        spike.style.left = "100%"
    }
}, 10)

setInterval(function() {

    if (hp === 0) {
        if (ranhp === true) {return}

        if (score > highscore) {
            highscore = score

            saveall()
        }

        ranhp = true

        pause = true

        spike.left = "100%"
        death.play()

        setTimeout(function() {
            death2.play()

            rb.style.visibility = "visible"
        }, 1500)
    }

}, 16)