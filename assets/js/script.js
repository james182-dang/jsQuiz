// setting variables

var pos = 0;
var correct = 0;
var secondTime = localStorage.getItem("score")
var highScore = localStorage.getItem("initials")
var test, test_status, question, choice, choices, choiceA, choiceB, choiceC, choiceD;

//PSEUDOCODE I HOPE THIS HELPS ME DEAR LORD
//We have timer functionality
//Get timer to start on quiz start
//If timer reaches 0, end quiz


// timer functions



var sec = 90;
var time = setInterval(quizTimer, 1000);

function quizTimer() { 

    
    document.getElementById('timer').innerHTML = sec + " seconds left!";
    
    sec -= 1;

    if (sec === -1) {
        clearInterval(time);
        alert("Time is up!");
    }
};

function stopTimer() {
    clearInterval(time);
}


// end timer functions

//quiz questions array

var quizQuestions = [
    {
        question: "To acquire an element by its ID in an entire document, you would use _________",
            a: "document.getElementById('element')",
            b: "document.getElementsByClassName('element')",
            c: "document.getElementsByTagName('element')",
            d: "document.getElementById=element",
            answer: "A"
        },
    {
        question: "You can declare a variable using 'var.' What other option is a more specific way to declare a variable?",
            a: "constVar",
            b: "letVar",
            c: "renewVar",
            d: "let",
            answer: "D"
    },
    {
        question: "To declare a variable that will never change, use...",
            a: "hardVar",
            b: "softVar",
            c: "const",
            d: "topConst",
            answer: "C"
    },
    {
        question: "How can you use inline JS?",
            a: "Trick question, JS must always be linked to an external sheet.",
            b: "add a script tag in the HTML",
            c: "add a javaScript tag in the HTML",
            d: "just type it in there man who cares",
            answer: "B"
    }
];

function get(x) {
    return document.getElementById(x);
}

get("scoreKeep").innerHTML = "High score:" + secondTime + " by " + highScore;

function displayQuestion() {

    test = get("test");
    if (pos >= quizQuestions.length) {
        test.innerHTML = "<h2>You got " + correct + " of " + quizQuestions.length + " questions correct.</h2>";
        get("test_status").innerHTML = "Test completed!";
        stopTimer();
        if (sec > secondTime) {
            localStorage.setItem("score", sec);
            initials = prompt("Enter your intials!")
            localStorage.setItem("initials", initials)
        };
        
        //reset variable to allow restart
        pos = 0;
        correct = 0;

        //stop displayQuestion function when test is complete
        return false;
    }

    get("test_status").innerHTML = "Question " + (pos+1) + " of " + quizQuestions.length;

    quizQuestion = quizQuestions[pos].question;
    choiceA = quizQuestions[pos].a;
    choiceB = quizQuestions[pos].b;
    choiceC = quizQuestions[pos].c;
    choiceD = quizQuestions[pos].d;

    // display the question
    test.innerHTML = "<h3>" + quizQuestion + "</h3>";

    //display the answer options
    //the += appends to the data we started on the line above
    test.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + choiceA + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='B'> " + choiceB + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + choiceC + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='D'> " + choiceD + "</label><br>";
    test.innerHTML += "<button id='submit' onclick='checkAnswer()'>Submit Answer</button>";

};

function checkAnswer() {
    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    for (var i=0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }

    // check if answer matches correct choice
    if (choice === quizQuestions[pos].answer) {
        correct++;
    } else if (choice !== quizQuestions[pos].answer) {
        sec = sec - 10;
    }
    
    pos++;

    displayQuestion();
};

document.getElementById("start").addEventListener("click", displayQuestion);
document.getElementById("start").addEventListener("click", quizTimer);
