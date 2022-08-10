<template>
  <div>
    <div class="info2">
      <el-tabs v-model="name" @click="handleClick()">
        <el-tab-pane label="地图管理" name="first">地图管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <div slot="label" @click="changeLineLayer">配置管理</div>
        </el-tab-pane>
        <el-tab-pane label="图层管理" name="third">
          <div slot="label" @click="changeLayer">数据点图层</div>
        </el-tab-pane>

        <el-tab-pane label="波形图" name="fourth">
          <div slot="label" @click="handleClick()">波形图</div>
        </el-tab-pane>
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px">
          点我打开
        </el-button>
        <el-button @click="testForUrl()" type="primary" style="margin-left: 16px">
          测试
        </el-button>
      </el-tabs>
    </div>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :modal="false"
      :wrapperClosable="false"
      size="40%"
    >
      <Voice></Voice>
    </el-drawer>
  </div>
</template>

<script>
import Voice from "@/components/voice";
import { testUrl } from "@/api/test";
export default {
  components: {
    Voice,
  },
  data() {
    return {
      drawer: false,
      direction: "btt",
    };
  },
  methods: {
    testForUrl() {
      console.log("test!!!");
      testUrl().then((response) => {
        console.log(response);
      });
    },
    fetchData() {
      getAnswerList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        console.log(this.list);
      });
    },
    changeLineLayer() {
      console.log("changeLineLayer");
      this.$emit("changeLineLayer");
    },
    changeLayer() {
      console.log("showMarkets");
      this.$emit("showMarkets");
    },
    handleClick() {
      console.log("sdad");
      this.drawer = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style></style>
