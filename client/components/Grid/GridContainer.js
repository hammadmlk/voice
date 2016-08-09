import React, { PropTypes } from 'react'
import {container} from './styles.scss'

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function GridContainer (props) {
  return (
    <section className={container}>
      {props.children}
    </section>
  )
}
