<template>
  <div class="info">
    <h1>日志</h1>
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      height="600"
      border
      style="width: 100%; font-size: 8px"
      :row-style="{ height: '20px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ color: '#848484', fontSize: '8px', backgroundColor: '#qua' }"
    >
      <el-table-column prop="date" label="日期" width="65">  </el-table-column>
      <el-table-column prop="name" label="状态" width="60"> </el-table-column>
      <el-table-column prop="address" label="地址" width="200"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "18:09",
          name: "正常",
          address: "上海市普陀",
        },
        {
          date: "18:09",
          name: "紧急",
          address: "上海市普",
        },
        {
          date: "18:09",
          name: "正常",
          address: "上海市普陀区金",
        },
        {
          date: "18:09",
          name: "正常",
          address: "上海市普陀区金",
        },
        {
          date: "18:09",
          name: "正常",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "18:09",
          name: "正常",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "18:09",
          name: "正常",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  created() {
    this.dataRefreh();
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear();
  },
  methods: {
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新" + new Date());
        // this.initData(); //加载数据函数
        var data = {};
        var time =
          new Date().getHours().toString() + ":" + new Date().getMinutes().toString();
        data.name = "正常";
        data.date = time;
        data.address = "上海市普陀区";
        this.tableData.push(data);
      }, 5000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.name === "紧急") {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>
<style>
.el-table .warning-row {
  background: #f56c6c;
}

.el-table .success-row {
  background: #67c23a;
}
</style>
