import React, { Component } from 'react'
import {Route} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import Info from "./Info";
import List from "./List";
class App extends Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }

  render() {
      return (
      <div className='row pt-5'>
         <Router>
          <Route path="/:page" component={List}/>
          <Route path="/info/:id" component={Info}/>
          </Router>
    </div>
   );
  }
}

export default App;
