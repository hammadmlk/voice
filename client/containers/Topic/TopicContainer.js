import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import * as topicActions from 'redux/modules/topic'
import { connect } from 'react-redux'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import {cyan500, red500} from 'material-ui/styles/colors'

const whiteColorStyle = {color: 'white'}
const cyanBackgroundStyle = {backgroundColor: cyan500}
const redBackgroundStyle = {backgroundColor: red500}
const wordBreakStyle = {wordBreak: 'break-word'}

const TopicContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
    creator: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fetchAndHandleTopic: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.fetchAndHandleTopic(this.props.creator, this.props.slug)
  },
  componentWillReceiveProps (nextProps) {
    const newCreator = nextProps.creator
    const newSlug = nextProps.slug

    // if the creator or slug props are going to change, we want to call fetchAndHandleTopic again.
    if (this.props.creator !== newCreator || this.props.slug !== newSlug) {
      this.props.fetchAndHandleTopic(newCreator, newSlug)
    }
  },
  render () {
    // Loading
    if (this.props.isFetching) {
      return <CircularProgress />
    }

    // Error
    if (this.props.error) {
      return (
        <Card style= {redBackgroundStyle}>
          <CardTitle
            title= {'404'}
            subtitle= {'Topic not found'}
            titleStyle={whiteColorStyle}
            subtitleStyle={whiteColorStyle} />
          <CardText style={whiteColorStyle}>
            {this.props.error}
          </CardText>
        </Card>
      )
    }

    // Normal
    return (
      <Card style= {cyanBackgroundStyle}>
        <CardHeader
          title= {this.props.creator}
          titleStyle= {whiteColorStyle} />
        <CardTitle
          title= {this.props.title}
          titleStyle={{...whiteColorStyle, ...wordBreakStyle}} />
      </Card>
    )
  },
})

function mapStateToProps ({topic}, props) {
  return {
    isFetching: topic.isFetching,
    error: topic.error,
    creator: props.creator,
    slug: props.slug,
    title: topic.title,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(topicActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicContainer)
