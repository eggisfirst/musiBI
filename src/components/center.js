import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class World extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    
	}

  componentWillReceiveProps(nextProps){
    // if(this.props != nextProps) console.log('输出todos为：', nextProps.awards);
  }

	componentDidMount () {
    // echarts.init(document.getElementById('leftTop')).setOption(this.option)
  }

  render () {
    const styleComponent = {
      center: {
        width: '100%',
        textAlign: 'center'


        // margin: '0 30px 38px 0',
        // backgroundSize: '100% 100%',
        // height: '230px',
        // color: '#fff'
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
          <span style={styleComponent.span}>1</span>
          <span style={styleComponent.span}>2</span>
          <span style={styleComponent.span}>3</span>
          <div style={styleComponent.text}>,</div>
          <span style={styleComponent.span}>4</span>
          <span style={styleComponent.span}>5</span>
          <span style={styleComponent.span}>6</span>
          <div style={styleComponent.text}>,</div>
          <span style={styleComponent.span}>7</span>
          <span style={styleComponent.span}>8</span>
          <span style={styleComponent.span}>9</span>
        </div>
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
