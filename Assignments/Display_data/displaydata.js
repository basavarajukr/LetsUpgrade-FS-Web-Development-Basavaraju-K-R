let avenger = ["Thor", "captain", "hulk", "ironman"];

let names = document.getElementById('names');

function display() {
    let avengers = "";

    for (let i = 0; i < avenger.length; i++) {
        avengers += `<h3> ${avenger[i]} </h3> <button onclick="deleteAvenger(${i})">Delete</button>`;
    }

    names.innerHTML = avengers;
}

display();

function addAvenger() {
    let ai = document.getElementById('avenger');
    if (ai.value !== "") {
        avenger.push(ai.value);
        display();
        ai.value = ""
        document.getElementById('err').innerText = '';

    } else
        document.getElementById('err').innerText = 'please give a name';
}

function deleteAvenger(index) {
    avenger.splice(index, 1);
    display();
}