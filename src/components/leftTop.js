import React, { Component } from 'react'
import echarts from 'echarts'
import Left1 from '../assets/images/left1.png'

import IndexModel from '../utils/index'
const indexModel = new IndexModel()

class World extends Component {
  myEcharts =  ''
  leftTopData = []
  leftTopMounth = []
  getLeftTop = () => {
    indexModel.getMonthSales().then(res => {
      if(res.status === 1) {
        this.myEcharts.hideLoading()
        res.data.map(item => {
          this.leftTopData.push((item.amount/10000).toFixed(2))
          this.leftTopMounth.push(item.months + '月')
          const option = this.setOption()
          this.myEcharts.setOption(option)
        })
      }
    })
  }
  setOption = () => {
    return {
      xAxis: {
        type: 'category',
        // 轴线
        axisLine: {
          show: false
        },
        axisLabel: {
          color: 'rgba(187,197,220,0.5)'
        },
        // 坐标轴刻度
        axisTick: {
          show: false
        },
        data: this.leftTopMounth
      },
      yAxis: {
        type: 'value',
        // 轴线
        axisLine: {
          show: false
        },
        axisLabel: {
          color: 'rgba(187,197,220,0.5)'
        },
        // 坐标轴刻度
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(47,95,233,0.4)',
            width: 1
          }
        },
      },
      series: [{
        data: this.leftTopData,
        type: 'line',
        label: {
          color: '#fff',
          show: true
        },
        lineStyle: {
          color: '#34ABFF'
        },
        // 区域颜色
        areaStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(0,122,255,0.5)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(0,122,255,0)' // 100% 处的颜色
            }]
          }
        },
        itemStyle: {
          color: '#34ABFF',
        }
      }]
    }
  }
  
	componentDidMount () {
    this.myEcharts = echarts.init(document.getElementById('leftTop'))
    this.myEcharts.showLoading({
      text : "正在加载...",
      maskColor: 'rgba(255, 255, 255, 0.2)',
      color: '#007aff',
      textColor : '#fff'
    })
    this.getLeftTop()
  }

  render () {
    const styleComponent = {
      leftTop: {
        margin: '0 0 20px 30px',
        background: `url(${Left1}) no-repeat`,
        backgroundSize: '100%',
        height: '450px',
        color: '#333'
      },
    }
    return (
			<div id="leftTop" className="leftTop" style={styleComponent.leftTop}>
			</div>
    )
  }
}

export default World
