import React from "react";
import searchIcon from '../assets/search.svg';
import './SearchAutocomplete.css';

function getOpenedAutocompletes() {
    let autocompletes = localStorage.getItem('autocompletes');

    if(!autocompletes) {
        return [];
    }

    return JSON.parse(autocompletes).map(r => decodeURI(r));
}

function SearchAutocomplete(autocomplete) {
    if (!autocomplete?.autocompleteResults?.length) {
        return <div/>;
    }

    const url = result => `http://localhost:3000/search/${result.full}`;
    const autocompletesOpened = getOpenedAutocompletes();

    console.log(autocompletesOpened);

    return (
        <div className="SearchAutocomplete">
            <div className="SearchAutocomplete-results">
                {
                    autocomplete
                        .autocompleteResults
                        .map((r, k) =>
                        (<div key={k}
                              className="SearchAutocomplete-item">
                            <a href={url(r)}
                               className={
                                   'SearchAutocomplete-item-link ' + (autocompletesOpened.includes(r.full)
                                       ? 'is-visited' : '')
                               }>
                                <img src={searchIcon}
                                     className="SearchAutocomplete-item-icon"
                                     alt="search-icon"/>
                                <span className="SearchAutocomplete-item-text">{r.q}{r.add[0] === ' ' ? <span>&nbsp;</span> : ''}<b>{r.add}</b></span>
                                </a>
                        </div>))
                }
            </div>
        </div>
    );
}

export default SearchAutocomplete;
