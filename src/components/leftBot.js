import React, { Component } from 'react'
import echarts from 'echarts'
import Left2 from '../assets/images/left2.png'
import IndexModel from '../utils/index'
const indexModel = new IndexModel()

class World extends Component {
  myEcharts = ''
  data = []
  setOption = () => {
    return {
      color: ['#A859FF','#FF6459','#FFC859','#CBFF59','#50E0D4','#59FFD0','#59F1FF','#59A4FF','#6759FF'],
      tooltip: {
        trigger: 'item',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
        formatter: "{a} <br/>{b}: {c}%"
      },
      legend: {
        left: 'center',
        bottom: 50,
        itemWidth: 7,
        itemHeight: 7,
        itemGap: 22,
        icon: 'circle',
        textStyle: {
          color: '#BBC5DC'
        },
        data: ['3D','凯奇','V6','歌蒂娅','0769','慕思儿童','HOME','PAULY','思丽德赛','助眠']
      },
      series: [
        {
          name:'各品牌销售占比',
          type:'pie',
          // radius : [30, 70],
          // center : ['50%', '42%'],
          center: ['50%', '42%'],
          radius: ['20%', '28%'],
          avoidLabelOverlap: false,
          // roseType : 'area',
          label: {
            show: true,
            formatter: '{b}  {c}%',
            fontSize: 11,
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
              }
            }
          },
          data:this.data
        }
      ]
    }
  }
  getData = () => {
    indexModel.getBrandSales().then(res => {
      this.myEcharts.hideLoading()
      this.clearData()
      res.data.map(item => {
        let length = item.proportion.length
        let value = item.proportion.slice(0, length - 1)
        let label = {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        }
        let labelLine =  {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        }
        switch (item.brand) {
          case '慕思经典-3D':
            this.data.push({value: value,name: '3D',label,labelLine})
            break;
          case '慕思经典-凯奇':
            this.data.push({value: value,name: '凯奇',label,labelLine})
            break;
          case '慕思时尚-V6/苏斯':
            this.data.push({value: value,name: 'V6',label,labelLine})
            break;
          case '慕思经典-歌蒂娅':
            this.data.push({value: value,name: '歌蒂娅',label,labelLine})
            break;
          case '慕思经典-0769/兰博基尼':
            this.data.push({value: value,name: '0769',label,labelLine})
            break;
          case '慕思儿童-爱迪奇':
            this.data.push({value: value,name: '慕思儿童',label,labelLine})
            break;
          case 'DeRUCCI HOME':
            this.data.push({value: value,name: 'HOME',label,labelLine})
            break;
          case '慕思高端-名品汇':
            this.data.push({value: value,name: 'PAULY',label,labelLine})
            break;
          case '思丽德赛-国际':
            this.data.push({value: value,name: '思丽德赛',label,labelLine})
            break;
          case '慕思助眠品牌':
            this.data.push({value: value,name: '助眠',label,labelLine})
            break;
          default:
            break;
        }
       
      })
      this.data.map((item,index) => {
        if(index < 5) {
          item.label.normal.show = true 
          item.labelLine.normal.show = true 
        }else {
          return
        }
      })
      const option = this.setOption()
      this.myEcharts.setOption(option)
    })
  }
  clearData = () => {
    this.data = []
    this.myEcharts.clear()
  }
  init = () => {
    this.myEcharts.showLoading({
      text : "正在加载...",
      maskColor: 'rgba(255, 255, 255, 0.1)',
      color: '#007aff',
      textColor : '#fff'
    })
    this.getData()
  }
	componentDidMount () {
    this.myEcharts = echarts.init(document.getElementById('leftBot'))
    this.init()
    setInterval(() => {
      this.getData()
    }, 61000);
  }

  render() {
    const styleComponent = {
      leftBot: {
        margin: '0 0 20px 30px',
        background: `url(${Left2}) no-repeat`,
        backgroundSize: '100%',
        height: '380px',
      },
    }
    return (
			<div id="leftBot" className="leftBot" style={styleComponent.leftBot}>
			</div>
    )
  }
}

export default World
