let quiz = [
    
    {
        question: "1.Who invented Javascript ?",
        option1: "Brendan Eich",
        option2: "James Cosling",
        option3: "Guido Van Rossum",
        option4: "Dennis Ritchie",
        ans: "ans4"
    },
    {
        question: "2.  When a user views a page containing a JavaScript program, which machine actually executes the script?",
        option1: "The User's machine running a Web browser",
        option2: "The Web server",
        option3: " A central machine deep within Netscape's corporate offices",
        option4: "None of the above",
        ans: "ans1"
    },
    {
        question: "3.  ______ JavaScript is also called client-side JavaScript.",
        option1: "Microsoft",
        option2: "Navigator",
        option3: "LiveWire",
        option4: "Native",
        ans: "ans2"
    },
    {
        question: "4.  __________ JavaScript is also called server-side JavaScript.",
        option1: "Microsoft",
        option2: "Navigator",
        option3: "LiveWire",
        option4: "Native",
        ans: "ans3"
    },
    {
        question: "5.  What are variables used for in JavaScript Programs?",
        option1: "Storing numbers, dates, or other values",
        option2: "Varying randomly",
        option3: "Causing high-school algebra flashbacks",
        option4: "None of the above",
        ans: "ans1"
    },
    {
        question: "6.  _____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.",
        option1: "Client-side",
        option2: "Server-side",
        option3: "Local",
        option4: "Native",
        ans: "ans1"
    },
    {
        question: "7.  Which of the following can't be done with client-side JavaScript?",
        option1: "Validating a form",
        option2: "Sending a form's contents by email",
        option3: "Storing the form's contents to a database file on the server",
        option4: "None of the above",
        ans: "ans3"
    },
    {
        question: "8.  Which of the following are capabilities of functions in JavaScript?",
        option1: "Return a value",
        option2: "Accept parameters and Return a value",
        option3: "Accept parameters",
        option4: "None of the above",
        ans: "ans3"
    },
    {
        question: "9.  Which of the following is not a valid JavaScript variable name?",
        option1: "2names",
        option2: "_first_and_last_names",
        option3: "FirstAndLast",
        option4: "None of the above",
        ans: "ans1"
    },
    {
        question: "10.  Which of the following attribute can hold the JavaScript version?",
        option1: "LANGUAGE",
        option2: "SCRIPT",
        option3: "VERSION",
        option4: "None of the above",
        ans: "ans1"
    },
];



const question = document.querySelector('.question');
const option1 = document.querySelector('#op1');
const option2 = document.querySelector('#op2');
const option3 = document.querySelector('#op3');
const option4 = document.querySelector('#op4');
const submit = document.querySelector('#submit');

const answers = document.querySelectorAll('.answer');

const showScore = document.querySelector('#showScore');

let questionCount = 0;
let score = 0;

function loadQues() {

    let questionList = quiz[questionCount];

    question.innerHTML = questionList.question;

    option1.innerHTML = questionList.option1;
    option2.innerHTML = questionList.option2;
    option3.innerHTML = questionList.option3;
    option4.innerHTML = questionList.option4;

}

loadQues();


const getCheckedAnswer = () =>{

    let answer;

    answers.forEach((curElem) => {
        if(curElem.checked){
            answer = curElem.id;
        }

    });
    return answer;

}

const deselectAll = () => {
    answers.forEach((curElem) => {
        curElem.checked = false;
    })
}

submit.addEventListener('click',()=> {
    const checkedAnswer = getCheckedAnswer();

    if(checkedAnswer === quiz[questionCount].ans){
        score++;
    };

    

    questionCount++;

    deselectAll();

    if(questionCount<quiz.length){
        loadQues();
    }else{
        showScore.innerHTML = `
            <h3>You Scored ${score} / ${quiz.length} .</h3>
            <button class="btn" id="dis" onclick="first()">Play again </button>
            <button class="btn" id="display" onclick="totalScore()"> Show the scores </button>
        `

        showScore.classList.remove('score');
    }
})

let allScores = [];

if(localStorage.getItem('scores')===null){
    localStorage.setItem('scores', JSON.stringify(allScores));
}
else{
    allScores = JSON.parse(localStorage.getItem('scores'));
};

const totalScore = () =>{
 

    let scoress = {};
    scoress.score = score;

    allScores.push(scoress);

     localStorage.setItem('scores', JSON.stringify(allScores));

     location.href = "displayscore.html";


}
     

function first() {
    location.href = "first.html";
}

        

    





