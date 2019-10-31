<template>
    <div class="content">
        <img src="@/assets/index/dui.png" alt="" class="img">
        <div class="box-index" style="background:#fff;">
            <h2 style="margin:1rem 0 0 0;">“支付成功”</h2>
            <p style="margin-top:1rem;">
               体魄私教训练馆拥有最完整的私密性爱训练体系，致力于通过科学合理的训练帮助你收获更多的快乐。       
            </p>
           
            <button class="btn" @click="jumpStudy">
                点击这里了解
            </button>
        </div>
    </div>
</template>



<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        jumpStudy(){
            this.$router.push('/index')
        }
    }
}
</script>


<style scoped>
.content{
    width: 100vw;
    height: 100vh;
    background: url('../assets/index/vuebg.png') no-repeat ;
    background-size: 100%;
    padding-top:4rem;
}
.img{
    width: 20vw;
    display: block;
    margin:0 auto ;
}
.box-index h2{
    font-size:2rem;
    font-family:SourceHanSansCN-Normal;
    font-weight:bold;
    color:rgba(140,106,236,1);
    text-shadow:0px 4px 9px rgba(140,107,236,0.56);
    text-align: center;
}
.box-index p{
    font-size:0.8rem;
    font-family:SourceHanSansCN-Normal;
    font-weight:bold;
    color:rgba(131,95,234,1);
    text-shadow:0px 2px 3px rgba(221,221,221,1);
    padding: 0 2rem;
    letter-spacing: .05rem;
}
.btn{
    background: url('../assets/index/md-btn.png') no-repeat ;
    background-size: 100%;
    width: 53vw;
    font-size:1rem;
    font-family:SourceHanSansCN-Normal;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:2rem;
    text-shadow:0px 2px 3px rgba(217,217,217,0.8);
    display: block;
    margin: 2rem auto 1rem;
    letter-spacing: 0.1rem;
    height: 3rem;
}
</style>