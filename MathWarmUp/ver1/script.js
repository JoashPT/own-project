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
    answerList.length = 0;
    userAnswerList.length = 0;
    document.getElementById("activityArea").replaceChildren();

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

        createNumber(numberLength[0], firstNumberString);
        createNumber(numberLength[1], secondNumberString);
        
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

function createNumber(lengthOfNumber, numberArray) {
    for (let i = 0; i < lengthOfNumber; i++) {
            const digit = Math.floor(Math.random() * 10);
            if (lengthOfNumber > 1 && numberArray.length == 0 && digit == 0) {
                i--;
                continue;
            } else {
                numberArray.push(digit);
            }
        }
}

const generateCard = document.getElementById("generateCard");
generateCard.addEventListener("click", createCard);

const checkAnswerBttn = document.getElementById("checkAnswerBttn");
checkAnswerBttn.addEventListener("click", checkAnswer);