import { bindActionCreators } from 'redux'
import * as createVoiceActions from 'redux/modules/createVoice'
import { connect } from 'react-redux'
import { CreateVoice } from 'components'

function mapStateToProps ({createVoice, auth}, props) {
  return {
    isModalOpen: createVoice.isModalOpen,
    topicCreator: props.topicCreator,
    topicSlug: props.topicSlug,
    username: auth.username,
    text: createVoice.text,
    type: 'primary',
    isFetching: createVoice.isFetching,
    error: createVoice.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(createVoiceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVoice)
