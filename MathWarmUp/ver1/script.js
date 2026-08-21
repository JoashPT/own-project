const answerList = [];
const userAnswerList = [];
const operations = {
    Addition: (a, b) => a + b,
    Subtraction: (a, b) => a - b,
    Multiplication: (a, b) => a * b,
    Division: (a, b) => Number((a / b).toFixed(2))
}
const operationSign = {
    Addition: "+",
    Subtraction: "-",
    Multiplication: "x",
    Division: "÷",
}

const levelUsed = {
    levelOne: 1,
    levelTwo: 2,
    levelThree: 3,
    levelFour: 4,
    levelFive: 5
}

const additionLevel = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]
const subtractionLevel = [[1, 1], [2, 1], [2, 2], [3, 2], [3, 3]]
const multiplicationLevel = [[1, 1], [2, 1], [3, 1], [2, 2], [3, 2]]
const divisionLevel = [[1, 1], [2, 1], [3, 1], [3, 2], [4, 2]]

function createCard() {
    const numberOfItems = Number.parseInt(document.getElementById("numberOfItems").value);
    const operationToBeUsed = document.getElementById("operationToBeUsed").value;
    const levelToBeUsed = document.getElementById("levelToBeUsed").value;
    const operationLevel = (operationToBeUsed == "Addition") ? additionLevel :
                            (operationToBeUsed == "Subtraction") ? subtractionLevel :
                            (operationToBeUsed == "Multiplication") ? multiplicationLevel :
                            (operationToBeUsed == "Division") ? divisionLevel :
                            "unidentified operation";

    for (let i = 0; i < numberOfItems; i++) {
        const firstNumberString = [];
        const secondNumberString = [];
        const numberLength = operationLevel[levelUsed[levelToBeUsed] - 1];
        for (let j = 0; j < numberLength[0]; j++) {
            const digitForFirstNumber = Math.floor(Math.random() * 10);
            console.log(digitForFirstNumber);
            if (numberLength > 1 && firstNumberString.length == 0 && digitForFirstNumber == 0) {
                j--;
                continue;
            } else {
                firstNumberString.push(digitForFirstNumber);
            }
        }

        for (let k = 0; k < numberLength[1]; k++) {
            const digitForSecondNumber = Math.floor(Math.random() * 10);
            console.log(digitForSecondNumber);
            if (numberLength > 1 && secondNumberString.length == 0 && digitForSecondNumber == 0) {
                k--;
                continue;
            } else {
                secondNumberString.push(digitForSecondNumber);
            }
        }
        const firstNumber = Number.parseInt(firstNumberString.join(""));
        const secondNumber = Number.parseInt(secondNumberString.join(""));
        const answer = operations[operationToBeUsed](firstNumber, secondNumber);
        answerList.push(answer);

        const numberCard = document.createElement("div");
        const firstNumberText = document.createElement("p");
        firstNumberText.textContent = firstNumber;

        const operation = document.createElement("p");
        operation.textContent = operationSign[operationToBeUsed];

        const secondNumberText = document.createElement("p");
        secondNumberText.textContent = secondNumber;

        const inputAnswer = document.createElement("input");
        inputAnswer.classList.add("mathBox");
        inputAnswer.type = "text";
        inputAnswer.pattern = "[0-9]+";
        inputAnswer.required = true;

        numberCard.appendChild(firstNumberText);
        numberCard.appendChild(operation);
        numberCard.appendChild(secondNumberText);
        numberCard.appendChild(inputAnswer);

        document.getElementById("activityArea").appendChild(numberCard);
    }
}

function checkAnswer() {
    const userAnswers = document.getElementsByClassName("mathBox");
    Object.entries(userAnswers).forEach((key) => {
        userAnswerList.push(Number.parseInt(key[1].value));
    })
    for (let i = 0; i < answerList.length; i++){
        if (userAnswerList[i] == answerList[i]) {
            userAnswers[i].parentElement.style.backgroundColor = "green";
        } else {
            userAnswers[i].parentElement.style.backgroundColor = "red";
        }
    }
}

const generateCard = document.getElementById("generateCard");
generateCard.addEventListener("click", createCard);

const checkAnswerBttn = document.getElementById("checkAnswerBttn");
checkAnswerBttn.addEventListener("click", checkAnswer);