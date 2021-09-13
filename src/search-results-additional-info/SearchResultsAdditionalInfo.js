import React from "react";
import './SearchResultsAdditionalInfo.css'

function SearchResultsAdditionalInfo(additionalInfo) {
    if (!additionalInfo) {
        return <></>;
    }

    const info = additionalInfo.additionalInfo;

    console.log(info);

    return (
        <div className="SearchResultsAdditionalInfo">
            <div className="SearchResultsAdditionalInfo-images-list">
                {
                    info.images.map((img, i) => (
                        <a key={++i}
                           href={img.url}>
                            <div style={{backgroundImage: `url("${img.src}")`}}
                                 className="SearchResultsAdditionalInfo-image"/>
                        </a>
                    ))
                }
            </div>
        </div>
    );
}

export default SearchResultsAdditionalInfo;
