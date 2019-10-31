<template>
  <div style="position:relative;top:0;left:0;" v-if="show">
    <img src="@/assets/index/edit.png" class="fixed" @click="showComment" />

    <div>
      <h1>{{ title }}</h1>

      <audio id="audio0">
        <source :src="audio" type="audio/mpeg" />
      </audio>
      <div class="audio-container">
        <img
          id="0"
          :src="isPlay0==false?require('@/assets/index/bofang.png'):require('@/assets/index/zanting.png')"
          style="width:3.5rem;height:3.5rem;margin:0 0 0 .4rem;"
          @click="play($event)"
        />
        <div class="process" id="process0">
          <van-slider v-model="value0" @change="onChange(value0,0)" id="slider0" />
        </div>
        <span class="time" id="span0">{{eTime0}}</span>
      </div>

      <p class="con1">{{content}}</p>
      <h1>{{title1}}</h1>
      <ul>
        <li>
          <audio ref="audio1" id="audio1">
            <source :src="audio1" type="audio/mpeg" />
          </audio>
          <div class="audio-container">
            <img
              id="1"
              :src="isPlay1==false?require('@/assets/index/bofang.png'):require('@/assets/index/zanting.png')"
              style="width:3.5rem;height:3.5rem;margin:0 0 0 .4rem;"
              @click="play($event)"
            />
            <div class="process" id="process1">
              <van-slider v-model="value1" @change="onChange(value1,1)" id="slider1" />
            </div>
            <span class="time" id="span1">{{eTime1}}</span>
          </div>
        </li>
        <li>
          <img :src="cover1" style="border-radius:10px;width:90%;margin-left:19px !important;" />
        </li>
      </ul>
     
      <p class="con1">{{contant1new}}</p>
      <h1>{{title2}}</h1>
      <audio
        controlslist="nodownload"
        oncontextmenu="return false"
        :src="audio2"
        ref="audio"
        class="audio"
        preload="auto"
        type="audio/mpeg"
        onlyOnePlaying="true"
        id="audio2"
      ></audio>
      <div class="audio-container">
        <img
          id="2"
          :src="isPlay2==false?require('@/assets/index/bofang.png'):require('@/assets/index/zanting.png')"
          style="width:3.5rem;height:3.5rem;margin:0 0 0 .4rem;"
          @click="play($event)"
        />
        <div class="process" id="process2">
          <van-slider v-model="value2" @change="onChange(value2,2)" id="slider2" />
        </div>
        <span class="time" id="span2">{{eTime2}}</span>
      </div>

      <video
        @play="BeClicked($event)"
        style="width:90%;margin-left: 19px !important;border-radius: 6px;"
        :src="video1"
        class="swiper-slide-img"
        id="video"
        controls
        controlslist="nodownload nofullscreen noremoteplayback"
        oncontextmenu="return false"
      ></video>
      <audio
        controlslist="nodownload"
        oncontextmenu="return false"
        :src="audio3"
        ref="audio"
        class="audio"
        preload="auto"
        type="audio/mpeg"
        id="audio3"
      ></audio>

      <div class="audio-container">
        <img
          :src="isPlay3==false?require('@/assets/index/bofang.png'):require('@/assets/index/zanting.png')"
          style="width:3.5rem;height:3.5rem;margin:0 0 0 .4rem;"
          @click="play($event)"
          id="3"
        />
        <div class="process" id="process3">
          <van-slider v-model="value3" @change="onChange(value3,3)" id="slider3" />
        </div>
        <span class="time" id="span3">{{eTime3}}</span>
      </div>

      <p class="con1">{{content2}}</p>
      <h1>{{title3}}</h1>
      <ul>
        <li>
          <img :src="cover3" style="border-radius:10px;width:90%;margin-left: 19px !important;" />
        </li>
        <li>
          <audio
            controlslist="nodownload"
            oncontextmenu="return false"
            :src="audio4"
            ref="audio"
            class="audio"
            preload="auto"
            type="audio/mpeg"
            id="audio4"
          ></audio>

          <div class="audio-container">
            <img
              :src="isPlay4==false?require('@/assets/index/bofang.png'):require('@/assets/index/zanting.png')"
              style="width:3.5rem;height:3.5rem;margin:0 0 0 .4rem;"
              @click="play($event)"
              id="4"
            />
            <div class="process" id="process4">
              <van-slider v-model="value4" @change="onChange(value4,4)" id="slider4" />
            </div>
            <span class="time" id="span4">{{eTime4}}</span>
          </div>
        </li>
      </ul>

      <p class="con1">{{content3}}</p>
    </div>

    <div class="box" id="box">
      <van-sticky>
        <div
          style="display:flex;justify-content:space-around;background:#fff;height:3rem;line-height:3rem;font-size:1rem; letter-spacing:.1rem;"
        >
          <span ref="xiangmu1" class="sp" style="border-bottom: 3px solid rgb(255, 225, 129);">圈友好评</span>
          <span ref="xiangmu2" class="sp">问题反馈</span>
        </div>
      </van-sticky>
      <div id="posi"></div>
      <div class="wrap" v-for="(item,index) in content1.list" :key="index">
        <div style="display:flex;align-items:center">
          <img v-lazy="item.img" />
          <span>{{item.nickname}}</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div v-if="listShow" style="height:120vh;"></div>

      <div id="posi1" style="height:3rem;"></div>
      <div class="bg">
        <div class="title1">* 请认真填写以下信息</div>
        <div class="line">
          <span>姓名</span>
          <input type="text" placeholder="请输入本人姓名" v-model.trim="uname" />
        </div>
        <div class="line">
          <span>手机号</span>
          <input type="text" @blur="inputBlur" placeholder="请输入本人手机号" v-model.trim="phone" />
        </div>
        <div class="line">
          <span>微信号</span>
          <input type="text" @blur="inputBlur" placeholder="请输入本人微信号" v-model.trim="weixin" />
        </div>
        <div class="line" style="flex-direction: column;">
          <div>反馈内容</div>
          <textarea cols="30" rows="10" @blur="inputBlur" placeholder="请输入反馈内容"></textarea>
        </div>

        <button class="submit" @click="submitfan">提交反馈</button>
      </div>
    </div>

    <!-- 评价弹出 -->
    <van-popup v-model="commentShow" transition="fade" :lock-scroll="false" :lazy-render="false">
      <div class="pop">
        <img src="@/assets/index/comment.png" alt />
        <div class="comment">
          <textarea placeholder="请填写评价内容" rows="7" v-model.trim="comment"></textarea>
        </div>
        <div class="btns">
          <button class="btn1" @click="submitComment">提交评价</button>
          <button class="btn2" @click="hideComment">取消</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
var audios = document.getElementsByTagName("audio");

var video = document.getElementsByTagName("video");

//import Axios from 'axios'
import Scroll from "better-scroll";
import { log } from "util";

export default {
  data() {
    var audios = document.getElementsByTagName("audio");
    var eventfun;
    return {
      audioPublic: {},
      detail: {},
      valuePublic: 0,
      isPlayPublic: false,
      isPlay0: false,
      isPlay1: false,
      isPlay2: false,
      isPlay3: false,
      isPlay4: false,
      currentPlayId: "",
      eTimePublic: "",
      spanPublic: "",
      eTime0: "",
      eTime1: "",
      eTime2: "",
      eTime3: "",
      eTime4: "",

      load: "",
      player: "http://www.shanshangdajiazu.com",

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
      title3:"",
      cover1: "",
      cover3: "",
      video1: "",
      content1: "",
      contant1new:"",
      content: "1111",
      content2: "",
      content3: "",
      list: [],

      activeName: "a",
      commentShow: false,
      comment: "",
      uname: "",
      phone: "",
      weixin: "",
      value0: 0,
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,

      show: false,
      listShow: false
    };
  },
  inject: ["reload"],
  methods: {
    BeClicked(e) {
      //            var audiovideos=audios.concat(video)
      //  console.log(audiovideos)
      var self = e.currentTarget;

      var selfId = self.getAttribute("id");

      console.log(selfId);
      var controlname = self.nodeName;
      console.log("controlNameffffffff" + controlname);
      console.log("sssss");
      if (controlname == "VIDEO") {
        console.log("I AM VIDEO");
        this.isPlay0 = false;
        this.isPlay1 = false;
        this.isPlay2 = false;
        this.isPlay3 = false;
        this.isPlay4 = false;
        for (var i = 0; i < audios.length; i++) {
        console.log(audios[i]); // 将audios中其他的audio全部暂停
        if (audios[i] !== self) {
          audios[i].pause();
        }
      }
      } else {
        video[0].pause();
      }

      
    },
    handleCommand(_command) {
      this.reload();
    },

    play(e) {
      var self = e.currentTarget;
      var controlname = self.nodeName;
      if (controlname == "VIDEO") {
        console.log("I AM VIDEO");
         this.audioPublic = audio;
        this.isPlay0 = false;
        this.isPlay1 = false;
        this.isPlay2 = false;
        this.isPlay3 = false;
        this.isPlay4 = false;
        for (var i = 0; i < audios.length; i++) {
          audios[i].pause();
      }
      } else {
        video[0].pause();
      }

      var selfId = self.getAttribute("id");
      this.spanPublic = "span" + selfId;

      if (this.currentPlayId != "" && this.currentPlayId != selfId) {
        this.audioPublic.removeEventListener("timeupdate", this.eventfun);

        this.audioPublic.pause();
      }
      this.currentPlayId = selfId;
      var audio = document.getElementById("audio" + selfId);
      var that = this;

      that.isPlayPublic = "isPlay" + selfId;

      if (selfId == "0") {
        if (that.isPlay0 == false) {
          audio.play();
          this.audioPublic = audio;
          this.isPlay0 = true;
          this.isPlay1 = false;
          this.isPlay2 = false;
          this.isPlay3 = false;
          this.isPlay4 = false;
        } else {
          audio.pause();

          this.currentPlayId = "";
          this.isPlay0 = false;
        }
      }

      if (selfId == "1") {
        if (that.isPlay1 == false) {
          audio.play();
          this.audioPublic = audio;
          this.isPlay1 = true;
          this.isPlay0 = false;
          this.isPlay2 = false;
          this.isPlay3 = false;
          this.isPlay4 = false;
        } else {
          audio.pause();
          this.isPlay1 = false;
        }
      }

      if (selfId == "2") {
        if (that.isPlay2 == false) {
          audio.play();
          this.audioPublic = audio;
          this.isPlay2 = true;
          this.isPlay1 = false;
          this.isPlay0 = false;
          this.isPlay3 = false;
          this.isPlay4 = false;
        } else {
          audio.pause();
          this.isPlay2 = false;
        }
      }

      if (selfId == "3") {
        if (that.isPlay3 == false) {
          audio.play();
          this.audioPublic = audio;
          this.isPlay3 = true;
          this.isPlay1 = false;
          this.isPlay2 = false;
          this.isPlay0 = false;
          this.isPlay4 = false;
        } else {
          audio.pause();
          this.isPlay3 = false;
        }
      }
      if (selfId == "4") {
        if (that.isPlay4 == false) {
          audio.play();
          this.audioPublic = audio;
          this.isPlay4 = true;
          this.isPlay1 = false;
          this.isPlay2 = false;
          this.isPlay3 = false;
          this.isPlay0 = false;
        } else {
          audio.pause();
          this.isPlay4 = false;
        }
      }
      this.eventfun = function() {
        if (that.currentPlayId != selfId) {
          return;
        }
        that.eTimePublic = "eTime" + selfId;
        that.valuePublic = selfId;
        that.eTime = this.duration - this.currentTime;
        var h = Math.floor(that.eTime / 60);
        var s = parseInt(that.eTime % 60);
        h = h + "";
        s = s + "";
        h = h.length == 1 ? "0" + h : h;
        s = s.length == 1 ? "0" + s : s;
        that.eTimePublic = h + ":" + s;
        document.getElementById(that.spanPublic).innerText = that.eTimePublic;

        var value = parseInt((this.currentTime / this.duration) * 100);
        if (that.currentPlayId == "0") {
          that.value0 = value;
        }
        if (that.currentPlayId == "1") {
          that.value1 = value;
        }
        if (that.currentPlayId == "2") {
          that.value2 = value;
        }
        if (that.currentPlayId == "3") {
          that.value3 = value;
        }
        if (that.currentPlayId == "4") {
          that.value4 = value;
        }
      };

      audio.addEventListener("timeupdate", this.eventfun);
    },

    onChange(value, id) {
      var that = this;
      var slider = document.getElementById("slider" + id);

      var sliderId = slider.getAttribute("id");

      var spstr = sliderId.split("");
      var selfId = spstr[spstr.length - 1];
      var audio = document.getElementById("audio" + id);

      var valuecon = that.value0;
      if (id == 1) {
        valuecon = that.value1;
      }
      if (id == 2) {
        valuecon = that.value2;
      }
      if (id == 3) {
        valuecon = that.value3;
      }
      if (id == 4) {
        valuecon = that.value4;
      }
      var current = (valuecon / 100) * audio.duration;
      audio.currentTime = current;
      audio.play();
      that.isPlay = true;
      var eTime = "eTime" + id;
      audio.addEventListener("timeupdate", function() {
        that.eTime = this.duration - this.currentTime;
        var h = Math.floor(that.eTime / 60);
        var s = parseInt(that.eTime % 60);
        h = h + "";
        s = s + "";
        h = h.length == 1 ? "0" + h : h;
        s = s.length == 1 ? "0" + s : s;

        that.eTime = h + ":" + s;
        var value = parseInt((this.currentTime / this.duration) * 100);
        if (id == 0) {
          that.value0 = value;
        }
        if (id == 1) {
          that.value1 = value;
        }
        if (id == 2) {
          that.value2 = value;
        }
        if (id == 3) {
          that.value3 = value;
        }
        if (id == 4) {
          that.value4 = value;
        }
      });
    },
    showComment() {
      this.commentShow = true;
    },
    hideComment() {
      this.commentShow = false;
    },
    inputBlur() {},

    submitComment() {
      let that = this;
      if (this.comment == "") {
        this.$toast.fail("内容不能为空");
        return;
      }
      this.$post("/addComment", {
        uid: window.localStorage.uid,
        content: this.comment,
        course_id: that.content1.id
      }).then(res => {
        that.$toast.success(res.msg);
        that.commentShow = false;
        setTimeout(() => {
          that.handleCommand();
        }, 1000);
      });
    },
    submitfan() {
      let that = this;
      if (this.uname == "") {
        this.$toast.fail("姓名不能为空");
        return;
      }
      if (this.phone == "") {
        this.$toast.fail("手机号不能为空");
        return;
      }
      if (this.weixin == "") {
        this.$toast.fail("微信不能为空");
        return;
      }
      if (this.content == "") {
        this.$toast.fail("内容不能为空");
        return;
      }
      this.$toast.success("提交成功");
      that
        .$post("/problem", {
          uid: window.localStorage.uid || 1,
          content: that.content,
          name: that.uname,
          mobile: that.phone,
          wechat: that.weixin
        })
        .then(res => {
          if (res.code === 200) {
            that.$toast.success(res.msg);
            setTimeout(() => {
              that.handleCommand();
            }, 1000);
          } else {
            that.$toast.fail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      let that = this;
      let cid = this.$route.query.cid;
      that
        .$post("/look", {
          uid: window.localStorage.uid,
          cid
        })
        .then(res => {
          console.log(res)
          this.name = res.data.c_name;
          this.audio = "http://www.shanshangdajiazu.com" + res.data.audio;
          this.audio1 = "http://www.shanshangdajiazu.com" + res.data.audio1;
          this.audio2 = "http://www.shanshangdajiazu.com" + res.data.audio2_1;
          this.audio3 = "http://www.shanshangdajiazu.com" + res.data.audio2_2;
          this.audio4 = "http://www.shanshangdajiazu.com" + res.data.audio3;
          this.title = res.data.title;
          this.title1 = res.data.title1;
          this.title2 = res.data.title2;
           this.title3 = res.data.title3;
          this.cover1 = "http://www.shanshangdajiazu.com" + res.data.cover1;
          this.cover3 = "http://www.shanshangdajiazu.com" + res.data.cover3;
          this.video1 = "http://www.shanshangdajiazu.com" + res.data.video2;
          this.content = res.data.content;
          console.log("contant1vvvvvvvv"+res.data.content1)
          this.contant1new = res.data.content1;
          this.content2 = res.data.content2;
          this.content3 = res.data.content3;
          res.data.content = res.data.content.replace(
            "<video",
            '<video webkit-playsinline playsinline x5-playsinline x-webkit-airplay="allow"'
          );

          if (res.code === 200) {
            that.content1 = res.data;
            if (res.data.list.length < 7) {
              that.listShow = true;
            }
            setTimeout(() => {
              that.show = true;
            }, 500);
          }
        });
    },
    handleScroll() {
      let that = this;
      let a = document.documentElement.scrollTop || document.body.scrollTop;

      that.$nextTick(() => {
        let top1 = a - document.getElementById("posi1").offsetTop;
        if (top1 > -70) {
          for (let item in that.$refs) {
            that.$refs[item].style["borderBottom"] = "0";
          }
          that.$refs.xiangmu2.style["borderBottom"] =
            "3px solid rgb(255, 225, 129)";
        } else {
          for (let item in that.$refs) {
            that.$refs[item].style["borderBottom"] = "0";
          }
          that.$refs.xiangmu1.style["borderBottom"] =
            "3px solid rgb(255, 225, 129)";
        }
      });
      that.$(that.$refs.xiangmu1).bind("click", function() {
        document.documentElement.scrollTop =
          document.getElementById("posi").offsetTop - 50;
        document.body.scrollTop =
          document.getElementById("posi").offsetTop - 50;
      });
      that.$(that.$refs.xiangmu2).bind("click", function() {
        document.documentElement.scrollTop = document.getElementById(
          "posi1"
        ).offsetTop;
        document.body.scrollTop = document.getElementById("posi1").offsetTop;
      });
    }
  },
  created() {
    this.getData();
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
    });
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.con1 {
  width: 90%;
  font-family: 微软雅黑;
  margin-left: 19px;
 
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

#tab {
  display: flex;
  justify-content: space-around;
}
ul li a {
  color: black;
}

/*新添加的样式 */
.fixed {
  position: fixed;
  top: 14rem;
  right: 0.5rem;
  width: 3rem;
  height: 3rem;
  z-index: 5;
}
.audio {
  display: block;
  margin: 1rem auto;
  border-radius: 41px;
}
.p {
  padding: 1.1rem;
  font-size: 0.8rem;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 0.1rem;
}
.bofang {
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  margin: -2rem 0 0 -2rem;
}

.van-tabs >>> .van-tabs__line {
  background-color: #ffe181;
}
.van-tabs >>> [class*="van-hairline"]::after {
  border: 0 !important;
  border-bottom: 1px solid #ccc !important;
}

.wrap {
  display: flex;
  width: 80vw;
  margin: 1rem auto;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}
.wrap:last-of-type {
  border-bottom: 0;
}
.wrap img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.wrap span {
  font-size: 1rem;
  font-family: SourceHanSansCN-Normal;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: 1rem;
}
.text {
  font-size: 0.7rem;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.5rem;
  letter-spacing: 0.1rem;
  word-break: break-all;
}
.line {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  width: 76vw;
  margin: 1.3rem auto;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  box-sizing: border-box;
}
.line input {
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  text-align: right;
  color: #787777;
  font-size: 0.8rem;
  width: 30vw;
  overflow: hidden;
}
.line span {
  font-size: 0.8rem;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: #333333;
  line-height: 2.5rem;
}
.line textarea {
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  color: #787777;
  font-size: 0.8rem;
  resize: none;
}
.line div {
  font-size: 0.8rem;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: #333333;
  line-height: 2rem;
}
.submit {
  display: block;
  width: 80vw;
  height: 2.4rem;
  margin: 1rem auto 0;
  font-size: 1.1rem;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(253, 254, 255, 1);
  text-shadow: 0px 3px 2px rgba(174, 185, 190, 0.7);
  background: url("../assets/index/btn-bg.png") no-repeat;
  background-size: 100%;
  letter-spacing: 0.2rem;
}
.pop {
  position: relative;
  top: 0;
  left: 0;
  width: 60vw;
}
.pop img {
  width: 100%;
}
.comment {
  position: absolute;
  top: 9rem;
  left: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 44vw;
  height: 8rem;
  padding: 0.5rem;
  box-sizing: border-box;
}
.comment textarea {
  resize: none;
  width: 100%;
  color: #999;
  height: 4rem;
}
.btns {
  position: absolute;
  bottom: 1rem;
  left: 0rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.btn1,
.btn2 {
  padding: 0 1.2rem;
  border-radius: 20px;
}
.btn1 {
  background: #866cff;
  font-size: 1rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 2rem;
}
.btn2 {
  border: 1px solid #866cff;
  font-size: 1rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 2rem;
  color: #866cff;
}
.audio-container {
  width: 80vw;
  border: 1px solid #088aff;
  margin: 10px auto;
  border-radius: 41px;
  display: flex;
  align-items: center;
}
.process {
  width: 50vw;
  margin-left: 0.3rem;
}
.process >>> .van-slider--disabled {
  opacity: 1;
}
.time {
  font-size: 0.8rem;
  font-family: PingFang-SC-Regular;
  color: #bbb;
  margin-left: 0.5rem;
}
.audio-container >>> .van-slider__button {
  width: 10px;
  height: 10px;
}
.van-tabs >>> .van-tab__pane {
  height: 90vh !important;
}

/* .fade-enter-active, .fade-leave-active {
  transition: all 1s ;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform:translate3d(-120px,-600px,0) scale(.5)
} */
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
  border-radius: 20px;
}
.cont >>> audio {
  width: 83vw !important;
  display: block !important;
  margin: 1rem auto !important;
  border-radius: 41px;
}
.bg {
  width: 96vw;
  margin: 0 auto 3rem;
  height: 39rem;
  background: url("../assets/center/qbg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 0 4rem 0;
  margin-left: 8px;
}
.title1 {
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  text-align: center;
  font-family: Source Han Sans CN;
  padding: 1rem 0 0 0;
  color: rgba(255, 255, 255, 1);
}
</style>