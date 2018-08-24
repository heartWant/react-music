import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Item from '../../components/musicItem/musicItem';
import './list.css'
class List extends Component{
    render(){
        let listItem = this.props.musicList.map((item)=>{
            return (
                <Item key={item.id} musicItem={item}></Item>
            )
        })
        return(
            <div className='list'>
                 <h2>歌曲列表 <Link to='/'>返回首页</Link></h2>
                <ul>
                    {listItem}
                </ul>
            </div>
        )
    }
}

export default List;