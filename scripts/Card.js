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
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardIcon = this._element.querySelector('.card__icon');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _addLike() {
    this._cardIcon.classList.toggle('card__icon_active');
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
    this._cardIcon.addEventListener('click', () => {
      this._addLike();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._showImage();
    });
  }
}

export default Card;
