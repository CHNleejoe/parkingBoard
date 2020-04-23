<template>
    <div>
        <van-nav-bar title="停车看板" fixed left-text="" left-arrow @click-left="goBack">
        </van-nav-bar>
        <div class="content">
            <div class="search fixed">
                <div class="type" @click="dateTypePopupCtl = true">{{dateTypeColumns[dateTypeIndex]}}</div>
                <div class="during">
                    <div class="start time" @click="startDatePopupCtl = true;endDatePopupCtl = false;dateTypeIndex = 3;">{{startDate}}</div>
                    <div class="arrow"></div>
                    <div class="end time" @click="endDatePopupCtl = true;startDatePopupCtl = false;dateTypeIndex = 3;">{{endDate}}</div>
                </div>
                <div class="btn" @click="searchAllData"></div>
            </div>
            <div class="search"></div>
            <div class="datas">
                <div
                    class="data-item"
                    v-for="(item, index) in dataList"
                    :key="index"
                    v-show="item.display == 'hasParkingData'?hasParkingData:true"
                    @click="turnPage(item)"
                >
                    <div class="img">
                        <img :src="item.icon" alt="">
                    </div>
                    <div class="detail">
                        <div class="label">{{item.label}}</div>
                        <div class="num">{{boardData[item.labelStr]}}{{item.unit}}</div>
                    </div>
                </div>
            </div>
            <div class="charts">
                <div class="user-type chart-item">
                    <div class="title border">车辆进出用户类型统计</div>
                    <div id="userTypeChart"></div>
                </div>
                <div class="car-type chart-item">
                    <div class="title border">车辆进出收费用户类型统计</div>
                    <div id="carTypeChart"></div>
                </div>
                <div class="traffic-flow chart-item">
                    <div class="title">车流实时趋势</div>
                    <div id="trafficFlowChart"></div>
                </div>
                <div class="charge chart-item">
                    <div class="title">停车场收费趋势</div>
                    <div id="chargeChart"></div>
                </div>
            </div>
        </div>
        <div class="popups">
            <van-popup v-model="dateTypePopupCtl" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="dateTypeColumns"
                    @cancel="dateTypePopupCtl = false"
                    @confirm="confirmDateType"
                />
            </van-popup>
            <van-popup v-model="startDatePopupCtl" position="bottom">
                <van-datetime-picker
                    v-model="displayStartDate"
                    type="date"
                    :formatter="formatter"
                    @cancel='startDatePopupCtl = false;displayStartDate = day(startDate)'
                    @confirm='setStartDate'
                />
            </van-popup>
            <van-popup v-model="endDatePopupCtl" position="bottom">
                <van-datetime-picker
                    v-model="displayEndDate"
                    type="date"
                    :formatter="formatter"
                    @cancel='endDatePopupCtl = false;displayEndDate = day(endDate)'
                    @confirm='setEndDate'
                />
            </van-popup>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import {Toast} from 'vant';

export default {
    data(){
        return {
            // 看板items渲染数据以及获取数据
            dataList:[
                {label: '进出车辆总量', labelStr: 'total', icon:'./static/imgs/car.png', unit: '辆', herf:'/inOut', expend: {inOut: 0}, display: true},
                {label: '进场车辆总量', labelStr: 'enter', icon:'./static/imgs/out.png', unit: '辆', herf:'/inOut', expend: {inOut: 1}, display: true},
                {label: '出场车辆总量', labelStr: 'out', icon:'./static/imgs/out-yellow.png', unit: '辆', herf:'/inOut', expend: {inOut: 2}, display: true},
                {label: '在场车辆总数', labelStr: 'curr', icon:'./static/imgs/parking-red.png', unit: '辆', herf:'/inParking', display: 'hasParkingData'},
                {label: '停车场总车位数', labelStr: 'parkPlaceNum', icon:'./static/imgs/parking.png', unit: '个', herf:'', display: true},
                {label: '剩余车位数', labelStr: 'leftPlaceNum', icon:'./static/imgs/parking-green.png', unit: '个', herf:'', display: true},
                {label: '收到停车费', labelStr: 'price', icon:'./static/imgs/money.png', unit: '元', herf:'/charge', display: true},
            ],
            boardData: { 
                total: 0,
                price: 0,
                enter: 0,
                curr: 0,
                out: 0,
                parkPlaceNum: 0,
                leftPlaceNum: 0
            },

            // 时间类型控制器数据
            dateTypePopupCtl: false,
            dateTypeColumns:['今日','本月','本年','自定义'],
            dateTypeIndex: 0,
            
            // 时间选择器控制器数据
            displayStartDate: new Date(),
            startDate: dayjs(new Date()).format('YYYY/MM/DD'),

            displayEndDate: new Date(),
            endDate: dayjs(new Date()).format('YYYY/MM/DD'),

            startDatePopupCtl: false,
            endDatePopupCtl: false,
            // 用户类型图表数据  车辆进出用户类型统计
            carTypeData: {},
            // 收费用户类型图表数据  车辆进出收费用户类型统计
            carTypeData: {},
            // 车流量图表数据  车流实时趋势
            trafficFlowData: {},
            // 收费统计图表数据  停车场收费趋势
            chargeData: {},

            hasParkingData: true
        }
    },
    watch: {
        dateTypeIndex(val) {
            const self = this;
            if(val == 3) {
                self.startDate = dayjs(new Date()).format('YYYY/MM/DD')
                self.endDate = dayjs(new Date()).format('YYYY/MM/DD')
            }
        }
    },
    components: {
        Toast
    },
    mounted() {
        console.log('board mounted ----')
        const self = this;
        self.searchAllData()    
    },
    methods:{
        goBack() {
            window.location.href = "epipe://?&mark=history_back";
            localStorage.clear();
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`
            }
            return val;
        },
        setStartDate(value) {
            const self = this;
            if(value > dayjs(self.endDate)) {
                Toast('开始时间不能大于结束时间')
                return
            }
            self.startDate = dayjs(value).format('YYYY/MM/DD');
            self.startDatePopupCtl = false;
            self.dateTypeIndex = 3
        },
        setEndDate(value) {
            const self = this;
            if(value < dayjs(self.startDate)) {
                Toast('结束时间不能小于开始时间')
                return
            }
            self.endDate = dayjs(value).format('YYYY/MM/DD');
            self.endDatePopupCtl = false;
            self.dateTypeIndex = 3

        },
        confirmDateType(value, index) {
            const self = this;
            if(index != 3 && index == self.dateTypeIndex) {
                self.dateTypePopupCtl = false
                return
            }
            self.dateTypeIndex = index;
            switch(index) {
                case 0: 
                case 4:
                    self.startDate = dayjs(new Date()).format('YYYY/MM/DD')
                    self.endDate = dayjs(new Date()).format('YYYY/MM/DD')
                    break;
                case 1:
                    self.startDate = dayjs(new Date()).format('YYYY/MM')
                    self.endDate = dayjs(new Date()).format('YYYY/MM')
                    break;
                case 2:
                    self.startDate = dayjs(new Date()).format('YYYY')
                    self.endDate = dayjs(new Date()).format('YYYY')
                    break;
            }
            self.searchAllData()
            self.dateTypePopupCtl = false
        },
        day(t) {
            // console.log(new Date(t))
            return new Date(t)
        },
        turnPage(item){
            const self = this;
            if(item.herf == '') return
            let startDate = self.startDate,
                endDate = self.endDate;
            if(self.dateTypeIndex == 1) {
                startDate = dayjs(self.startDate).format('YYYY-MM-DD')
                endDate = dayjs(self.endDate).endOf('month').format('YYYY-MM-DD')
            }else if(self.dateTypeIndex == 2) {
                item.herf=='/inParking'?'':Toast('由于数据量过大，查询范围只能为30天');
                startDate = dayjs().startOf('month').format('YYYY-MM-DD')
                endDate = dayjs().endOf('month').format('YYYY-MM-DD')
            }
            self.$router.push({ path: item.herf, query: { startDate: startDate, endDate: endDate, expend: item.expend || ''} });
        },
        searchAllData() {
            // console.warn('searchAllData')
            const self = this;
            self.requestGetBoard()
            self.requestGetUserTypeList()
            self.requestGetUserPriceList()
            self.requestGetCarFlowList()
            self.requestGetPriceFlowList()
        },
        formatDateParams() {
            let params = {}
            const self = this;
            switch(self.dateTypeIndex) {
                case 0: 
                    params.startTime = dayjs(self.startDate).format('YYYY-MM-DD')
                    params.endTime = dayjs(self.endDate).format('YYYY-MM-DD')
                    break;
                case 1:
                    params.startTime = dayjs(self.startDate).format('YYYY-MM')
                    params.endTime = dayjs(self.endDate).format('YYYY-MM')
                    break;
                case 2:
                    params.startTime = dayjs(self.startDate).format('YYYY')
                    params.endTime = dayjs(self.endDate).format('YYYY')
                    break;
                case 3:
                    params.startTime = dayjs(self.startDate).format('YYYY-MM-DD')
                    params.endTime = dayjs(self.endDate).format('YYYY-MM-DD')
                    break;
            }
            return params
        }, 
        // 获取看板数据
        requestGetBoard() {
            const self = this;
            let params = self.formatDateParams()
            self.$api.getBoard(params).then(res => {
                console.log('getBoard:',res)
                if(res.h.code != 200) {
                    Toast(res.h.msg)
                    return
                }
                self.boardData = res.b
                self.hasParkingData = (self.startDate==self.endDate && self.startDate == dayjs().format('YYYY/MM/DD'))
            })
        },
        // 车辆进出用户类型统计
        requestGetUserTypeList() {
            const self = this;
            let params = self.formatDateParams()
            self.$api.getUserTypeList(params).then(res => {
                console.log('getUserTypeList:',res)
                if(res.h.code != 200) {
                    Toast(res.h.msg)
                    return
                }
                self.userTypeData = res.b

                self.renderUserTypeChart()
            })
        },
        renderUserTypeChart() {
            const self = this;

            var userTypeChart= echarts.init(document.getElementById('userTypeChart'));
            let xData = [], yData = []
            self.userTypeData.map(item => {
                xData.push({value: item.total, name: item.userType})
                yData.push(item.userType)
            })
            var option = {
                color: ['#767EFF', '#FEC400', '#F65B62', '#43E97D', '#B620E0'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    itemGap: 0,
                    left: 'center',
                    bottom: 5,
                    data: yData,
                    icon:'circle',
                    textStyle: {
                        color: '#fff'
                    }
                },
                series: [
                    {
                        name: '进出用户',
                        type: 'pie',
                        radius: [0, '65%'],
                        top: '-8%',
                        height:'auto',
                        width: 'auto',
                        label: {
                            formatter: '{b}\n({d}%)',
                            fontSize: 10
                        },
                        labelLine: {
                            show: true
                        },
                        data: xData
                    }
                ]
            }
            userTypeChart.setOption(option);
        },
        // 收费用户类型统计
        requestGetUserPriceList() {
            const self = this;
            let params = self.formatDateParams()
            self.$api.getUserPriceList(params).then(res => {
                console.log('getUserTypeList:',res)
                if(res.h.code != 200) {
                    Toast(res.h.msg)
                    return
                }
                self.carTypeData = res.b

                self.renderCarTypeChart()
            })
        },
        renderCarTypeChart() {
            const self = this;

            var carTypeChart= echarts.init(document.getElementById('carTypeChart'));
            let xData = [], yData = []
            self.carTypeData.map(item => {
                xData.push({value: item.price, name: item.userType})
                yData.push(item.userType)
            })
            var option = {
                color: ['#767EFF', '#FEC400', '#F65B62', '#43E97D', '#B620E0'],

                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    itemGap: 0,
                    left: 'center',
                    bottom: 5,
                    data: yData,
                    icon:'circle',
                    textStyle: {
                        color: '#fff'
                    }
                },
                series: [
                    {
                        name: '收费用户',
                        type: 'pie',
                        radius: [0, '65%'],
                        top: '-8%',
                        height:'auto',
                        width: 'auto',
                        label: {
                            formatter: '{b}\n({d}%)',
                            fontSize: 10
                        },
                        labelLine: {
                            show: true
                        },
                        data: xData
                    }
                ]
            }
            carTypeChart.setOption(option);
        },
        // 车流量统计
        requestGetCarFlowList() {
            const self = this;
            let params = self.formatDateParams()
            self.$api.getCarFlow(params).then(res => {
                console.log('getCarFlow:',res)
                if(res.h.code != 200) {
                    Toast(res.h.msg)
                    return
                }
                self.trafficFlowData = res.b
                // self.trafficFlowData.map(item => {
                //     console.log(dayjs(item).hour())
                // })
                self.renderTrafficFlowChart()
            })
        },
        renderTrafficFlowChart() {
            const self = this;

            var trafficFlowChart= echarts.init(document.getElementById('trafficFlowChart'));
            let xData = [],
                yData = [{
                        name: '进出场车辆总数',
                        type: 'line',
                        areaStyle: {},
                        data: []
                    },
                    {
                        name: '进场车辆数',
                        type: 'line',
                        areaStyle: {},
                        data: []
                    },
                    {
                        name: '出场车辆数',
                        type: 'line',
                        areaStyle: {},
                        data: []
                    }]
            self.trafficFlowData.map(item => {
                if(self.dateTypeIndex == 0 || (self.dateTypeIndex == 3 && self.startDate == self.endDate)) {
                    xData.push(dayjs(item.time).hour()+'点')
                } else if(self.dateTypeIndex == 1 || self.dateTypeIndex == 3){
                    xData.push(dayjs(item.time).format('D')+'号')
                } else {
                    xData.push(dayjs(item.time).format('M')+'月')
                }
                yData[0].data.push(item.totalCount)
                yData[1].data.push(item.enterCount)
                yData[2].data.push(item.outCount)
            })
            var option = {
                color: ['#767EFF', '#FEC400', '#F65B62', '#43E97D', '#B620E0'],

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    orient: 'horizontal',
                    itemGap: 10,
                    left: 'center',
                    top: 10,
                    itemWidth:40,
                    itemHeight: 6,
                    data: ['进出场车辆总数', '进场车辆数', '出场车辆数'],
                    icon:'roundRect',
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        color: '#fff',
                        data: xData,
                        axisLabel:{
                            color: '#fff',
                            interval: 3,
                            showMaxLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel:{
                            color: '#fff',
                            formatter:'{value} 个'
                        }
                    }
                ],
                series: yData
            };

            trafficFlowChart.setOption(option);
        },
        // 收费统计
        requestGetPriceFlowList() {
            const self = this;
            let params = self.formatDateParams()
            self.$api.getPriceFlow(params).then(res => {
                console.log('getPriceFlow:',res)
                if(res.h.code != 200) {
                    Toast(res.h.msg)
                    return
                }
                self.chargeData = res.b
                
                self.renderChargeChart()
            })
        },
        renderChargeChart() {
            const self = this;

            var chargeChart= echarts.init(document.getElementById('chargeChart'));
            let xData = [],
                yData = [{
                        name: '总收费',
                        type: 'line',
                        areaStyle: {},
                        data: []
                    },
                    {
                        name: '月卡收费',
                        type: 'line',
                        areaStyle: {},
                        data: []
                    },
                    {
                        name: '临时车收费',
                        type: 'line',
                        areaStyle: {},
                        data: []
                    }]
            self.chargeData.map(item => {
                if(self.dateTypeIndex == 0 || (self.dateTypeIndex == 3 && self.startDate == self.endDate)) {
                    xData.push(dayjs(item.time).hour()+'点')
                } else if(self.dateTypeIndex == 1 || self.dateTypeIndex == 3){
                    xData.push(dayjs(item.time).format('D')+'号')
                } else {
                    xData.push(dayjs(item.time).format('M')+'月')
                }
                yData[0].data.push(item.totalPrice)
                yData[1].data.push(item.vipPrice)
                yData[2].data.push(item.tempPrice)
            })
            var option = {
                color: ['#767EFF', '#FEC400', '#F65B62', '#43E97D', '#B620E0'],

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    orient: 'horizontal',
                    itemGap: 10,
                    left: 'center',
                    top: 10,
                    itemWidth:40,
                    itemHeight: 6,
                    data: ['总收费', '月卡收费', '临时车收费'],
                    icon:'roundRect',
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        color: '#fff',
                        data: xData,
                        axisLabel:{
                            color: '#fff',
                            interval: 'auto',
                            interval: 3,
                            showMaxLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel:{
                            color: '#fff',
                            formatter:'{value} 元'
                        }
                    }
                ],
                series: yData
            };

            chargeChart.setOption(option);
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
        font-size:.14rem;
        padding: 46px 0 0 0;

        .search{
            width:3.75rem;
            height:0.43rem;
            background:#131929;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 0 0.15rem;
            &.fixed{
                position: fixed;
                z-index: 9999999;
            }
            .type{
                width:0.55rem;
                height: 100%;
                box-sizing: border-box;
                padding-right: 0.12rem;
                font-size:.14rem;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:0.44rem;
                position: relative;
                color: #A0A3A9;

                &::after{
                    content: '';
                    background: url(../assets/imgs/arrow-bottom.png) no-repeat center center;
                    background-size: .06rem .06rem;
                    width: 0.06rem;
                    height: 0.06rem;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .during{
                display: flex;
                height: 100%;
                justify-content: space-around;
                align-items: center;
                flex: 1;
                box-sizing: border-box;
                padding: 0 .15rem;
                .arrow{
                    width: .4rem;
                    height: .16rem;
                    background: url(../assets/imgs/arrows.png) no-repeat center center;
                    background-size: .19rem .16rem;
                }
                .time{
                    width:0.76rem;
                    height: 100%;
                    padding-right: .12rem;
                    position: relative;
                    text-align: center;
                    line-height: .44rem;
                    color: #A0A3A9;
                    &::after{
                        content: '';
                        background: url(../assets/imgs/arrow-bottom.png) no-repeat center center;
                        background-size: .06rem .06rem;
                        width: 0.06rem;
                        height: 0.06rem;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }

            }
            .btn{
                width:0.34rem;
                height:100%;
                background: url(../assets/imgs/search.png) no-repeat center center;
                background-size: 0.17rem 0.18rem;
                background-position: right center;
            }
        }
        .datas{
            padding: 0.2rem .15rem 0;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .data-item{
                width:1.65rem;
                height:0.68rem;
                background:rgba(19,25,41,1);
                border-radius:0.08rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: .2rem;
                box-sizing: border-box;
                padding-left: .12rem;
                .img{
                    width:0.38rem;
                    height:0.38rem;
                    >img{
                        height: 100%;
                        width: 100%;
                    }
                }
                .detail{
                    color: #A0A3A9;
                    flex: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    padding-left: .1rem;
                    .label{
                        height:0.18rem;
                        font-size:0.13rem;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        line-height:0.18rem;
                    }
                    .num{
                        height:0.22rem;
                        font-size:0.16rem;
                        font-family:PingFang-SC-Bold,PingFang-SC;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        line-height:0.22rem;
                    }
                }
                
            }
        }
        .charts{
            box-sizing: border-box;
            padding: 0 .15rem;
            margin-bottom: 1.16rem;
            .chart-item{
                width:3.45rem;
                background:rgba(19,25,41,1);
                border-radius:0.08rem;
                overflow: hidden;
                margin-bottom: .2rem;
                .title{
                    height: .42rem;
                    width: 100%;
                    position: relative;
                    line-height: .42rem;
                    text-indent: .1rem;
                    font-size: .14rem;
                    font-family:SourceHanSansCN-Medium,SourceHanSansCN;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    &::after{
                        content: '';
                        background: url(../assets/imgs/line.png) no-repeat center center;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        position: absolute;
                        width:0.04rem;
                        height:0.23rem;
                    }
                    &.border{
                        border-bottom: 1px solid #424753 ;
                    }
                }
                #userTypeChart{
                    width: 100%;
                    height: 3.05rem;
                }
                #carTypeChart{
                    width: 100%;
                    height: 3.05rem;
                }
                #trafficFlowChart{
                    width: 100%;
                    height: 2.44rem;
                }
                #chargeChart{
                    width: 100%;
                    height: 2.44rem;
                }
            }
        }
    }
    .van-nav-bar {
        z-index: 99999999;         
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
    /deep/ .van-popup{
        z-index: 10000000 !important;
    }

</style>
