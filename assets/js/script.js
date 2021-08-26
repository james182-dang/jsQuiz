

// Functions


//runquiz function
function runQuiz() {
    //variable to store the HTML output
    const output = [];

    quizQuestions.forEach(
        (currentQuestion, questionNumber) => {

            //variable to store the list of possible answers
            const answers = [];

            //and for each available answer
            for(letter in currentQuestion.answers){

                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}"></input>
                            ${letter} :
                            ${currentQuestion.answers[letter]}
                        
                    </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
};

//showresults function
function showResults() {

    //gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question
    quizQuestions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {

            //add to the nunber of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        
        // if answer is incorrect, blank
        else {
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
};



//showSlide function
function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
        previousButton.style.display = 'none';
    }
    else {
        previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length-1) {
        nextButton.style.display = 'none';
        submitButtonEl.style.display = 'inline-block';
    }
    else {
        nextButton.style.display = 'inline-block';
        submitButtonEl.style.display = 'none';
    }
};

//Previous/Next slide buttons functions
function showNextSlide() {
    showSlide(currentSlide + 1);
};

function showPreviousSlide() {
    showSlide(currentSlide - 1);
};

// variables :)

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButtonEl = document.getElementById("submit");
const startButtonEl = document.getElementById("start");

const quizQuestions = [
    {
        question: "To acquire an element by its ID in an entire document, you would use _________",
        answers: {
            a: "document.getElementById('element')",
            b: "document.getElementsByClassName('element')",
            c: "document.getElementsByTagName('element')",
            d: "document.getElementById=element"
            
        },
        correctAnswer: "a"
    },
    {
        question: "You can declare a variable using 'var.' What other option is a more specific way to declare a variable?",
        answers: {
            a: "constVar",
            b: "letVar",
            c: "renewVar",
            d: "let"
        },
        correctAnswer: "d"
    },
    {
        question: "To declare a variable that will never change, use...",
        answers: {
            a: "hardVar",
            b: "softVar",
            c: "const",
            d: "topConst"
        },
        correctAnswer: "c"
    },
    {
        question: "How can you use inline JS?",
        answers: {
            a: "Trick question, JS must always be linked to an external sheet.",
            b: "add a script tag in the HTML",
            c: "add a javaScript tag in the HTML",
            d: "just type it in there man who cares"
        },
        correctAnswer: "b"
    }

];


// Testing functions

runQuiz();

//Pagination

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

//Testing show slide

showSlide(currentSlide);

// Event listeners
startButtonEl.addEventListener("click", runQuiz);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
submitButtonEl.addEventListener("click", showResults);