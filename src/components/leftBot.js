import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import echarts from 'echarts'
import Left2 from '../assets/images/left2.png'

class World extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            // normal: {
            //   show: true,
            //   position: 'center'
            // },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ]
        }
      ]
    }
  
}

  componentWillReceiveProps(nextProps){
    if(this.props != nextProps) console.log('输出todos为：', nextProps.awards);
  }

	componentDidMount () {
    echarts.init(document.getElementById('leftBot')).setOption(this.option)
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(World)
