<template>
     <div>
        <van-nav-bar title="招聘效率表" left-text="" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>
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
                  label="时间："
                  :value="value22"
                  placeholder="选择时间"
                  @click="showPicker2 = true"
                />
                <div class="line_1"></div>
              </div>
              <p class="line_2"></p>
                <van-swipe @change="onChange">
                  <van-swipe-item>
                    <div style="width:100%" class="co_f1">
                      <div class="title_1">招聘达成率</div>
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

            <div class="content" style="margin-top:-3.5rem">
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
                  :value="value4"
                  placeholder="选择时间"
                  @click="showPicker4 = true"
                />
                <div class="line_1"></div>
              </div>
              <p class="line_2"></p>
                <van-swipe @change="onChange">
                  <van-swipe-item>
                    <div style="width:100%" class="co_f1">
                      <div class="title_1">招聘人员追踪</div>
                      <canvas id="lineOne"  height="270" style="padding-left: 1.875rem;"></canvas>
                    </div>
                  </van-swipe-item>
                  <template #indicator>
                    <div class="custom-indicator">
                      <!-- {{ current + 1 }}/4 -->
                    </div>
                  </template>
                </van-swipe>
            </div>
            <div class="content" style="margin-top:-4rem">
              <div class="flex_row">
                <van-field
                  readonly
                  clickable
                  label="范围："
                  :value="value5"
                  placeholder="选择范围"
                  @click="showPicker5 = true"
                />
                <van-field
                  readonly
                  clickable
                  label="时间："
                  :value="value6"
                  placeholder="选择时间"
                  @click="showPicker6 = true"
                />
                <div class="line_1"></div>
              </div>
              <p class="line_2"></p>
              <van-swipe @change="onChange">
                  <van-swipe-item>
                    <div style="width:100%" class="co_f1">
                      <div class="title_1">当期需求分布</div>
                      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                        <van-list
                          v-model="loading"
                          :finished="finished"
                          finished-text="没有更多了"
                          @load="onLoad"
                        >
                        <div class="flex_st">
                          <div>部门</div>
                          <div>需求类型</div>
                          <div>数量</div>
                        </div>
                        <div class="flex_st" v-for="(item,index) in listData" :key="index">
                          <div>{{item.name}}</div>
                          <div>{{item.type}}</div>
                          <div>{{item.qty}}</div>
                        </div>
                        </van-list>
                        <div v-if='noData'>
                          暂无数据
                        </div>
                      </van-pull-refresh>
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

          <van-popup v-model="showPicker5" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="columns5"
                  @cancel="showPicker5 = false"
                  @confirm="onConfirm5"
                />
            </van-popup>
          <van-popup v-model="showPicker6" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns6"
                @cancel="showPicker6 = false"
                @confirm="onConfirm6"
              />
          </van-popup>
     </div>
</template>

<script>
  import F2 from '@antv/f2/lib/index-all';
  import insertCss from 'insert-css';
  insertCss(`
  @font-face {
    font-family: 'iconfont';  /* project id 470089 */
    src: url('//at.alicdn.com/t/font_470089_9m0keqj54r.eot');
    src: url('//at.alicdn.com/t/font_470089_9m0keqj54r.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_470089_9m0keqj54r.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_470089_9m0keqj54r.woff') format('woff'),
    url('//at.alicdn.com/t/font_470089_9m0keqj54r.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_470089_9m0keqj54r.svg#iconfont') format('svg');
  }
`);
  export default {
      data (){
          return {
            current:0,
            value11:'',
            value22:'',
            value3:'',
            value4:'',
            value5:'',
            value6:'',
            showPicker1: false,
            showPicker2: false,
            showPicker3:false,
            showPicker4:false,
            showPicker5:false,
            showPicker6:false,
            columns11: [],
            columns22: [],
            columns3:[],
            columns4:[],
            columns5:[],
            columns6:[],
            columnsIds:[],
            costId:'',
            comId:'',
            butId:'',
            loading:false,
            finished: false,
            refreshing:false,
            listData: [],
            page:1,
            noData: false, // 如果没有数据，显示暂无数据
          }
      },
      methods:{
        getDistributed(index){//当期需求分布
         let param = {}
          if(this.columnsIds[index]){
            param = {department_id:this.butId,month:this.value6,} 
          }else{
            param = {department_id:-1,month:this.value6,page:this.page}
          }
          this.$api.getDistributed(param).then(res=>{
            let resData = JSON.parse(res.result)
            if(resData.result=="success"){
                console.log(resData.data,'需求分布')
                this.loading = false;
                this.listData = this.listData.concat(resData.data)
                this.page++
                // 如果没有数据，显示暂无数据
                if (resData.data.length === 0 && this.page === 1) {
                  this.noData = true
                }
                // 如果加载完毕，显示没有更多了
                if (resData.data.length === 0) {
                  this.finished = true
                }
              }else{
                this.$toast(resData.error);
              }
          })
        },
        // 列表加载
        onLoad() {
          setTimeout(() => {
          this.getDistributed();
          this.loading = true
          }, 1500);
        },
        onRefresh() {
          setTimeout(()=>{
            this.refreshing = false;
            this.listData = []
            this.page = 1
            this.loading = false
            this.finished = false
            this.noData = false
            this.getDistributed();
          },1500)
        },
      onClickLeft(){
         history.back();
        },
        onChange(index) {
          this.current = index;
        },
        onConfirm1(value,index){
          this.value11 = value;
          this.costId = this.columnsIds[index];
          this.getrecruitmentefficiency(index)
          console.log('costId',this.costId)
          this.showPicker1 = false;
        },
        onConfirm2(value,index){
          this.value22 = value;
          if(this.costId==-1){
            this.getrecruitmentefficiency()
          }else{
          this.getrecruitmentefficiency(index)
          }
          this.showPicker2 = false;
        },
        onConfirm3(value,index){
          this.value3 = value;
          this.comId = this.columnsIds[index];
          this.getRecruitmentTrack();
          this.showPicker3 = false;
        },
        onConfirm4(value,index){
          this.value4 = value;
          if(this.costId==-1){
          this.getRecruitmentTrack()
          }else{
          this.getRecruitmentTrack(index)
          }
          this.showPicker4 = false;
        },
        onConfirm5(value,index){
          this.value5 = value;
          this.butId = this.columnsIds[index];
          this.getDistributed()
          this.showPicker5 = false;
        },
        onConfirm6(value,index){
          this.value6 = value;
          if(this.butId==-1){
          this.getDistributed()
          }else{
          this.getDistributed(index)
          }
          this.showPicker6 = false;
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
                this.value5 = i.name;
                this.costId = i.id;
                this.comId = i.id;
                this.butId = i.id;
              }
              this.columns11.push(i.name)
              this.columns3.push(i.name)
              this.columns5.push(i.name)
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
                this.value22 = resData.data.max;
                this.value4 = resData.data.max;
                this.value6 = resData.data.max;
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

      getrecruitmentefficiency(index){//获取招聘达成率数据
       let param = {}
          if(this.columnsIds[index]){
          param = {department_id:this.costId,month:this.value22} 
          }else{
            param = {department_id:-1,month:this.value22}
          }
        this.$api.getrecruitmentefficiency(param).then(res=>{
        let resData = JSON.parse(res.result)
          console.log(resData.data,'招聘达成率数据')
        if(resData.result=="success"){
              for(let i of resData.data){
                this.$set(i,'a','1') 
              }
              this.getStripData(resData.data)
          }else{
             this.$toast(resData.error);
          }
        })
      },
      getStripData(data){//获取招聘达成率图表
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
        chart.interval().position('a*qty').color('name', ['#FE5D4D', '#29CB97']).adjust('stack');
        // chart.guide().html({
        //   position: ['50%', '45%'],
        //   html: '<div style="width: 250px;height: 40px;text-align: center;">' + '<div style="font-size: 16px">总资产</div>' + '<div style="font-size: 24px">133.08 亿</div>' + '</div>'
        // });
        chart.render();
        },

      getRecruitmentTrack(index){//获取招聘人员追踪数据
        let param = {}
          if(this.columnsIds[index]){
          param = {department_id:this.comId,month:this.value4} 
          }else{
            param = {department_id:-1,month:this.value4}
          }
        this.$api.getRecruitmentTrack(param).then(res=>{
          let resData = JSON.parse(res.result)
          console.log(resData.data,'招聘人员追踪数据')
          if(resData.result=="success"){
                this.getChartData(resData.data)
            }else{
              this.$toast(resData.error);
            }
          })
      },
      getChartData(data){
          const iconfontMap = {
            待入职: 'e60d', // iconfont 对应的 unicode 编码
            取消入职: 'e60e',
            待转正: 'e60f',
            已转正: 'e610',
            未转正离职: 'e60c',
            已转正离职: 'e60g'
          };
          // const data = [{
          //   fruit: '苹果',
          //   value: 26
          // }, {
          //   fruit: '梨子',
          //   value: 40
          // }, {
          //   fruit: '香蕉',
          //   value: 30
          // }, {
          //   fruit: '葡萄',
          //   value: 24
          // }, {
          //   fruit: '西瓜',
          //   value: 15
          // }];
          const chart = new F2.Chart({
            id: 'lineOne',
            pixelRatio: window.devicePixelRatio
          });

          chart.source(data);
          chart.legend(false);
          chart.axis('qty', true);

          // 绘制带 iconfont 的 Guide.Text
          data.forEach(function(obj) {
            chart.guide().text({
              position: [ obj.fruit, obj.value ],
              content: String.fromCharCode(parseInt(iconfontMap[obj.name], 16)) + obj.value,
              style: {
                fontFamily: 'charts-icon',
                textBaseline: 'bottom',
                fontSize: 14
              },
              offsetY: -5
            });
          });

          chart.interval().position('name*qty').color('name',['#76B1FF','#F8AD6F','#FFE400','#53E7C8','#DB91FB','#FB9199']);
          chart.render();
      }
      },
      created(){  
        
      },
      mounted(){
        this.getReporMonth();
        this.getDepartment();
        setTimeout(()=>{
          this.getrecruitmentefficiency();
          this.getRecruitmentTrack();
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
    padding: 0.625rem 1rem;
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
 .bottom_con{
   padding: 3.5rem 0.9375rem 2.26rem 0.9375rem;
   background-color: #000;
   width: 18.75rem;
   margin:0 auto;
   border-radius: 0.5rem;
   margin-bottom: 1.25rem;
 }
 .flex_st{
   display: flex;
   height: 2.25rem;
   justify-content: center;
   align-items:center;
   background-color: #000;
   font-size: 0.9375rem;
  //  color: #00E89E;
   border-bottom: 1px solid #fff;
   opacity: 0.5;
   div{
      width: 33.0%;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }  
 }
</style>