// ✅ Questions Data
const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        answer: "Delhi"
    },
    {
        question: "Which language is used for web styling?",
        options: ["HTML", "CSS", "Python", "C++"],
        answer: "CSS"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which is a JavaScript framework?",
        options: ["Django", "Flask", "React", "Laravel"],
        answer: "React"
    },
    {
        question: "Which planet is known as Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    }
];

// ✅ Load Questions
function loadQuiz() {
    const container = document.getElementById("quizContainer");

    quizData.forEach((q, index) => {
        let div = document.createElement("div");
        div.classList.add("question-box");

        let html = `<h5>${index + 1}. ${q.question}</h5>`;

        q.options.forEach(opt => {
            html += `
                <div>
                    <input type="radio" name="q${index}" value="${opt}">
                    <label>${opt}</label>
                </div>
            `;
        });

        div.innerHTML = html;
        container.insertBefore(div, container.firstChild);
    });
}

loadQuiz();

// ✅ Get Score
function getScore() {
    let score = 0;
    let output = "";
    let allAnswered = true;

    quizData.forEach((q, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);

        // Validation
        if (!selected) {
            allAnswered = false;
        } else {
            if (selected.value === q.answer) {
                score++;
                output += `<p style="color:green">Q${index + 1}: Correct ✅</p>`;
            } else {
                output += `<p style="color:red">Q${index + 1}: Wrong ❌ (Correct: ${q.answer})</p>`;
            }
        }
    });

    if (!allAnswered) {
        document.getElementById("result").innerHTML =
            "<h3 style='color:red'>Please answer all questions!</h3>";
        return;
    }

    document.getElementById("result").innerHTML = `
        <h3>Your Score: ${score} / ${quizData.length}</h3>
        ${output}
    `;
}

// ✅ Reset
function resetQuiz() {
    document.querySelectorAll("input[type=radio]").forEach(r => r.checked = false);

    document.getElementById("result").innerHTML =
        "<h3>Score will appear here...</h3>";
}