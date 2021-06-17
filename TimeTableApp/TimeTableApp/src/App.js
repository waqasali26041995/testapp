import React from 'react';
import EventList from './components/FeatureComponents/Event/List/list'
import EventTimeTableList from './components/FeatureComponents/EventTimeTable/List/EventTimeTableList'
import EventTimeTableSchedule from './components/FeatureComponents/EventTimeTable/List/EventTimeTableSchedule'
import './App.css';
import Login from './components/FeatureComponents/Account/Login/Login';
import useToken from './AuthTokenProvider/useToken';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/nav/Header/header'
import Footer from './components/common/nav/Footer/footer'
import jwtDecode from 'jwt-decode';
import CreateOrUpdateEvent from './components/FeatureComponents/Event/CreateUpdate/CreateOrUpdateEvent';
import UserList from './components/FeatureComponents/User/List/UserList';
import 'react-notifications/lib/notifications.css';

function App() {
  const { token, setToken } = useToken();
  if (token) {
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 60000
    if (Date.now() >= expirationTime) {
      localStorage.removeItem('token');
    }
  }

  if (!token) {
    return (
      <>
        <Header />
        <Login setToken={setToken} />
      </>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/event/list">
            <EventList />
          </Route>
          <Route exact path="/event/timtable/list/:eventId">
            <EventTimeTableList />
          </Route>
          <Route exact path="/event/createorupdate">
            <CreateOrUpdateEvent />
          </Route>
          <Route exact path="/user/list">
            <UserList />
          </Route>
          <Route exact path="/auth/login">
            <Login setToken={setToken} />
          </Route>
          <Route exact path="/event/timtable/schedule/list/:eventId">
            <EventTimeTableSchedule />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
