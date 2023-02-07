const form = document.getElementById("card__form");

const cardHolderName = document.querySelector(".holder__name");
const cardNumber = document.querySelector(".card__number");
const cardExpMonth = document.querySelector(".exp__month");
const cardExpYear = document.querySelector(".exp__year");
const cardCvc = document.querySelector(".card__cvc");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (validateForm()) {}
});

function validateForm() {
    //clear all past errors
    document
        .querySelectorAll(".error")
        .forEach((error) => (error.innerHTML = ""));
    document
        .querySelectorAll("input.invalid")
        .forEach((invalidInput) => invalidInput.classList.remove("invalid"));

    return (
        validateCardHolderName() &&
        validateCardNumber() &&
        validateCardExpMonth() &&
        validateCardExpYear() &&
        validateCardCvv()
    );
}

function validateCardHolderName() {
    let input = form.card__holder;
    let value = input.value;
    if (value === "") {
        setError(input, "Can't be blank");
        return false;
    }
    if (!value.match(/^[A-Za-z]+ [A-Za-z]+$/)) {
        setError(input, "Invalid full name");
        return false;
    }

    return true;
}

function validateCardNumber() {
    let input = form.card__number;
    let value = input.value;
    if (value === "") {
        setError(input, "Can't be blank");
        return false;
    }
    if (value.length < 16) {
        setError(input, "Card number is less than 16 digits");
        return false;
    }
    if (!value.match(/^[0-9]{16}$/)) {
        setError(input, "Wrong format,numbers only");
        return false;
    }
    return true;
}

function validateCardExpMonth() {
    let input = form.card__exp_month;
    let value = input.value;
    if (value === "") {
        setError(input, "Can't be blank");
        return false;
    }
    if (value > 12) {
        setError(input, "Wrong format");
        return false;
    }
    if (!value.match(/^[0-1]{1}[1-9]{1}$/)) {
        setError(input, "Wrong format");
        return false;
    }
    return true;
}

function validateCardExpYear() {
    let input = form.card__exp_year;
    let value = input.value;
    if (value === "") {
        setError(input, "Can't be blank");
        return false;
    }
    if (!value.match(/^[0-9]{1}[0-9]{1}$/)) {
        setError(input, "Wrong format");
        return false;
    }
    return true;
}

function validateCardCvv() {
    let input = form.card__cvc;
    let value = input.value;
    if (value === "") {
        setError(input, "Can't be blank");
        return false;
    }
    if (!value.match(/^[0-9]{3}$/)) {
        setError(input, "Wrong format");
        return false;
    }
    return true;
}

function setError(input, error) {
    let inputBox = input.parentElement;

    //to get input__box of date inputs
    if (!inputBox.classList.contains("input__box")) {
        inputBox = inputBox.parentElement;
    }

    let errorFeild = inputBox.querySelector(".error");
    errorFeild.innerHTML = error;

    input.classList.add("invalid");
    input.focus();
}

//add error feild to all input__box
document
    .querySelectorAll(".input__box")
    .forEach((inputBox) => (inputBox.innerHTML += `<p class="error"></p>`));

//fill card feilds on input keyup event
[
    form.card__holder,
    form.card__number,
    form.card__exp_month,
    form.card__exp_year,
    form.card__cvc,
].forEach((input, i) => {
    const cardFeilds = [
        cardHolderName,
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCvc,
    ];

    let cardFeild = cardFeilds[i];
    cardFeild.defaultText = cardFeild.innerHTML;

    input.addEventListener("keyup", (ev) => {
        let value = ev.target.value;
        if (value === "") {
            cardFeild.innerHTML = cardFeild.defaultText;
            return;
        }
        if (cardFeild === cardNumber) {
            value = value
                .split("")
                .map((letter, i) =>
                    (i + 1) % 4 === 0 && i + 1 !== value.length ? letter + " " : letter
                )
                .join("");
        }
        cardFeild.innerHTML = value;
    });
});