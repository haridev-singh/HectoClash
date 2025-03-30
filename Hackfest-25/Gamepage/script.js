// Generate random digits
function generateRandomDigits() {
    let digits = '';
    for (let i = 0; i < 6; i++) {
        digits += Math.floor(Math.random() * (9 - 1 + 1)) + 1; // Random digit between [1-9]
    }
    return digits;
}

// Timer logic
let timer = document.getElementById("timer");
let timeLeft = parseInt(timer.textContent);

function startTimer() {
    const countdown = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's up! Game over.");
            document.getElementById("submit-btn").disabled = true; // Disable submit button
        }
    }, 1000);
}

// Attempts logic
let attemptsLeft = parseInt(document.getElementById("attempts").textContent);

function decrementAttempts() {
    attemptsLeft--;
    document.getElementById("attempts").textContent = attemptsLeft;

    if (attemptsLeft === 0) {
        alert("No attempts left! Game over.");
        document.getElementById("submit-btn").disabled = true; // Disable submit button
    }
}

// Generate solutions logic
function findSolutions(digits, target = 100) {
    const operators = ["+", "-", "*", "/"];
    const results = [];

    function helper(expr, remainingDigits) {
        if (!remainingDigits.length) {
            try {
                if (eval(expr) === target) results.push(expr);
            } catch {}
            return;
        }

        for (let op of operators) {
            helper(expr + op + remainingDigits[0], remainingDigits.slice(1));
        }
        helper(expr + remainingDigits[0], remainingDigits.slice(1));
    }

    helper(digits[0], digits.slice(1));
    return results.length ? results : ["No solutions found"];
}

// Main game logic
const randomDigits = generateRandomDigits();
document.getElementById("random-digits").textContent = randomDigits;

document.getElementById("submit-btn").addEventListener("click", function () {
    const solutionInput = document.getElementById("solution").value.trim();
    const resultElement = document.getElementById("result");
    const correctSolutionsElement = document.getElementById("correct-solutions");

    decrementAttempts();

    try {
        const calculatedResult = eval(solutionInput);

        if (calculatedResult === 100) {
            resultElement.textContent = "Correct! Your solution equals exactly to the target value.";
            correctSolutionsElement.textContent = "";
        } else {
            resultElement.textContent = `Incorrect. Your solution equals ${calculatedResult}, not the target value.`;

            const solutions = findSolutions(randomDigits.split(""));
            correctSolutionsElement.innerHTML =
                "Possible correct solutions:<br>" + solutions.join("<br>");
        }
    } catch (error) {
        resultElement.textContent =
            "Invalid mathematical expression. Please try again.";
        correctSolutionsElement.textContent = "";
    }
});

// Start timer when page loads
startTimer();
