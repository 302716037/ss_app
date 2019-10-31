<template>
  <div style="position:relative;top:0;left:20px;">
    <!-- 入口课程 -->
    <div>
      <h2>{{ name }}</h2>
      <audio
        @click="playAudio()"
        controls="controls"
        controlslist="nodownload"
        oncontextmenu="return false"
        :src="audio"
        type="audio/mpeg"
      ></audio>
      <p class="con1">{{content}}</p>
      <h2>{{title}}</h2>
      <ul>
        <li>
          <audio
            controls="controls"
            controlslist="nodownload"
            oncontextmenu="return false"
            class="audio2"
            :src="audio1"
            type="audio/mpeg"
          ></audio>
        </li>
        <li>
          <img :src="cover1" style="border-radius:10px;width:90%;" />
        </li>
      </ul>
      <p class="con1">{{content1}}</p>
      <h2>{{title1}}</h2>
      <audio
        controls="controls"
        controlslist="nodownload"
        oncontextmenu="return false"
        :src="audio2"
        type="audio/mpeg"
      ></audio>
      <video
        style="width:90%;"
        :src="video1"
        class="swiper-slide-img"
        id="qqq"
        controls
        controlslist="nodownload nofullscreen noremoteplayback"
        oncontextmenu="return false"
      ></video>
      <audio
        controls="controls"
        controlslist="nodownload"
        oncontextmenu="return false"
        :src="audio3"
        type="audio/mpeg"
      ></audio>
      <p class="con1">{{content2}}</p>
      <h2>{{title2}}</h2>
      <ul>
        <li>
          <img :src="cover3" style="border-radius:10px;width:90%;" />
        </li>
        <li>
          <audio
            controls="controls"
            controlslist="nodownload"
            oncontextmenu="return false"
            :src="audio4"
            type="audio/mpeg"
          ></audio>
        </li>
      </ul>

      <p class="con1">{{content3}}</p>
    </div>
    <div class="box" id="box">
      <ul id="tab">
        <li>
          <a>圈友好评1221</a>
        </li>
        <li>
          <a>问题反馈</a>
        </li>
      </ul>
      <div class="list" id="list">
        <div class="text" id="text" style="display:block;">
          <img src="timg.jpg" />
          <span class="name">文文</span>
          <p>111111</p>
          <hr />
          <img src="timg.jpg" />
          <span class="name">文文</span>
          <p>111111</p>
          <hr />
          <img src="timg.jpg" />
          <span class="name">文文</span>
          <p>111111</p>
          <hr />
        </div>
        <div class="text">
          <div class="form">
            <h3>*请认真填写以下信息</h3>
            <div class="name">
              <span>姓名</span>
              <input type="text" placeholder="请输入本人姓名" />
            </div>
            <div class="name">
              <span>手机号</span>
              <input type="text" placeholder="请输入本人手机号" />
            </div>
            <div class="name">
              <span>微信号</span>
              <input type="text" placeholder="请输入本人微信号" />
            </div>
            <div class="content">
              <span>反馈内容</span>
              <input type="text" placeholder="请输入本人反馈内容" />
            </div>
            <button>提交反馈</button>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="box" id="box">
      <ul id="tab">
        <li>
          <a>圈友好评1122</a>
        </li>
        <li>
          <a>问题反馈</a>
        </li>
      </ul>
      <div class="list" id="list">
        <div class="text" id="text" style="display:block;">
          <img src="timg.jpg" />
          <span class="name"></span>
          <p>111111</p>
          <hr />
          <img src="timg.jpg" />
          <span class="name">文文</span>
          <p>111111</p>
          <hr />
          <img src="timg.jpg" />
          <span class="name">文文</span>
          <p>111111</p>
          <hr />
        </div>
        <div class="text">
          <div class="form">
            <h3>*请认真填写以下信息</h3>
            <div class="name">
              <span>姓名</span>
              <input type="text" placeholder="请输入本人姓名" />
            </div>
            <div class="name">
              <span>手机号</span>
              <input type="text" placeholder="请输入本人手机号" />
            </div>
            <div class="name">
              <span>微信号</span>
              <input type="text" placeholder="请输入本人微信号" />
            </div>
            <div class="content">
              <span>反馈内容</span>
              <input type="text" placeholder="请输入本人反馈内容" />
            </div>
            <button>提交反馈</button>
          </div>
        </div>
      </div>
    </div>-->
    <div class="edit">
      <img src="bian.png" style="width: 100%;" />
    </div>
    <div id="opendiv" class="opendiv" style="display: none;">
      <center>
        <img src="bei.PNG" />
      </center>
      <textarea placeholder="请输入评价" class="input"></textarea>
    </div>
  </div>
</template>
<script>
// import Axios from 'axios'
export default {
  data() {
    return {
      uid: "",
      cid: "",
      name: "",
      audio: "",
      audio1: "",
      audio2: "",
      audio3: "",
      audio4: "",
      title: "",
      title1: "",
      title2: "",
      cover1: "",
      cover3: "",
      video1: "",
      content1: "",
      content: "",
      content2: "",
      content3: "",
      list: []
    };
  },
  created() {
    this.rous();
  },
  methods: {
    rous() {
      //    传递参数
      (this.uid = this.$route.query.uid),
        (this.cid = this.$route.query.cid),
        console.log(this.uid, this.cid);
      this.$post("/look", {
        uid: window.localStorage.uid,
        cid: 19
      }).then(res => {
        console.log(res.data);
        this.name = res.data.c_name;
        this.audio = "http://www.shanshangdajiazu.com" + res.data.audio;
        this.audio1 = "http://www.shanshangdajiazu.com" + res.data.audio1;
        this.audio2 = "http://www.shanshangdajiazu.com" + res.data.audio2_1;
        this.audio3 = "http://www.shanshangdajiazu.com" + res.data.audio2_2;
        this.audio4 = "http://www.shanshangdajiazu.com" + res.data.audio3;
        this.title = res.data.title;
        this.title1 = res.data.title1;
        this.title2 = res.data.title2;
        this.cover1 = "http://www.shanshangdajiazu.com" + res.data.cover1;
        this.cover3 = "http://www.shanshangdajiazu.com" + res.data.cover3;
        this.video1 = "http://www.shanshangdajiazu.com" + res.data.video2;
        this.content = res.data.content;
        this.content1 = res.data.content1;
        this.content2 = res.data.content2;
        this.content3 = res.data.content3;
        this.list = res.data.list;
      });
    }
  }
};
</script>
<style scoped>
.con1 {
  width: 94%;
}
audio {
  margin-left: 10%;
  border: 1px solid blue;
  border-radius: 41px;
}
video::-internal-media-controls-download-button {
  display: none;
}
video::-webkit-media-controls-enclosure {
  overflow: hidden;
}
video::-webkit-media-controls-panel {
  width: calc(100% + 30px);
}
.box {
  margin-left: 10%;
}
#tab {
  display: flex;
  justify-content: space-around;
}
ul li a {
  color: black;
}
</style>