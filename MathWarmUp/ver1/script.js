const answerList = [];
const userAnswerList = [];

function createCard() {
    for (let i = 0; i < 10; i++) {
        const firstNumber = Math.floor(Math.random() * 10);
        const secondNumber = Math.floor(Math.random() * 10);
        const sum = firstNumber + secondNumber;
        answerList.push(sum);

        const numberCard = document.createElement("div");
        const firstNumberText = document.createElement("p");
        firstNumberText.textContent = firstNumber;

        const operation = document.createElement("p");
        operation.textContent = "+";

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