import React, { PropTypes } from 'react'
import { GridCan, GridRow, GridColumn } from 'components'
import { TopicContainer, VoiceFeedContainer } from 'containers'

const TopicPageContainer = React.createClass({
  propTypes: {
    routeParams: PropTypes.shape({creator: PropTypes.string.isRequired, slug: PropTypes.string.isRequired}),
  },
  render () {
    return (
      <GridCan>
        <GridRow>
          <GridColumn s={12} l={4}>
            <div style={{marginBottom: '1rem'}}>
              <TopicContainer creator={this.props.routeParams.creator} slug={this.props.routeParams.slug} />
            </div>
          </GridColumn>
          <GridColumn s={12} l={8}>
            <VoiceFeedContainer />
          </GridColumn>
        </GridRow>
      </GridCan>
    )
  },
})
export default TopicPageContainer
