function fetchImg(searchName, page) {
  const KEY = `23988775-fe34227dea44092583bc60426`;
  return fetch(
    `https://pixabay.com/api/?q=${searchName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`No images on request`));
  });
}

const api = { fetchImg };

export default api;
