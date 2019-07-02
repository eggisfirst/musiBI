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
  selecttedCountry1 = ''
  selecttedCountry2 = ''
  //国家坐标
  geoCoordMap = {
    "越南":[108.27,14.05],
    "格鲁吉亚":[43.35,42.31],
    "德国":[10.45,51.16],
    "菲律宾": [121.77,12.87],
    "中国香港": [114.52,26.2],
    "加拿大": [-98.35,56.13],
    "日本": [138.25,36.20],
    '俄罗斯联邦': [105.31,64.52],
    '新西兰': [174.88,-44.90],
    '印度': [74.96,16.59],
    '阿联酋': [53.84,23.42],
    '澳大利亚': [144.77,-32.27],
    '美国': [-95.71,37.09],
    '中国': [108.20,32.86],
    '英国': [-0.12,51.50],
    '马来西亚': [102.44,4.44],
    '安哥拉': [33.00,40.02],
    '尼日利亚':[6.84,9.06],
    '法国':[1.32,47.23]
  }
  //对应地图上的名称
  getName = (country) => {
    switch (country) {
      case '中国':
        country = 'China'
        break;
      case '澳大利亚':
        country = 'Australia'
        break;
      case '英国':
        country = 'United Kingdom'
        break;
      case '加拿大':
        country = 'Canada'
        break;
      case '德国':
        country = 'Germany'
        break;
      case '越南':
        country = 'Vietnam'
        break;
      case '格鲁吉亚':
        country = 'Georgia'
        break;
      case '菲律宾':
        country = 'Philippines'
        break;
      case '中国香港':
        country = 'China'
        break;
      case '日本':
        country = 'Japan'
        break;
      case '俄罗斯联邦':
        country = 'Russia'
        break;
      case '新西兰':
          country = 'New Zealand'
          break;
      case '印度':
        country = 'India'
        break;
      case '阿联酋':
        country = 'United Arab Emirates'
        break;
      case '马来西亚':
        country = 'Malaysia'
        break;
      case '美国':
        country = 'United States of America'
          break;
      case '法国':
        country = 'France'
          break;
      case '安哥拉':
        country = 'Turkey'
          break;
      case '尼日利亚':
        country = 'Nigeria'
          break;
      default:
        break;
    }
    return country
  }
  //设置选中区域名称
  setName = (temp) => {
    if(temp.length == 2) {
      this.selecttedCountry1 = this.getName(temp[0].state)
      this.selecttedCountry2 = this.getName(temp[1].state)
    }else {
      this.selecttedCountry1 = this.getName(temp[0].state)
    }
    
  }
  //匹配坐标返回需要的data
  convertData =  (data) => {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
  }
  //设置series
  setSeries = (obj,orientation) => {
    let symbolOffset,symbolSize,position,symbol,offset;
    let value = obj.amount.replace(/[^0-9]/ig,"")

    if(orientation%2 !== 0) {   //方向
      symbol = imageLeft()
      if(value > 1000000) {
        symbolOffset = ['-50%','-50%']
        symbolSize = [340,120]
        position = ['16%',15]
        offset = [60,0]
      }else {
        symbolOffset = ['-50%','-50%']
        symbolSize = [300,100]
        position = ['15%','10%']
        offset = [60,0]
      }
    }else {
      symbol = imageRight()
      if(value > 1000000) {
        symbolOffset = ['50%','50%']
        symbolSize = [260,120]
        position = ['32%','74%']
        offset = [60,0]
      }else {
        symbolOffset = ['50%','50%']
        symbolSize = [240,100]
        position = ['30%','72%']
        offset = [60,0]

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
              fontSize: 18,
              align:'center',
            },
            b: {
              color: '#fff',
              fontSize: 12,
              fontFamily: 'myFamily',
              align:'center',
              fontWeight: 'normal',
              verticalAlign:'bottom'
            },
            c: {
              color: '#fff',
              fontSize: 18,
              fontFamily: 'myFamily',
              align:'center',
            }
          }
        }
      }
    }
  }
  //
  setOption = (data) => {
    data.map((item,index) => {
      if(item.state === '新西兰'){
        this.series.push(this.setSeries(item,1))
      }else {
        this.series.push(this.setSeries(item,index))
      }
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
        zoom: 0.76,
        itemStyle: {
          normal: {
            areaColor: '#2f5fe9',
            borderColor: 'transparent',
            
          },
          emphasis:{
            areaColor: '#59a4ff',
            borderColor: 'transparent',
            color: '#59a4ff'
          }
        },
        label: {
          emphasis:{
            color: '#FFF',
            fontSize: 16
          }
        },
        regions: [{         //设置选中区域
          name: this.selecttedCountry1,
          itemStyle: {
            areaColor: '#59a4ff',
            borderColor: 'transparent',
            color: '#59a4ff'
          }, 
          label: {
            show: true,
            color: '#FFF',
            fontSize: 16
          },
        },
        {
          name: this.selecttedCountry2,
          itemStyle: {
            areaColor: '#59a4ff',
            borderColor: 'transparent',
            color: '#59a4ff'
          }, 
          label: {
            show: true,
            color: '#FFF',
            fontSize: 16
          },
      }]
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
  //请求数据
  getData = () => {
    indexModel.getNationalSales().then(res => {
      if(res.status === 1) {
        this.myEchart.hideLoading()
        this.clearData()
        let data = this.setData(res.data)
        var temp = data.slice(18,20)

        this.setName(temp)

        let option = this.setOption(temp)
        this.myEchart.setOption(option)
       
        var i = 0
        var len = data.length
        this.timer = setInterval(() => {
          i += 2
          if( i >= len) {
            i = 0
          }
          temp = data.slice(i,i+2)
          this.setName(temp)
          this.series = []
          option = this.setOption(temp)
          this.myEchart.clear()
          this.myEchart.setOption(option)
        },5000)
      }
    })
  }
  clearData = () => {
    clearInterval(this.timer)
    this.myEchart.clear()
    this.series = []
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
      this.getData()
    }, 61000);
  }

  render () {
    const styleComponent = {
      world: {
        height: '650px',
        width: '1180px',
        position: 'absolute',
        zIndex: 999,
        top: '50%',
        left: '50%',
        marginLeft: '-600px',
        marginTop: '-250px',

      },
    }
    return (
			<div id="world" className="world" style={styleComponent.world}>
				
			</div>
    )
  }
}


export default World
