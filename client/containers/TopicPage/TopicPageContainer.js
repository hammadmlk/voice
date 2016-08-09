import React, { PropTypes } from 'react'
import { GridCan, GridRow, GridColumn } from 'components'

const TopicPageContainer = React.createClass({
  propTypes: {
    routeParams: PropTypes.shape({username: PropTypes.string.isRequired, slug: PropTypes.string.isRequired}),
  },
  render () {
    return (
      <GridCan>
        <GridRow>
          <GridColumn s={12} m={4}>
            {'TopicContainer Will Go Here'}
          </GridColumn>
          <GridColumn s={12} m={8}>
            {'VoicesContainer Will Go Here'}
          </GridColumn>
        </GridRow>
      </GridCan>
    )
  },
})
export default TopicPageContainer
