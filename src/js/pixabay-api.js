import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50980085-22439fb0ce1b09a2c0941d25f';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}