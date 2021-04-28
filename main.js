import "./sass/main.scss";

"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    getJSON();
    showModal();
}

function showModal() {
    document.querySelector("#modal.step_1").style.display = "block";
    document.querySelector("#step_bar_1").classList.add("load_step_1");

    document.querySelector(".btn_step_1").addEventListener("click", () => checkGameCheckboxes("game", step3Modal));
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


// function step2Modal() {
//     document.querySelector("#modal.step_1").style.display = "none";
//     document.querySelector("#modal.step_2").style.display = "block";
//     document.querySelector("#step_bar_2").classList.add("load_step_2");
//     document.querySelector(".step_2 .column_content").classList.add("slidein");
//     document.querySelector(".step_2 .pills").classList.add("fade_pills");

//     // Indholdet af step 2 slide ind fra højre  

//     document.querySelector(".btn_step_2").addEventListener("click", () => checkTypeCheckboxes("type", step3Modal));
// }

// function checkTypeCheckboxes(type, callback) {
//     const selected = document.querySelectorAll(`[name=${type}]:checked`);
//     console.log(selected);

//     if (selected.length > 0) {
//         callback();
//     } else {
//         alert("Choose at least one type of gameplay")
//     }
// }


function step3Modal() {
    document.querySelector("#modal.step_1").style.display = "none";
    document.querySelector("#modal.step_3").style.display = "block";
    document.querySelector("#step_bar_3").classList.add("load_step_2");
    document.querySelector(".step_3 .column_content").classList.add("slidein");
    document.querySelector(".step_3 .pills").classList.add("fade_pills");

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
    document.querySelector("#step_bar_4").classList.add("load_step_3");
    document.querySelector(".step_4 .column_content").classList.add("slidein");
    document.querySelector(".step_4 .pills").classList.add("fade_pills");

    document.querySelector(".submit_btn").addEventListener("click", checkNameValid);
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
// function typeCheckBoxes(type) {
//     let typeName = minifyText(type);

//     const clone = document
//         .querySelector("template#checkbox_types")
//         .content.cloneNode(true);

//     clone.querySelector("label").textContent = type;
//     clone.querySelector("label").setAttribute("for", typeName);

//     clone.querySelector("input").setAttribute("id", typeName);
//     clone.querySelector("input").setAttribute("value", typeName);

//     document.querySelector("#step_2_controls").appendChild(clone);
// }

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

function checkNameValid() {
    // check først name - hvis ikke valid, vis meddelse
    if (document.querySelector("#name").checkValidity()) {
        console.log("Yes name is valid");
        document.querySelector(".name_error").style.visibility = "hidden";
        checkGamertagValid();
    } else {
        console.log("no name is not valid");
        document.querySelector(".name_error").style.visibility = "visible";
    }
}

function checkGamertagValid() {
    // check først name - hvis ikke valid, vis meddelse
    if (document.querySelector("#gamertag").checkValidity()) {
        console.log("Yes gamertag is valid");
        document.querySelector(".gamertag_error").style.visibility = "hidden";
        checkEmailValid();
    } else {
        console.log("no gamertag is not valid");
        document.querySelector(".gamertag_error").style.visibility = "visible";
    }
}

function checkEmailValid() {
    // check først name - hvis ikke valid, vis meddelse
    if (document.querySelector("#email").checkValidity()) {
        console.log("Yes email is valid");
        document.querySelector(".email_error").style.visibility = "hidden";
        checkPasswordValid();
    } else {
        console.log("no email is not valid");
        document.querySelector(".email_error").style.visibility = "visible";
    }
}

function checkPasswordValid() {
    // check først name - hvis ikke valid, vis meddelse
    if (document.querySelector("#password").checkValidity()) {
        console.log("Yes password is valid");
        document.querySelector(".password_error").style.visibility = "hidden";
        post();
    } else {
        console.log("no password is not valid");
        document.querySelector(".password_error").style.visibility = "visible";
        document.querySelector("#password").classList.add("invalid");
    }
}

// Klik på submit --> post
function post() {
    console.log("Test")

    // Find info fra indtastede data
    let fullname = document.querySelector("#name").value;
    let gamertag = document.querySelector("#gamertag").value;
    let mail = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    // Find checkboxes data
    let gamesArray = [];
    let games = document.querySelectorAll(`input[name="game"]:checked`);

    // For each game checked, get label name
    for (let y = 0; y < games.length; y++) {
        let label_name = games[y].nextElementSibling.textContent;
        gamesArray.push(label_name);
    }

    // Find checkboxes data
    let areasArray = [];
    let areas = document.querySelectorAll(`input[name="area"]:checked`);

    // For each area checked, get label name of area
    for (let y = 0; y < areas.length; y++) {
        let label_area = areas[y].nextElementSibling.textContent;
        areasArray.push(label_area);
    }

    const data = {
        games: gamesArray,
        areas: areasArray,
        name: fullname,
        email: mail,
        gamertag: gamertag,
        password: password,
    };

    const postData = JSON.stringify(data);

    fetch("https://ezoneproject-d9d3.restdb.io/rest/videogames", {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "608672e428bf9b609975a6e2",
            "cache-control": "no-cache",
        },
        body: postData,
    })
        .then(res => res.json())
        .then(data => console.log(data));
}
