import { default as axios } from 'axios';
import Notiflix from 'notiflix';


const formElement = document.querySelector('.search-form');
const buttonElement = document.querySelector('.buttun-submit');
const conteinerElements = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.js-load-more');
// console.log(loadMoreButton);

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39227320-d50c4892bd50959f664d77ea8';
let pageNumber = 1;
let hitsShown = 0;
let searchValue = '';

async function searchImages(query) {
  const options = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNumber,
      per_page: 40,
    },
  };

  try {
    const response = await axios.get(BASE_URL, options);
    console.log(response);
    const dataHits = response.data.hits;
    hitsShown += dataHits.length;
    const dataTotalHits = response.data.totalHits;

    if (dataHits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      conteinerElements.insertAdjacentHTML('beforeend', createMurcup(dataHits));
      console.log(dataTotalHits);
      if (hitsShown < dataTotalHits) {
        loadMoreButton.classList.replace('load-more-hidden', 'load-more');
        buttonElement.classList.replace('buttun-submit','buttun-submit-hidden');
      } else {
        loadMoreButton.classList.replace('load-more', 'load-more-hidden');
        return Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

formElement.addEventListener('submit', event => {
  event.preventDefault();
  searchValue = event.target[0].value;
  searchImages(searchValue);
});

formElement.addEventListener('change', () => {
  conteinerElements.innerHTML = '';
  loadMoreButton.classList.replace('load-more', 'load-more-hidden');
});

function createMurcup(images) {
  //   console.log(images);
  const galleryHTML = images.map(
    image =>
      `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class = "img" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${image.downloads}</b>
    </p>
  </div>
</div>
`
  );
  return galleryHTML;
}

loadMoreButton.addEventListener('click', handlerLoadMore);

function handlerLoadMore() {
  pageNumber  + 1;
  searchImages(searchValue);

}
