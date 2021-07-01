export const imagePopup = document.querySelector('.popup_type_show-image');
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupText = imagePopup.querySelector('.popup__text');
const actionKey = "Escape";

export function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  document.addEventListener('mousedown', closePopupOverlay);
}

const handleEscUp = (evt) => {
  if(evt.key === actionKey) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

export function closePopup(modal) {
  document.removeEventListener('keydown', handleEscUp);
  document.removeEventListener('mousedown', closePopupOverlay);
  modal.classList.remove('popup_opened');
}
