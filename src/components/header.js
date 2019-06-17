import React, { Component } from 'react'
import Variable from '../variable'
import { connect } from 'react-redux'
import { changeAwards } from '../actions'
import '../sass/components/header.scss'
// 引入reduex
// import { createStore } from 'redux'
// import todoApp from '../reducers'
// import { addTodo } from '../actions'

// import bannerImg from '../images/top.jpg'

// let store = createStore(todoApp)

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      numbers: [1, 2, 3, 4, 5]
    }
    
    this.changeAwards = (arr) => {
      this.props.changeAwards(arr)
    }

    this.dateChange1 = () => {
      this.getAwards(this, '2018-08-19')
    }
    this.dateChange2 = () => {
      this.getAwards(this, '2018-08-26')
    }
    this.dateChange3 = () => {
      this.getAwards(this, '2018-09-02')
    }
    this.dateChange4 = () => {
      this.getAwards(this, '2018-09-09')
    }

    this.getAwards = (_this, date) => {
      Variable.getAwards(date).then((res) => {
        if (res.data) {
          if (res.data.data) {
            res = res.data.data
            if (res.firstPrize) {
              _this.props.changeAwards([...res.firstPrize, ...res.secondPrize1, ...res.secondPrize2, ...res.thirdPrize1, ...res.thirdPrize2])
            }
          }
        }
      })
    }
	}

	lis () {
		return this.state.numbers.map((number) => <li key={number}>{number}</li>)
	}
	// todoList() {
	// 	return this.props.todoList.map((item) => <li key={item.text}>{parseInt(item.text)}</li>)
	// }

	change () {
		this.setState({
			numbers: this.state.numbers.filter(function(item, index, arr) {
				return item % 2 === 1
			})
		})
		this.props.changeParentTit('子组件改变的', '兄弟组件改变的')()
  }

  componentWillReceiveProps(nextProps){
    if(this.props != nextProps) console.log('输出todos为：', nextProps.awards);
  }

	componentDidMount () {

  }

  render () {
    return (
			<div className="header">
				<div className="banner">
          {/* <img src={bannerImg} alt=""/> */}
        </div>
        <ul className="timeLine">
          <li onClick={this.dateChange1}>
            <p>8月19日</p>
            <p>17:00</p>
          </li>
          <li onClick={this.dateChange2}>
            <p>8月26日</p>
            <p>17:00</p>
          </li>
          <li onClick={this.dateChange3}>
            <p>9月02日</p>
            <p>17:00</p>
          </li>
          <li onClick={this.dateChange4}>
            <p>9月09日</p>
            <p>17:00</p>
          </li>
          <div className="line"></div>
        </ul>
        <h5>距离下一轮抽奖还有：<span>{
          Variable.dateCount(new Date().getDate())
        }</span>天    火爆销售额：<span>{Variable.priceSwitch(this.props.totalAmount)}</span>元</h5>
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
)(Header)
