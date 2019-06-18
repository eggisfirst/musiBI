import React, { Component } from 'react'
import axios from 'axios'
import Variable from '../../variable'
import { connect } from 'react-redux'
import echarts from 'echarts'
import world_bg from '../../assets/images/world.png'
class World extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    
    
	}

  componentWillReceiveProps(nextProps){
    if(this.props != nextProps) console.log('输出todos为：', nextProps.awards);
  }

	componentDidMount () {
    axios.get('./geoJson/World.json').then((res) => {
      echarts.registerMap('world', res.data)
      let myEchart = document.getElementById("world")
      echarts.init(myEchart).setOption({
        series: {
          type: 'map',
          top: 0,
          left: '-4%',
          right: 0,
          zoom: 0.9,
          map: 'world',
          itemStyle: {
            areaColor: '#2f5fe9',
            borderColor: 'transparent',
            borderWidth: 0
          },
          // label: {
          //   formatter: ['{a|12}'].join('/n'),
          //   rich:{ 
          //     a: {
          //       color: 'red'
          //     }
          //   }
          // },
          data: [{
            name: 'China',
            value: 100
          }]
        }
      })
    })
  }

  render () {
    const styleComponent = {
      world: {
        height: '100vh',
        width: '100%',
        marginTop: '65px',
        // background: `url(${world_bg}) no-repeat`,
        // backgroundSize: '100%',
      },
    }
    return (
			<div id="world" className="world" style={styleComponent.world}>
				世界地图
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
