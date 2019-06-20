import React, { Component } from 'react'
import axios from 'axios'
import echarts from 'echarts'
import {imageRight,imageLeft} from '../image'

import IndexModel from '../../utils/index'
const indexModel = new IndexModel()

class World extends Component {
  myEchart = ''
  series = []
  timer = ''
  geoCoordMap = {
    "越南":[108.27,14.05],
    "格鲁吉亚":[43.35,42.31],
    "德国":[10.45,51.16],
    "菲律宾": [121.77,12.87],
    "中国香港": [114.22,22.30],
    "加拿大": [-106.35,56.13],
    "日本": [138.25,36.20],
    '俄罗斯联邦': [105.31,54.52],
    '新西兰': [174.88,-40.90],
    '印度': [78.96,24.59],
    '阿联酋': [53.84,23.42],
    '澳大利亚': [116.77,-22.27],
    '美国': [-95.71,37.09],
    '中国': [104.20,35.86],
    '英国': [-0.12,51.50]
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
  setSeries = (obj,orientation) => {
    let symbolOffset,symbolSize,position,symbol,offset;
    let value = obj.amount.replace(/[^0-9]/ig,"")

    if(orientation%2 === 0) {   //方向
      symbol = imageLeft()
      if(value > 100000) {
        symbolOffset = ['-50%','-50%']
        symbolSize = [320,120]
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
      if(value > 100000) {
        symbolOffset = ['50%','50%']
        symbolSize = [240,120]
        position = ['30%','74%']
        offset = [60,0]
      }else {
        symbolOffset = ['50%','50%']
        symbolSize = [150,100]
        position = ['30%','74%']
        offset = [40,0]

      }
    }
    return {
      coordinateSystem: 'geo',
      type: 'scatter',
      data: this.convertData([
        {name: obj.state, value: obj.amount},
      ]),
      symbolOffset: symbolOffset,
      symbolSize: symbolSize,
      showAllSymbol: true,
      symbol: symbol,
      label: {
        normal: {
          position: position,
          show: true,
          formatter: function (params) {
            return [`{a|${params.name}} {b|¥} {c|${params.value[2]}}`].join('/n')
          },
          // formatter: obj.amount,
          align:'center',
          offset: offset,
          rich: {
            a: {
              color: '#fff',
              fontSize: 12,
              align:'center',
            },
            b: {
              color: '#fff',
              fontSize: 12,
              fontFamily: 'myFamily',
              align:'center',
            },
            c: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'myFamily',
              align:'center',
            }
          }
        }
      }
    }
  }
  setOption = (data) => {
    data.map((item,index) => {
      this.series.push(this.setSeries(item,index))
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
  initMap = () => {
    axios.get('./geoJson/World.json').then((res) => {
      echarts.registerMap('world', res.data)
      this.myEchart = echarts.init(document.getElementById("world"))
      this.init()
    })
  }
  //排序
  setData = (data) => {
    const reg1 = /,*/g
    const reg2 = /(?=\B(\d{3})+$)/g
    data.map(item => {
      item.amount = parseInt(item.amount.replace(reg1,''))
    })
    data.sort(function (a,b) {
      return b.amount - a.amount
    })
    data.map(item => {
      item.amount = item.amount.toString().replace(reg2,',')
    })
    return data
  }
  getData = () => {
    indexModel.getNationalSales().then(res => {
      if(res.status === 1) {
        this.myEchart.hideLoading()

        let data = this.setData(res.data)
        var temp = data.slice(0,2)

        let option = this.setOption(temp)
        this.myEchart.setOption(option)

        var i = 0
        this.timer = setInterval(() => {
          this.series = []
          i += 2
          if( i > data.length) {
            i = 0
          }
          temp = data.slice(i,i+2)
          option = this.setOption(temp)
          this.myEchart.clear()
          this.myEchart.setOption(option)
        },5000)
      }
    })
  }
  init = () => {
    this.myEchart.showLoading({
      text : "正在加载...",
      maskColor: 'rgba(255, 255, 255, 0.1)',
      color: '#007aff',
      textColor : '#fff'
    })
    this.getData()
  }
	componentDidMount () {
    this.initMap()
    setInterval(() => {
      clearInterval(this.timer)
      this.myEchart.clear()
      this.series = []
      this.init()
    }, 61000);
  }

  render () {
    const styleComponent = {
      world: {
        height: '61vh',
        width: '100%',
        marginTop: '45px'
      },
    }
    return (
			<div id="world" className="world" style={styleComponent.world}>
				
			</div>
    )
  }
}


export default World
