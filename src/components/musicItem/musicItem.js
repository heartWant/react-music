import React, { Component } from 'react';
import './musicItem.css';
import Pubsub from 'pubsub-js'

class Item extends Component{
    // 选择歌曲
    selectItem(musicItem) {
        Pubsub.publish('CHOOSE_MUSIC', musicItem)
    }

    // 删除歌曲
    deleteItem(musicItem, e) {
        e.stopPropagation()
        Pubsub.publish('Delete_MUSIC', musicItem)
    }


    render(){
        let musicItem = this.props.musicItem;
        return(
            <div>
                <li onClick={this.selectItem.bind(this, musicItem)} key={musicItem.key}>
                    <span>
                        <strong>{musicItem.title}</strong>
                        <span>{musicItem.artist}</span>
                    </span>
                    <button onClick={this.deleteItem.bind(this,musicItem)}>删除</button>
                </li>
            </div>
        )
    }
}

export default Item;