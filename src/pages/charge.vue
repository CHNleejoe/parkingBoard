<template>
    <div>
        <van-nav-bar title="停车场收费明细" fixed left-text="" left-arrow @click-left="goBack">
        </van-nav-bar>
        <div class="content">
            <div class="search">
                <div class="type" @click="carTypePopupCtl = true">{{carTypeColumns[carTypeIndex]}}</div>
                <div class="during">
                    <div class="start time" @click="startDatePopupCtl = true">{{startDate}}</div>
                    <div class="arrow"></div>
                    <div class="end time" @click="endDatePopupCtl = true">{{endDate}}</div>
                </div>
                <div class="btn" @click="onRefresh"></div>
            </div>
            <form action="/">
                <van-search
                    v-model="key"
                    shape="round"
                    placeholder="请输入搜索关键词"
                    background='#0A121E'
                    @search="onRefresh"
                    @cancel="onCancel"
                />
            </form>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多数据了"
                    @load="loadMoreData"
                    class="list"
                >   
                    <div class="total" v-show="listData.length!=0">共{{totolNum}}条数据</div>
                    <div class="no-data" v-show="listData.length==0 && refreshing== false">
                        <img src="../assets/imgs/no-data.png" alt="">
                    </div>
                    <div v-for="(item, index) in listData" :key="index" class="list-item">
                        <div class="title">
                            <div>{{item.carNo}}</div>
                            <div :class="{type:true, vip: item.userType =='月卡用户'}"><span>{{item.userType}}</span></div>
                        </div>
                        <div class="details">
                            <div>
                                <span class="detail-label">用户名称：</span>
                                <span class="detail-content">{{item.userName}}</span>
                            </div>
                            <div>
                                <span class="detail-label">所属公司：</span>
                                <span class="detail-content">{{item.companyName}}</span>
                            </div>
                            <div>
                                <span class="detail-label">入场时间：</span>
                                <span class="detail-content">{{item.enterTime}}</span>
                            </div>
                            <div>
                                <span class="detail-label">出场时间：</span>
                                <span class="detail-content">{{item.outTime}}</span>
                            </div>
                            <div>
                                <span class="detail-label">联系电话：</span>
                                <span class="detail-content">{{item.telephoneNum}}</span>
                            </div>
                            <div>
                                <span class="detail-label">消费金额：</span>
                                <span class="detail-content">{{item.price}}元</span>
                            </div>
                            <div>
                                <span class="detail-label">支付方式：</span>
                                <span class="detail-content">{{item.payType}}</span>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        <div class="popups">
            <van-popup v-model="carTypePopupCtl" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="carTypeColumns"
                    @cancel="carTypePopupCtl = false"
                    @confirm="confirmCarType"
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
            name: 'charge',
            // 车子类型选择器
            carTypePopupCtl: false,
            carTypeColumns:['全部车','月卡车','临时车'],
            carTypeIndex: 0,

            // 时间选择器控制器数据
            displayStartDate: new Date(),
            startDate: dayjs(new Date()).format('YYYY/MM/DD'),

            displayEndDate: new Date(),
            endDate: dayjs(new Date()).format('YYYY/MM/DD'),

            startDatePopupCtl: false,
            endDatePopupCtl: false,

            // 分页数据
            pageNo: 1,
            pageSize: 10,

            // keyword
            key: '',

            // list
            listData: [],
            totolNum: 0,

            // 自动加载及刷新数据
            loading: false,
            finished: false,
            refreshing: false,

        }
    },
    watch: {
        
    },
    components: {
        Toast
    },
    mounted() {
        console.error('board mounted ----')
        const self = this;
        if(self.$route.query) {
            self.startDate = dayjs(self.$route.query.startDate).format('YYYY/MM/DD'),
            self.endDate = dayjs(self.$route.query.endDate).format('YYYY/MM/DD')
        }
        self.onRefresh()
    },
    methods:{
        goBack() {
            history.back();
        },

        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`
            }
            return val;
        },
        day(t) {
            // console.log(new Date(t))
            return new Date(t)
        },
        turnPage(url){
            const self = this;
            if(url == '') return
            self.$router.push({ path: url, query: { startDate: self.startDate, endDate: self.endDate } });
        },
        confirmCarType(value, index) {
            const self = this;
            
            self.carTypeIndex = index;
            self.carTypePopupCtl = false
        },
        setStartDate(value) {
            const self = this;
            if(value > dayjs(self.endDate)) {
                Toast('开始时间不能大于结束时间')
                return
            }
            self.startDate = dayjs(value).format('YYYY/MM/DD');
            self.startDatePopupCtl = false;
        },
        setEndDate(value) {
            const self = this;
            if(value < dayjs(self.startDate)) {
                Toast('结束时间不能小于开始时间')
                return
            }
            self.endDate = dayjs(value).format('YYYY/MM/DD');
            self.endDatePopupCtl = false;
        },
        
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('取消');
        },

        loadMoreData() {
            const self = this;

            let params = {
                pageNo: self.pageNo++,
                pageSize: self.pageSize,
                key: self.key,
                userType: self.carTypeIndex==0?'':self.carTypeIndex,
                startTime: dayjs(self.startDate).format('YYYY-MM-DD'),
                endTime: dayjs(self.endDate).format('YYYY-MM-DD'),
            }

            self.$api.getPriceDetails(params).then(res => {
                if (self.refreshing) {
                    self.listData = [];
                    self.refreshing = false;
                }
                if(res.h.code != 200) {
                    Toast(res.h.msg)
                    return
                }

                self.totolNum = res.b.totalItems
                res.b.dataList.map(item => {
                    self.listData.push(item);
                })
                self.loading = false;

                if (self.listData.length >= res.b.totalItems) {
                    self.finished = true;
                }
            })
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.pageNo = 1
            this.listData = []
            this.loadMoreData();
        },

    }
}
</script>

<style lang="scss" scoped>
    .content{
        font-size:14px;
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
            .type{
                width:0.55rem;
                height: 100%;
                box-sizing: border-box;
                padding-right: 0.12rem;
                font-size:14px;
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
        .list{
            box-sizing: border-box;
            padding: 0 .15rem;
            .total{
                font-size:14px;
                height: .44rem;
                line-height: .44rem;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
            .list-item{
                width:100%;
                // height:2.68rem;
                background:rgba(19,25,41,1);
                margin-bottom: .2rem;
                box-sizing: border-box;
                border-radius: .1rem;
                padding: 0 .14rem;

                .title{
                    height: .5rem;
                    width: 100%;
                    box-sizing: border-box;
                    font-size: 15px;
                    font-family:PingFangSC-Semibold,PingFang SC;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    border-bottom: 1px solid #2A2F3D;
                    &::after{
                        content: '';
                        height: .16rem;
                        width: .16rem;
                        border-radius: 50%;
                        position: absolute;
                        left: -.22rem;
                        bottom: -.08rem;
                        background: #342660;
                    }
                    &::before{
                        content: '';
                        height: .16rem;
                        width: .16rem;
                        border-radius: 50%;
                        position: absolute;
                        right: -.22rem;
                        bottom: -.08rem;
                        background: #342660;
                    }
                    .type{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        >span{
                            position: relative;
                            z-index: 0;
                            line-height: .5rem;
                        }
                        &::before{
                            content: '';
                            position: absolute;
                            width:0.76rem;
                            height:0.27rem;
                            right: -.14rem;
                            top: 50%;
                            transform: translateY(-50%);
                            border-radius:1rem 0rem 0rem 1rem;
                            background:linear-gradient(270deg,rgba(118,177,255,1) 0%,rgba(118,118,255,1) 100%);
                        }
                        &.vip{
                            &::before{
                                background:linear-gradient(270deg,rgba(255,228,0,1) 0%,rgba(254,196,0,1) 100%);
                            }
                        }
                    }
                }
                .details{
                    box-sizing: border-box;
                    padding-top: .16rem;
                    overflow: hidden;
                    >div{
                        margin-bottom: .11rem;
                        height:0.17rem;
                        font-size: 14px;
                        font-family:PingFang-SC-Regular,PingFang-SC;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        line-height:0.17rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .detail-label{
                            color: #CFD1D4;
                            font-size: 12px;
                        }
                    }
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
    /deep/ .van-search{

        .van-search__content{
            background: #131929;
            input{
                color: #CFD1D4;

            }
        }
        .van-search__action{
            color: #CFD1D4;
        }
    }
</style>
