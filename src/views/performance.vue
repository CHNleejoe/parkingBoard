<template>
     <div>
        <van-nav-bar title="全员绩效表" left-text="" left-arrow fixed  @click-left="onClickLeft"></van-nav-bar>
        <div class="content" style="padding-top:4.5rem">
              <div class="flex_row">
                <van-field
                  readonly
                  clickable
                  label="范围："
                  :value="value11"
                  placeholder="选择范围"
                  @click="showPicker1 = true"
                />
                <van-field
                  readonly
                  clickable
                  label="人数："
                  :value="value22"
                  @click="showPicker2 = true"
                />
                <div class="line_1"></div>
              </div>
              <p class="line_2"></p>
                <van-swipe @change="onChange">
                  <van-swipe-item>
                    <div style="width:100%" class="co_f1">
                      <div class="title_1">月报完成情况</div>
                      <canvas id="pieOne"  height="270" style="padding-left: 1.875rem;"></canvas>
                    </div>
                  </van-swipe-item>
                  <template #indicator>
                    <div class="custom-indicator">
                      <!-- {{ current + 1 }}/4 -->
                    </div>
                  </template>
                </van-swipe>
          </div>


          <div class="content" style="padding-top:0.5rem">
              <div class="flex_row">
                <van-field
                  readonly
                  clickable
                  label="范围："
                  :value="value3"
                  placeholder="选择范围"
                  @click="showPicker3 = true"
                />
                <van-field
                  readonly
                  clickable
                  label="时间："
                  :value="value44"
                  placeholder="选择时间段"
                  @click="showPicker4 = true"
                />
                <van-field
                  readonly
                  clickable
                  label="人数："
                  :value="value5"
                />
                <div class="line_1"></div>
              </div>
              <p class="line_2"></p>
                <van-swipe @change="onChange">
                  <van-swipe-item>
                    <div style="width:100%" class="co_f1">
                      <div class="title_1">绩效详情</div>
                      <canvas id="pieTwo"  height="270" style="padding-left: 1.875rem;"></canvas>
                    </div>
                  </van-swipe-item>
                  <template #indicator>
                    <div class="custom-indicator">
                      <!-- {{ current + 1 }}/4 -->
                    </div>
                  </template>
                </van-swipe>
          </div>
          <van-popup v-model="showPicker1" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="columns11"
                  @cancel="showPicker1 = false"
                  @confirm="onConfirm1"
                />
            </van-popup>
            <van-popup v-model="showPicker2" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns22"
                @cancel="showPicker2 = false"
                @confirm="onConfirm2"
              />
          </van-popup>

          <van-popup v-model="showPicker3" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="columns3"
                  @cancel="showPicker3 = false"
                  @confirm="onConfirm3"
                />
            </van-popup>
            <van-popup v-model="showPicker4" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns4"
                @cancel="showPicker4 = false"
                @confirm="onConfirm4"
              />
          </van-popup>
     </div>
</template>

<script>
  import F2 from '@antv/f2/lib/index-all';
  export default {
      data (){
          return {
            current:0,
            value11:'',
            value22:0,
            value3:'',
            value44:'',
            value5:'',
            showPicker1: false,
            showPicker2: false,
            showPicker3:false,
            showPicker4:false,
            columns11: [],
            columns22: [],
            columns3:[],
            columns4:[],
            columns5:[],
            columns6:[],
            columnsIds:[],
            columnsQty:[],
            costId:'',
            comId:'',
          }
      },
      methods:{
        onClickLeft(){
         history.back();
        },
        onChange(index) {
          this.current = index;
        },
        onConfirm1(value,index){
          this.value11 = value;
          this.value22 = this.columnsQty[index];
          this.costId = this.columnsIds[index];
          this.getPerformanceMonth(index)
          console.log('costId',this.costId)
          this.showPicker1 = false;
        },
        onConfirm2(value,index){
          this.value22 = value;
          if(this.costId==-1){
            this.getPerformanceMonth()  
          }else{
            this.getPerformanceMonth(index)
          }
          this.showPicker2 = false;
        },
        onConfirm3(value,index){
            this.value3 = value;
            this.value5 = this.columnsQty[index];
            this.comId = this.columnsIds[index];
            this.getPerformanceInfo(index);
            this.showPicker3 = false;
        },
        onConfirm4(value,index){
            this.value44 = value;
            if(this.comId==-1){
                this.getPerformanceInfo()  
              }else{
                this.getPerformanceInfo(index)
              }
            this.showPicker4 = false;
        },
        getDepartment(){//获取部门数据
        let param = {}
        this.$api.getDepartment(param).then((res)=>{
          let resData = JSON.parse(res.result)
          // console.log(resData)
          if(resData.result=="success"){
            for(let i of resData.data){
              if(i.id==-1){
                this.value11 = i.name;
                this.value3 = i.name;
                this.value22 = i.qty;
                this.value5 = i.qty;
                this.costId = i.id;
                this.comId = i.id;
              }
              this.columns11.push(i.name)
              this.columns3.push(i.name)
              this.columns5.push(i.name)
              this.columnsQty.push(i.qty)
              this.columnsIds.push(i.id)
              }
          }else{
             this.$toast(resData.error);
          }
        })
       },
      getReporMonth(){//月份
          let param = {}
          this.$api.getReporMonth(param).then(res=>{
            let resData = JSON.parse(res.result)
            if(resData.result=="success"){
                // console.log(resData.data)
                this.value44 = resData.data.max;
                for(let i of resData.data.month){
                  this.columns22.push(i)
                  this.columns4.push(i)
                  this.columns6.push(i)
                }
              }else{
                this.$toast(resData.error);
              }
          })
        },
        getPerformanceMonth(index){//获取月报完成情况数据
          let param = {}
          if(this.columnsIds[index]){
          param = {department_id:this.costId} 
          }else{
            param = {department_id:-1}
          }
          this.$api.getPerformanceMonth(param).then(res=>{
            let resData = JSON.parse(res.result)
            console.log(resData.data,'月报完成情况')
            if(resData.result=="success"){
                  for(let i of resData.data){
                    this.$set(i,'a','1') 
                  }
                  this.getChartDataOne(resData.data)
              }else{
                this.$toast(resData.error);
              }
          })
        },
        getChartDataOne(data){//获取月报完成情况图表
            var map = {};
            data.map(function(obj) {
              map[obj.name] = obj.qty + '%';
            });

            var chart = new F2.Chart({
              id: 'pieOne',
              pixelRatio: window.devicePixelRatio,
              padding: [20, 'auto']
            });
            chart.source(data, {
              percent: {
                formatter: function formatter(val) {
                  return val + '%';
                }
              }
            });
            chart.tooltip(false);
            chart.legend({
              position: 'right',
              itemFormatter: function itemFormatter(val) {
                return val + '    ' + map[val];
              }
            });
            chart.coord('polar', {
              transposed: true,
              innerRadius: 0.5,
              radius: 0.85
            });
            chart.axis(false);
            chart.interval().position('a*qty').color('name', ['#FB9199', '#29CB97']).adjust('stack');

            chart.render();
        },
        getPerformanceInfo(index){//获取绩效详情数据
          let param = {}
          if(this.columnsIds[index]){
          param = {department_id:this.comId,month:this.value44} 
          }else{
            param = {department_id:-1,month:this.value44}
          }
          this.$api.getPerformanceInfo(param).then(res=>{
            let resData = JSON.parse(res.result)
            console.log(resData.data,'绩效详情')
            if(resData.result=="success"){
                  for(let i of resData.data){
                    this.$set(i,'a','1') 
                  }
                  this.getChartDataTwo(resData.data)
              }else{
                this.$toast(resData.error);
              }
          })
        },
        getChartDataTwo(data){//绩效详情图表
              var map = {};
            data.map(function(obj) {
              map[obj.level] = obj.qty + '%';
            });

            var chart = new F2.Chart({
              id: 'pieTwo',
              pixelRatio: window.devicePixelRatio,
              padding: [20, 'auto']
            });
            chart.source(data, {
              percent: {
                formatter: function formatter(val) {
                  return val + '%';
                }
              }
            });
            chart.tooltip(false);
            chart.legend({
              position: 'right',
              itemFormatter: function itemFormatter(val) {
                return val + '    ' + map[val];
              }
            });
            chart.coord('polar', {
              transposed: true,
              innerRadius: 0.5,
              radius: 0.85
            });
            chart.axis(false);
            chart.interval().position('a*qty').color('level', ['#F65860', '#B558F6','#FEC400','#29CB97','#7676FF']).adjust('stack');

            chart.render();
        }
      },
      mounted(){
          this.getDepartment();
          this.getReporMonth();
          setTimeout(()=>{
          this.getPerformanceMonth();
          this.getPerformanceInfo();
        },500)
      }
  }
</script>

<style lang="scss" scoped>
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
/deep/ .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    padding: 0.625rem 0.5rem;
    overflow: hidden;
    color: #fff;
    background-color: #1C162E;
    font-size: 0.875rem;
    line-height: 1.5rem;
    border-top-left-radius: 0.5rem;
    // margin-left: 0.3125rem;
}
/deep/ .van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #fff; 
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/deep/ .van-nav-bar .van-icon{
  color: #fff;
}
/deep/ .van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    box-sizing: border-box;
    width: 2.8125rem;
}
.content{
   padding: 3.5rem 0.9375rem 1.26rem 0.9375rem;
  //  background:#1C162E;
  .co_f1{
      background-color: #1C162E;
      // border-radius: 0.5rem;
      // border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      .title_1{
        font-size:1.125rem;
        font-weight:600;
        color:rgba(1,223,153,1);
        height:1.5625rem;
        text-align: center;
        line-height: 1.5625rem;
        padding-top: 1.25rem;
      }
      .title_2{
        font-size:0.875rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        height:1.5625rem;
        text-align: center;
        line-height: 1.5625rem;
      }
  }
  .custom-indicator {
    position: absolute;
    right: 0.3125rem;
    bottom: 0.3125rem;
    padding: 2px 0.3125rem;
    font-size: 12px;
    color: #000;
    width: 3.125rem;
    height: 1.25rem;
    line-height: 1.25rem;
    text-align: center;
    // background-color: #fff;
    border-radius: 0.625rem;

  }
  .flex_row{
    display: flex;
    .line_1{
      height: 1px;
      // background-color: #fff;
    }
  }
  .line_2{
    width: 100%;
    height: 2px;
    background-color: #fff;
    opacity: 0.6;
    margin-top: -1px;
  }
 }
</style>