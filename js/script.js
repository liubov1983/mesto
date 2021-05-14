let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__descr');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
})

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})

function formSubmitHadler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHadler);
