import React, { PropTypes } from 'react'
import { GridContainer, GridRow, GridColumn } from 'components'

const TopicPageContainer = React.createClass({
  propTypes: {
    routeParams: PropTypes.shape({username: PropTypes.string.isRequired, slug: PropTypes.string.isRequired}),
  },
  render () {
    return (
      <GridContainer>
        <GridRow>
          <GridColumn s={12} m={4}>
            {'TopicContainer Will Go Here'}
          </GridColumn>
          <GridColumn s={12} m={8}>
            {'VoicesContainer Will Go Here'}
          </GridColumn>
        </GridRow>
      </GridContainer>
    )
  },
})
export default TopicPageContainer
