import React, { PropTypes } from 'react'
import { main } from './style.scss'

const MainContainer = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  render () {
    return (
      <div className={main}>
        {this.props.children}
      </div>
    )
  },
})

export default MainContainer
