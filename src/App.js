import React, { Component } from 'react';
//路由
import {HashRouter as Router, Route} from 'react-router-dom';
import Index from './page/index/index'
import List from './page/list/list'

class App extends Component {
  // constructor(props){
  //   super(props)
  // }
  render() {
    return (
     <Router>
       <div>
         <div id='player'></div>
         <Route exact path='/' render={() => (<Index></Index>)} />
            
  
         <Route path="/list" render={() => (<List></List>)}/>
            
         
       </div>
     </Router>
    );
  }
}

export default App;
