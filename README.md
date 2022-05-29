

<div align='center'>

# snail-player
一个h5视频播放器, 功能高度完善，基本满足使用。原生插件。仅供学习，禁止商用

![issure](https://img.shields.io/github/issues/snail-boy/snail-player)
![forks](https://img.shields.io/github/forks/snail-boy/snail-player)
![stars](https://img.shields.io/github/stars/snail-boy/snail-player)
[![license](https://img.shields.io/github/license/snail-boy/snail-player)](https://github.com/snail-boy/snail-player/blob/master/LICENSE)


[演示](https://webrabbit.oss-cn-beijing.aliyuncs.com/drawingbed/snailplayer%E6%BC%94%E7%A4%BA.mp4)


<div align='left'>


<h3>Install</h3>

```js

1,npm install snail-player --save

```


<h3>Usage</h3>

``` js
2,import VueSmsCode from 'snail-player'

3
// html
<div id='snailPlayWrapper'></div>


// vue:
this.$nextTick(() => {
    new SnailPlayer({
        el: '#snailPlayVideos', // 作用元素
        src: require('@/assets/video2.mp4'), // 视频相对地址或者外部链接
        autoplay: true, //是否自动播放
        loop: true // 是否循环播放
    })
})

// js
window.onload = function () {
  new SnailPlayer({
    el: '#snailPlayWrapper',
    src: require('@/assets/video2.mp4'),
    autoplay: true,
    loop: true
  })
}

```


</div>

</div>

<h3>源码地址，欢迎star</h3>

[github地址](https://github.com/snail-boy/snail-player)

[gitee地址](https://gitee.com/snailwebboy/snail-player)
