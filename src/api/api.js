import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36553389-14e37cfcb06dd9cf4a118403b';

axios.defaults.baseURL = BASE_URL;

const imagesApi = async (keyWord, page, PER_PAGE) => {
  return axios(
    `?key=${API_KEY}&q=${keyWord}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal`);
};

export {imagesApi};
