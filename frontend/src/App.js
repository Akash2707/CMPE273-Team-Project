import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';


//App Component
class App extends Component {
  
  render() {
    
    return (
      // <Provider store={store}>
      // {/* //Use Browser Router to route to different pages */}
      <BrowserRouter>
        <div>
        <Main/>
          {/* <Switch>
          <Route path="/travelerlogin" component={TravelerLogin}/>
            </Switch> */}
          {/* App Component Has a Child Component called Main*/}
        </div>
      </BrowserRouter>
      // </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
