import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';

const routes: React.FC = () => {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/" exact component={Landing}/>
    <Route path="/app" component={OrphanagesMap}/>
    </Switch>
    </BrowserRouter>
  );
}

export default routes;