import React from 'react'
import {CreateTopicContainer, TopicGroupContainer} from 'containers'
import { GridCan, GridRow, GridColumn, HomePageHeader } from 'components'

const HomePageContainer = React.createClass({
  render () {
    return (
      <GridCan>
        <GridRow>
          <GridColumn s={12} l={4}>
            <div style={{marginBottom: '1rem'}}>
              <HomePageHeader/>
            </div>
          </GridColumn>
          <GridColumn s={12} l={8}>

            <CreateTopicContainer />

            <TopicGroupContainer
              groupName={'recentTopics'}
              title={'Recent Topics'} />

          </GridColumn>
        </GridRow>
      </GridCan>
    )
  },
})

export default HomePageContainer
