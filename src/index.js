import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries'
import { refs } from './reference';
import * as createModule from './createDomElements';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onInputTextarea, DEBOUNCE_DELAY));

function onInputTextarea(e) {
    let userCountry = null;
    if (!e.target.value.trim()) {
        createModule.clearFeild();
        return
    }
    userCountry = e.target.value.trim();
    fetchCountries(userCountry).then(country => createModule.createMarkup(country)).catch(error => createModule.onFetchError());
};




