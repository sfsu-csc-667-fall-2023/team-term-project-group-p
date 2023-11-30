const userRegistrationForm = document.getElementById("userRegForm");

const validate = (input, validators) => {
    let isValid = true;
    validators.forEach(validator => {
        isValid = validator(input)
    });
    return isValid;
}

userRegistrationForm && userRegistrationForm.addEventListener(
    "submit",
    (event) => {
        console.log("register event");

        const regUsername = event.target.elements["regUsername"].value;
        const regEmail = event.target.elements["regEmail"].value;
        const regPassword = event.target.elements["regPassword"].value;
    },
);



