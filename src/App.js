import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createUser, getUser } from './services/userAPI';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  state = {
    userName: '',
    disabledButton: true,
    loadingUser: true,
    clickBtnLogin: false,
    albumId: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const MIN_SIZE = 3;
    this.setState({ [name]: value, disabledButton: (value.length < MIN_SIZE) });
  };

  Loading = async () => {
    await getUser();
    this.setState({ loadingUser: false });
  };

  handleLogin = () => {
    const { userName } = this.state;
    createUser({ name: userName });
    this.Loading();
    this.setState({ clickBtnLogin: true });
  };

  setId = (id) => {
    this.setState({ albumId: id });
  };

  render() {
    const { disabledButton, loadingUser, clickBtnLogin, albumId } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route
            exact
            path="/"
            render={
              (props) => (<Login
                { ...props }
                handleLogin={ this.handleLogin }
                handleChange={ this.handleChange }
                disabledButton={ disabledButton }
              />)
            }
          /> */}
          <Route exact path="/">
            {loadingUser ? <Login
              handleLogin={ this.handleLogin }
              handleChange={ this.handleChange }
              disabledButton={ disabledButton }
              clicked={ clickBtnLogin }
            /> : <Redirect to="/search" /> }
          </Route>
          <Route
            path="/search"
            render={ () => <Search loadingUser={ loadingUser } setId={ this.setId } /> }
          />
          <Route
            path="/album/:id"
            render={ (props) => <Album { ...props } albumId={ albumId } /> }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
