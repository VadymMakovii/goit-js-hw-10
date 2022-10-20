import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './reference';
export { onFetchError, createMarkup, clearFeild };

function clearFeild() {
    refs.countryListEl.innerHTML = '';
    refs.countryInfoEl.innerHTML = '';
};
 
function onFetchError() {
    clearFeild();
    Notify.failure('Oops, there is no country with that name', {position: 'center-top', width: '300px', fontSize: '16px', cssAnimationStyle: 'zoom', pauseOnHover: false, showOnlyTheLastOne: true});
}

function createMarkup(data) {
    if (data.length > 1 && data.length < 10) {
        clearFeild();
        const markup = createCountryList(data);
        refs.countryListEl.insertAdjacentHTML('afterbegin', markup);
    } else if (data.length > 10) {
        clearFeild();
        Notify.info('Too many matches found. Please enter a more specific name.', {position: 'center-top', width: '300px', fontSize: '16px', cssAnimationStyle: 'zoom', pauseOnHover: false, showOnlyTheLastOne: true});
    } else {
        clearFeild();
        const markup = createCountryElement(...data);
        refs.countryInfoEl.insertAdjacentHTML('afterbegin', markup);
    };
};

function createCountryElement(arr) {
    const language = Object.values(arr.languages).join(', ');
    return `<div class="country-item">
        <img
            class="country-item_image"
            src="${arr.flags.svg}"
            alt="flag of ${arr.name.official}"
            />
            <p class="country-item_name country-item_name__zoom">${arr.name.official}</p>
    </div>
    <p><span class="country-item_title">Capital:</span> ${arr.capital}</p>
    <p><span class="country-item_title">Population:</span> ${arr.population}</p>
    <p><span class="country-item_title">Languages:</span> ${language}</p>`;
};

function createCountryList(arr) {
     return arr.map(({ name, flags }) => {
         return `<li class="country-item">
            <img
            class="country-item_image"
            src="${flags.svg}"
            alt="flag of ${name.official}"
            />
            <p class="country-item_name">${name.official}</p>
        </li>`
    }).join('');
};