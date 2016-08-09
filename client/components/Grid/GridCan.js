import React, { PropTypes } from 'react'
import {container} from './styles.scss'

GridCan.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function GridCan (props) {
  return (
    <section className={container}>
      {props.children}
    </section>
  )
}
