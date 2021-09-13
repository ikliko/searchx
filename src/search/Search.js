import searchIcon from '../assets/search.svg';
import searchPurpleIcon from '../assets/search-purple-icon.svg';
import micIcon from '../assets/microphone.svg';
import React, {useEffect, useRef, useState} from "react";
import SearchAutocomplete from "../search-autocomplete/SearchAutocomplete";
import './Search.css';
import _ from "lodash"
import {useParams} from "react-router-dom";


function Search(oneRow = false) {
    let isOneRow = false;

    if (typeof oneRow === 'object' && Object.keys(oneRow).length) {
        isOneRow = oneRow?.oneRow
    }

    const [query, setQuery] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState('');
    const [showLoading, setShowLoading] = useState('');
    const [isInputActive, setIsInputActive] = useState('');
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);

    let {queryParam} = useParams();

    useEffect(() => {
        if (queryParam) {
            setQuery(queryParam);
        }
    }, [queryParam]);


    const onInputChange = event => {
        const query = event.target.value;
        setQuery(query);
    };

    const clearInput = () => setQuery('');

    const activeInput = () => {
        setIsInputActive(true);

        if (!wrapperRef.current) {
            return;
        }

        if (autocompleteResults?.length) {
            wrapperRef.current.classList.add('show-autocomplete')
        }

        wrapperRef.current.classList.add('active')
    };

    const inactiveInput = () => {
        setIsInputActive(false);
    };

    const search = () => {
        window.location.href = `/search/${query}`;
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            search();
        }
    };

    useEffect(() => {
        _.debounce(() => {
            if (!query) {
                setAutocompleteResults(null);
                setShowAutocomplete(false);

                return;
            }
            setShowLoading(true);
            fetch(
                `http://localhost:8000/api/autocomplete/${query}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
                .then(res => res.json())
                .then(data => {
                    if (!data) {
                        return;
                    }

                    if (!data.length) {
                        setAutocompleteResults([]);
                        setShowAutocomplete(false);

                        return;
                    }

                    setAutocompleteResults(data.map(r => ({
                        full: r,
                        q: query,
                        add: r.replace(query, '')
                    })));
                    setShowAutocomplete(true);
                    setShowLoading(false);
                });
        }, 500)();

        return () => {

        }
    }, [query]);

    return (
        <div className="Search">
            <div ref={wrapperRef}
                 className={
                     'Search-input-wrapper Search-push-to-talk-helper-relative'
                     + (queryParam || showAutocomplete || autocompleteResults?.length ? ' active' : '')
                     + (showAutocomplete && autocompleteResults?.length ? ' show-autocomplete' : '')
                 }>

                <div className="Search-pre-input">
                    <div className="Search-input-icon-wrapper">
                        <img src={searchIcon}
                             className="Search-input-icon"
                             alt="search-icon"/>
                    </div>
                </div>

                <input type="text"
                       value={query}
                       onFocus={activeInput}
                       onBlur={inactiveInput}
                       onChange={onInputChange}
                       onKeyDown={handleKeyDown}
                       className="Search-input"/>

                <div className="Search-post-input">
                    <div className="Search-input-clear-text"
                         onClick={clearInput}>
                        {query ? "X" : ""}
                    </div>

                    <div className={
                        'Search-input-icon-wrapper Search-push-to-talk' + (
                            isOneRow ? ' inline-search' : ''
                        )
                    }>
                        <img src={micIcon}
                             className="Search-input-icon"
                             alt="microphone-click-to-talk"/>

                        <span className="Search-push-to-talk-helper">
                            Search by voice
                        </span>
                    </div>

                    {
                        isOneRow
                            ? <button type="button"
                                      onClick={search}
                                      className="Search-search-inline-button">
                                <img src={searchPurpleIcon} alt="search icon button"/>
                            </button>
                            : ''
                    }
                </div>

                {
                    !showLoading && autocompleteResults?.length
                        ?
                        <div className="Search-autocmplete-wrapper">
                            <SearchAutocomplete autocompleteResults={autocompleteResults}></SearchAutocomplete>
                        </div>
                        : ''
                }

                {
                    showLoading
                        ?
                        <div className="Search-autocmplete-wrapper">
                            Loading...
                        </div>
                        : ''
                }
            </div>

            {
                !isOneRow ?
                    <>
                        <button type="button" className="Search-search-button">SrchX Search</button>
                        <button type="button" className="Search-lucky-button">I'm Feeling Lucky</button>
                    </>
                    : ''
            }
        </div>
    );
}

/**
 * Hook detects outside click
 */
function useOutsideAlerter(ref) {
    const [autocompleteResults, setAutocompleteResults] = useState('');

    useEffect(() => {

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                ref.current.classList.remove('show-autocomplete');
                ref.current.classList.remove('active');

                return;
            }

            ref.current.classList.add('active');
            if (autocompleteResults?.length) {
                ref.current.classList.add('show-autocomplete');
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default Search;
