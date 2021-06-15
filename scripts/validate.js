const data = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

function enableValidation(data) {
  const formList = document.querySelectorAll(data.formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', handleFormSubmit);
    formElement.addEventListener('input', (evt) => handleFormInput(evt, data));
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

function handleFormInput(evt, data) {
  const input = evt.target;
  const form = evt.currentTarget;

  isValid(form, input, data);
  toggleButtonState(form, data);
}

function isValid(form, input, data) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, data);
  } else {
    hideInputError(form, input, data);
  }
}

function showInputError(form, input, errorMessage, data) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(data.inputErrorClass);
  errorElement.classList.add(data.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(form, input, data) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(data.inputErrorClass);
  errorElement.classList.remove(data.errorClass);
  errorElement.textContent = '';
}

function toggleButtonState(form, data) {
  const button = form.querySelector(data.submitButtonSelector);
  const isValid = form.checkValidity();

  if(!isValid) {
    button.classList.add(data.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(data.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

enableValidation(data);
