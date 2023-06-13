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
        <Route path="/my-tunes" component={ Login } />
        <Route path="/my-tunes/search" component={ Search } />
        <Route path="/my-tunes/album/:id" component={ Album } />
        <Route path="/my-tunes/favorites" component={ Favorites } />
        <Route path="/my-tunes/profile" exact component={ Profile } />
        <Route path="/my-tunes/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
