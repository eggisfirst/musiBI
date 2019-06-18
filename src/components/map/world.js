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
    this.geoCoordMap = {
      "Chad":[18.73,15.45],
      "Chile":[-71.54,-35.68],
      "China":[104.20,35.86],
    }
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

  componentWillReceiveProps(nextProps){
    if(this.props != nextProps) console.log('输出todos为：', nextProps.awards);
  }

	componentDidMount () {
    axios.get('./geoJson/World.json').then((res) => {
      echarts.registerMap('world', res.data)
      let myEchart = document.getElementById("world")
      const option = {
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
        series: {
          coordinateSystem: 'geo',
          type: 'scatter',
          map: 'world',
          data: this.convertData([
            {name: "Chad", value: 9},
              {name: "Chile", value: 12},
              {name: "China", value: 12},
          ]),
          symbolSize: 12,
          symbol: 'circle',
          color: '#ccc',
          label: {
            normal: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                  a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                  },
                  b: {
                      fontSize: 16,
                      lineHeight: 33
                  },
                  per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                  }
              }
          }
          }
      },
      }
      echarts.init(myEchart).setOption(option)
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
