export const data = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

export class FormValidator {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._input;
  }

  enableValidation() {
    this._element = document.querySelector(this._selector);

    this._element.addEventListener('submit', this._handleFormSubmit);
    this._element.addEventListener('input', this._handleFormInput);
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  _handleFormInput = (evt) => {
    this._input = evt.target;

    this._isValid();
    this._toggleButtonState();
  }

  _isValid() {
    if (!this._input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _showInputError() {
    this._error = this._element.querySelector(`.${this._input.id}-error`);
    this._input.classList.add(this._data.inputErrorClass);
    this._error.classList.add(this._data.errorClass);
    this._error.textContent = `${this._input.validationMessage}`;
  }

  _hideInputError() {
    this._error = this._element.querySelector(`.${this._input.id}-error`);
    this._input.classList.remove(this._data.inputErrorClass);
    this._error.classList.remove(this._data.errorClass);
    this._error.textContent = '';
  }

  _resetErrors() {
    const inputList = this._element.querySelectorAll(this._data.inputSelector);

    inputList.forEach((item) => {
      this._error.textContent = '';
      this._toggleButtonState();
    });
    //this._hideInputError();
    //this._toggleButtonState();
  }

  _toggleButtonState() {
    this._button = this._element.querySelector(this._data.submitButtonSelector);

    if(!this._element.checkValidity()) {
      this._button.classList.add(this._data.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._data.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }


}



/*
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

function resetErrors(form, data) {
  const inputList = form.querySelectorAll(data.inputSelector);
  inputList.forEach((input) => {
    hideInputError(form, input, data);
    toggleButtonState(form, data);
  });
}
*/
//enableValidation(data);
