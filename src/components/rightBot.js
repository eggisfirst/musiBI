import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import echarts from 'echarts'
import Right2 from '../assets/images/right2.png'

class World extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.option = {
      tooltip: {
          // trigger: 'axis',
          // axisPointer: {
          //     type: 'shadow'
          // }
      },
      grid: {
        show: false,
        left: '6%',
        right: '15%',
        top: '15%',
        bottom: '5%',
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
      },
      yAxis: {
          type: 'category',
          data: ['BCQ2-002','BCQ2-002','BCQ2-002','BCQ2-002','BCQ2-002','BCQ2-002','BCQ2-002','BCQ2-002'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(187,197,220,0.4)'
          },
      },
      series: [
          {
              name: '产品热销排行榜',
              type: 'bar',
              data: [5000, 4700, 4300, 4000, 3800, 3500,3000,2800],
              barWidth: 10,
              itemStyle: {
                color: '#34ABFF',
                barBorderRadius: 5
              }
          },
          
      ]
  };
  
}

  componentWillReceiveProps(nextProps){
    if(this.props != nextProps) console.log('输出todos为：', nextProps.awards);
  }

	componentDidMount () {
    echarts.init(document.getElementById('rightBot')).setOption(this.option)
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(World)
