import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import * as topicGroupsActions from 'redux/modules/topicGroups'
import { initialGroupState } from 'redux/modules/topicGroups'
import { connect } from 'react-redux'

import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import LinearProgress from 'material-ui/LinearProgress'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'

const TopicGroupContainer = React.createClass({
  propTypes: {
    groupName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,

    isFetching: PropTypes.bool.isRequired,
    topicList: PropTypes.array.isRequired,
    error: PropTypes.string,

    fetchAndHandleTopicGroup: PropTypes.func.isRequired,
    gotoTopic: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.fetchAndHandleTopicGroup(this.props.groupName)
  },
  render () {
    // Loading
    if (this.props.isFetching) {
      return <LinearProgress />
    }

    // Error
    if (this.props.error) {
      return null
    }

    // Normal
    const topicListItems = this.props.topicList.map((topic, index) =>
      <div>
        <ListItem
          key= {index}
          onClick={() => this.props.gotoTopic(topic.creator, topic.slug)}
          primaryText={topic.title}
          secondaryText={`${topic.creator}/${topic.slug}`}
          leftAvatar={<Avatar>{topic.title[0] || 'X'}</Avatar>}/>
        <Divider inset={true}/>
      </div>
    )
    return (
      <Paper>
        <List>
          <Subheader>{this.props.title}</Subheader>
          {topicListItems}
        </List>
        <p/>
      </Paper>
    )
  },
})

function mapStateToProps ({topicGroups}, props) {
  const topicGroup = topicGroups[props.groupName] || initialGroupState
  return {
    groupName: props.groupName,
    title: props.title,

    topicList: topicGroup.topicList,
    isFetching: topicGroup.isFetching,
    error: topicGroup.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(topicGroupsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicGroupContainer)
