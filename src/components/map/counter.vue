<template>
  <div>
    <div style="height: 1000px; height: 800px">
      <div id="equal_line_map" style="width: 900; height: 600"></div>
    </div>
  </div>
</template>

<script>
// 引入d3
import * as d3 from "d3";

export default {
  data() {
    return {
      data: [73, 52, 33, 22, 14, 68],
    };
  },
  methods: {
    value(x, y) {
      let res =
        (1 +
          (x + y + 1) ** 2 *
            (19 - 14 * x + 3 * x ** 2 - 14 * y + 6 * x * y + 3 * y ** 2)) *
        (30 +
          (2 * x - 3 * y) ** 2 *
            (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y ** 2));
      return res;
    },
    draw_count2() {},
    draw_count() {
      console.log("afaf");
      function chart() {
        let width = 900;
        let height = 600;
        const svg = d3
          .create("svg")
          .attr("viewBox", [0, 0, width + 28, height])
          .style("display", "block")
          .style("margin", "0 -14px")
          .style("width", "calc(100% + 28px)");

        svg
          .append("g")
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-opacity", 0.5)
          .selectAll("path")
          .data(contours)
          .join("path")
          .attr("fill", (d) => color(d.value))
          .attr("d", d3.geoPath());

        svg.append("g").call(xAxis);

        svg.append("g").call(yAxis);

        return svg.node();
      }
      document.getElementById("equal_line_map").appendchild(chart());
      console.log(document.getElementById("equal_line_map"));
      let color = d3.scaleSequentialLog(d3.extent(thresholds), d3.interpolateMagma);

      let thresholds = d3.range(1, 20).map((i) => Math.pow(2, i));

      let width = svg.attr("width");
      let height = svg.attr("height");
      height = 600;
      function grid() {
        const q = 4; // The level of detail, e.g., sample every 4 pixels in x and y.
        const x0 = -q / 2,
          x1 = width + 28 + q;
        const y0 = -q / 2,
          y1 = height + q;
        const n = Math.ceil((x1 - x0) / q);
        const m = Math.ceil((y1 - y0) / q);
        const grid = new Array(n * m);
        for (let j = 0; j < m; ++j) {
          for (let i = 0; i < n; ++i) {
            grid[j * n + i] = value(x.invert(i * q + x0), y.invert(j * q + y0));
          }
        }
        grid.x = -q;
        grid.y = -q;
        grid.k = q;
        grid.n = n;
        grid.m = m;
        return grid;
      }
      function transform(type, value, coordinates) {
        return {
          type,
          value,
          coordinates: coordinates.map((rings) => {
            return rings.map((points) => {
              return points.map(([x, y]) => [grid.x + grid.k * x, grid.y + grid.k * y]);
            });
          }),
        };
      }

      let contours = d3
        .contours()
        .size([grid.n, grid.m])
        .thresholds(thresholds)(grid)
        .map(transform);

      let x = d3.scaleLinear([-2, 2], [0, width + 28]);
      let y = d3.scaleLinear([-2, 1], [height, 0]);
      function xAxis(g) {
        g.attr("transform", `translate(0,${height})`)
          .call(d3.axisTop(x).ticks((width / height) * 10))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .selectAll(".tick")
              .filter((d) => x.domain().includes(d))
              .remove()
          );
      }
      function yAxis(g) {
        g.attr("transform", "translate(-1,0)")
          .call(d3.axisRight(y))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .selectAll(".tick")
              .filter((d) => y.domain().includes(d))
              .remove()
          );
      }
    },
    draw() {
      let margin = 30; // 上下左右边距

      let svg = d3.select("svg");
      let width = svg.attr("width");
      let height = svg.attr("height");

      // 创建矩形分组
      let g = svg
        .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")"); // 图表距离视口的左、上距离

      // 定义 X 轴比例尺
      let scaleX = d3
        .scaleBand()
        .domain(d3.range(this.data.length))
        .rangeRound([0, width - margin * 2]);

      // 定义 y 轴比例尺
      let scaleY = d3
        .scaleLinear()
        .domain([0, d3.max(this.data)])
        .range([height - margin * 2, 0]);
      // 上边距30；注意：range 后面跟的参数0，放在第二位 因为 y轴正方向向下

      // 绘制 x y 轴
      let axisX = d3.axisBottom(scaleX);
      let axisY = d3.axisLeft(scaleY);
      g.append("g")
        .attr("transform", "translate(0, " + (height - margin * 2) + ")")
        .call(axisX);
      g.append("g").attr("transform", "translate(0,0)").call(axisY);

      // 创建矩形分组
      let gs = g.selectAll("rect").data(this.data).enter().append("g");

      // 绘制矩形 + 过渡效果
      let rectP = 40; // 柱状图间距
      gs.append("rect")
        .attr("x", function (d, i) {
          return scaleX(i) + rectP / 2;
        })
        .attr("y", function (d, i) {
          var min = scaleY.domain()[0]; // [0, 73]
          return scaleY(min);
          // scaleY(0) y轴比例尺映射出来的是最大值；这个效果等同于 return height - 2*margin 的效果
        })
        .attr("width", function (d, i) {
          return scaleX.step() - rectP;
        })
        .attr("height", function (d, i) {
          return 0; // 动画初始状态为0
        })
        .attr("fill", "pink")
        .transition()
        .duration(1500)
        .delay(function (d, i) {
          return i * 200; // 每个柱子逐渐开始的效果
        })
        .attr("y", function (d, i) {
          return scaleY(d);
        })
        .attr("height", function (d, i) {
          return height - margin * 2 - scaleY(d);
        });

      // 添加鼠标划入划出事件
      gs.on("mouseover", function () {
        d3.select(this.firstChild) // 这里的this是包含：rect text 的节点
          .transition()
          .duration(1000)
          .delay(200)
          .attr("fill", "#306ade");
      });

      gs.on("mouseout", function () {
        d3.select(this.firstChild)
          .transition()
          .duration(1000)
          .delay(200)
          .attr("fill", "pink");
      });

      // 绘文字 + 过渡效果
      gs.append("text")
        .attr("x", function (d, i) {
          return scaleX(i) + rectP;
        })
        .attr("y", function (d, i) {
          return height - 2 * margin;
        })
        .attr("dx", function (d, i) {
          return -2;
        })
        .attr("dy", function (d, i) {
          return 20;
        })
        .text(function (d, i) {
          return d;
        })
        .attr("fill", "green")
        .transition()
        .duration(1500)
        .delay(function (d, i) {
          return i * 200;
        })
        .attr("y", function (d, i) {
          return scaleY(d);
        });
    },
  },
  mounted() {
    this.draw_count();
  },
};
</script>
