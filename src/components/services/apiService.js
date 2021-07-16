const API_KEY = '16865907-bf97a2667d97724c7c41d2d46';
const BASE_URL = 'https://pixabay.com/api/?';

// const fetchImages = (searchQuery, page) => {
//   const fetchUrl = `${url}q=${searchQuery}&page=${page}&key=${api}&image_type=photo&orientation=horizontal&per_page=12`;
//   return fetch(fetchUrl).then(res => res.json());
// };

function fetchImages(searchQuery, page) {
  const fetchUrl = `${BASE_URL}q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(fetchUrl).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('No response from server'));
  });
}

const api = { fetchImages };

export default api;

// export default fetchImages;
