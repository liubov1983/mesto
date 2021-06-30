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
      this._hideInputError(this._input);
    }
  }

  _showInputError() {
    this._error = this._element.querySelector(`.${this._input.id}-error`);
    this._input.classList.add(this._data.inputErrorClass);
    this._error.classList.add(this._data.errorClass);
    this._error.textContent = `${this._input.validationMessage}`;
  }

  _hideInputError(inputElement) {
    this._error = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    this._error.classList.remove(this._data.errorClass);
    this._error.textContent = '';
  }

  _resetErrors() {
    const inputList = Array.from(this._element.querySelectorAll(this._data.inputSelector));

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
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

