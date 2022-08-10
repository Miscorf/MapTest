<template>
  <div id="mixin-components-container" ref="myWave">
    <el-row>
      <el-card class="box-card" style="text-align: left">
        <div id="waveform" ref="waveform" v-loading="loading">
          <!-- Here be the waveform -->
        </div>
        <div id="wave-timeline" ref="wave-timeline">
          <!--时间轴 -->
        </div>
        <div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="rew">后退</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="plays">
                  <i class="el-icon-video-play"></i>
                  播放
                  <i class="el-icon-video-pausee"></i>
                  暂停
                </el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <!-- <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="forward">前进</el-button>
              </div> -->
            </el-col>
            <el-col :span="2">
              <!-- <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="replay">重放</el-button>
              </div> -->
            </el-col>
            <el-col :span="3">
              <!-- <div class="grid-content bg-purple-dark">
                <a :href="voiceSrc" target="_blank">
                  <el-button type="primary" class="down-btn">下载文件</el-button>
                </a>
              </div> -->
            </el-col>
            <!-- <el-col :span="2">
              <div class="grid-content bg-purple-dark">
              </div>
            </el-col> -->
            <el-col :span="4">
              <div class="grid-content bg-purple-dark">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="指定播放"
                  placement="bottom"
                >
                  <el-popover placement="top" width="100" trigger="click">
                    <el-input
                      v-model="appointTime"
                      placeholder="请输入内容"
                      class="input-with-select"
                    >
                      <el-button slot="append" @click="appointPlay">播放</el-button>
                    </el-input>
                    <el-button slot="reference" circle> 指定播放 </el-button>
                  </el-popover>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-dark">
                <el-tooltip class="item" effect="dark" content="音量" placement="bottom">
                  <el-popover
                    placement="top-start"
                    trigger="click"
                    style="min-width: 38px"
                  >
                    <div class="block" style="width: 30px">
                      <el-slider
                        v-model="volumeValue"
                        vertical
                        height="100px"
                        @change="setVolume(volumeValue)"
                      />
                    </div>
                    <el-button slot="reference" circle> 音量 </el-button>
                  </el-popover>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-dark">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="播放倍速"
                  placement="bottom"
                >
                  <el-popover
                    placement="top"
                    width="220"
                    trigger="click"
                    style="margin-left: 10px"
                  >
                    <el-input-number
                      v-model="ds"
                      width="180"
                      :precision="2"
                      :step="0.1"
                      :min="0.5"
                      :max="2"
                      @change="DoubleSpeed(ds)"
                    />
                    <el-button slot="reference" round>
                      {{ ds + " X" }}
                    </el-button>
                  </el-popover>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.js";
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.js";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "myWaveSurfer",
  props: ["voiceSrc"],
  data() {
    return {
      // isPlaying: false,
      // time: '00:00',
      // wavesurfer: null,
      wavesurfer: null,
      // 指定播放功能的播放时间点
      appointTime: 1,
      // 播放倍速
      ds: 1.0,
      // 设置音量
      volumeValue: [1], //将播放音量设置为新值[0..1]（0 =静音，1 =最大）
      screenWidth: document.body.clientWidth,
      loading: false,
    };
  },
  watch: {
    screenWidth() {
      // 页面宽度变化时。重绘需要加载动画
      this.loading = true;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // console.log('加载WaveSurfer')
      // console.log(WaveSurfer)
      this.wavesurfer = WaveSurfer.create({
        // 应该在其中绘制波形的CSS选择器或HTML元素。这是唯一必需的参数。
        container: this.$refs.waveform,
        // 光标的填充颜色，指示播放头的位置。
        cursorColor: "red",
        // 更改波形容器的背景颜色。
        backgroundColor: "white",
        // 光标后的波形填充颜色。
        waveColor: "#0066CC",
        // 光标后面的波形部分的填充色。当progressColor和waveColor相同时，完全不渲染进度波
        progressColor: "#99CCFF",
        backend: "MediaElement",
        // 音频播放时间轴
        mediaControls: false,
        // 播放音频的速度
        audioRate: "1",
        // 插件：此教程配置了光标插件和时间轴插件
        plugins: [
          // 光标插件
          CursorPlugin.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
              "background-color": "#000",
              color: "#fff",
              padding: "2px",
              "font-size": "10px",
            },
          }),
          // 时间轴插件
          Timeline.create({
            container: "#wave-timeline",
          }),
        ],
      });
      this.wavesurfer.on("error", function (e) {
        console.warn(e);
      });
      //加载音频url
      this.voiceSrc = require("../static/1.wav");
      console.log(this.voiceSrc);
      this.wavesurfer.load(this.voiceSrc);
      this.volumeValue = this.wavesurfer.getVolume() * 100;
    });

    let that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };

    let erd = elementResizeDetectorMaker();

    erd.listenTo(document.getElementById("mixin-components-container"), (element) => {
      that.$nextTick(() => {
        that.wavesurfer.load(this.voiceSrc);
        setTimeout(() => {
          that.loading = false;
        }, 2000);
      });
    });
  },
  methods: {
    // 播放时暂停，播放时暂停
    plays() {
      this.wavesurfer.playPause();
    },
    // 后退，
    rew() {
      this.wavesurfer.skip(-3);
    },
    // 前进，
    forward() {
      this.wavesurfer.skip(3);
    },
    // 重放
    replay() {
      this.wavesurfer.stop();
    },
    // 设置音量：
    setVolume(val) {
      this.wavesurfer.setVolume(val / 100);
      console.log(val);
      // getVolume() –返回当前音频片段的音量。
      console.log(this.wavesurfer.getVolume());
    },
    // 指定播放
    appointPlay() {
      this.wavesurfer.play([this.appointTime]);
    },
    //倍速播放
    DoubleSpeed(rate) {
      this.wavesurfer.setPlaybackRate(rate);
      console.log(rate);
    },
  },
};
</script>

<style lang="scss" scoped>
#mixin-components-container {
  background-color: lightseagreen;
  //padding: 30px;
  min-height: 200px;
  width: 100%;
  border-radius: 10px;
  //公共el-row
  .el-row {
    margin-bottom: 20px;
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: white;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 5px 0;
    background-color: #f9fafc;
  }

  .box-card {
    border: none;

    #waveform {
    }

    #wave-timeline {
      margin: 20px auto;
      background-color: lightgray;
    }
  }
}
</style>
