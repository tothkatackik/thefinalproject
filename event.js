const tablazat = document.getElementById("tablazat")
const cucc = document.getElementById("cucc")
let palya = []
let hp = 3
let jelenleg

function general() {
    const sor = parseInt(document.getElementById("sor").value)
    const oszlop = parseInt(document.getElementById("oszlop").value)
    palyaGeneral()
    for(let i = 0; i<sor+1; i++) {
        let tr = document.createElement("tr")
        for(let j = 0; j<oszlop+1; j++) {
            let td = document.createElement("td")
            td.onclick = function() {
                dontes(this, sor*i+j)
            }
            tr.appendChild(td)
        }
        tablazat.appendChild(tr)
    }
    fill()
    cross()
    healthpoint()
    console.log(palya[0])
}

function dontes(cella, i) {
    if (jelenleg == "fill") {
        azegyik(cella, i)
    } else if (jelenleg == "cross") {
        amasik(cella, i)
    }
}

function azegyik(cella, i) {
    if (palya[i]) {
        cella.style.backgroundColor = "black"
    } else {
        hiba(cella)
    }
}

function amasik(cella, i) {
    if (!palya[i]) cella.innerText = "X"
    else hiba(cella, i)
}

function hiba(cella, i) {
    if (palya[i]) {
        fadeToBlack(cella)
    }
}

function fadeToBlack(cella) {
    for(let i=255; i>0; i--) {
        cella.style.backgroundColor = `rgb(${i}, 0, 0)`
        sleep(20)
    }
    cella.innerText = "X"
    hp--
}

function fill() {
    let fill = document.createElement("input")
    fill.type = "button"
    fill.id = "fill"
    fill.value = "Tölt"
    fill.onclick = function() {
        jelenleg = "fill"
    }
    cucc.appendChild(fill)
}

function cross() {
    let cross = document.createElement("input")
    cross.type = "button"
    cross.id = "cross"
    cross.value = "Kihúz"
    cross.onclick = function() {
        jelenleg = "cross"
    }
    cucc.appendChild(cross)
}

function healthpoint() {
    let p = document.createElement("p")
    p.innerText = `HP: ${hp}`
    document.querySelector("body").appendChild(p)
}

function palyaGeneral() {
    ideiglenes = []
    for(let i = 0; i<sor*oszlop; i++) {
        let r = random(0,1)
        if(r==0){
            ideiglenes.push(false)
        } else {
            ideiglenes.push(true)
        }
    }
    oszlopmennyi = []
    sormennyi = []
    szamlalasOszlop(oszlopmennyi)
    szamlalasSor(sormennyi, ideiglenes)
}

function szamlalasOszlop(b) {
    let akt = 0
    let oszlopok = []
    for(let i=0; i<sor;i++) {
        let aktoszlop = ""
        for (let j=0; j<oszlop;j++) {
            if (b[j*oszlop+i]) {
                akt++
            } else if (akt!=0) {
                aktoszlop += `${akt} `
            }
        }
        oszlopok.push(aktoszlop)
    }
    palya.push("")
    for(let i=0;i<sor;i++) {
        palya.push(oszlopok[i])
    }
}

function szamlalasSor(b, id) {
    let akt = 0
    let sorok = []
    for(let i=0; i<sor;i++) {
        let aktsor = ""
        for (let j=0; j<oszlop;j++) {
            if (b[i*sor+j]) {
                akt++
            } else if (akt!=0) {
                aktsor += `${akt} `
            }
        }
        sorok.push(aktsor)
    }
    for(let i=0; i<sor;i++) {
        palya.push(sorok[i])
        for(let j=0;j<oszlop+1;j++) {
            palya.push(id[i])
        }
    }
}

function random(a, f) {
    return Math.floor(Math.random()*(f-a+1))+a;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}