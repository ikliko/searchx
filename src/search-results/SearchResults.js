import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Search from "../search/Search";
import './SearchResults.css'
import logo from '../logo.svg';
import SearchResultsAdditionalInfo from "../search-results-additional-info/SearchResultsAdditionalInfo";

function showSnippet(item) {
    const snippet = item.snippet;

    if (snippet.length > 150) {
        return `${snippet.slice(0, 147)}...`
    }

    return snippet;
}

function showTitle(item) {
    const title = item.title;

    if (title.length > 63) {
        return `${title.slice(0, 60)}...`
    }

    return title;
}

function showLink(item) {
    const link = item.url;

    if (link.length > 50) {
        return `${link.slice(0, 47)}...`
    }

    return link;
}

function savePageToStorage() {
    const query = window.location.pathname.split('/').pop();

    let autocompletes = localStorage.getItem('autocompletes');

    if (!autocompletes) {
        localStorage.setItem('autocompletes', JSON.stringify([query]));

        return;
    }

    autocompletes = JSON.parse(autocompletes);

    if(autocompletes.find(r => r === query)) {
        return;
    }

    autocompletes.push(query);
    localStorage.setItem('autocompletes', JSON.stringify(autocompletes));
}

function getOpenedAutocompletes() {
    let autocompletes = localStorage.getItem('autocompletes');

    if(!autocompletes) {
        return [];
    }

    return JSON.parse(autocompletes).map(r => decodeURI(r));
}

function SearchResults() {
    const [results, setResults] = useState('');
    let {queryParam} = useParams();
    const autocompletesOpened = getOpenedAutocompletes();

    savePageToStorage();

    useEffect(() => {
        fetch(
            `http://localhost:8000/api/search/${queryParam}`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log(111, data);

                if (!data) {
                    setResults(null);
                    return;
                }

                setResults(data);
            });
    }, [queryParam]);

    const handleLogoClick = e => {
        window.location.href = `/`;
    };

    // console.log(queryParam,autocompletesOpened.include(queryParam));

    return (
        <div className="SearchResults">
            <div className="SearchResults-search-wrapper">
                <img src={logo}
                     onClick={handleLogoClick}
                     className="SearchResults-logo"
                     alt="logo"/>

                <Search oneRow={true}/>
            </div>

            <hr/>

            <div className="SearchResults-results-wrapper">
                <div className="Search-results-list">
                    {
                        results?.results
                            ? results.results.map((item, i) =>
                                <div key={++i}
                                     className="SearchResults-results-item">
                                <span className="SearchResults-results-item-url">
                                    {showLink(item)}
                                </span>

                                    <h2 className="SearchResults-results-item-title is-visited">
                                        <a href={item.url}>{showTitle(item)}</a>
                                    </h2>

                                    <div className="SearchResults-results-item-description">
                                        {showSnippet(item)}
                                    </div>
                                </div>
                            ) : ''
                    }
                </div>

                {results?.additional_info ?
                    <SearchResultsAdditionalInfo additionalInfo={results.additional_info}/> : ''}
            </div>
        </div>
    );
}

export default SearchResults;
