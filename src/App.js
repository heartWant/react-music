import React, { Component } from 'react';
import $ from 'jquery'
import 'jplayer'
import Pubsub from 'pubsub-js'
//路由
import {HashRouter as Router, Route} from 'react-router-dom';
import Index from './page/index/index'
import MusicList from './page/list/list'
import MUSIC_LIST from './config/musicList'
// import Pubsub from 'pubsub-js'
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      currentMusicItem:MUSIC_LIST[0],
      musicList: MUSIC_LIST,
    }
  }

  //播放音乐
  playmusic(musicItem){
    $('#player').jPlayer('setMedia',{
      mp3:musicItem.file
    }).jPlayer('play')
    this.setState({
      currentMusicItem: musicItem
    })
  }

  findMusicIndex(musicItem){
    return this.state.musicList.indexOf(musicItem)
  }
  //播放上一首下一首
  playNext(type = 'next'){
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    switch (type){
      case 'prev' :
      newIndex = (index - 1 + musicListLength) % musicListLength;
      break;
      default:
      newIndex = (index + 1) % musicListLength
    }
    this.playmusic(this.state.musicList[newIndex])
  }

  componentDidMount(){
    $('#player').jPlayer({
      supplied: 'mp3',
      wnode: 'window'
    })
    this.playmusic(this.state.currentMusicItem)

    // 监听音乐播放 如果播放完了播放下一曲
    $('#player').bind($.jPlayer.event.ended,()=>{
      this.playNext('next');
    })
    //上一曲
    Pubsub.subscribe('prevMusic',()=>{
      this.playNext('prev')
    })
    //下一曲
    Pubsub.subscribe('nextMusic',()=>{
      this.playNext('next')
    })

    //选择歌曲
    Pubsub.subscribe('CHOOSE_MUSIC',(msg,musicItem)=>{
      this.setState({
        currentMusicItem:musicItem
      })
      this.playmusic(musicItem)
    })

    //删除歌曲
    Pubsub.subscribe('Delete_MUSIC',(msg,musicItem)=>{
      console.log(musicItem)
      this.setState({
        musicList:this.state.musicList.filter((item)=>{
          return item !== musicItem
        })
      })
    })

  }

  componentWillUnmount(){
    $('#player').unbind($.jPlayer.event.ended);
    Pubsub.unSubscribe('preMusic');
    Pubsub.unSubscribe('nextMusic');
  }
 
  render() {
    return (
     <Router>
       <div>
         <div id='player'></div>
         <Route exact path='/' render={() => (<Index currentMusicItem={this.state.currentMusicItem}></Index>)} />
         <Route path="/list" render={() => (<MusicList musicList={this.state.musicList}></MusicList>)}/>    
       </div>
     </Router>
    );
  }
}

export default App;
