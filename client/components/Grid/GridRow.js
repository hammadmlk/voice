import React, { PropTypes } from 'react'
import {row} from './styles.scss'

GridRow.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function GridRow (props) {
  return (
    <div className={row}>
      {props.children}
    </div>
  )
}
