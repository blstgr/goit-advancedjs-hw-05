import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form');
const input = document.querySelector('input[name="search"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',});
    return;

  }

  clearGallery();
  showLoader();

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      renderGallery(images);
      lightbox.refresh();
    }
  } catch (err) {
    iziToast.error({ message: 'Something went wrong. Try again later.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});