import React, { Component } from 'react'
import IndexModel from '../utils/index'
const indexModel = new IndexModel()

class World extends Component {
  state = {
    data: []
  }
  getData = () => {
    indexModel.getPerformance().then(res => {
      if(res.status === 1) {
        const data = res.data.replace(/.(.\d)$/g,'')
        const arr = [],
              length = data.length;
        for(let i = 0; i < length; i ++) {
          arr.push(data[i])
        }
        this.setState({
          data: arr
        })
      }
    })
  }

	componentDidMount () {
    this.getData()
  }

  render () {
    const styleComponent = {
      center: {
        width: '100%',
        textAlign: 'center'
      },
      title: {
        color: '#89BFFF',
        fontSize: '34px',
        lineHeight: '64px',
        fontWeight: 'normal',
      },
      price: {
        color: '#5FBBF0',
        fontSize: '46px',
        fontWeight: 500,
        marginTop: '25px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around'
      },
      span :{
        border: '2px solid rgba(90,156,255,0.67)',
        padding: '10px 14px 10px 14px',
        lineHeight: '64px',
        fontFamily: 'myFamily'
      },
      text: {
        fontSize: '36px',
        fontWight: 'normal',
        fontFamily: 'myFamily'

      }
    }
    return (
			<div id="center" className="center" style={styleComponent.center}>
        <h5 style={styleComponent.title}>累计销售业绩</h5>
        <div style={styleComponent.price}>
          {
            this.state.data.map((item, index) => {
              if(item === ',') {
                return (
                  <div style={styleComponent.text} key={item + index}>,</div>
                )
              }else {
                return(
                  <span style={styleComponent.span} key={item + index}>{item}</span>
                )
              }
            })
          }
        </div>
			</div>
    )
  }
}

export default World
