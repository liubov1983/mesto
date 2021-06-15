const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close');
const formElementProfile = popupProfile.querySelector('.form');
const nameInput = formElementProfile.querySelector('.form__item_el_name');
const jobInput = formElementProfile.querySelector('.form__item_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtonAddCard = popupAddCard.querySelector('.popup__close');
const formElementAddCard = popupAddCard.querySelector('.form');
const cardNameInput = formElementAddCard.querySelector('.form__item_el_name');
const cardLinkInput = formElementAddCard.querySelector('.form__item_el_link');
const imagePopup = document.querySelector('.popup_type_show-image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupText = imagePopup.querySelector('.popup__text');
const closeButtonImage = imagePopup.querySelector('.popup__close');
const cardList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content;
const actionKey = "Escape";

function createCard(nameValue, linkValue) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  newCard.querySelector('.card__title').textContent = nameValue;
  setEventListener(newCard);
  return newCard;
}

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  cardList.append(card);
});

function openPopup(modal, data) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  document.addEventListener('mousedown', closePopupOverlay);
  resetErrors(modal, data);
}

function resetErrors(modal, data) {
  const form = modal.querySelector(data.formSelector);
  const inputList = form.querySelectorAll(data.inputSelector);
  inputList.forEach((input) => {
    hideInputError(form, input, data);
    toggleButtonState(form, data);
  });
}

function closePopup(modal) {
  document.removeEventListener('keydown', handleEscUp);
  document.removeEventListener('mousedown', closePopupOverlay);
  modal.classList.remove('popup_opened');
}

function editFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const addedCard = createCard(cardNameInput.value, cardLinkInput.value);
  cardList.prepend(addedCard);
  formElementAddCard.reset();
  closePopup(popupAddCard);
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function addLike(evt) {
  evt.target.classList.toggle('card__icon_active');
}

function getImage(nameValue, linkValue) {
  popupImage.src = linkValue;
  popupImage.alt = nameValue;
  popupText.textContent = nameValue;
}

function showImage(evt) {
  const imageLink = evt.target.closest('.card').querySelector('.card__image').src;
  const imageName = evt.target.closest('.card').querySelector('.card__title').textContent;
  getImage(imageName, imageLink);
  openPopup(imagePopup);
}

function setEventListener(element) {
  element.querySelector('.card__icon').addEventListener('click', addLike);
  element.querySelector('.card__delete').addEventListener('click', deleteCard);
  element.querySelector('.card__image').addEventListener('click', showImage);
}

const handleEscUp = (evt) => {
  if(evt.key === actionKey) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

const closePopupOverlay = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(activePopup);
  }
}

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile, data);
});

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));

formElementProfile.addEventListener('submit', editFormSubmit);

addCardButton.addEventListener('click', () => openPopup(popupAddCard, data));

closeButtonAddCard.addEventListener('click', () => closePopup(popupAddCard));

formElementAddCard.addEventListener('submit', addCardFormSubmit);

closeButtonImage.addEventListener('click', () => closePopup(imagePopup));


