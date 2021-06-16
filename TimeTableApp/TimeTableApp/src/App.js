import React from 'react';
import EventList from './Components/EventManagement/Event/list'
import EventTimeTableList from './Components/EventTimeTableManagement/TimeTable/EventTimeTableList'
import EventTimeTableSchedule from './Components/EventTimeTableManagement/TimeTable/EventTimeTableSchedule'
import './App.css';
import Login from './account/Login/Login';
import useToken from './account/useToken';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/nav/Header/header'
import Footer from './Components/nav/Footer/footer'
import jwtDecode from 'jwt-decode';
import CreateOrUpdateEvent from './Components/EventManagement/CreateOrUpdateEvent/CreateOrUpdateEvent';
import UserList from './Components/UserManagement/UserList/UserList';
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
