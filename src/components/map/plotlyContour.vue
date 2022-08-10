<template>
  <div>
    <el-container>
      <el-aside width="80%"
        ><div id="myDiv" style="width: 100%; height: 90%"></div
      ></el-aside>
      <el-main width="20%">
        <el-header>
          <el-row>
            <el-col :span="24" style="text-align: right">
              <el-button type="primary" plain>Setting</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="text-align: left">
          <!-- <el-tag type="info" style="text-align: left">Control</el-tag> -->
          <el-row>
            <el-col :span="24" style="font-size: 16; margin-bottom: 10px">Control</el-col>
          </el-row>
          <el-row>
            <el-button type="success" plain>Start</el-button>
            <el-button type="danger" plain>Stop</el-button>
          </el-row>

          <el-row>
            <el-col
              :span="20"
              style="font-size: 16; margin-bottom: 10px; margin-top: 10px"
              >Select Run Type</el-col
            >
          </el-row>
          <el-row>
            <el-checkbox v-model="checked">All Run</el-checkbox>
            <el-checkbox v-model="checked">HDF5toSAC</el-checkbox>
            <el-checkbox v-model="checked">Calculate CCFs</el-checkbox>
            <el-checkbox v-model="checked">Plot CCFs</el-checkbox>
            <el-checkbox v-model="checked">Calculate Dispen</el-checkbox>
            <el-checkbox v-model="checked">pick Dispen</el-checkbox>
            <el-checkbox v-model="checked">DArrySurfTomo</el-checkbox>
          </el-row>

          <el-row>
            <el-col
              :span="20"
              style="font-size: 16; margin-bottom: 10px; margin-top: 10px"
              >Message</el-col
            >
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="box-card">
                <div v-for="o in 8" :key="o" class="text item">
                  {{ "MESSAGE " + o }}
                </div>
              </el-card></el-col
            >
          </el-row>
        </el-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "plotyContour",
  components: {},
  data() {
    return {
      option: {},
      myChart: "",
      ydata: [],
    };
  },
  created() {
    this.dataRefreh();
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear();
  },
  mounted() {
    this.draw();
  },

  methods: {
    draw() {
      var data = [
        {
          z: [
            [10, 10.625, 12.5, 15.625, 20],
            [5.625, 6.25, 8.125, 11.25, 15.625],
            [2.5, 3.125, 20, 8.125, 10],
            [0.625, 1.25, 3.125, 6.25, 10.625],
            [0, 0.625, 10, 5.625, 10],
          ],
          type: "contour",
          contours: {
            coloring: "heatmap",
            showlabels: true,
            labelfont: {
              family: "Raleway",
              size: 18,
              color: "black",
            },
          },
        },
      ];

      var layout = {
        title: "CONTOUR MAP",
      };
      var config = {
        scrollZoom: true,
      };

      Plotly.newPlot("myDiv", data, layout, config);
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 8px 0;
}

.box-card {
  width: 180px;
}
</style>
