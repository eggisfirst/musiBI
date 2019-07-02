import React, { Component } from 'react'
import rightBg from '../assets/images/right.png'

import IndexModel from '../utils/index'
const indexModel = new IndexModel()

class World extends Component {
  state = {
    category: [],
    decimals: [],
    integer: []
  }
  getData = () => {
    indexModel.getCategorySales().then(res => {
      if(res.status === 1) {
        let category =  [],
            decimals = [],
            integer = []
        res.data.map(item => {
          var arrNum = this.setNumber(item.amount)
          decimals.push(arrNum[1])
          integer.push(arrNum[0])
          category.push(item.category)
        })
        this.setState({
          category,
          integer,
          decimals
        })
      }
    })
  }
  setNumber = (num) => {
    num = (num/10000).toFixed(2)
    let newNum = num.split('.')
    return [newNum[0],newNum[1]]
  }
	componentDidMount () {
    this.getData()
    setInterval(() => {
      this.getData()
    }, 5100);
  }

  render () {
   
    const styleComponent = {
      rightTop: {
        margin: '0 30px 38px 0',
        background: `url(${rightBg}) no-repeat`,
        backgroundSize: '100% 100%',
        height: '230px',
        color: '#fff',
        fontFamily: 'myFamily'
      },
      ul: {
        listStyle: 'none',
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center'
      },
      span1 :{
        color: '#A859FF',
        fontSize: '16px',
      },
      span2 :{
        color: '#34ABFF',
        fontSize: '16px',
      },
      span3 :{
        color: '#50E0D4',
        fontSize: '16px',
      },
      Number1: {
        color: '#A859FF',
        fontSize: '38px',
        marginBottom: '37px',
      },
      Number2: {
        color: '#34ABFF',
        fontSize: '38px',
        marginBottom: '37px'
      },
      Number3: {
        color: '#50E0D4',
        fontSize: '38px',
        marginBottom: '37px'
      },
      Product: {
        fontSize: '20px',
        // fontWeight: 'bold'
      }
    }
    return (
			<div id="rightTop" className="rightTop" style={styleComponent.rightTop}>
        <ul className='ul' style={styleComponent.ul}>
          <li className='li'>
            <div style={styleComponent.Number1}>
              {[this.state.integer[0]]}
              {/* <span style={styleComponent.span1}>.{[this.state.decimals[0]]}w</span> */}
              <span style={styleComponent.span1}>万</span>
            </div>
            <div style={styleComponent.Product}>{[this.state.category[0]]}销售额</div>
          </li>
          <li>
            <div style={styleComponent.Number2}>
              {[this.state.integer[1]]}
              {/* <span style={styleComponent.span2}>.{[this.state.decimals[1]]}w</span> */}
              <span style={styleComponent.span2}>万</span>
            </div>
            <div style={styleComponent.Product}>{[this.state.category[1]]}销售额</div>
          </li>
          <li>
            <div style={styleComponent.Number3}>
              {[this.state.integer[2]]}
              {/* <span style={styleComponent.span3}>.{[this.state.decimals[2]]}w</span> */}
              <span style={styleComponent.span3}>万</span>
            </div>
            <div style={styleComponent.Product}>{[this.state.category[2]]}销售额</div>
          </li>
        </ul>
			</div>
    )
  }
}

export default World
