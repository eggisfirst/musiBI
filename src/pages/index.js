import React, { Component } from 'react'
import World from '../components/map/world'
import LeftTop from '../components/leftTop'
import LeftBot from '../components/leftBot'
import RightTop from '../components/rightTop'
import RightBot from '../components/rightBot'
import Center from '../components/center'

// 样式引入
import '../css/normalize.css'
import '../sass/main.scss'
import '../sass/index.scss'

// 图片引入
import titleImg from '../assets/images/title.png'
import world_bg from '../assets/images/world.png'



class Index extends Component {
  render () {
    const styleComponent = {
      index: {
        width: '100%',
        height: '100vh',
        minWidth: '1600px',
        overflow: 'hidden',
        backgroundColor: '#050A32',
        position: 'relative'
      },
      Bg: {
        background: `url(${world_bg}) no-repeat`,
        backgroundSize: '100% 100%',
        width: '72.81%',
        height: '100%',
        position: 'absolute',
        top:0,
        left: '18.02%'
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
        height: '100vh'
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
        // background: 'blue',
        float: 'left',
        height: '100%',
        marginLeft: '-500px'
      }
    }
    return (
      <div className="index" style={styleComponent.index}>
        <div style={styleComponent.Bg}></div>
        <div className="header" style={styleComponent.header}>
          <h1 style={styleComponent.header}></h1>
        </div>
        <ul className="container" style={styleComponent.container}>
          <li className="main" style={styleComponent.main}>
            <div className="content" style={styleComponent.content}>
              <Center />
              <World />
            </div>
          </li>
          <li className="left" style={styleComponent.left}>
            <LeftTop />
            <LeftBot />
          </li>
          <li className="right" style={styleComponent.right}>
            <RightTop />
            <RightBot />
          </li>
        </ul>
      </div>
    )
  }
}

export default Index
