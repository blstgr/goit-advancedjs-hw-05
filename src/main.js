import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form');
const input = document.querySelector('input[name="search"]');
const loadMoreBtn = document.getElementById('load-more');
const gallery = document.querySelector('.gallery');

const searchLoader = document.getElementById('search-loader');
const loadMoreLoader = document.getElementById('loadmore-loader');

function showSearchLoader() {
  searchLoader.classList.remove('hidden');
}
function hideSearchLoader() {
  searchLoader.classList.add('hidden');
}
function showLoadMoreLoader() {
  loadMoreLoader.classList.remove('hidden');
}
function hideLoadMoreLoader() {
  loadMoreLoader.classList.add('hidden');
}

let query = '';
let page = 1;
let totalHits = 0;
const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search term.', position: 'topRight' });
    return;
  }

  clearGallery();
  hideLoadMore();
  page = 1;

  try {
    showSearchLoader();
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();
    if (totalHits > page * 15) showLoadMore();
  } catch (err) {
    iziToast.error({ message: 'Something went wrong. Try again later.', position: 'topRight' });
  } finally {
    hideSearchLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoadMoreLoader();
  hideLoadMore();

  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits);
    lightbox.refresh();

    const cardHeight = gallery.firstElementChild?.getBoundingClientRect().height || 0;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    if (page * 15 >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMore();
    }
  } catch (err) {
    iziToast.error({ message: 'Failed to load more images.', position: 'topRight' });
  } finally {
    hideLoadMoreLoader();
  }
});