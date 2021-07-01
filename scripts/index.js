import { openPopup, closePopup } from './utils.js';
import initialCards from './initial-cards.js';
import Card from './Card.js';
import { data, FormValidator } from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const formElementProfile = popupProfile.querySelector('.form');
const nameInput = formElementProfile.querySelector('.form__item_el_name');
const jobInput = formElementProfile.querySelector('.form__item_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__add-button');
const formElementAddCard = popupAddCard.querySelector('.form');
const cardList = document.querySelector('.elements__list');

function createCard(data, selector) {
  const card = new Card(data, selector);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = createCard(data, '.card-template');
  cardList.append(cardElement);
});

const profileForm = new FormValidator(data, '.form[name="profile"]');
profileForm.enableValidation();

const cardForm = new FormValidator(data, '.form[name="card"]');
cardForm.enableValidation();

function editFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const data = Object.fromEntries(new FormData(evt.target));
  const cardElement = createCard(data, '.card-template');
  cardList.prepend(cardElement);
  formElementAddCard.reset();
  closePopup(popupAddCard);
}

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  profileForm.resetErrors();
});

formElementProfile.addEventListener('submit', editFormSubmit);

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  cardForm.resetErrors();
});

formElementAddCard.addEventListener('submit', addCardFormSubmit);

