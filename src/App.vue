<template>
  <div id="app">
    <router-view></router-view>
    <Row type="flex" justify="center">
      <p style="margin: 50px auto;font-size:16px;">
        2019 &copy;
        <a href="http://daohang.studyxiao.cn">Studyxiao</a> 
        <Divider type="vertical" style="background: #333333;"></Divider>
        技术支持
        <a href="https://cn.vuejs.org/" target="_blank">Vue</a> 
        <span>&nbsp;&amp;&nbsp;</span>
        <a href="https://iview.github.io/" target="blank">iView</a>
      </p>
    </Row>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>

<style>
</style>
