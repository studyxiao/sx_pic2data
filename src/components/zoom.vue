<!-- 参考：vue-zoomer: https://github.com/jarvisniu/vue-zoomer -->
<template>
  <Row>
    <Col span="20" offset="2" >
      <div
        class="container"
        @mousewheel.prevent="onMouseWheel"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
        ref="container"
      >
        <div class="wrapper" :style="wrapperStyle" ref="wrapper">
          <img src="../assets/test.gif" alt style="zoomer">
        </div>
      </div>
    </Col>
  </Row>
</template>

<script>
import {getElementAbsPos} from '../libs/utils.js'
export default {
  name: "",
  data() {
    return {
        minScale: 1,
        wrapperSize: {},
        pointerPos: {},
        transformOrigin: {'x':0, 'y': 0},
        containerWidth: 1,
        containerHeight: 1,
        containerLeft: 0,
        containerTop: 0,
        pointerPosX: -1,
        pointerPosY: -1,
        translateX: 0,
        translateY: 0,
        scale: 1,
    };
  },
  methods: {
    onMouseWheel(event) {
        // 滑动滚轮 缩放
        // 1.得到wrapper的大小 位置
        // 2. 鼠标相对wrapper位置(0-1)
        this.getSize('wrapper')
        this.getPointerPosition(event)
        this.transformOrigin['x'] = (this.pointerPos['left'] - this.wrapperSize['left']) /this.wrapperSize['width']
        this.transformOrigin['y'] = (this.pointerPos['top'] - this.wrapperSize['top']) / this.wrapperSize['height']
        this.scale = Math.pow(1.25, event.wheelDelta / 120)
        console.log(333)
    },
    onMouseDown() {
      console.log("down");
    },
    onMouseUp() {
      console.log("up");
      this.getContainerPos()
    },
    onMouseMove(event) {
        this.onPointerMove(event.clientX, event.clientY)
    },
    getSize(elementName){
        // 获得 元素的大小位置信息
        let element = this.$refs[elementName]
        let absPos = getElementAbsPos(element)
        this.wrapperSize['top'] = absPos.top
        this.wrapperSize['left'] = absPos.left
        this.wrapperSize['width'] = parseFloat(window.getComputedStyle(element).width)
        this.wrapperSize['height'] = parseFloat(window.getComputedStyle(element).height)
        console.log('111')
    },
    getPointerPosition(event){
        // 得到指针在浏览器的相对位置
        this.pointerPos['top'] = event.clientY
        this.pointerPos['left'] = event.clientX
        console.log(2222)
    },
    onWindowResize(){
        let container = this.$refs.container
    
        let styles = window.getComputedStyle(container)
        this.containerWidth = parseFloat(styles.width)
        this.containerHeight = parseFloat(styles.height)
        this.getContainerPos()
    },
    getContainerPos(){

        let container = this.$refs.container
        let absPos = getElementAbsPos(container)
        this.containerLeft = absPos['left'] || 0
        this.containerTop = absPos['top'] || 0
    },
    onPointerMove(x, y){
        // 指针移动
        this.pointerPosX = x
        this.pointerPosY = y
    }
  },
  mounted() {
      window.addEventListener('resize', this.onWindowResize)
      this.onWindowResize()
  },
  destroyed() {
      window.removeEventListener('resize', this.onWindowResize)
  },
  computed: {
      wrapperStyle(){
        //   console.log(this.translateX)
          return {
              transform: `scale(${this.scale}) `,
              transformOrigin: `${this.transformOrigin['x']*100}% ${this.transformOrigin['y']*100}%`
          }
      }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wrapper {
  transform-origin: 50% 50%;
  width: 100%;
  height: 100%;
}
.wrapper > img {
  vertical-align: top;
  -webkit-user-drag: none;
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>