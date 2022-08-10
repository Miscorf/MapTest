<template>
  <div>
    <div style="height: 100%; width: 100%" id="container"></div>

    <LeftTopTabs
      @showMarkets="showMarkets"
      @changeLineLayer="changeLineLayer"
    ></LeftTopTabs>
    <Logs></Logs>

    <!-- <div class="input-card custom-input-card">
      <h4>打开/关闭信息窗体</h4>
      <div class="input-item">
        <button class="btn" @click="drawPolyline()" style="margin-bottom: 5px">
          绘制线段
        </button>
        <input type="button" class="btn" value="打开信息窗体" @click="openInfo()" />
        <input type="button" class="btn" value="关闭信息窗体" @click="closeInfo()" />
      </div>
    </div> -->
  </div>
</template>

<script>
import LeftTopTabs from "@/components/LeftTopTabs";
import Logs from "@/components/Logs";
import Voice from "@/components/voice";

var infoWindow;
var map;
var lnglats = [
  [116.368904, 39.923423],
  [116.382122, 39.921176],
  [116.387271, 39.922501],
  [116.398258, 39.9146],
];
var market;
var layer;
var pointLayer = 0;

var polygonPath = [
  new AMap.LngLat(116.46, 39.93),
  new AMap.LngLat(116.44, 39.91),
  new AMap.LngLat(116.49, 39.91),
];
var polyline;
// var polylinePath = [
//   new AMap.LngLat(116.19, 39.93),
//   new AMap.LngLat(116.43, 39.81),
//   new AMap.LngLat(117.43, 39.98),
//   new AMap.LngLat(116.35, 40.11),
// ];
var polylinePath = [
  [116.213379, 39.942654],
  [116.31517, 39.984656],
  [116.389411, 39.990393],
  [116.297443, 39.943267],
  [116.344177, 39.909805],
  [116.263488, 39.892747],
  [116.284766, 39.870152],
  [116.32115, 39.88971],
  [116.359244, 39.869019],
  [116.311506, 39.84885],
  [116.373928, 39.860677],
  [116.422897, 39.878002],
  [116.379133, 39.887648],
  [116.383687, 39.901689],
  [116.343953, 39.90967],
  [116.378762, 39.929056],
  [116.437604, 39.916581],
  [116.499536, 39.909767],
  [116.422322, 39.970844],
  [116.48587, 40.005574],
  [116.538808, 39.917172],
];

export default {
  components: {
    LeftTopTabs,
    Logs,
    Voice,
  },
  data() {
    return {
      audio: {
        url: "static/2KZFB8S8ZH.wav",
        du: "",
      },
    };
  },

  mounted() {
    map = new AMap.Map("container", {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 9, //初始化地图层级
      mapStyle: "amap://styles/grey", //设置地图的显示样式
      center: [116.481181, 39.989792], //地图中心位置
      viewMode: "2D",
      pitch: 60,
    });

    infoWindow = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -30),
    });

    polyline = new AMap.Polyline({
      path: polylinePath,
      isOutline: true,
      outlineColor: "#ffeeff",
      borderWeight: 3,
      strokeColor: "#67C23A",
      strokeOpacity: 1,
      strokeWeight: 6,
      // 折线样式还支持 'dashed'
      strokeStyle: "solid",
      // strokeStyle是dashed时有效
      strokeDasharray: [10, 5],
      lineJoin: "round",
      lineCap: "round",
      zIndex: 50,
    });
  },
  methods: {
    changeLineLayer() {
      console.log("changeLineLayer-Map");
      if (pointLayer === 1) {
        map.remove(layer);
        pointLayer = 0;
      }
      map.add([polyline]);
      this.openInfo();
      //map.clearMap();
    },
    addCircleMarker() {
      map.clearMap();
      var circleMarker = new AMap.CircleMarker({
        center: [116.481181, 39.989792],
        radius: 10 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
        strokeColor: "red",
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: "rgba(255, 30, 33, 1.0)",
        fillOpacity: 0.5,
        zIndex: 10,
        bubble: true,
        cursor: "pointer",
        clickable: true,
      });
      circleMarker.setMap(map);
      console.log("sad");
    },
    showMarkets() {
      var viewData = {
        "2D": 3e3,
        "3D": 3e4,
      };
      var curViewMode = map.getViewMode_();

      // 创建 AMap.LabelsLayer 图层
      layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 111,
        // 关闭标注避让，默认为开启，v1.4.15 新增属性
        animation: false,
        // 关闭标注淡入动画，默认为开启，v1.4.15 新增属性
        collision: false,
      });

      // 将图层添加到地图
      map.add(layer);
      pointLayer = 1;

      var markers = [];
      var positions = Positions.slice(0, viewData[curViewMode]);

      var icon = {
        type: "image",
        image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        size: [6, 9],
        anchor: "bottom-center",
        angel: 0,
        retina: true,
      };

      for (var i = 0; i < positions.length; i++) {
        var curPosition = positions[i];
        var curData = {
          position: curPosition,
          icon,
        };

        var labelMarker = new AMap.LabelMarker(curData);
        // 事件
        labelMarker.on("mouseover", function (e) {
          var position = e.data.data && e.data.data.position;

          if (position) {
            normalMarker.setContent(
              '<div class="amap-info-window">' +
                position +
                '<div class="amap-info-sharp"></div>' +
                "</div>"
            );
            normalMarker.setPosition(position);
            map.add(normalMarker);
          }
        });

        labelMarker.on("mouseout", function () {
          map.remove(normalMarker);
        });

        markers.push(labelMarker);
      }

      // 一次性将海量点添加到图层
      layer.add(markers);
      // layer.remove(markers);
      // 普通点
      var normalMarker = new AMap.Marker({
        offset: new AMap.Pixel(-75, -40),
      });

      var mapViewElement = document.getElementById("mapView");
      var massNumberElement = document.getElementById("massNumber");
      mapViewElement.innerHTML = curViewMode;
      massNumberElement.innerHTML = viewData[curViewMode];
    },

    openInfo() {
      for (var i = 0, marker; i < lnglats.length; i++) {
        var marker = new AMap.Marker({
          position: lnglats[i],
          map: map,
          icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
        });
        marker.content = "我是第" + (i + 1) + "个Marker";
        marker.on("click", markerClick);
        marker.emit("click", {
          target: marker,
        });
      }

      function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
      }
      // map.setFitView(); #缩进视角
    },
    closeInfo() {},
  },
};
</script>

<style>
@import "../css/info.css";

#container {
  height: 100%;
  width: 100%;
}

.custom-input-card {
  width: 22rem;
}

.custom-input-card .btn {
  margin-right: 1rem;
}

.custom-input-card .btn:last-child {
  margin-right: 0;
}

.amap-info-combo .keyword-input {
  height: 25px;
  border-radius: 2px 0 0 2px;
}
</style>
