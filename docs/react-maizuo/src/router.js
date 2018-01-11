/**
 * @fileOverview
 * @time 2017/12/3
 * @author liugang
 * */

import React from 'React';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {
    BrowserRouter as router,
    Route,
    HashRouter
} from 'react-router-dom';

import reducers from './reducers/index.js';
import Header from './components/header';
import Index from './containers/index';
import Movie from './containers/movie';
import MovieDetail from './containers/movie/detail';
import Cinema from './containers/cinema';
import CinemaDetail from './containers/cinema/detail';
import cinemaFilm from './containers/cinema/film';
import User from './components/User';
import seat from './containers/seat';

const store=createStore(
    reducers,
    applyMiddleware(thunk)
);


render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Route path="/" component={Header} />
                <div className="main">
                    <Route exact path="/" component={Index} />
                    <Route exact path="/movie/list/:type" component={Movie} />
                    <Route path="/movie/detail/:id" component={MovieDetail} />
                    <Route path="/cinema" exact component={Cinema} />
                    <Route path="/cinema/detail/:id" component={CinemaDetail} />
                    <Route path="/cinema/film/:id" component={cinemaFilm} />
                    <Route path="/seat/:playId" component={seat} />
                    <Route path="/user" component={User} />
                </div>
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('app')
)

