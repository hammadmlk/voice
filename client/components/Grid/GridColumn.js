import React, { PropTypes } from 'react'
import * as styles from './styles.scss'

GridColumn.propTypes = {
  children: PropTypes.node.isRequired,
  s: PropTypes.number,
  m: PropTypes.number,
  l: PropTypes.number,
}

export default function GridColumn (props) {
  const colClass = styles.col
  const sClass = props.s ? styles['s' + props.s] : ''
  const mClass = props.m ? styles['m' + props.m] : ''
  const lClass = props.l ? styles['l' + props.l] : ''

  const className = `${colClass} ${sClass} ${mClass} ${lClass}`

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}
