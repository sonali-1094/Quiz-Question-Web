const questions = [
    {
        question: "Who is my favourite Hero?",
        answers: [
            { text: "Rohit Saraf", correct: false },
            { text: "Shahrukh Khan", correct: true },
            { text: "Kartik Aaryan", correct: false },
            { text: "Shahid Kapoor", correct: false },
        ],
    },
    {
        question: "Who is my favourite Cricketer?",
        answers: [
            { text: "Virat Kohli", correct: true },
            { text: "Rohit Sharma", correct: false },
            { text: "MS Dhoni", correct: false },
            { text: "Shubman Gill", correct: false },
        ],
    },
    {
        question: "Which is my favourite flower?",
        answers: [
            { text: "Rose", correct: true },
            { text: "Sunflower", correct: false },
            { text: "Jasmine", correct: false },
            { text: "Lotus", correct: false },
        ],
    },
    {
        question: "Which is my favourite colour?",
        answers: [
            { text: "Red", correct: false },
            { text: "Blue", correct: false },
            { text: "Black", correct: false },
            { text: "Pink", correct: true },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        score++; // Increment the score if the answer is correct
    }

    Array.from(answerButtons.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.style.display = "block";
    } else {
        nextButton.innerHTML = `Restart - Score: ${score}/${questions.length}`; // Display the final score
        nextButton.style.display = "block";
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        startQuiz(); // Restart the quiz
    }
});

startQuiz();
