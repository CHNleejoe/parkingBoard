<template>
  <div>
   <van-nav-bar title="功能" fixed left-text="" left-arrow @click-left="goBack">
    </van-nav-bar>
    <div class="content">
        <div class="function">
            <div
                class="function-item"
                v-for="(item, index) in functionList"
                :key="index"
                @click="turnPage(item.herf)"
            >
              <div class="img">
                  <img :src="item.icon" alt="">
              </div>
              <div class="label">{{item.label}}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            functionList:[
                {label: '停车收费查询', icon:'./static/imgs/money.png', herf:'/charge'},
                {label: '车辆进出场查询', icon:'./static/imgs/arm.png', herf:'/inOut'},
                {label: '在场车辆查询', icon:'./static/imgs/parking-green.png', herf:'/inParking'},
                {label: '车辆进出场查询', icon:'./static/imgs/king.png', herf:'/user'},
            ],
        }
    },
    methods:{
      goBack() {
          window.location.href = "epipe://?&mark=history_back";
          localStorage.clear();
      },
      turnPage(url){
          const self = this;
          if(url == '') return
          console.log(this.$router.currentRoute.path)
          self.$router.push({ path: url});
      },
    }
}
</script>

<style lang="scss" scoped>
    .content{
        // height: 18.75rem;
        // background-color: #fff;
        // margin: 1.25rem 0.9375rem 1.25rem 0.9375rem;
        // border-radius: 0.5rem;
        font-size:14px;
        padding: 46px 0 0 0;
        .function{
          padding: 0.2rem .15rem 0;
          box-sizing: border-box;
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .function-item{
            width:1.64rem;
            height:1rem;
            background:rgba(19,25,41,1);
            border-radius:0.08rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: .14rem;
            .img{
                width:0.38rem;
                height:0.38rem;
                margin-bottom: .1rem;
                >img{
                    height: 100%;
                    width: 100%;
                }
            }
            .label{
              height:0.2rem;
              font-size:0.14rem;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(255,255,255,1);
              line-height:0.2rem;
            }
          }
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
    /deep/ .van-hairline--bottom{
        &::after{
            border: 0;
        }
    }

</style>
