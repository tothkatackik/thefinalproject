const sor = document.getElementById("sor").value
const oszlop = document.getElementById("oszlop").value
const tablazat = document.getElementById("tablazat")
const cucc = document.getElementById("cucc")
let palya = []

function general() {
    palyaGeneral()
    for(let i = 0; i<sor; i++) {
        let tr = document.createElement("tr")
        for(let j = 0; j<oszlop; j++) {
            let td = document.createElement("td")
            
            tr.appendChild(td)
        }
        tablazat.appendChild(tr)
    }

}

function random(a, f) {
    return Math.floor(Math.random()*(f-a+1))+a;
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