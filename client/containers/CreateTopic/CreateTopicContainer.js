import { bindActionCreators } from 'redux'
import * as createTopicActions from 'redux/modules/createTopic'
import { connect } from 'react-redux'
import { CreateTopic } from 'components'

function mapStateToProps ({createTopic, auth}, props) {
  return {
    isModalOpen: createTopic.isModalOpen,
    username: auth.username,
    slug: createTopic.slug,
    title: createTopic.title,
    isFetching: createTopic.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(createTopicActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic)
