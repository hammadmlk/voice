import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { showResponses as showResponsesActionCreator } from 'redux/modules/voices'
import { connect } from 'react-redux'
import { Card } from 'material-ui/Card'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { Voice } from 'components'
import { CreateVoiceContainer } from 'containers'

const VoiceContainerUnConnected = React.createClass({
  propTypes: {
    topicCreator: PropTypes.string.isRequired,
    topicSlug: PropTypes.string.isRequired,
    voiceIdentifier: PropTypes.string.isRequired,

    // mapStateToProps
    topicIdentifier: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['primary', 'response']),
    responseVoiceIdentifiers: PropTypes.array.isRequired,
    showResponses: PropTypes.bool.isRequired,
    dispatchShowResponses: PropTypes.func.isRequired,
  },
  handleShowResponses () {
    this.props.dispatchShowResponses(this.props.voiceIdentifier)
  },
  render () {
    if (this.props.type === 'primary') {
      const responses = this.props.responseVoiceIdentifiers.map((responseVoiceIdentifier) => {
        return <VoiceContainer
                  voiceIdentifier={responseVoiceIdentifier}
                  key={responseVoiceIdentifier}
                  topicCreator={this.props.topicCreator}
                  topicSlug={this.props.topicSlug}/>
      })
      const display = this.props.showResponses ? 'block' : 'none'
      return (
        <Card containerStyle={{marginBottom: '1rem'}}>
          <Voice username={this.props.username}
            text={this.props.text}
            type={this.props.type}
            handleShowResponses={this.handleShowResponses}/>
          <div style={{display: display}}>
            <Divider/>
              {responses.length !== 0 ? <List>{responses}</List> : null}
            <Divider/>
            <CreateVoiceContainer
              type='response'
              topicCreator={this.props.topicCreator}
              topicSlug={this.props.topicSlug}
              primaryVoiceIdentifier={this.props.voiceIdentifier}/>
          </div>
        </Card>
      )
    } else {
      return <Voice username={this.props.username} text={this.props.text} type={this.props.type}/>
    }
  },
})

function mapStateToProps ({voices}, props) {
  const {topicIdentifier, voiceIdentifier, timestamp, username, text, type, responseVoiceIdentifiers, showResponses} = voices[props.voiceIdentifier]
  return {
    topicIdentifier,
    voiceIdentifier,
    timestamp,
    username,
    text,
    type,
    responseVoiceIdentifiers,
    showResponses: showResponses || false,
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({dispatchShowResponses: showResponsesActionCreator}, dispatch)
}
const VoiceContainer = connect(mapStateToProps, mapDispatchToProps)(VoiceContainerUnConnected)
export default VoiceContainer
