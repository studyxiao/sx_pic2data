<template>
  <Row>
    <Col span="22" offset="1" :md="{span: 18, offset: 3}">
      <h1 class="title">直角坐标系图片转变成具体数值</h1>
      <Divider size="small"></Divider>
      <!-- control -->
      <Row :gutter="16" class="control">
        <Col :md="14" span="22">
          <Tooltip v-if="curStatus===status['upload']" content="请先上传一张图片" placement="top">
            <Button disabled type="primary">标记 x 起点</Button>
            <Button disabled type="primary">标记 x 终点</Button>
            <Button disabled type="info">标记 y 起点</Button>
            <Button disabled type="info">标记 y 终点</Button>
          </Tooltip>
          <template v-else>
            <Button type="primary" @click="markXY('xstart')">标记 x 起点</Button>
            <Button type="primary" @click="markXY('xend')">标记 x 终点</Button>
            <Button type="info" @click="markXY('ystart')">标记 y 起点</Button>
            <Button type="info" @click="markXY('yend')">标记 y 终点</Button>
          </template>
          <Tooltip content="保留小数点后几位？最大10位" placement="top">
            <span style="margin-right:8px; margin-bottom:16px;line-height:100%">精确度</span>
          </Tooltip>
          <Input-number style="margin-bottom:8px;" :max="10" :min="0" v-model="accuracy"></Input-number>
        </Col>
        <Col :md="9" span="22" style="text-align: right;">
          <Tooltip content="清除所有标记点，请提前保存数据" placement="top">
            <Button type="error">数据重置</Button>
          </Tooltip>
          <Tooltip content="再选一张，请提前保存数据" placement="top">
            <Button type="success">重新开始</Button>
          </Tooltip>
        </Col>
      </Row>

      <!-- workspace -->
      <Row>
        <Col span="24" >
          <div @click="setMark" :class="{'mark-cursor': markCursor}">
          <Upload
            v-if="curStatus === status['upload']"
            ref="loadImg"
            type="drag"
            action="/#"
            :before-upload="loadImg"
            :format="['jpg','jpeg','png']"
          >
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将图片拖拽到这里加载</p>
            </div>
          </Upload>
          <img v-else ref="img" width="100%" height="auto" :src="img" alt>
          </div>
        </Col>
      </Row>
      <Divider dashed size="small"></Divider>
      <!-- table -->
      <Card title="标记点坐标值" dis-hover style="min-height:400px">
        <Row>
          <i-button icon="md-download" :loading="exportLoading" @click="exportExcel">数据导出到 excel</i-button>
          <i-table border :columns="columns" :data="sortedNodes"></i-table>
        </Row>
      </Card>
      <instruction/>
    </Col>
    <BackTop></BackTop>
    <!-- <div :class="{'zoom': markCursor}"></div> -->
  </Row>
</template>

<script>
import Instruction from "../components/instruction.vue";
export default {
  name: "",
  data() {
    return {
      accuracy: 0, // 精确度，保留小数点后几位
      status: {
        upload: "upload", // 上传
        markXY: "markXY", // 确定单位长度
        mark: "mark" // 标记
      }, // 状态
      curStatus: "upload", // 当前状态
      myObserver: null, // dom 变化监控
      img: "", // 加载的图片
      markCursor: false,
      columns: [],
      sortedNodes: [],
      exportLoading: false // 正在导出数据
    };
  },
  components: {
    Instruction
  },
  methods: {
    loadImg(file) {
      // 加载图片
      const imgUrl = window.URL.createObjectURL(file);
      this.img = imgUrl;
      this.curStatus = status["markXY"];
      this.$nextTick(() => {
        const _img = this.$refs.img;
        this.myObserver.observe(_img);
      });
    },
    getImgSize() {
      // 监控 img dom 大小变化
      this.myObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          // 获得 Img 宽高
          this.imgWidth = entry.contentRect.width;
          this.imgHeight = entry.contentRect.height;
        });
      });
    },
    markXY(position) {
      // 标记坐标
      let content = "";
      switch (position) {
        case "xstart":
          content = "标记 x 起点";
          break;
        case "xend":
          content = "标记 x 终点";
          break;
        case "ystart":
          content = "标记 y 起点";
          break;
        case "yend":
          content = "标记 y 终点";
          break;
      }
      if(!this.markCursor){
        this.$Message.info({ content: content, duration: 3 });
      }else{
        this.$Message.info({ content: `取消${content}`, duration: 3 });
      }
      this.markCursor = !this.markCursor
      
    },
    setMark(e){
      const x = e.offsetX
      const y = e.offsetY
      console.log(x, y)
    },
    exportExcel() {}
  },
  mounted() {
    this.getImgSize();
  },
  beforeDestroyed() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer.takeRecords();
      this.observer = null;
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  padding-top: 36px;
  text-align: center;
}
.control button {
  margin-right: 8px;
  margin-bottom: 8px;
}
.mark-cursor {
  cursor: crosshair;
}
.zoom{
  width: 200px;
  height: 200px;
  position: fixed;
  right: 24px;
  bottom: 24px;
  background: black;
}
</style>