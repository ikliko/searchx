import searchIcon from '../assets/search.svg';
import micIcon from '../assets/microphone.svg';
import './Search.css';
import React, { useRef, useEffect, useState } from "react";

function Search() {
    const [query, setQuery] = useState('')
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div className="Search" ref={wrapperRef}>
            <div className="Search-input-wrapper Search-push-to-talk-helper-relative">
                <div className="Search-pre-input">
                    <div className="Search-input-icon-wrapper">
                        <img src={searchIcon}
                             className="Search-input-icon"
                             alt="search-icon"/>
                    </div>
                </div>

                <input type="text"
                       onChange={event => setQuery(event.target.value)}
                       className="Search-input"/>

                <div className="Search-post-input">
                    <div className="Search-input-clear-text">
                        {query ? 'X' : ""}
                    </div>

                    <div className="Search-input-icon-wrapper Search-push-to-talk">
                        <img src={micIcon}
                             className="Search-input-icon"
                             alt="microphone-click-to-talk"/>

                        <span className="Search-push-to-talk-helper">
                            Search by voice
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Hook detects outside click
 */
function useOutsideAlerter(ref) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log("You clicked outside of me!");
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
