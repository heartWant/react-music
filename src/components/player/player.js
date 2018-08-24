import React, { Component } from 'react';
import './player.css'
import Progress from '../progress/progress';
import {Link} from 'react-router-dom';


import $ from 'jquery'
import 'jplayer';
import Pubsub from 'pubsub-js';


let duration = null //音乐播放时间初始值
class Player extends Component{
    constructor(props){
        super(props)
        this.state={
            progress:0,
            volume:0,
            isPlay:true,
            leaveTime: 0
        }   
    }

    
    componentDidMount(){
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            duration = e.jPlayer.status.duration; //音乐播放总时长
            this.setState({
                volume: e.jPlayer.options.volume * 100, //获取音量
                progress: e.jPlayer.status.currentPercentAbsolute, //进度条百分比
                leaveTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))//音乐播放剩余时间
            })
        })
    }

    //解绑事件
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    //格式化时间
    formatTime(time) {  
        let minute = Math.floor(time / 60)
        let seconds = Math.floor(time % 60)
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `-${minute} : ${seconds}s`
    }

    //暂停播放
    changeplay(){
        this.state.isPlay ? $('#player').jPlayer('pause') : $('#player').jPlayer('play')
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    // 上一曲
    prevMusic() {
        Pubsub.publish('prevMusic')
    }
    // 下一曲
    nextMusic() {
        Pubsub.publish('nextMusic')
    }

    //改变进度
    progressChangeHander(progress){
        //播放时间总产长*进度百分比
        $('#player').jPlayer('play', duration * progress)
    }

    render(){
        let animation;
        this.state.isPlay ? animation={animationPlayState:'running'}:animation={animationPlayState:'paused'}
        let currentMusicItem = this.props.currentMusicItem;
        return(
            <div className='player-container'>
                <div className='musicInfo'>
                    <div className='play-mine'><Link to='/list'>我的私人音乐坊 ></Link></div>
                    <div>歌曲名字：<span>{currentMusicItem.title}</span></div>
                    <div>歌手：<span>{currentMusicItem.artist}</span></div>
                    <div>剩余时间：<span>{this.state.leaveTime}</span></div>
                    <Progress progress={this.state.progress}  onChangeProgress={this.progressChangeHander}/>
                </div>
                <div className='musicImage'>
                    <img style={animation} src={currentMusicItem.cover} alt='' />
                </div>
                <div>
                    <div className='prev' onClick={this.prevMusic.bind(this)}>上一首</div>
                    <div className='stop' onClick={this.changeplay.bind(this)}>{this.state.isPlay?'暂停':'播放'}</div>
                    <div className='next' onClick={this.prevMusic.bind(this)}>下一首</div>
                </div>
            </div>
        )
    }
}

export default Player