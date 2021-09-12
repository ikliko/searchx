import logo from './logo.svg';
import './App.css';
import Search from "./search/Search";


/////////////


import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/search/:query">
                        <SearchResultsPage />
                    </Route>

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <>
        <div className="App">
            <header className="App-header">
                <img src={logo}
                     className="App-logo"
                     alt="logo" />

                <Search />
            </header>
        </div>
    </>;
}

function SearchResultsPage() {
    let { query } = useParams();
    console.log(query);
    return <h2>About</h2>;
}
