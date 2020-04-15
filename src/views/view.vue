<template>
  <div>
   <van-nav-bar title="图表" left-text="" left-arrow>
    <!-- <template #right>
            <van-icon name="search" size="18" /> 
    </template> -->
    </van-nav-bar>
    <div class="content">
        <van-grid :border="false" :column-num="3" >
            <van-grid-item v-for="(item,index) in gridArr" :key="index">
                <img :src="item.img_url" class="img_sty" @click="hanlderToPage(index)" />
                <p class="p_sty">{{item.title}}</p>
            </van-grid-item>
        </van-grid>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            jupArr:['/hrPage','/performance','/pecruitment'],
            gridArr:[
                {title:'人力资源总表',img_url:require('../assets/imgs/rlzy.png')},
                {title:'全员绩效表',img_url:require('../assets/imgs/qyxj.png')},
                {title:'招聘效率表',img_url:require('../assets/imgs/zp.png')}
                ],
        }
    },
    methods:{
        hanlderToPage(index){
            this.$router.push({path:this.jupArr[index]})
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    // height: 18.75rem;
    // background-color: #fff;
    margin: 1.25rem 0.9375rem 1.25rem 0.9375rem;
    border-radius: 0.5rem;
    .img_sty{
        width:3.125rem;height:3.125rem;
    }
    .p_sty{
        color:#fff;margin-top:0.625rem;font-size: 0.8125rem;
    }
    /deep/ .van-grid-item__content {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: 16px 8px;
     background-color: #35265F; 
}
}
.van-nav-bar {
    z-index: 1;         
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #1C162E;
    -webkit-user-select: none;
    user-select: none;
}
/deep/ .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    font-weight: 500;
    font-size: 16px;
    color: #fff ;
    }   
/deep/ .van-nav-bar .van-icon{
  color: #fff;
}

</style>
