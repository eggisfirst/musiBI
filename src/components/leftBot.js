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
      color: ['#A859FF','#FF6459','#FFC859','#CBFF59','#50E0D4','#59FFD0','#59F1FF','#59A4FF','#6759FF'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
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
        }
      },
      series: [
        {
          name:'各品牌销售占比',
          type:'pie',
          center: ['50%', '42%'],
          radius: ['20%', '28%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: '{b}  {d}%',
            fontSize: 11,
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
                // fontWeight: 'bold'
              }
            }
          },
          data:[
            {value:335, name:'0769'},
            {value:310, name:'3D'},
            {value:234, name:'歌蒂娅'},
            {value:135, name:'凯奇'},
            {value:148, name:'助眠'},
            {value:248, name:'V6'},
            {value:348, name:'PAULY'},
            {value:58, name:'HOME'},
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
