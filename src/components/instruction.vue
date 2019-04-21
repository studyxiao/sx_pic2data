<template>
  <div>
    <Divider style="font-size:24px;">使用说明</Divider>
    <p style="font-size:16px;">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 本工具用来把二维直角坐标系图片转变成具体数值，导出到 excel
      后，生成矢量图。（精确度受你点击位置影响很大，尤其坐标数轴值差较大时，故数据仅作为参考使用）
    </p>
    <h2 style="font-size:18px; color:black;margin: 16px 0 8px;">步骤</h2>
    <Steps :current="0" direction="vertical">
      <Step title="加载图片" content="把要标记的图片通过拖拽或点击加载。"></Step>
      <Step
        title="确定坐标轴"
        content="点击【标记 x 起点】，然后在图中随意点（最好在x轴上，好确定数值）单击左键，会弹出对话框，需填入当前位置的横坐标值。
             再依次标记完【标记 x 终点】、【标记 y 起点】、【标记 y 终点】，标记 y 时应输入纵坐标值。"
      ></Step>
      <Step
        title="选择标记点"
        content="完成上述部分，即可在图上进行标记了，在需要标记的位置，单击左键，会在下方列表中增加数据，列表数据按照
            x 轴从小到大排列。"
      ></Step>
      <Step title="导出数据" content="排除不需要的数据后，点击导出按钮即可。"></Step>
    </Steps>
    <h2 style="font-size:18px; color:black;margin: 16px 0 8px;">示例</h2>
    <img
      width="100%"
      height="auto"
      src="http://ww1.sinaimg.cn/large/914fcb15ly1g1ckq82t08g223a16zkjt.gif"
    >
    <h2 class="other" style="font-size:18px; color:black;margin: 16px 0 8px;">其它</h2>
    <Alert type="warning" show-icon>已知 BUG: 在标记过程中请勿调整浏览器窗口大小</Alert>
    <Alert type="success" show-icon>仅在本地展示，不会上传图片及标记数据</Alert>
    <Alert show-icon>
      TODO
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
      <template
        slot="desc"
      >
      局部放大图片<br>
      反向操作<br>
      自动识别曲线

      </template>
    </Alert>
    <h2 style="font-size:18px; color:black;margin: 16px 0 8px;">最后</h2>
    <p style="font-size:14px;">
      简单实现，满足自己目前需求，后续是否更新及完善，再看需求吧。谁的需求，谁知道呢
      ~_~
    </p>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="less">
h2.other > p {
  font-size: 16px;
}
</style>