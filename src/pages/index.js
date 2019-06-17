import React, { Component } from 'react'
import World from '../components/map/world'
import LeftTop from '../components/leftTop'
import LeftBot from '../components/leftBot'

// 组件
// import Header from '../components/header'
// import worldOption from '../utils/options/worldOption'

import { connect } from 'react-redux'
import { changeAwards } from '../actions'

// 样式引入
import '../css/normalize.css'
import '../sass/main.scss'
import '../sass/index.scss'

// 图片引入
import titleImg from '../assets/images/title.png'
// let store = createStore(todoApp)

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: window.innerHeight,
      btnStatus: [true, false, false],
      totalAmount: ''
    }
    this.clickBtn1 = () => {
      this.setState({btnStatus: [true, false, false]})
    }
  }
  componentWillReceiveProps(nextProps){
    // if(this.props != nextProps) console.log('输出todos为：', nextProps.todos);
  }
  componentWillMount() {

  }
  componentDidMount () {
    this.props.changeAwards([123, 234, 3451])
  }
  render () {
    const styleComponent = {
      index: {
        width: '100%',
        height: '100vh',
        minWidth: '1600px',
        background: '#050A32',
        overflow: 'hidden'
      },
      header: {
        height: '108px',
        lineHeight: '108px',
        textAlign: 'center',
        fontWeight: '400',
        margin: 0,
        background: `url(${titleImg}) no-repeat`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center'
      },
      container: {
        marginTop: '-108px',
        paddingTop: '108px',
        listStyle: 'none',
        height: '100%',
        boxSizing: 'border-box'
      },
      main: {
        float: 'left',
        width: '100%',
        height: '600px'
      },
      content: {
        marginLeft: '500px',
        marginRight: '500px',
        // width: '100%',
        height: '100%'
      },
      left: {
        width: '500px',
        float: 'left',
        height: '100%',
        marginLeft: '-100%',
        borderLeft: '1px'
      },
      right: {
        width: '500px',
        background: 'blue',
        float: 'left',
        height: '100%',
        marginLeft: '-500px'
      }
    }
    return (
      <div className="index" style={styleComponent.index}>
        <div className="header" style={styleComponent.header}>
          <h1 style={styleComponent.header}></h1>
        </div>
        <ul className="container" style={styleComponent.container}>
          <li className="main" style={styleComponent.main}>
            <li className="content" style={styleComponent.content}>
              <World />
            </li>
          </li>
          <li className="left" style={styleComponent.left}>
            <LeftTop />
            <LeftBot />
          </li>
          <li className="right" style={styleComponent.right}></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  awards: state.awards
})

const mapDispatchToProps = dispatch => ({
  changeAwards: (arr) => dispatch(changeAwards(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
