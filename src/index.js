import { default as axios } from 'axios';

const formElement = document.querySelector('.search-form');
const buttonElement = document.querySelector('.buttun-submit');
const conteinerElements = document.querySelector('.gallery');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39227320-d50c4892bd50959f664d77ea8';

async function searchImages(query) {
  const options = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    },
  };

  try {
    const response = await axios.get(BASE_URL, options);
    console.log(response.data);

    const dataImg = response.data.hits;

    if (dataImg.length === 0) {
      return alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
       
     conteinerElements.insertAdjacentHTML('beforeend', createMurcup(dataImg));
    }
  } catch (error) {
    console.log(error);
  }
}

formElement.addEventListener('submit', event => {
  event.preventDefault();
  const searchValue = event.target[0].value;
    searchImages(searchValue);
    

});

function createMurcup(images) {
  console.log(images);
  const galleryHTML = images.map(
    image =>
      `

      <div class="photo-card">
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
</div>;


    
`
  );
  return galleryHTML;
}

