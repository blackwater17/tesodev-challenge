import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';



import MainPage from '../components/MainPage'
import ResultsPage from '../components/ResultsPage';


const AppRouter = () => (
    <BrowserRouter>

        <div>
            <Switch>
                <Route path="/" component={MainPage} exact={true} />
                <Route path="/search" component={ResultsPage} />
            </Switch>
        </div>

        
    </BrowserRouter>
)

export default AppRouter;

