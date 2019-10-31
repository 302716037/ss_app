<template>
  <div>
    <h2 class="title art">{{detail.title}}</h2>
    <div class="intr">
      <span>{{detail.author}}</span>
      <a href="javascript:;" style="margin-left:1rem">善商大家族</a>
      <span style="margin-left:1rem">{{detail.addtime}}</span>
    </div>

    <audio
      :src="'http://www.shanshangdajiazu.com'+detail.video"
      ref="audio"
      class="audio"
      preload="auto"
    ></audio>
    <div class="audio-container" v-if="detail.video">
      <img
        :src="isPlay==false?require('@/assets/index/bofang.png'):require('@/assets/index/zanting.png')"
        style="width:3.5rem;height:3.5rem;margin:0 0 0 .4rem;"
        @click="play"
      />
      <div class="process">
        <van-slider v-model="value" @change="onChange" />
      </div>
      <span class="time" v-if="eTime!=0">{{eTime}}</span>
    </div>
    <div class="cont" v-html="detail.content"></div>
    <div style="width:90vw;margin:0 auto;" @click="jumpIndex">
      <img src="../assets/index/gif.gif" alt style="width:100%;" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      value: 0,
      isPlay: false,
      eTime: "",
      load: "",
      player: "http://www.shanshangdajiazu.com"
    };
  },
  methods: {
    getDetail() {
      let that = this;
      let id = that.$route.params.id;
      that.$post("/articleList", { id }).then(res => {
        that.detail = res.data;
        that.detail.content = that.detail.content.replace(
          "<video",
          '<video webkit-playsinline playsinline x5-playsinline x-webkit-airplay="allow"'
        );
        console.log(res);
      });
    },
    jumpIndex() {
      this.$router.push("/index");
    },
    play() {
      var audio = this.$refs.audio;
      var that = this;

      console.log(audio.paused + "---是否暂停"); //是否暂停
      console.log(audio.currentTime + "---当前时间"); //当前时间
      console.log(audio.duration + "---音频时长"); //当前时间
      if (that.isPlay == false) {
        audio.play();
        this.isPlay = true;
        // if(that.eTime==0){
        //     that.$toast.success('音频加载中')
        // }
      } else {
        audio.pause();
        this.isPlay = false;
      }
      audio.addEventListener("timeupdate", function() {
        that.eTime = this.duration - this.currentTime;
        var h = Math.floor(that.eTime / 60);
        var s = parseInt(that.eTime % 60);
        h = h + "";
        s = s + "";
        console.log(h.length, s.length);
        h = h.length == 1 ? "0" + h : h;
        s = s.length == 1 ? "0" + s : s;

        that.eTime = h + ":" + s;
        var value = parseInt((this.currentTime / this.duration) * 100);
        that.value = value;
      });
    },
    onChange(value) {
      var that = this;
      var audio = this.$refs.audio;
      var current = (value / 100) * audio.duration;
      audio.currentTime = current;
      audio.play();
      that.isPlay = true;
      audio.addEventListener("timeupdate", function() {
        that.eTime = this.duration - this.currentTime;
        var h = Math.floor(that.eTime / 60);
        var s = parseInt(that.eTime % 60);
        h = h + "";
        s = s + "";
        console.log(h.length, s.length);
        h = h.length == 1 ? "0" + h : h;
        s = s.length == 1 ? "0" + s : s;

        that.eTime = h + ":" + s;
        var value = parseInt((this.currentTime / this.duration) * 100);
        that.value = value;
      });
    }
  },
  created() {
    this.getDetail();
  }
};
</script>

<style scoped>
.art {
  font-size: 1rem;
}
.intr {
  font-size: 0.8rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(180, 180, 180, 1);
  padding: 1rem;
  letter-spacing: 0.1rem;
}
.intr a {
  color: #606b85;
}
.cont {
  width: 100vw;
  overflow: hidden;
  padding: 0.5rem;
  box-sizing: border-box;
}

.cont >>> img {
  width: 94vw !important;
  display: block !important;
  margin: 1rem auto !important;
  border-radius: 20px !important;
}

.cont >>> video {
  width: 96vw !important;
  display: block !important;
  margin: 1rem auto;
  border-radius: 20px !important;
}

.cont >>> audio {
  width: 83vw !important;
  display: block !important;
  margin: 1rem auto !important;
  border-radius: 20px !important;
}
.audio-container {
  width: 82vw;
  border: 1px solid #088aff;
  margin: 0 auto;
  border-radius: 41px;
  display: flex;
  align-items: center;
}
.process {
  width: 50vw;
  margin-left: 0.5rem;
}
.process >>> .van-slider--disabled {
  opacity: 1;
}
.time {
  font-size: 0.8rem;
  font-family: PingFang-SC-Regular;
  color: #bbb;
  margin-left: 0.7rem;
}
.audio-container >>> .van-slider__button {
  width: 10px;
  height: 10px;
}
.van-tabs >>> .van-tab__pane {
  height: 90vh !important;
}
</style>
