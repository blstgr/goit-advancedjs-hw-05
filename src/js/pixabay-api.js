export async function fetchImages(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '50980085-22439fb0ce1b09a2c0941d25f';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.hits;
}