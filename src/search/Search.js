import './Search.css';

function Search() {
    return (
        <div className="Search">
            <div className="Search-input-wrapper">
                <div className="Search-pre-input"></div>
                <input type="text" className="Search-input"/>
                <div className="Search-post-input"></div>
            </div>
        </div>
    );
}

export default Search;
