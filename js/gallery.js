import images from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalOverlay: document.querySelector('.lightbox__overlay'),
    modalContent: document.querySelector('.lightbox__content'),
    OnBtnCloseModal: document.querySelector('[data-action="close-lightbox"]'),
};

const makeGalleryImageMarkup = ({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="#"
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
refs.OnBtnCloseModal.addEventListener('click', onModalClose);

function onModalOpen(evt) {
    if (evt.target.classList.contains('gallery__link')) {
        return;
    }
    refs.gallery.nextElementSibling.classList.add('is-open');
    
}

function onModalClose() {
    refs.gallery.nextElementSibling.classList.remove('is-open');
}
