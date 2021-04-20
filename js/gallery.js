import images from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalOverlay: document.querySelector('.lightbox__overlay'),
    modalContent: document.querySelector('.lightbox__content'),
    currentImg: document.querySelector('.lightbox__image'),
    onBtnCloseModal: document.querySelector('[data-action="close-lightbox"]'),
};

const makeGalleryImageMarkup = ({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
};

const makeGalleryImagesMarkup = images.map(makeGalleryImageMarkup).join('');
// добавляем разметку в нтмл документ
refs.gallery.insertAdjacentHTML('afterbegin', makeGalleryImagesMarkup);

refs.gallery.addEventListener('click', onModalOpen);

function onModalOpen(evt) {
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }
    refs.modal.classList.add('is-open');

    showCurrentImage(evt);
    // слушатели событий для закрытия мод.окна разными способами
    refs.onBtnCloseModal.addEventListener('click', onModalClose);
    refs.modalOverlay.addEventListener('click', closeModalOnClickOverlay);
    window.addEventListener('keydown', closeModalOnPressEsc);
}

function showCurrentImage(evt) {
    evt.preventDefault();
    refs.currentImg.src = evt.target.dataset.source;
    refs.currentImg.alt = evt.target.alt;
    console.log(refs.currentImg);
}

function onModalClose() {
    refs.modal.classList.remove('is-open');
    removeAttrCurrentImg();

    refs.onBtnCloseModal.removeEventListener('click', onModalClose);
    refs.modalOverlay.removeEventListener('click', closeModalOnClickOverlay);
    window.removeEventListener('keydown', closeModalOnPressEsc);
}
function removeAttrCurrentImg() {
    refs.currentImg.src = '';
    refs.currentImg.alt = '';
}
function closeModalOnClickOverlay() {
    onModalClose();
}
function closeModalOnPressEsc(evt) {
    if (evt.code !== 'Escape') {
        return;
    }
    onModalClose();
    window.removeEventListener('keydown', closeModalOnPressEsc);
}
