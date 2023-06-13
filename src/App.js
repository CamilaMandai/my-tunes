import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/gh-pages-url" exact component={ Login } />
        <Route path="/gh-pages-url/search" component={ Search } />
        <Route path="/gh-pages-url/album/:id" component={ Album } />
        <Route path="/gh-pages-url/favorites" component={ Favorites } />
        <Route path="/gh-pages-url/profile" exact component={ Profile } />
        <Route path="/gh-pages-url/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
