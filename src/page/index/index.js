import React, { Component } from 'react';
import Header from '../../components/header/header'
import Player from '../../components/player/player'

import './index.css'
class Index extends Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return(
            <div className='container'>
                <Header />
                <Player />
            </div>
        )
    }
}

export default Index;