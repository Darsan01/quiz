// script.js

document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const timerContainer = document.getElementById('timer');

    const myQuestions = [
        {
            question: "What is the capital of France?",
            answers: {
                a: "Berlin",
                b: "Madrid",
                c: "Paris"
            },
            correctAnswer: "c"
        },
        {
            question: "Who is the author of 'To Kill a Mockingbird'?",
            answers: {
                a: "Harper Lee",
                b: "J.K. Rowling",
                c: "Ernest Hemingway"
            },
            correctAnswer: "a"
        },
        {
            question: "What is the largest planet in our Solar System?",
            answers: {
                a: "Earth",
                b: "Jupiter",
                c: "Saturn"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the chemical symbol for Gold?",
            answers: {
                a: "Au",
                b: "Ag",
                c: "Pt"
            },
            correctAnswer: "a"
        },
        {
            question: "Which country hosted the 2016 Summer Olympics?",
            answers: {
                a: "China",
                b: "Brazil",
                c: "Canada"
            },
            correctAnswer: "b"
        }
    ];

    function buildQuiz() {
        const output = [];

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        });

        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');

        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = 0;
                showResults();
                submitButton.disabled = true;
            }
        }, 1000);
    }

    buildQuiz();

    submitButton.addEventListener('click', showResults);

    window.onload = function () {
        let timeInMinutes = 5;
        let timeInSeconds = 60 * timeInMinutes;
        const display = document.querySelector('#timer');
        startTimer(timeInSeconds, display);
    };
});
