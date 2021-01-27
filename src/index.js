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
    this.getEle()
  }

  getEle() {
    this.el = document.getElementsByClassName('snail-wrapper')[0]
    this.playVideo = document.getElementById('snailPlayVideo')
    this.videoSrc = this.playVideo.getElementsByTagName('source')[0]
    this.playFunc = document.getElementsByClassName('sn-player-progress-wrapper')[0]
    this.fullScreen = document.getElementsByClassName('snail-player-fullscreen')[0]
    this.playBottom = document.getElementsByClassName('sn-player-bottom-wrapper')[0]
    // this.funcToShow()
    this.setValue()
    this.fullScreenFun()
    this.getVideoTime()
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

  // 获取视屏的长度
  getVideoTime() {
    const file =  this.playVideo;
    this.totalTime = utils.formatSeconds(file.duration)
    utils.changeInnerText('sn-player-total-time', this.totalTime)
  }


  // 设置值
  setValue() {

  }



}

export default snailPlayer
