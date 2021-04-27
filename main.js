import "./sass/main.scss";

"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    getJSON();
    showModal();
}

function showModal() {
    document.querySelector("#modal.step_1").style.display = "block";
    document.querySelector("#step_bar_1").style.width = "12.5%";
    //document.querySelector(".btn_step_1").addEventListener("click", step2Modal);

    document.querySelector(".btn_step_1").addEventListener("click", () => checkGameCheckboxes("game", step2Modal));
}

function checkGameCheckboxes(name, callback) {
    const selected = document.querySelectorAll(`[name=${name}]:checked`);
    console.log(selected);

    if (selected.length > 0) {
        callback();
    } else {
        alert("Choose at least one game")
    }
}


function step2Modal() {
    document.querySelector("#modal.step_1").style.display = "none";
    document.querySelector("#modal.step_2").style.display = "block";
    document.querySelector("#step_bar_2").style.width = "25%";

    document.querySelector(".btn_step_2").addEventListener("click", () => checkTypeCheckboxes("type", step3Modal));
}

function checkTypeCheckboxes(type, callback) {
    const selected = document.querySelectorAll(`[name=${type}]:checked`);
    console.log(selected);

    if (selected.length > 0) {
        callback();
    } else {
        alert("Choose at least one type of gameplay")
    }
}


function step3Modal() {
    document.querySelector("#modal.step_2").style.display = "none";
    document.querySelector("#modal.step_3").style.display = "block";
    document.querySelector("#step_bar_3").style.width = "37.5%";

    document.querySelector(".btn_step_3").addEventListener("click", () => checkAreaCheckboxes("area", step4Modal));
}

function checkAreaCheckboxes(area, callback) {
    const selected = document.querySelectorAll(`[name=${area}]:checked`);
    console.log(selected);

    if (selected.length > 0) {
        callback();
    } else {
        alert("Choose at least one area")
    }
}

function step4Modal() {
    document.querySelector("#modal.step_3").style.display = "none";
    document.querySelector("#modal.step_4").style.display = "block";
    document.querySelector("#step_bar_4").style.width = "50%";
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

    games.forEach(gameBoxes);
    types.forEach(typeCheckBoxes);
    areas.forEach(areasCheckBoxes);
}

//STEP 1
function gameBoxes(game) {
    let gameName = minifyText(game);
    const clone = document.querySelector("template#games_boxes").content.cloneNode(true);

    clone.querySelector("label").textContent = game;
    clone.querySelector("label").setAttribute("for", gameName);

    clone.querySelector("input").setAttribute("id", gameName);
    clone.querySelector("input").setAttribute("value", gameName);
    clone.querySelector("li").style.backgroundImage = "url('" + "img/" + gameName + ".jpg" + "')";

    // opsæt regel for specialtegn (cs:go)

    document.querySelector("#step_1_controls").appendChild(clone);
}

//STEP 2
function typeCheckBoxes(type) {
    let typeName = minifyText(type);

    const clone = document
        .querySelector("template#checkbox_types")
        .content.cloneNode(true);

    clone.querySelector("label").textContent = type;
    clone.querySelector("label").setAttribute("for", typeName);

    clone.querySelector("input").setAttribute("id", typeName);
    clone.querySelector("input").setAttribute("value", typeName);

    document.querySelector("#step_2_controls").appendChild(clone);
}

//STEP 3
function areasCheckBoxes(area) {
    let areaName = minifyText(area);

    const clone = document.querySelector("template#checkbox_areas").content.cloneNode(true);

    clone.querySelector("label").textContent = area;
    clone.querySelector("label").setAttribute("for", areaName);

    clone.querySelector("input").setAttribute("id", areaName);
    clone.querySelector("input").setAttribute("value", areaName);

    document.querySelector("#step_3_controls").appendChild(clone);
}

function minifyText(string) {
    string = string.toLowerCase();
    string = string.replaceAll(/[^a-zA-Z ]/g, "");
    string = string.replaceAll(" ", "");
    return string;
}