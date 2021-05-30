const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_show-image');
const closeButtonProfile = popupProfile.querySelector('.popup__close');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtonAddCard = popupAddCard.querySelector('.popup__close');
const closeButtonImage = imagePopup.querySelector('.popup__close');
const formElementProfile = popupProfile.querySelector('.form');
const formElementAddCard = popupAddCard.querySelector('.form');
const nameInput = formElementProfile.querySelector('.form__item_el_name');
const jobInput = formElementProfile.querySelector('.form__item_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardList = document.querySelector('.elements__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function togglePopup(modal) {
  modal.classList.toggle('popup_opened');
}

function editFormSubmitHadler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupProfile);
}

function createCard(nameValue, linkValue) {
  const cardTemplate = document.querySelector('.card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = linkValue;
  newCard.querySelector('.card__image').alt = nameValue;
  newCard.querySelector('.card__title').textContent = nameValue;
  setEventListener(newCard);
  return newCard;
}

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  cardList.append(card);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupProfile);
});

closeButtonProfile.addEventListener('click', () => {
  togglePopup(popupProfile);
  nameInput.value = '';
  jobInput.value = '';
});

formElementProfile.addEventListener('submit', editFormSubmitHadler);

addCardButton.addEventListener('click', () => togglePopup(popupAddCard));

closeButtonAddCard.addEventListener('click', () => togglePopup(popupAddCard));

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = formElementAddCard.querySelector('.form__item_el_name').value;
  const cardLinkInput = formElementAddCard.querySelector('.form__item_el_link').value;
  const addedCard = createCard(cardNameInput, cardLinkInput);
  cardList.prepend(addedCard);
  togglePopup(popupAddCard);
}

formElementAddCard.addEventListener('submit', addCardFormSubmit);

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function addLike(evt) {
  evt.target.classList.toggle('card__icon_active');
}

function renderImage(nameValue, linkValue) {
  imagePopup.querySelector('.popup__image').src = linkValue;
  imagePopup.querySelector('.popup__image').alt = nameValue;
  imagePopup.querySelector('.popup__text').textContent = nameValue;
}

function showImage(evt) {
  const imageLink = evt.target.closest('.card').querySelector('.card__image').src;
  const imageName = evt.target.closest('.card').querySelector('.card__title').textContent;
  renderImage(imageName, imageLink);
  togglePopup(imagePopup);
}

closeButtonImage.addEventListener('click', () => togglePopup(imagePopup));

function setEventListener(element) {
  element.querySelector('.card__icon').addEventListener('click', addLike);
  element.querySelector('.card__delete').addEventListener('click', deleteCard);
  element.querySelector('.card__image').addEventListener('click', showImage);
}
















