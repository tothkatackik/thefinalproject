const sor = document.getElementById("sor").value
const oszlop = document.getElementById("oszlop").value
const tablazat = document.getElementById("tablazat")
const cucc = document.getElementById("cucc")
let palya = []
let hp = 3
let jelenleg = "fill" // és ha rányom ezt megváltoztatja és ezt vizsgáljuk de igazából boollal is lehetne

function general() {
    palyaGeneral()
    for(let i = 0; i<sor; i++) {
        let tr = document.createElement("tr")
        for(let j = 0; j<oszlop; j++) {
            let td = document.createElement("td")
            td.onclick = function() {
                megnemtudomezthogynevezzemel()
            }
            tr.appendChild(td)
        }
        tablazat.appendChild(tr)
    }
    fill()
    cross()
    
}

function megnemtudomezthogynevezzemel() {
    if (jelenleg == "fill") {
        azegyik()
    } else {
        amasik()
    }
}

function azegyik() {
    
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

function hp() {
    let p = document.createElement("p")
    p.innerText = `HP: ${hp}`
    document.querySelector("body").appendChild(p)
}

function palyaGeneral() {
    for(let i = 0; i<sor*oszlop; i++) {
        let r = random(0,1)
        if(r==0){
            palya.push(false)
        } else {
            palya.push(true)
        }
    }
}

function random(a, f) {
    return Math.floor(Math.random()*(f-a+1))+a;
}
