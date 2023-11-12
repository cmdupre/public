'use strict'

const form = document.getElementById('form');
const email = document.getElementById('email');
const country = document.getElementById('country');
const zipcode = document.getElementById('zipcode');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');
const emailError = document.getElementById('email-error');
const countryError = document.getElementById('country-error');
const zipcodeError = document.getElementById('zipcode-error');
const passwordError = document.getElementById('password-error');
const passwordConfirmError = document.getElementById('password-confirm-error');
const submit = document.querySelector('button');

email.addEventListener('input', onInputEmail);
country.addEventListener('input', onInputCountry);
zipcode.addEventListener('input', onInputZipcode);
password.addEventListener('input', onInputPassword);
passwordConfirm.addEventListener('input', onInputPasswordConfirm);
submit.addEventListener('click', onSubmit);

email.focus();

function onInputEmail() {
    updateErrorMessage(email, emailError);
}

function onInputCountry() {
    updateErrorMessage(country, countryError);
}

function onInputZipcode() {
    updateErrorMessage(zipcode, zipcodeError);
}

function onInputPassword() {
    onInputPasswordConfirm();
    updateErrorMessage(password, passwordError);
}

function onInputPasswordConfirm() {
    if (passwordConfirm.value !== password.value) {
        passwordConfirm.setCustomValidity("Passwords do not match.");
    }
    else {
        passwordConfirm.setCustomValidity('');
    }

    updateErrorMessage(passwordConfirm, passwordConfirmError);
}

function updateErrorMessage(element, errorElement) {
    errorElement.textContent = element.validationMessage;
}

function onSubmit(e) {
    e.preventDefault();
    form.reportValidity();

    if (form.checkValidity()) {
        submit.textContent = 'Submitted!';
        submit.disabled = true;
    }
}