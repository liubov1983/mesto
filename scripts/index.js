const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const closeButton = popup.querySelector('.popup__close');
const addCardButton = document.querySelector('.profile__add-button');
const formElement = popup.querySelector('.form');
const nameInput = formElement.querySelector('.form__item_el_name');
const jobInput = formElement.querySelector('.form__item_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const cardTemplate = document.querySelector('.card-template').content;
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

function openPopup(modal) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  modal.classList.add('popup_opened');
}

/* function togglePopup(modal) {
  modal.classList.toggle('popup_opened');
} */

function closePopup() {
  popup.classList.remove('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
}

function formSubmitHadler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

function createCard(data) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = data.link;
  newCard.querySelector('.card__image').alt = data.name;
  newCard.querySelector('.card__title').textContent = data.name;
  cardList.append(newCard);
}

function renderCards() {
  initialCards.forEach(createCard);
}

renderCards();


editButton.addEventListener('click', () => openPopup(popupProfile));

closeButton.addEventListener('click', closePopup);



formElement.addEventListener('submit', formSubmitHadler);


