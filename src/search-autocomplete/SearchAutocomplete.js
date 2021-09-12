import React from "react";
import searchIcon from '../assets/search.svg';
import './SearchAutocomplete.css';

function SearchAutocomplete(autocomplete) {
    if (!autocomplete?.autocompleteResults?.length) {
        return;
    }

    const url = query => `https://www.google.com/search?q=${query}`;

    return (
        <div className="SearchAutocomplete">
            <div className="SearchAutocomplete-results">
                {
                    autocomplete.autocompleteResults.map((r, k) =>
                        (<div key={k}
                              className="SearchAutocomplete-item">
                            <a href={url(r)}
                               className="SearchAutocomplete-item-link">
                                <img src={searchIcon}
                                     className="SearchAutocomplete-item-icon"
                                     alt="search-icon"/>
                                <span className="SearchAutocomplete-item-text">{r}</span>
                                </a>
                        </div>))
                }
            </div>
        </div>
    );
}

export default SearchAutocomplete;
