import { imagePopup, popupImage, popupText, openPopup } from './utils.js';

class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }

  _addLike() {
    this._element.querySelector('.card__icon').classList.toggle('card__icon_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _showImage() {
    popupImage.src = this._link;
    popupText.alt = this._name;
    popupText.textContent = this._name;
    openPopup(imagePopup);
  }

  _setEventListeners() {
    this._element.querySelector('.card__icon').addEventListener('click', () => {
      this._addLike();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._showImage();
    });
  }
}

export default Card;
