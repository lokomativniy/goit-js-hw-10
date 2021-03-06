import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countries from './fetchCountries';
import infoOfCountry from './templates/country-info.hbs';
import listOfCountries from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const name = e.target.value.trim();
  if (name) {
    countries.fetchCountries(name).then(renderMarkap).catch(error);
  }
  clearRenderMarkap();
}

function clearRenderMarkap() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderMarkap(country) {
  if (country.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (country.length <= 10 && country.length >= 2) {
    countryList.innerHTML = listOfCountries(country);
  }
  if (country.length === 1) {
    countryInfo.innerHTML = infoOfCountry(country);
  }
}

function error() {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
}
