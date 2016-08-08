import { bindActionCreators } from 'redux'
import * as createTopicActions from 'redux/modules/createTopicDialog'
import { connect } from 'react-redux'
import { CreateTopicDialog } from 'components'

function mapStateToProps ({createTopicDialog, auth}, props) {
  return {
    isModalOpen: createTopicDialog.isModalOpen,
    username: auth.username,
    slug: createTopicDialog.slug,
    title: createTopicDialog.title,
    isFetching: createTopicDialog.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(createTopicActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopicDialog)
