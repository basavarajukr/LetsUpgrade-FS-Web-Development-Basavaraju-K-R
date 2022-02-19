let names = JSON.parse(localStorage.getItem('names'));
let scores = JSON.parse(localStorage.getItem('scores'));




function displayNames(nameArray) {
    let nameString = "";



    nameArray.forEach(function(data,index){

        const { name } =data;

        nameString += `
        <tr>
        <td>${name}</td>
        </tr>
        `
    })

    document.getElementById('data1').innerHTML = nameString;


}

displayNames(names);

function displayScores(scoreArray) {
    let scoreString = "";

    scoreArray.forEach(function(data,index){

        const { score } =data;

        scoreString += `
        <tr>
        <td>${score}</td>
        </tr>
        `
    })

    document.getElementById('data2').innerHTML = scoreString;
}

displayScores(scores);



document.getElementById("display").onclick = function () {
    location.href = "first.html";
};
    