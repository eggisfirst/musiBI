import React, { Component } from 'react'
import axios from 'axios'
import Variable from '../../variable'
import { connect } from 'react-redux'
import echarts from 'echarts'
import {imageRight,imageLeft} from '../image'


class World extends Component {
  constructor (props) {
    super(props)
    this.geoCoordMap = {
      "Chad":[18.73,15.45],
      "Chile":[-71.54,-35.68],
      "China":[104.20,35.86],
      "Armenia": [45.04,40.07],
      "Austrlia": [133.78,-25.27],
      "Canada": [-106.35,56.13],
      "France": [2.21,46.23]
    }
    this.data1 = [
      {name:'Austrlia',value: '¥111,200'},
      {name:'Canada',value: '¥100,210,200'},
    ]
    this.data2 = [
      {name:'China',value: '¥10,123,200'},
      {name:'France',value: '¥10,210,200'},
    ]
    this.series = new Array
    this.myEchart = ''
	}
  convertData =  (data) => {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
  }
  setSerier = (obj,orientation) => {
    let symbolOffset,symbolSize,position,symbol,offset;
    let value = obj.value.replace(/[^0-9]/ig,"")

    if(orientation%2 === 0) {   //方向
      symbol = imageLeft()
      if(value > 1000000) {
        symbolOffset = ['-50%','-50%']
        symbolSize = [300,120]
        position = ['14%',15]
        offset = [60,0]
      }else {
        symbolOffset = ['-50%','-50%']
        symbolSize = [200,100]
        position = [30,11]
        offset = [40,0]
      }
    }else {
      symbol = imageRight()
      if(value > 1000000) {
        symbolOffset = ['50%','50%']
        symbolSize = [240,120]
        position = ['30%','73%']
        offset = [60,0]
      }else {
        symbolOffset = ['50%','50%']
        symbolSize = [150,100]
        position = ['30%','73%']
        offset = [40,0]

      }
    }
    return {
      coordinateSystem: 'geo',
      type: 'scatter',
      data: this.convertData([
        {name: obj.name, value: obj.value},
      ]),
      symbolOffset: symbolOffset,
      symbolSize: symbolSize,
      showAllSymbol: true,
      symbol: symbol,
      label: {
        normal: {
          position: position,
          show: true,
          formatter: obj.value,
          align:'center',
          offset: offset,
          color: '#fff',
          fontSize: 20,
          fontFamily: 'myFamily',
        }
      }
    }
  }
  setOption = (data) => {
    data.map((item,index) => {
      this.series.push(this.setSerier(item,index))
    })
    return {
      tooltip: {
          trigger: 'item',
          formatter: function (params) {
              return params.name + ' : ' + params.value[2];
          }
      },
      geo: {
        map: 'world',
        top: 0,
        left: '-4%',
        right: 0,
        zoom: 0.9,
        itemStyle: {
          normal: {
            areaColor: '#2f5fe9',
            borderColor: 'transparent'
          }
        },
       
      },
      series: this.series
    }
  }
  init = (data) => {
    axios.get('./geoJson/World.json').then((res) => {
      echarts.registerMap('world', res.data)
      const myEchart = document.getElementById("world")
      let option = this.setOption(data)
      echarts.init(myEchart).setOption(option)
      this.myEchart = echarts.init(myEchart)
    })
  }
  componentWillReceiveProps(nextProps){
    // if(this.props != nextProps) console.log('输出todos为：', nextProps.awards);
  }

	componentDidMount () {
    this.init(this.data1)
    var timer = setInterval(() => {
      this.series = []
      let option = this.setOption(this.data2)
      this.myEchart.clear()
      this.myEchart.setOption(option)
      clearInterval(timer)
    },2000)
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
