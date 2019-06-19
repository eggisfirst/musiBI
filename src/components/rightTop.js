import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import rightBg from '../assets/images/rightBg.png'

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
    // echarts.init(document.getElementById('leftTop')).setOption(this.option)
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
        fontSize: '20px',
      },
      span2 :{
        color: '#34ABFF',
        fontSize: '20px',
      },
      span3 :{
        color: '#50E0D4',
        fontSize: '20px',
      },
      Number1: {
        color: '#A859FF',
        fontSize: '46px',
        marginBottom: '37px',
      },
      Number2: {
        color: '#34ABFF',
        fontSize: '46px',
        marginBottom: '37px'
      },
      Number3: {
        color: '#50E0D4',
        fontSize: '46px',
        marginBottom: '37px'
      },
      Product: {
        fontSize: '15px',
        fontWeight: 'bold'
      }
    }
    return (
			<div id="rightTop" className="rightTop" style={styleComponent.rightTop}>
        <ul className='ul' style={styleComponent.ul}>
          <li className='li'>
            <div style={styleComponent.Number1}>1286<span style={styleComponent.span1}>.11w</span></div>
            <div style={styleComponent.Product}>床垫销售额</div>
          </li>
          <li>
            <div style={styleComponent.Number2}>126<span style={styleComponent.span2}>.11w</span></div>
            <div style={styleComponent.Product}>床品销售额</div>
          </li>
          <li>
            <div style={styleComponent.Number3}>119<span style={styleComponent.span3}>.11w</span></div>
            <div style={styleComponent.Product}>床架销售额</div>
          </li>
        </ul>
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
