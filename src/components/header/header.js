import React, { Component } from 'react';
import './header.css'
import logo from '../../assets/image/logo.png';
class Header extends Component{
    render(){
        return(
            <div className='component-header'>
                <img className='img' src={logo} alt='' />
                <span className='header-title'>这是我的播放器</span>
            </div>
        )
    }
}

export default Header;