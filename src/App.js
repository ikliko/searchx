import logo from './logo.svg';
import './App.css';
import Search from "./search/Search";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SearchResults from "./search-results/SearchResults";

export default function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route path="/search/:queryParam">
                            <SearchResultsPage/>
                        </Route>

                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

function Home() {
    return <>
        <header className="App-header">
            <img src={logo}
                 className="App-logo"
                 alt="logo"/>

            <Search/>
        </header>
    </>;
}

function SearchResultsPage() {

    return <>
        <SearchResults></SearchResults>
    </>;
}
