// 1. DATA: every question has the text, the options, and the index of the right answer (0 = first option)
const questions = [
  { question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], answer: 1 },
  { question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Mars", "Earth"], answer: 1 },
  { question: "How many days are in a leap year?",
    options: ["365", "366", "364", "367"], answer: 1 },
  { question: "Which language is used to style web pages?",
    options: ["HTML", "Python", "CSS", "Java"], answer: 2 },
  { question: "Which river flows through Guwahati?",
    options: ["Ganga", "Brahmaputra", "Yamuna", "Godavari"], answer: 1 }
];

// 2. STATE: variables that change while the game runs
let currentIndex = 0;   // which question we are on
let score = 0;          // how many answers were correct

// 3. Grab the HTML elements we need to change
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

// 4. Show the current question and create one button per option
function showQuestion() {
  const current = questions[currentIndex];

  progressEl.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  optionsEl.innerHTML = "";   // remove the old buttons
  nextBtn.disabled = true;    // player must answer before moving on

  current.options.forEach(function (text, index) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", function () {
      checkAnswer(index);
    });
    optionsEl.appendChild(button);
  });
}

// 5. Check the chosen option, update the score and colour the buttons
function checkAnswer(chosenIndex) {
  const correctIndex = questions[currentIndex].answer;
  const buttons = optionsEl.querySelectorAll("button");

  if (chosenIndex === correctIndex) {
    score++;
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Wrong. The right answer is " + questions[currentIndex].options[correctIndex] + ".";
    buttons[chosenIndex].classList.add("wrong");
  }
  buttons[correctIndex].classList.add("correct");

  // lock all buttons so the player cannot answer twice
  buttons.forEach(function (b) { b.disabled = true; });
  nextBtn.disabled = false;
}

// 6. Go to the next question, or finish the quiz
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  finalScoreEl.textContent = "You scored " + score + " out of " + questions.length + ".";
}

// 7. Reset everything and start again
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

// 8. Start the game when the page loads
showQuestion();
