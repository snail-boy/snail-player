import Utils from './utils/index.js'
let utils = new Utils()

class snailPlayer {
  constructor(opt = {}) {
    this.el = null
    this.playVideo = null
    this.playFunc = null
    this.timer = null
    this.src = opt.src
    this.videoSrc = null
    this.fullScreen = null
    this.playBottom = null
    this.totalTime = null
    this.currentTime = null
    this.playerBtn = null
    this.progress = null // 进度条
    this.progressw = null // 进度条宽度
    this.progressFinish = null // 播完的进度
    this.videoWrapper = null // 播放器区域
    this.startAndPause = null // 开始暂停键
    this.startAndPauseStart = null // 开始按钮
    this.startAndPausePause = null // 暂停按钮
    this.rollTime = null // 滚动时间
    this.playing = false
    this.getEle()
  }

  getEle() {
    this.el = document.getElementsByClassName('snail-wrapper')[0]
    this.playVideo = document.getElementById('snailPlayVideo')
    this.videoSrc = this.playVideo.getElementsByTagName('source')[0]
    this.playFunc = document.getElementsByClassName('sn-player-progress-wrapper')[0]
    this.fullScreen = document.getElementsByClassName('snail-player-fullscreen')[0]
    this.playBottom = document.getElementsByClassName('sn-player-bottom-wrapper')[0]
    this.playerBtn = document.getElementsByClassName('sn-player-btn')[0]
    this.progress = utils.classEle('sn-player-progress')
    this.progressFinish = utils.classEle('sn-player-progress-player')
    this.videoWrapper = utils.classEle('sn-player-video-wrapper')

    this.startAndPause = utils.classEle('sn-player-start-end-box')
    this.startAndPauseStart = utils.classEle('sn-player-start-end-start')
    this.startAndPausePause = utils.classEle('sn-player-start-end-pause')

    this.rollTime = utils.classEle('sn-player-roll-time')

    this.progressw = this.progress.getBoundingClientRect().width
    this.init()
    // this.funcToShow()
    this.setValue()
    this.fullScreenFun()
    this.videoFunc()
    this.eventFun()
  }

  init() {
    this.playerOperate()
    // 总时间
    this.totalTime = utils.formatSeconds(this.playVideo.duration)
    utils.changeInnerText('sn-player-total-time', this.totalTime)

    // 播放时间当前时间
    this.playVideo.ontimeupdate = ()  => {
      this.currentTime = utils.formatSeconds(this.playVideo.currentTime)
      utils.changeInnerText('sn-player-current-time', this.currentTime)
      // 进度条滚动
      console.log(this.progressCalculate(), 'this.progressCalculate()')
       this.progressFinish.style.width = this.progressCalculate() + 'px'
    }

    // 播放结束后
    this.playVideo.onended = () => {
      utils.hiddenClass('sn-player-player-start')
      utils.showClass('sn-player-player-pause')
    }

    // 点击任意播放器区域，暂停或开始
    this.videoWrapper.onclick = () => {
      if (!this.playing) {
        this.playVideo.play()
        utils.hiddenClass('sn-player-player-start')
        utils.showClass('sn-player-player-pause')
        utils.addClass(this.startAndPauseStart, 'sn-player-start-end-box-active')
        utils.removeClass(this.startAndPausePause, 'sn-player-start-end-box-active')
        this.playing = true
      }else {
        this.playVideo.pause()
        utils.hiddenClass('sn-player-player-pause')
        utils.showClass('sn-player-player-start')
        utils.removeClass(this.startAndPauseStart, 'sn-player-start-end-box-active')
        utils.addClass(this.startAndPausePause, 'sn-player-start-end-box-active')
        this.playing = false
      }
    }

    // 鼠标移动时，时间随着移动

  }

  // 监听事件
  eventFun() {
    this.progress.addEventListener('mousemove', (e) => {
      // console.log(e.offsetX)
      console.log(this.progressTime(e.offsetX), 'this.progressTime(e.offsetY)')
      utils.changeInnerText('sn-player-roll-time', this.progressTime(e.offsetX))
      utils.showClass('sn-player-roll-time')
      this.rollTime.style.left = e.offsetX - 20 + 'px'
    })
    this.progress.addEventListener('mouseout', (e) => {
      utils.hiddenClass('sn-player-roll-time')
    })
  }

  // 计算进度条时间
   progressTime(offsetY) {
     return utils.formatSeconds((offsetY / this.progressw * this.playVideo.duration).toFixed(2))
   }


  // 进度条计算公式
  progressCalculate() {
    return (this.progressw / this.playVideo.duration * this.playVideo.currentTime).toFixed(2)
  }

  funcToShow() {
    this.playVideo.onmouseover =  () => {
      clearTimeout(this.timer)
     utils.addClass(this.playFunc, 'func-active')
    }

    this.playVideo.onmouseout = () => {
      this.timer = setTimeout(() => {
        utils.removeClass(this.playFunc, 'func-active')
      }, 100)
    }

    this.playFunc.onmouseover = () => {
      clearTimeout(this.timer)
      utils.addClass(this.playFunc, 'func-active')
    }
    this.playFunc.onmouseout = () => {
      this.timer = setTimeout(() => {
        utils.removeClass(this.playFunc, 'func-active')
      }, 100)
    }
  }
 // 全屏
  fullScreenFun() {
    const docElm = document.documentElement
    this.fullScreen.onclick =  () => {
      if( !utils.hasClass(this.el, 'fullscreen-active') ) {
        utils.addClass(this.el, 'fullscreen-active')
        utils.addClass(this.playVideo, 'fullscreen-active')
        utils.showClass('snail-player-full-screen-icon')
        utils.hiddenClass('snail-player-fullscreen-btn')
        utils.changeInnerText('fullscreen-icon', '退出全屏')
        utils.addClass(this.playBottom, 'sn-player-fullscreen-bottom-active')
        setTimeout(() => {
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
          } else if (document.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
          }
        }, 100)
      }else {
        if(document.exitFullscreen) {
          document.exitFullscreen();
        }else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }else if(document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        utils.removeClass(this.el, 'fullscreen-active')
        utils.removeClass(this.playVideo, 'fullscreen-active')
        utils.hiddenClass('snail-player-full-screen-icon')
        utils.showClass('snail-player-fullscreen-btn')
        utils.changeInnerText('fullscreen-icon', '进入全屏')
        utils.removeClass(this.playBottom, 'sn-player-fullscreen-bottom-active')
      }
    }
  }



  // 设置值
  setValue() {

  }

  videoFunc() {

  }

  // 操作
  playerOperate() {
    this.playerBtn.onclick = () => {
      if (!this.playing) {
        this.playVideo.play()
        utils.hiddenClass('sn-player-player-start')
        utils.showClass('sn-player-player-pause')
        this.playing = true
      }else {
        this.playVideo.pause()
        utils.hiddenClass('sn-player-player-pause')
        utils.showClass('sn-player-player-start')
        this.playing = false
      }
    }
  }

}

export default snailPlayer
