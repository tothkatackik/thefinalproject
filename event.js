const tablazat = document.getElementById("tablazat");
const cucc = document.getElementById("cucc");
let sor, oszlop;
let palya = [];
let vezetes = []
let hp = 3;
let jelenleg;

function general() {
    tablazat.innerHTML = "";
    palya = [];
    hp = 3;

    sor = parseInt(document.getElementById("sor").value);
    oszlop = parseInt(document.getElementById("oszlop").value);

    let megoldas = [];
    for (let i = 0; i < sor; i++) {
        let sorTomb = [];
        for (let j = 0; j < oszlop; j++) {
            sorTomb.push(random(0, 1) == 1);
            vezetes.push(false)
        }
        megoldas.push(sorTomb);
    }

    let sorSzamok = megoldas.map(sor => szamolasSor(sor));
    let oszlopSzamok = [];
    for (let j = 0; j < oszlop; j++) {
        let oszlop = [];
        for (let i = 0; i < sor; i++) {
            oszlop.push(megoldas[i][j]);
        }
        oszlopSzamok.push(szamolasSor(oszlop));
    }

    for (let i = -1; i < sor; i++) {
        let tr = document.createElement("tr");
        for (let j = -1; j < oszlop; j++) {
            let td = document.createElement("td");

            if (i == -1 && j == -1) {
                td.innerText = "";
            } else if (i == -1) {
                td.innerText = oszlopSzamok[j].join("\n");
            } else if (j == -1) {
                td.innerText = sorSzamok[i].join(" ");
            } else {
                td.dataset.x = j;
                td.dataset.y = i;
                td.onclick = function () {
                    let y = parseInt(this.dataset.y);
                    let x = parseInt(this.dataset.x);
                    dontes(this, megoldas[y][x]);
                    vezetes[i*sor+j] = true
                    vegeVanE(megoldas)
                };
            }

            tr.appendChild(td);
        }
        tablazat.appendChild(tr);
    }

    fill();
    cross();
    healthpoint();
}

function szamolasSor(tomb) {
    let eredmeny = [];
    let akt = 0;
    for (let i = 0; i < tomb.length; i++) {
        if (tomb[i]) {
            akt++;
        } else if (akt != 0) {
            eredmeny.push(akt);
            akt = 0;
        }
    }
    if (akt != 0) eredmeny.push(akt);
    if (eredmeny.length == 0) eredmeny.push(0);
    return eredmeny;
}

function dontes(cella, helyes) {
    if (jelenleg == "fill") {
        if (helyes) {
            cella.style.backgroundColor = "black";
        } else {
            hiba(cella, helyes);
        }
    } else if (jelenleg == "cross") {
        if (!helyes) {
            cella.innerText = "X";
        } else {
            hiba(cella, helyes);
        }
    }
}

function hiba(cella, helyes) {
    hp--;
    document.querySelector("p").innerText = `HP: ${hp}`;
    cella.style.backgroundColor = "red";
    cella.innerText = "X";
    if(helyes) {
        setTimeout(() => {
            cella.style.backgroundColor = "black";
        }, 2000);
    } else {
        setTimeout(() => {
            cella.style.backgroundColor = "white";
        }, 2000);
    }
    if(hp==0) {
        vege("Vesztettél!")
    }
}

function fill() {
    let fill = document.createElement("input");
    fill.type = "button";
    fill.id = "fill";
    fill.value = "Tölt";
    fill.onclick = () => jelenleg = "fill";
    cucc.appendChild(fill);
}

function cross() {
    let cross = document.createElement("input");
    cross.type = "button";
    cross.id = "cross";
    cross.value = "Kihúz";
    cross.onclick = () => jelenleg = "cross";
    cucc.appendChild(cross);
}

function healthpoint() {
    let p = document.createElement("p");
    p.innerText = `HP: ${hp}`;
    document.body.appendChild(p);
}

function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function vegeVanE(megoldas) {
    let j = 0
    let veg = true
    while (j < megoldas.length) {
        if(megoldas[j] != vezetes[j]) veg = false
        j++
    }
    if (veg) vege("Nyertél!")
}

function vege(s) {
    let body = document.querySelector("body")
    body.innerHTML = ""
    let h1 = document.createElement("h1")
    h1.innerText = s
    body.appendChild(h1)
}