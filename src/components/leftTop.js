import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import echarts from 'echarts'
import Left1 from '../assets/images/left1.png'

class World extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.option = {
      xAxis: {
        type: 'category',
        // 轴线
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#BBC5DC'
        },
        // 坐标轴刻度
        axisTick: {
          show: false
        },
        data: ['1月', '2月', '3月', '4月', '5月']
      },
      yAxis: {
        type: 'value',
        // 轴线
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#BBC5DC'
        },
        // 坐标轴刻度
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#2F5FE9',
            width: 1
          }
        },
      },
      series: [{
        data: [320, 398, 370, 440, 320],
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
              offset: 0, color: '#007AFF' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(0,122,255,0)' // 100% 处的颜色
            }]
          }
        },
        itemStyle: {
          color: '#34ABFF'
        }
      }]
    }
    
	}

  componentWillReceiveProps(nextProps){
    if(this.props != nextProps) console.log('输出todos为：', nextProps.awards);
  }

	componentDidMount () {
    echarts.init(document.getElementById('leftTop')).setOption(this.option)
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(World)
