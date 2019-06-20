import React, { Component } from 'react'
import echarts from 'echarts'
import Right2 from '../assets/images/right2.png'
import IndexModel from '../utils/index'
const indexModel = new IndexModel()

class World extends Component {
  myEcharts = ''
  state = {
    arrMount: [],
    arrProduct: []
  }
  setOption = () => {
    return {
      tooltip: {
      },
      grid: {
        show: false,
        left: '-11%',
        right: '15%',
        top: '15%',
        bottom: '7%',
        containLabel: true
      },
      xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            lineStyle: {
              color: 'rgba(47,95,233,0.4)',
              width: 1
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(187,197,220,1)'
          }
      },
      yAxis: {
          type: 'category',
          data: this.state.arrProduct,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 94,
            color: 'rgba(187,197,220,1)',
            align: 'left',
            verticalAlign: 'middle'
          },
      },
      series: [
          {
            name: '产品热销排行榜',
            type: 'bar',
            data: this.state.arrMount,
            barWidth: 10,
            itemStyle: {
              color: '#34ABFF',
              barBorderRadius: 5
            },
            label: {
              show: true,
              position: 'right',
              distance: 10,
              color: '#BBC5DC'
            }
          },
          
      ]
    }
  }
  getData = () => {
    indexModel.getProductList().then(res => {
      if(res.status === 1) {
        this.myEcharts.hideLoading()
        this.clearData()
        const data = res.data,
              arrProduct = [],
              arrMount = []
        data.map(item => {
          let tempProduct = item.model
          if(item.model.length > 10) {
            tempProduct = item.model.slice(0,10) + '...'
          }
          arrProduct.push(tempProduct)
          arrMount.push(item.qty)
        })
        this.setState({
          arrProduct,
          arrMount
        })
        const option = this.setOption()
        this.myEcharts.setOption(option)
      }
    })
  }
  clearData = () => {
    this.setState({
      arrMount: [],
      arrProduct: []
    })
    this.myEcharts.clear()
  }
  init = () => {
    this.myEcharts = echarts.init(document.getElementById('rightBot'))
    this.myEcharts.showLoading({
      text : "正在加载...",
      maskColor: 'rgba(255, 255, 255, 0.1)',
      color: '#007aff',
      textColor : '#fff'
    })
    this.getData()
  }
	componentDidMount () {
    this.init()
    setInterval(() => {
      this.getData()
    }, 61000);
  }

  render() {
    const styleComponent = {
      rightBot: {
        margin: '0 30px 0 0',
        background: `url(${Right2}) no-repeat`,
        backgroundSize: '100% 100%',
        height: '556px',
      },
    }
    return (
			<div id="rightBot" className="rightBot" style={styleComponent.rightBot}>
			</div>
    )
  }
}


export default World
