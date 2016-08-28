import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { addVoice } from 'helpers/ioCommunicator'
import { addVoiceToFeed } from 'redux/modules/voiceFeed'
import { openSnackbar } from 'redux/modules/snackbar'
import { addVoiceResponse } from 'redux/modules/voices'
import { connect } from 'react-redux'
import { CreateVoiceBox } from 'components'

const CreateVoiceContainer = React.createClass({
  propTypes: {
    // props
    topicCreator: PropTypes.string.isRequired,
    topicSlug: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['primary', 'response']),
    primaryVoiceIdentifier: PropTypes.string, // needed when type is 'response'

    // mapStateToProps
    username: PropTypes.string.isRequired,

    // mapDispatchToProps
    addVoiceToFeed: PropTypes.func.isRequired,
    addVoiceResponse: PropTypes.func.isRequired,
    openSnackbar: PropTypes.func.isRequired,
  },
  getInitialState () {
    return {
      text: '',
      disabled: false,
    }
  },
  updateTextValue (text) {
    this.setState({text: text})
  },
  disable () {
    this.setState({disabled: true})
  },
  enable () {
    this.setState({disabled: false})
  },
  createVoice () {
    this.disable()
    addVoice(this.props.topicCreator, this.props.topicSlug, this.props.username, this.state.text, this.props.type, this.props.primaryVoiceIdentifier)
      .then((addedVoice) => {
        this.updateTextValue('')
        if (this.props.type === 'primary') {
          this.props.addVoiceToFeed(addedVoice)
        } else {
          this.props.addVoiceResponse(this.props.primaryVoiceIdentifier, addedVoice)
        }
        this.props.openSnackbar('Your voice was shared')
        this.enable()
      })
      .catch((error) => {
        this.props.openSnackbar(error)
        this.enable()
      })
  },
  render () {
    return (
      <div>
        <CreateVoiceBox
          type={this.props.type}
          text={this.state.text}
          handleUpdateTextValue={this.updateTextValue}
          handleCreateVoice={this.createVoice}
          disabled={this.state.disabled} />
      </div>
    )
  },
})

function mapStateToProps ({auth}) {
  return {
    username: auth.username,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({addVoiceToFeed, addVoiceResponse, openSnackbar}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVoiceContainer)
