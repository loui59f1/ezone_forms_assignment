import "./sass/main.scss";
import { post } from "./post_data.js";
import { headers } from "./headers.js";

"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    getJSON();
    showModal();
}

function getJSON() {
    fetch("data.json", {
        method: "get",
        headers: headers,
    })
        .then(e => e.json())
        .then(data => showCheckboxes(data));
}

function showModal() {
    document.querySelector("#modal.step_4").style.display = "none";
    document.querySelector("#modal.step_1").style.display = "block";
    document.querySelector("#step_bar_1").classList.add("load_step_1");
    document.querySelector(".step_1 .pills").classList.add("fade_pills");
    document.querySelector(".step_1 .pills_2").classList.add("fade_pills");

    document.querySelector(".btn_step_1").addEventListener("click", () => checkGameCheckboxes("game", step2Modal));
}

function checkGameCheckboxes(name, callback) {
    const selected = document.querySelectorAll(`[name=${name}]:checked`);
    console.log(selected);

    if (selected.length > 0) {
        callback();
    } else {
        document.querySelector(".checkbox_error").style.display = "block";
    }
}

function step2Modal() {
    document.querySelector("#modal.step_1").style.display = "none";
    document.querySelector("#modal.step_2").style.display = "block";
    document.querySelector("#step_bar_2").classList.add("load_step_2");
    document.querySelector(".step_2 .column_content").classList.add("slidein");
    document.querySelector(".step_2 .pills").classList.add("fade_pills_remove");
    document.querySelector(".step_2 .pills_2").classList.add("fade_pills_remove");

    document.querySelector(".btn_step_2").addEventListener("click", () => checkAreaCheckboxes("area", step3Modal));
}

function checkAreaCheckboxes(area, callback) {
    const selected = document.querySelectorAll(`[name=${area}]:checked`);
    console.log(selected);

    if (selected.length > 0) {
        callback();
    } else {
        document.querySelector(".checkbox_error2").style.display = "block";
    }
}

function step3Modal() {
    document.querySelector("#modal.step_2").style.display = "none";
    document.querySelector("#modal.step_3").style.display = "block";
    document.querySelector("#step_bar_3").classList.add("load_step_3");
    document.querySelector(".step_3 .column_content").classList.add("slidein");
    document.querySelector(".step_3 .pills").classList.add("fade_pills_2");
    document.querySelector(".step_3 .pills_2").classList.add("fade_pills_2");

    document.querySelector(".submit_btn").addEventListener("click", checkNameValid);
}

function showCheckboxes(data) {
    let games = data.games;
    let areas = data.areas;

    games.forEach(gamesCheckBoxes);
    areas.forEach(areasCheckBoxes);
}

function gamesCheckBoxes(game) {
    let gameName = minifyText(game);
    const clone = document.querySelector("template#checkbox_games").content.cloneNode(true);

    clone.querySelector("label").textContent = game;
    clone.querySelector("label").setAttribute("for", gameName);

    clone.querySelector("input").setAttribute("id", gameName);
    clone.querySelector("input").setAttribute("value", gameName);
    clone.querySelector("li").style.backgroundImage = "url('" + "img/" + gameName + ".jpg" + "')";

    // opsæt regel for specialtegn (cs:go)

    document.querySelector("#step_1_controls").appendChild(clone);
}

function areasCheckBoxes(area) {
    let areaName = minifyText(area);

    const clone = document.querySelector("template#checkbox_areas").content.cloneNode(true);

    clone.querySelector("label").textContent = area;
    clone.querySelector("label").setAttribute("for", areaName);

    clone.querySelector("input").setAttribute("id", areaName);
    clone.querySelector("input").setAttribute("value", areaName);

    document.querySelector("#step_2_controls").appendChild(clone);
}

function minifyText(string) {
    string = string.replaceAll(/[^a-zA-Z ]/g, "");
    string = string.replaceAll(" ", "");
    string = string.toLowerCase();
    return string;
}

function checkNameValid() {
    if (document.querySelector("#name").checkValidity()) {
        checkGamertagValid();
    } else {
        document.querySelector("#name").classList.add("invalid");
        document.querySelector(".name_error").style.visibility = "visible";
        setTimeout(function () { document.querySelector(".name_error").style.visibility = "hidden"; }, 3000);
    }
}

function checkGamertagValid() {
    if (document.querySelector("#gamertag").checkValidity()) {
        checkEmailValid();
    } else {
        document.querySelector("#gamertag").classList.add("invalid");
        document.querySelector(".gamertag_error").style.visibility = "visible";
        setTimeout(function () { document.querySelector(".gamertag_error").style.visibility = "hidden"; }, 3000);
    }
}

function checkEmailValid() {
    if (document.querySelector("#email").checkValidity()) {
        checkPasswordValid();
    } else {
        document.querySelector("#email").classList.add("invalid");
        document.querySelector(".email_error").style.visibility = "visible";
        setTimeout(function () { document.querySelector(".email_error").style.visibility = "hidden"; }, 3000);
    }
}

function checkPasswordValid() {
    if (document.querySelector("#password").checkValidity()) {
        post();
    } else {
        document.querySelector("#password").classList.add("invalid");
        document.querySelector(".password_error").style.visibility = "visible";
        setTimeout(function () { document.querySelector(".password_error").style.visibility = "hidden"; }, 3000);
    }
}
