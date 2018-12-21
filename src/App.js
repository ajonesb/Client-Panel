import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './components/design/Navbar'
import Dashboard from './components/design/Dashboard'
import AddClient from './components/clients/AddClients'
import ClientDetails from './components/clients/ClientDetails'
import EditClient from './components/clients/EditClient'
//Bringing in Firebase to the main app
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div>
              <Navbar />
            </div>
            <div>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/:id" component={ClientDetails} />
                <Route exact path="/client/edit/:id" component={EditClient} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
