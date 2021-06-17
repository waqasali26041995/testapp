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
import PrivateRoute from './components/Route/PrivateRoute';
import PublicRoute from './components/Route/PublicRoute';
import AppLoader from './components/common/Loader/loader';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
      <AppLoader />
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/auth/login" exact />
          <PrivateRoute component={EventList} path="/event/list" exact />
          <PrivateRoute component={EventTimeTableList} path="/event/timtable/list/:eventId" exact />
          <PrivateRoute component={UserList} path="/user/list" exact />
          <PrivateRoute component={EventTimeTableSchedule} path="/event/timtable/schedule/list/:eventId" exact />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
