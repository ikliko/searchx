import React from "react";
import './SearchResultsAdditionalInfo.css'
import imageIcon from '../assets/image.svg';

function SearchResultsAdditionalInfo(additionalInfo) {
    if (!additionalInfo) {
        return <></>;
    }

    const info = additionalInfo.additionalInfo;

    return (
        <div className="SearchResultsAdditionalInfo">
            <div className="SearchResultsAdditionalInfo-images-list">
                {
                    info.images.map((img, i) => (
                        <a key={++i}
                           className="SearchResultsAdditionalInfo-image-item"
                           href={img.url}>
                            <div style={{backgroundImage: `url("${img.src}")`}}
                                 className="SearchResultsAdditionalInfo-image"/>
                        </a>
                    ))
                }

                <div className="SearchResultsAdditionalInfo-images-more">
                    <a href="https://www.google.com/search?source=univ&tbm=isch&q=react&biw=2048&bih=1010">
                        <img src={imageIcon}
                             className="SearchResultsAdditionalInfo-images-more-icon"
                             alt="image icon"/>

                        <span className="SearchResultsAdditionalInfo-images-more-text">More images</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SearchResultsAdditionalInfo;
