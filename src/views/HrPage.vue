<template>
  <div class="main">
    <van-nav-bar
      title="人力资源总览图"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="content">
              <div class="flex_row">
                <van-field
                  readonly
                  clickable
                  label="范围："
                  :value="value12"
                  placeholder="选择范围"
                  @click="showPicker = true"
                />
                <van-field
                  readonly
                  clickable
                  label="人数："
                  :value="value13"
                 
                />
                <div class="line_1"></div>
              </div>
              <p class="line_2"></p>
        <van-swipe @change="onChange">
          <van-swipe-item>
            <div style="width:100%" class="co_f1">
              <div class="title_1">学历分布图</div>
              <canvas id="pieOne"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div style="width:100%" class="co_f1">
              <div class="title_1">岗位序列分布图</div>
              <canvas id="pieTwo"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <van-swipe-item>
             <div style="width:100%" class="co_f1">
              <div class="title_1">年龄分布图</div>
              <canvas id="pieThree"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <van-swipe-item>
             <div style="width:100%" class="co_f1">
              <div class="title_1">司龄分布图</div>
              <canvas id="pieFour"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              <!-- {{ current + 1 }}/4 -->
            </div>
          </template>
        </van-swipe>
    </div>
    <div class="content" style="margin-top:-3rem">
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
                  label="年度："
                  :value="value22"
                  placeholder="选择年度"
                  @click="showPicker2 = true"
                />
                <div class="line_1"></div>
              </div>
              <p class="line_2"></p>
        <van-swipe @change="onChange">
          <van-swipe-item>
            <div style="width:100%" class="co_f1">
              <div class="title_1">年度人力成本分析</div>
              <div class="title_2">（元/月份）</div>
              <canvas id="brokenOne"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div style="width:100%" class="co_f1">
              <div class="title_1">绩效分析</div>
              <canvas id="brokenTwo"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <van-swipe-item>
             <div style="width:100%" class="co_f1">
              <div class="title_1">招聘入职需求</div>
              <canvas id="borkenThree"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <van-swipe-item>
             <div style="width:100%" class="co_f1">
              <div class="title_1">离职分析</div>
              <div class="title_2">（人数/月份）</div>
              <canvas id="LeaveFour"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              <!-- {{ current + 1 }}/4 -->
            </div>
          </template>
        </van-swipe>
    </div>
    <div class="content" style="margin-top:-3rem;margin-bottom:1.25rem">
              <div class="flex_row">
                <van-field
                  readonly
                  clickable
                  label="范围："
                  :value="value23"
                  placeholder="选择范围"
                  @click="showPicker13 = true"
                />
                <van-field
                  readonly
                  clickable
                  label="时间："
                  :value="value33"
                  placeholder="选择时间段"
                  @click="showPicker33 = true"
                />
                <div class="line_1"></div>
              </div>
              <p class="line_2"></p>
        <van-swipe @change="onChange">
          <van-swipe-item>
            <div style="width:100%" class="co_f1">
              <div class="title_1">招聘达成分析</div>
              <canvas id="stripOne"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div style="width:100%" class="co_f1">
              <div class="title_1">招聘效率分析</div>
              <canvas id="stripTwo"  height="270" style="padding-left: 1.875rem;"></canvas>
            </div>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              <!-- {{ current + 1 }}/4 -->
            </div>
          </template>
        </van-swipe>
    </div>
    <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns12"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
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
    <van-popup v-model="showPicker13" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns13"
          @cancel="showPicker13 = false"
          @confirm="onConfirm13"
        />
    </van-popup>
    <van-popup v-model="showPicker33" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns33"
          @cancel="showPicker33 = false"
          @confirm="onConfirm33"
        />
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'
// const F2 = require('@antv/f2/lib/index');

import F2 from '@antv/f2/lib/index-all';
export default {
  name: 'HrPage',
  data () {
    return {
        current: 0,
        value12: '',
        value13:0,
        value11:'',
        value22:'',
        value23:'',
        value33:'',
        showPicker: false,
        showPicker1: false,
        showPicker2: false,
        showPicker3: false,
        showPicker13: false,
        showPicker33: false,
        columns12: [],
        columns11: [],
        columns22: [],
        columns13:[],
        columns33:[],
        columnsQty:[],
        columnsIds:[],
        listDatas:[],
        listDatasTwo:[],
        comId:'',
        costId:''

    }
  },
  methods:{
    onConfirm(value,index) {
      // console.log(index,'index')
      this.value12 = value;
      // console.log('数量',this.columnsQty[index])
      this.value13 = this.columnsQty[index];
      // console.log('id',this.columnsIds[index])
      // console.log(this.value12 )
      this.getEduction(index);
      this.getPosition(index);
      this.getAge(index);
      this.getWorkAge(index);
      this.showPicker = false;
    },
    onConfirm1(value,index){
      this.value11 = value;
      this.costId = this.columnsIds[index];

      this.getlaborCost(index)
      this.getLeave(index)
      this.getEntry(index)
      this.getAnalysis(index)
      console.log('costId',this.costId)
      this.showPicker1 = false;
    },
    onConfirm2(value,index){
      this.value22 = value;
       if(this.costId==-1){
          this.getlaborCost()
          this.getLeave()
          this.getEntry()
          this.getAnalysis()
      }else{
      this.getlaborCost(index)
      this.getLeave(index)
      this.getEntry(index)
      this.getAnalysis(index)
      }
      this.showPicker2 = false;
    },
    onConfirm13(value,index){
      this.value23 = value;
      this.comId = this.columnsIds[index]
      console.log('com',this.comId)
      this.getRecruitmentInfo(index);
      this.getEfficiency(index)
      this.showPicker13 = false;
    },
    onConfirm33(value,index){
      this.value33 = value;
      this.showPicker33 = false;
      console.log('id',this.comId)
      if(this.comId==-1){
        this.getRecruitmentInfo();
        this.getEfficiency();
      }else{
        this.getRecruitmentInfo(index);
        this.getEfficiency(index);
      }
      console.log(this.value33,'时间段')
    },
    onChange(index) {
      this.current = index;
      
    },
    dataChartPieOne(data){
      // console.log(data,'ddd')
      const chart = new F2.Chart({
        id:'pieOne',
        pixelRatio:window.devicePixelRatio
      });
      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.4,
        radius: 0.75
      });
      chart.axis(false);
      chart.legend({
        position: 'bottom',
        align: 'center'
      });
      chart.tooltip(false);
      // 配置文本饼图
      chart.pieLabel({
        sidePadding: 5,
        label1: function label1(data) {
          return {
            text: data.name,
            fill: '#808080'
          };
        },
        label2: function label2(data) {
          return {
            fill: '#fff',
            text: data.employee_qty,
            fontWeight: 500,
            fontSize: 10
          };
        }
      });
      chart.interval()
      .position('const*ratio')
      .color('name', [ '#FB9199', '#B558F6', '#FACC14', '#29CB97', '#7676FF' ])
      .adjust('stack');
      chart.render();
      // 绘制内阴影
      // const frontPlot = chart.get('frontPlot');
      // const coord = chart.get('coord'); // 获取坐标系对象
      // frontPlot.addShape('sector', {
      // attrs: {
      //     x: coord.center.x,
      //     y: coord.center.y,
      //     r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
      //     r0: coord.circleRadius * coord.innerRadius,
      //     fill: '#000',
      //     opacity: 0.15
      //   }
      // });
    },
    dataChartPieTwo(data){
      // console.log(data,'ddd')
      const chart = new F2.Chart({
        id:'pieTwo',
        pixelRatio:window.devicePixelRatio
      });
      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.4,
        radius: 0.75
      });
      chart.axis(false);
      chart.legend({
        position: 'bottom',
        align: 'center'
      });
      chart.tooltip(false);
      // 配置文本饼图
      chart.pieLabel({
        sidePadding: 5,
        label1: function label1(data) {
          return {
            text: data.p_name,
            fill: '#808080'
          };
        },
        label2: function label2(data) {
          return {
            fill: '#fff',
            text: data.p_sum,
            fontWeight: 500,
            fontSize: 10
          };
        }
      });
      chart.interval()
      .position('const*ratio')
      .color('p_name', [ '#FB9199', '#B558F6', '#FACC14', '#29CB97', '#7676FF' ])
      .adjust('stack');
      chart.render();
      // 绘制内阴影
      // const frontPlot = chart.get('frontPlot');
      // const coord = chart.get('coord'); // 获取坐标系对象
      // frontPlot.addShape('sector', {
      // attrs: {
      //     x: coord.center.x,
      //     y: coord.center.y,
      //     r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
      //     r0: coord.circleRadius * coord.innerRadius,
      //     fill: '#000',
      //     opacity: 0.15
      //   }
      // });
    },
    dataChartPieThree(data){
      // console.log(data,'ddd')
      const chart = new F2.Chart({
        id:'pieThree',
        pixelRatio:window.devicePixelRatio
      });
      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.4,
        radius: 0.75
      });
      chart.axis(false);
      chart.legend({
        position: 'bottom',
        align: 'center'
      });
      chart.tooltip(false);
      // 配置文本饼图
      chart.pieLabel({
        sidePadding: 5,
        label1: function label1(data) {
          return {
            text: data.name,
            fill: '#808080'
          };
        },
        label2: function label2(data) {
          return {
            fill: '#fff',
            text: data.qty,
            fontWeight: 500,
            fontSize: 10
          };
        }
      });
      chart.interval()
      .position('const*ratio')
      .color('name', [ '#FB9199', '#B558F6', '#FACC14', '#29CB97', '#7676FF' ])
      .adjust('stack');
      chart.render();
      // 绘制内阴影
      // const frontPlot = chart.get('frontPlot');
      // const coord = chart.get('coord'); // 获取坐标系对象
      // frontPlot.addShape('sector', {
      // attrs: {
      //     x: coord.center.x,
      //     y: coord.center.y,
      //     r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
      //     r0: coord.circleRadius * coord.innerRadius,
      //     fill: '#000',
      //     opacity: 0.15
      //   }
      // });
    },
    dataChartPieFour(data){
      // console.log(data,'four')
      const chart = new F2.Chart({
        id:'pieFour',
        pixelRatio:window.devicePixelRatio
      });
      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.4,
        radius: 0.75
      });
      chart.axis(false);
      chart.legend({
        position: 'bottom',
        align: 'center'
      });
      chart.tooltip(false);
      // 配置文本饼图
      chart.pieLabel({
        sidePadding: 5,
        label1: function label1(data) {
          return {
            text: data.name,
            fill: '#808080'
          };
        },
        label2: function label2(data) {
          return {
            fill: '#fff',
            text: data.qty,
            fontWeight: 500,
            fontSize: 10
          };
        }
      });
      chart.interval()
      .position('const*ratio')
      .color('name', [ '#FB9199', '#B558F6', '#FACC14', '#29CB97', '#7676FF' ])
      .adjust('stack');
      chart.render();
      // 绘制内阴影
      // const frontPlot = chart.get('frontPlot');
      // const coord = chart.get('coord'); // 获取坐标系对象
      // frontPlot.addShape('sector', {
      // attrs: {
      //     x: coord.center.x,
      //     y: coord.center.y,
      //     r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
      //     r0: coord.circleRadius * coord.innerRadius,
      //     fill: '#000',
      //     opacity: 0.15
      //   }
      // });
    },
    getDepartment(){//获取部门数据
        let param = {}
        this.$api.getDepartment(param).then((res)=>{
          let resData = JSON.parse(res.result)
          // console.log(resData)
          if(resData.result=="success"){
            for(let i of resData.data){
              // console.log(i)
              if(i.id==-1){
                this.value12 = i.name;
                this.value13 = i.qty;
                this.value23 = i.name;
                this.value11 = i.name;
                this.comId = i.id;
                this.costId = i.id;

              }
              this.columns12.push(i.name)
              this.columns11.push(i.name)
              this.columns13.push(i.name)
              this.columnsQty.push(i.qty)
              this.columnsIds.push(i.id)
              }
          }else{
             this.$toast(resData.error);
          }
        })
    },
    getEduction(index){//学历分布图数据
           let param = {}
           if(this.columnsIds[index]){
            param = {department_id:this.columnsIds[index]} 
           }else{
              param = {department_id:-1}
           }
   
      this.$api.getEduction(param).then((res)=>{
        let resData = JSON.parse(res.result)
          if(resData.result=="success"){
          // console.log('数据',resData.data)
                this.listDatas = resData.data;
                for(let i of resData.data){
                  this.$set(i,'const','const')
                  if(this.value13!=0){
                    let ratioD = i.employee_qty/this.value13
                    this.$set(i,'ratio',ratioD)
                  }          
                }
                this.dataChartPieOne(this.listDatas);
          }else{
             this.$toast(resData.error);
          }
      })
    },
    getPosition(index){//岗位序列分布图
      let param = {}
        if(this.columnsIds[index]){
        param = {department_id:this.columnsIds[index]} 
        }else{
          param = {department_id:-1}
        }
      this.$api.getPosition(param).then(res=>{
        let resData = JSON.parse(res.result)

          if(resData.result=="success"){
              // console.log(resData.data)
              this.listDatasTwo = resData.data;
              for(let i of resData.data){
                this.$set(i,'const','const')
                if(this.value13!=0){
                  let ratioD = i.p_sum/this.value13
                  this.$set(i,'ratio',ratioD)
                } 
              }
              this.dataChartPieTwo(this.listDatasTwo)
          }else{
             this.$toast(resData.error);
          }
      })
    },
    getAge(index){
     let param = {}
           if(this.columnsIds[index]){
            param = {department_id:this.columnsIds[index]} 
           }else{
              param = {department_id:-1}
           }
      this.$api.getAge(param).then(res=>{
        let resData = JSON.parse(res.result)
        if(resData.result=="success"){
              // console.log(resData.data)
              for(let i of resData.data){
                this.$set(i,'const','const')
                if(this.value13!=0){
                  let ratioD = i.qty/this.value13
                  this.$set(i,'ratio',ratioD)
                } 
              }
              this.dataChartPieThree(resData.data)
          }else{
             this.$toast(resData.error);
          }
      })
    },
    getWorkAge(index){
      let param = {}
          if(this.columnsIds[index]){
          param = {department_id:this.columnsIds[index]} 
          }else{
            param = {department_id:-1}
          }
      this.$api.getWorkAge(param).then(res=>{
        let resData = JSON.parse(res.result)
        if(resData.result=="success"){
              // console.log(resData.data)
              for(let i of resData.data){
                this.$set(i,'const','const')
                if(this.value13!=0){
                  let ratioD = i.qty/this.value13
                  this.$set(i,'ratio',ratioD)
                } 
              }
              this.dataChartPieFour(resData.data)
          }else{
             this.$toast(resData.error);
          }
      })
    },
    onClickLeft(){
      history.back();
    },
    color16(){//十六进制颜色随机
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
			return color;
		},
    getAnalysis(index){//获取绩效分析
    let param = {}
      if(this.columnsIds[index]){
          param = {department_id:this.costId,year:this.value22} 
          }else{
            param = {department_id:-1,year:this.value22}
          }
      this.$api.getAnalysis(param).then(res=>{
        let resData = JSON.parse(res.result)
          if(resData.result=="success"){
              console.log(resData.data,'绩效分析')
              this.getAnalysisChartData(resData.data)
          }else{
             this.$toast(resData.error);
          }
      })
    },
    getAnalysisChartData(data){
         var chart = new F2.Chart({
            id: 'brokenTwo',
            pixelRatio: window.devicePixelRatio
          });

          chart.source(data, {
            tem: {
              tickCount: 5
            }
          });
          chart.tooltip({
            custom: true, // 自定义 tooltip 内容框
            onChange: function onChange(obj) {
              var legend = chart.get('legendController').legends.top[0];
              var tooltipItems = obj.items;
              var legendItems = legend.items;
              var map = {};
              legendItems.map(function(item) {
                map[item.name] = _.clone(item);
              });
              tooltipItems.map(function(item) {
                var name = item.name;
                var value = item.value;
                if (map[name]) {
                  map[name].value = value;
                }
              });
              legend.setItems(_.values(map));
            },
            onHide: function onHide() {
              var legend = chart.get('legendController').legends.top[0];
              legend.setItems(chart.getLegendItems().country);
            }
          });
          chart.interval().position('month*qty').color('level',[ '#FB9199', '#B558F6', '#FACC14', '#29CB97', '#7676FF' ]).style('qty', {
            radius: function radius(val) {
              return val > 0 ? [2, 2, 0, 0] : [0, 0, 2, 2];
            }
          }).adjust('dodge');
          chart.render();
    },
    getReportYear(){//年度
      let param = {}
      this.$api.getReportYear(param).then(res=>{
        let resData = JSON.parse(res.result)
        if(resData.result=="success"){
            console.log(resData.data,'年度')
            this.value22 = resData.data.max;
            for(let i of resData.data.year){
              this.columns22.push(i)
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
            this.value33 = resData.data.max;
            for(let i of resData.data.month){
              this.columns33.push(i)
            }
          }else{
             this.$toast(resData.error);
          }
      })
    },
    getRecruitmentInfo(index){//获取招聘达成分析
    let param = {}
          if(this.columnsIds[index]){
          param = {department_id:this.comId,month:this.value33} 
          }else{
            param = {department_id:-1,month:this.value33}
          }
      this.$api.getRecruitmentInfo(param).then(res=>{

        let resData = JSON.parse(res.result)
              console.log(resData.data,'招聘达成')
        if(resData.result=="success"){
              this.getStripData(resData.data)
          }else{
             this.$toast(resData.error);
          }
      })
    },
    getEfficiency(index){//获取招聘效率分析
      let param = {}
      if(this.columnsIds[index]){
          param = {department_id:this.comId,month:this.value33} 
          }else{
            param = {department_id:-1,month:this.value33}
          }
          this.$api.getEfficiency(param).then(res=>{
            let resData = JSON.parse(res.result)
            //  console.log(resData.data,'wod ')
             if(resData.result=="success"){
              this.getStripDataTwo(resData.data)
              }else{
                this.$toast(resData.error);
              }
          })
    },
    getStripData(data){//招聘达成分析图表
      var Global = F2.Global;
      var data = data.reverse();
      const chart = new F2.Chart({
        id: 'stripOne',
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.coord({
        transposed: true
      });
      chart.axis('name', {
        line: Global._defaultAxis.line,
        grid: null
      });
      chart.axis('qty', {
        line: null,
        grid: Global._defaultAxis.grid,
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = items[0].value;
        }
      });
      chart.interval().position('name*qty');
      chart.render();
    },
    getStripDataTwo(data){//招聘达成分析图表
      var Global = F2.Global;
      var data = data.reverse();
      const chart = new F2.Chart({
        id: 'stripTwo',
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.coord({
        transposed: false
      });
      chart.axis('name', {
        line: Global._defaultAxis.line,
        grid: null
      });
      chart.axis('qty', {
        line: null,
        grid: Global._defaultAxis.grid,
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = items[0].value;
        }
      });
      chart.interval().position('name*qty');
      chart.render();
    },
    getlaborCost(index){//获取年度人力成本分析
      let param = {}
      if(this.columnsIds[index]){
          param = {department_id:this.costId,year:this.value22} 
          }else{
            param = {department_id:-1,year:this.value22}
          }
      this.$api.getlaborCost(param).then(res=>{
        let resData = JSON.parse(res.result)
        console.log(resData.data,'年度数据')
        if(resData.result=="success"){
              this.getBrokenOneData(resData.data)
            }else{
              this.$toast(resData.error);
            }
      })  
    },
  getBrokenOneData(data){//获取年度人力成本分析图表
    const chart = new F2.Chart({
      id: 'brokenOne',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.scale({
      time: {
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    });
    chart.axis('month', {
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        }
        if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      onShow: function onShow(ev) {
        const items = ev.items;

        items[0].name = items[0].title;
      }
    });

    chart.area().position('month*cost');
    chart.line().position('month*cost');
    chart.render();
    var item = {};
    for(let val of data){
      item = val
    }
    // 默认展示 tooltip
     // 要展示 tooltip 的数据
    const point = chart.getPosition(item); // 获取该数据的画布坐标
    chart.showTooltip(point); // 展示该点的 tooltip
    },
    getLeave(index){//离职分析
      let param = {}
      if(this.columnsIds[index]){
          param = {department_id:this.costId,year:this.value22} 
          }else{
            param = {department_id:-1,year:this.value22}
          }
          this.$api.getLeave(param).then(res=>{
            let resData = JSON.parse(res.result)
            console.log(resData.data,'离职数据')
            if(resData.result=="success"){
                  this.getLeaveChartData(resData.data)
                }else{
              this.$toast(resData.error);
            }
          })
    },
    getLeaveChartData(data){//离职分析图表
      const chart = new F2.Chart({
      id: 'LeaveFour',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.scale({
      time: {
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    });
    chart.axis('month', {
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        }
        if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      onShow: function onShow(ev) {
        const items = ev.items;

        items[0].name = items[0].title;
      }
    });

    chart.area().position('month*qty');
    chart.line().position('month*qty');
    chart.render();
    var item = {};
    for(let val of data){
      item = val
    }
    // 默认展示 tooltip
     // 要展示 tooltip 的数据
    const point = chart.getPosition(item); // 获取该数据的画布坐标
    chart.showTooltip(point); // 展示该点的 tooltip
    },
    getEntry(index){//招聘入职需求
        let param = {}
          if(this.columnsIds[index]){
              param = {department_id:this.costId,year:this.value22} 
              }else{
                param = {department_id:-1,year:this.value22}
              }
          this.$api.getEntry(param).then(res=>{
            let resData = JSON.parse(res.result)
            console.log(resData.data,'招聘入职数据')
    if(resData.result=="success"){
        this.getEntryChartData(resData.data)
          }else{
            this.$toast(resData.error);
          }
        })
    },
    getEntryChartData(data){
     const chart = new F2.Chart({
          id: 'borkenThree',
          pixelRatio: window.devicePixelRatio
        });
        chart.source(data);
        chart.tooltip({
          showCrosshairs: true
        });
        chart.legend({
          marker: function marker(x, y, r, ctx) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.moveTo(x - r - 3, y);
            ctx.lineTo(x + r + 3, y);
            ctx.stroke();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.fill();
          }
        });
        chart.line().position('month*qty').color('type');
        chart.point().position('month*qty').color('type')
          .style({
            lineWidth: 1,
            stroke: '#fff'
          });
        chart.render();
    }
  },
  created(){
  
   this.getReportYear();
   this.getReporMonth();
  },
  mounted(){
  
      this.getDepartment();

      setTimeout(() => {
         this.getEduction();
         this.getPosition();
         this.getAge();
         this.getWorkAge();
         this.getRecruitmentInfo();
         this.getEfficiency();
         this.getlaborCost();
         this.getLeave();
         this.getEntry();
         this.getAnalysis();
      }, 500);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main{
  // background-color: #35265F;
.van-nav-bar {
    z-index: 1;         
    height: 2.875rem;
    line-height: 2.875rem;
    text-align: center;
    background-color: #1C162E;
    -webkit-user-select: none;
    user-select: none;
}
/deep/ .van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    box-sizing: border-box;
    width: 2.8125rem;
}
/deep/ .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 13.75rem;
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
/deep/ .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    font-weight: 500;
    font-size: 1rem;
    color: #fff ;
    }
/deep/ .van-nav-bar .van-icon{
  color: #fff;
}
 .content{
   padding: 4.5rem 0  0.26rem 0.9375rem;
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

}
</style>
