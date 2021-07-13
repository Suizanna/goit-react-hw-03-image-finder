const api = '16865907-bf97a2667d97724c7c41d2d46';
const url = 'https://pixabay.com/api/?';

const fetchImages = (searchQuery, page) => {
  const fetchUrl = `${url}q=${searchQuery}&page=${page}&key=${api}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(fetchUrl).then(res => res.json());
};

export default fetchImages;
