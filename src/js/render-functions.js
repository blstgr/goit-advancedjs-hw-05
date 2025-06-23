export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(img => {
    return `
      <a href="${img.largeImageURL}" class="gallery-item">
        <img src="${img.webformatURL}" alt="${img.tags}" />
        <div class="info">
          <p><b>Likes:</b> ${img.likes}</p>
          <p><b>Views:</b> ${img.views}</p>
          <p><b>Comments:</b> ${img.comments}</p>
          <p><b>Downloads:</b> ${img.downloads}</p>
        </div>
      </a>
    `;
  }).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoadMore() {
  document.getElementById('load-more').classList.remove('hidden');
}

export function hideLoadMore() {
  document.getElementById('load-more').classList.add('hidden');
}