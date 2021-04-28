"use strict";

export function post() {
    let fullname = document.querySelector("#name").value;
    let gamertag = document.querySelector("#gamertag").value;
    let mail = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let gamesArray = [];
    let games = document.querySelectorAll(`input[name="game"]:checked`);

    for (let y = 0; y < games.length; y++) {
        let label_name = games[y].nextElementSibling.textContent;
        gamesArray.push(label_name);
    }

    let areasArray = [];
    let areas = document.querySelectorAll(`input[name="area"]:checked`);

    for (let i = 0; i < areas.length; i++) {
        let label_area = areas[i].nextElementSibling.textContent;
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

    thankYouPage();
}

function thankYouPage() {
    document.querySelector("#modal.step_3").style.display = "none";
    document.querySelector("#modal.step_4").style.display = "block";
    document.querySelector(".step_4 .column_content").classList.add("slidein");
    document.querySelector("#step_bar_4").classList.add("load_step_4");
}