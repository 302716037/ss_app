<template>
  <div style="position:relative;top:0;left:0;" v-if="show">
    <!-- <div class="title" style="font-size:1.2rem;">
            {{content1.c_name}}
    </div>-->

    <div class="cont" v-html="content1.content"></div>

    <img src="@/assets/index/edit.png" class="fixed" @click="showComment" />
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
        <textarea
          cols="30"
          rows="10"
          @blur="inputBlur"
          placeholder="请输入反馈内容"
          v-model.trim="content"
        ></textarea>
      </div>

      <button class="submit" @click="submitfan">提交反馈</button>
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
import Scroll from 'better-scroll'

export default {
    data(){
        return{
            activeName:"a",
            commentShow:false,
            comment:"",
            uname:"",
            phone:"",
            weixin:"",
            content:"",
            value:0,
            eTime:"",
            isPlay:false,
            content1:"",
            show:false,
            listShow:false
        }
    },
    inject: ['reload'],
    methods:{
         handleCommand(_command) {
   
                this.reload();
        },


        play(){
            
            var audio=this.$refs.audio;
            var that=this;
            
            console.log(audio.paused+"---是否暂停")//是否暂停
            console.log(audio.currentTime+"---当前时间")//当前时间
            console.log(audio.duration+"---音频时长")//当前时间
            if(that.isPlay==false){
                audio.play()
                this.isPlay=true
                if(that.eTime==0){
                    that.$toast.success('音频加载中')
                }
                
            }else{
                audio.pause()
                this.isPlay=false
            }
            audio.addEventListener("timeupdate",function(){
                that.eTime=this.duration-this.currentTime
                var h  =   Math.floor(that.eTime/60);
                var s  =  parseInt(that.eTime%60);
                h=h+""
                s=s+""
                console.log(h.length,s.length)
                h  =   (h.length==1)?'0'+h:h;
                s  =   (s.length==1)?'0'+s:s;
                
                that.eTime=h+':'+s
                var value=parseInt(this.currentTime/this.duration*100)
                that.value=value

            })
            
            
        },
        onChange(value){
            var that=this
            var audio=this.$refs.audio;
            var current=value/100*audio.duration
            audio.currentTime=current
            audio.play()
            that.isPlay=true
            audio.addEventListener("timeupdate",function(){
                that.eTime=this.duration-this.currentTime
                var h  =   Math.floor(that.eTime/60);
                var s  =  parseInt(that.eTime%60);
                h=h+""
                s=s+""
                console.log(h.length,s.length)
                h  =   (h.length==1)?'0'+h:h;
                s  =   (s.length==1)?'0'+s:s;
                
                that.eTime=h+':'+s
                var value=parseInt(this.currentTime/this.duration*100)
                that.value=value

            })
            

        },
        showComment(){
            this.commentShow=true
        },
        hideComment(){
            this.commentShow=false
        },
        inputBlur () {
          
        },
        submitComment(){
            let that=this
            if(this.comment==""){
                this.$toast.fail('内容不能为空');
                return
            }
            this.$post('/addComment',{
                uid:window.localStorage.uid,
                content:this.comment,
                course_id:that.content1.id
            }).then(res=>{
                // console.log(res)
                
                that.$toast.success(res.msg);
                that.commentShow=false
                setTimeout(()=>{

                    that.handleCommand()
                    //window.location.href=window.location.href+"?id="+10000*Math.random();
                },1000)
                
            })


            // this.$toast.success('提交成功');
            
        },
        submitfan(){
            let that=this;
            if(this.uname==""){
                this.$toast.fail('姓名不能为空');
                return
            }
            if(this.phone==""){
                this.$toast.fail('手机号不能为空');
                return
            }
            if(this.weixin==""){
                this.$toast.fail('微信不能为空');
                return
            }
            if(this.content==""){
                this.$toast.fail('内容不能为空');
                return
            }
            this.$toast.success('提交成功');
            that.$post('/problem',{
                uid:window.localStorage.uid||1,
                content:that.content,
                name:that.uname,
                mobile:that.phone,
                wechat:that.weixin,
            }).then(res=>{
                console.log(res)
                if(res.code===200){
                    that.$toast.success(res.msg)
                    setTimeout(()=>{

                        that.handleCommand()

                    },1000)
                   
                }else{
                    that.$toast.fail(res.msg)
                }


                // setTimeout(()=>{window.history.go(0)},1500)
                
            }).catch(err=>{
                console.log(err)
            })
        },
        setScroll(){
            // var that=this
            // this.$nextTick(()=>{
            //     that.scroll=new Scroll(that.$refs.wrapper,{
            //         tap:true
            //     })
            // })
           
        },
        getData(){
            let that=this
            let cid=this.$route.query.cid
            that.$post('/look',{
                uid:window.localStorage.uid,
                cid
            }).then(res=>{
                res.data.content=res.data.content.replace('<video','<video webkit-playsinline playsinline x5-playsinline x-webkit-airplay="allow"')
                console.log(res.data.content)
                
                if(res.code===200){
                    that.content1=res.data
                    if(res.data.list.length<7){
                        that.listShow=true;
                    }
                    setTimeout(()=>{
                        that.show=true
                    },500
                    )}
            })
       },
          handleScroll(){
            let that=this
            let a = document.documentElement.scrollTop || document.body.scrollTop;
            
            that.$nextTick(()=>{
                let top1=a-document.getElementById('posi1').offsetTop;
                console.log(top1)
                if(top1>-70){
                    for(let item in that.$refs){
                        that.$refs[item].style['borderBottom']="0";
                    }
                     that.$refs.xiangmu2.style['borderBottom']="3px solid rgb(255, 225, 129)";
                }else{
                    for(let item in that.$refs){
                        that.$refs[item].style['borderBottom']="0";
                    }
                    that.$refs.xiangmu1.style['borderBottom']="3px solid rgb(255, 225, 129)";
                }
            })
             that.$(that.$refs.xiangmu1).bind('click',function (){
                    
                document.documentElement.scrollTop=document.getElementById('posi').offsetTop-50
                document.body.scrollTop=document.getElementById('posi').offsetTop-50
                        
                    
                })
            that.$(that.$refs.xiangmu2).bind('click',function (){
                    
                document.documentElement.scrollTop=document.getElementById('posi1').offsetTop
                document.body.scrollTop=document.getElementById('posi1').offsetTop
                  
             })

        }
},
    created () {
      this.getData()  
    },
    mounted(){
        // this.setScroll()
        //console.log(this.$route.query.cid)
        this.$nextTick(()=>{
            window.addEventListener('scroll', this.handleScroll)
        })
    }

}
</script>

<style scoped>
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
  margin: 0 auto;
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