import "./sass/main.scss";

"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    getJSON();
    showModal();
}

function showModal() {
    document.querySelector("#modal.step_1").style.display = "block";

    document.querySelector(".btn_step_1").addEventListener("click", step2Modal);
}

function step2Modal() {
    document.querySelector("#modal.step_1").style.display = "none";
    document.querySelector("#modal.step_2").style.display = "block";

    document.querySelector(".btn_step_2").addEventListener("click", step3Modal);
}

function step3Modal() {
    document.querySelector("#modal.step_2").style.display = "none";
    document.querySelector("#modal.step_3").style.display = "block";

    document.querySelector(".btn_step_3").addEventListener("click", step4Modal);
}

function step4Modal() {
    document.querySelector("#modal.step_3").style.display = "none";
    document.querySelector("#modal.step_4").style.display = "block";
}

function getJSON() {
    fetch("data.json", {
        method: "get",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "608672e428bf9b609975a6e2",
            "cache-control": "no-cache",
        },
    })
        .then(e => e.json())
        .then(data => showCheckboxes(data));
}

function showCheckboxes(data) {
    console.log(data.games);
    console.log(data.types);
    console.log(data.areas);

    let games = data.games;
    let types = data.types;
    let areas = data.areas;

    games.forEach(gameCheckBoxes);
    types.forEach(typeCheckBoxes);
    areas.forEach(areasCheckBoxes);
}

//STEP 1
function gameCheckBoxes(game) {
    const clone = document.querySelector("template#checkbox_games").content.cloneNode(true);

    clone.querySelector("label").textContent = game;
    clone.querySelector("label").setAttribute("for", game);

    clone.querySelector("input").setAttribute("id", game);
    clone.querySelector("input").setAttribute("value", game);

    // opsæt regel for specialtegn (cs:go)

    document.querySelector("#step_1_controls").appendChild(clone);
}

//STEP 2
function typeCheckBoxes(type) {
    const clone = document
        .querySelector("template#checkbox_types")
        .content.cloneNode(true);

    clone.querySelector("label").textContent = type;
    clone.querySelector("label").setAttribute("for", type);

    clone.querySelector("input").setAttribute("id", type);
    clone.querySelector("input").setAttribute("value", type);

    document.querySelector("#step_2_controls").appendChild(clone);
}

//STEP 3
function areasCheckBoxes(area) {
    const clone = document.querySelector("template#checkbox_areas").content.cloneNode(true);

    clone.querySelector("label").textContent = area;
    clone.querySelector("label").setAttribute("for", area);

    clone.querySelector("input").setAttribute("id", area);
    clone.querySelector("input").setAttribute("value", area);

    document.querySelector("#step_3_controls").appendChild(clone);
}
