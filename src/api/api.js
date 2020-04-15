import {
    get,
    post
} from './fetch'
import axios from "axios"
import { getPorts } from 'portfinder';


// axios.defaults.baseURL = 'http://139.9.1.59:8080/'; //59服务器
axios.defaults.baseURL = 'http://192.168.3.173:8070/'; //测试服务器
// axios.defaults.baseURL = 'http://192.168.3.194:8080/'; //本地

axios.defaults.withCredentials = true
axios.interceptors.request.use(
    config => {
    //   if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   }
      config.headers.Cookie = `session_id=2abd5c587ae7c06b4b16c0d6420b33aefb590b36`;
      return config;
    },
    err => {
      return Promise.reject(err);
    });

const article = {

getDepartment(param){
    return post('/hr/report/get_department',param)//获取工程状态
},
getEduction(param){
    return post('/hr/report/education',param)
},
getPosition(param){//岗位序列分布图
    return post('/hr/report/position',param)
},
getAge(param){//获取年龄分布图
    return post('/hr/report/age',param)
},
getWorkAge(param){//获取司龄分布图
    return post('/hr/report/work_age',param)
},
getAnalysis(param){//获取绩效分析
    return post('/hr/report/performance_analysis',param)
},
getReportYear(param){//获取年度
    return post('/hr/report/get_report_year',param)
},
getReporMonth(param){//获取时间范围
    return post('/hr/report/get_report_month',param)
},
getRecruitmentInfo(param){//获取招聘达成分析
    return post('/hr/report/recruitment_info',param)
},
getEfficiency(param){//招聘效率分析
    return post('/hr/report/recruitment_efficiency_analysis',param)
},
getlaborCost(param){//年度人力成本分析
    return post('/hr/report/labor_costs',param)
},
getLeave(param){//离职分析
    return post('/hr/report/leave',param)
},
getEntry(param){//招聘入职需求
    return post('/hr/report/apply_entry',param)
},
getrecruitmentefficiency(param){//招聘达成率
    return post('/hr/report/recruitment_efficiency',param)
},
getRecruitmentTrack(param){//招聘人员追踪
    return post('/hr/report/recruitment_track',param)
},
getDistributed(param){//当期需求分布
    return post('/hr/report/apply_distributed',param)
},
getPerformanceMonth(param){//月报完成情况
    return post('/hr/report/performance_month',param)
},
getPerformanceInfo(param){//绩效详情
    return post('/hr/report/performance_info',param)
}
}


export default article