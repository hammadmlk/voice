import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import * as voiceFeedActions from 'redux/modules/voiceFeed'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress'
import { VoiceContainer } from 'containers'

const VoiceFeedContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    topicCreator: PropTypes.string.isRequired,
    topicSlug: PropTypes.string.isRequired,
    voiceIdentifiers: PropTypes.array.isRequired,
    fetchAndHandleVoices: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.fetchAndHandleVoices(this.props.topicCreator, this.props.topicSlug)
  },
  componentWillReceiveProps (nextProps) {
    const newTopicCreator = nextProps.topicCreator
    const newTopicSlug = nextProps.topicSlug

    // if the topicCreator or topicSlug props are going to change, we want to call fetchAndHandleVoices again.
    if (this.props.topicCreator !== newTopicCreator || this.props.topicSlug !== newTopicSlug) {
      this.props.fetchAndHandleVoices(newTopicCreator, newTopicSlug)
    }
  },
  render () {
    // Loading
    if (this.props.isFetching) {
      return <LinearProgress />
    }

    // Error
    if (this.props.error) {
      return (<div/>)
    }

    const voices = this.props.voiceIdentifiers.map((voiceIdentifier) => {
      return <VoiceContainer voiceIdentifier={voiceIdentifier} key={voiceIdentifier}/>
    })

    return (
      <div>
        {voices}
      </div>
    )
  },
})

function mapStateToProps ({voiceFeed}, props) {
  return {
    isFetching: voiceFeed.isFetching,
    error: voiceFeed.error,
    topicCreator: props.topicCreator,
    topicSlug: props.topicSlug,
    voiceIdentifiers: voiceFeed.voiceIdentifiers,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(voiceFeedActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceFeedContainer)
