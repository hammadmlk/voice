import React, { PropTypes } from 'react'

const MainContainer = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  render () {
    return (
      <div className='MainContainer'>
        {this.props.children}
      </div>
    )
  },
})
export default MainContainer
