<template>
    <div>
        <div class="box-index" style="width:75vw;padding:2rem">
            <div class="text">
               {{content}}
            </div>
            <img v-lazy="'http://www.shanshangdajiazu.com'+cover" style="width:100%;margin:1rem auto;">
            <div class="bottom">
                扫一扫二维码图案，进行咨询
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            content:"",
            cover:""
        }
    },
    methods:{
        getData(){
            let that=this;
            that.$get('/myService').then(res=>{
                that.content=res.data.content
                that.cover=res.data.cover
            })
        }
    },
    created() {
        this.getData()
    },
}
</script>


<style scoped>
  .text{
    font-size:0.8rem;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(8,110,249,1);
    letter-spacing: .1rem;
    text-indent: 1.6rem;
  }  
  .bottom{
    font-size:0.7rem;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(8,110,249,1);
    text-align: center;
    margin-top: 0.2rem;
  }
</style>



