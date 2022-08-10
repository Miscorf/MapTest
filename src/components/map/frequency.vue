<template>
  <div id="frequency" style="width: 600px; height: 400px"></div>
</template>

<script>
export default {
  name: "frequency",
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
    console.log("draw_wave");
    this.draw_wave();
    // option.series.data =
  },

  methods: {
    update_data(right, left) {
      // this.option.series[0].data.shift();
      // let n = this.option.xAxis[0].data.length;
      // this.option.xAxis.data.shift();
      let random = Math.floor(Math.random() * (right - left) + left);
      this.ydata.push(random);
      console.log(this.option);
      this.option.series[0].data = this.ydata;
      this.myChart.setOption(this.option);
    },
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新");
        // this.initData(); //加载数据函数
        // this.update_data(0, 300);
      }, 500);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    // return random array[n] from left to right
    create_data(left, right, n) {
      var res = [];
      for (let index = 0; index < n; index++) {
        let random = Math.floor(Math.random() * (right - left) + left);
        console.log(random);
        res.push(random);
      }
      return res;
    },
    draw_wave() {
      var chartDom = document.getElementById("frequency");
      var myChart = this.$echarts.init(chartDom);
      var option;

      var data1 = [];
      var data2 = [];
      var data3 = [];
      var random = function (max) {
        return (Math.random() * max).toFixed(3);
      };
      for (var i = 0; i < 500; i++) {
        data1.push([random(15), random(10), random(1)]);
        data2.push([random(10), random(10), random(1)]);
        data3.push([random(15), random(10), random(1)]);
      }
      option = {
        animation: false,
        legend: {
          data: ["scatter", "scatter2", "scatter3"],
        },
        tooltip: {},
        xAxis: {
          type: "value",
          min: "dataMin",
          max: "dataMax",
          splitLine: {
            show: true,
          },
        },
        yAxis: {
          type: "value",
          min: "dataMin",
          max: "dataMax",
          splitLine: {
            show: true,
          },
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 35,
          },
          {
            type: "slider",
            show: true,
            yAxisIndex: [0],
            left: "93%",
            start: 29,
            end: 36,
          },
          {
            type: "inside",
            xAxisIndex: [0],
            start: 1,
            end: 35,
          },
          {
            type: "inside",
            yAxisIndex: [0],
            start: 29,
            end: 36,
          },
        ],
        series: [
          {
            name: "scatter",
            type: "scatter",
            itemStyle: {
              normal: {
                opacity: 0.8,
              },
            },
            symbolSize: function (val) {
              return val[2] * 40;
            },
            data: data1,
          },
          {
            name: "scatter2",
            type: "scatter",
            itemStyle: {
              normal: {
                opacity: 0.8,
              },
            },
            symbolSize: function (val) {
              return val[2] * 40;
            },
            data: data2,
          },
          {
            name: "scatter3",
            type: "scatter",
            itemStyle: {
              normal: {
                opacity: 0.8,
              },
            },
            symbolSize: function (val) {
              return val[2] * 40;
            },
            data: data3,
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style></style>
