import React, { Component } from 'react'
import axios from 'axios'
import Variable from '../../variable'
import { connect } from 'react-redux'
import echarts from 'echarts'

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
      console.log(123, res)
      echarts.registerMap('world', res.data)
      let myEchart = document.getElementById("world")
      echarts.init(myEchart).setOption({
        series: {
          type: 'map',
          top: 0,
          left: 0,
          zoom: 0.9,
          map: 'world'
        }
      })
    })
  }

  render () {
    const styleComponent = {
      world: {
        height: '100vh',
        width: '100%',
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
