import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as snackbarActionCreators from 'redux/modules/snackbar'
import { bindActionCreators } from 'redux'
import Snackbar from 'material-ui/Snackbar'

const MainContainer = React.createClass({
  propTypes: {
    children: PropTypes.node,
    isSnackbarOpen: PropTypes.bool.isRequired,
    snackbarMessage: PropTypes.string.isRequired,
    snackbarDuration: PropTypes.number.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
  },
  render () {
    return (
      <div>
        {this.props.children}
        <Snackbar
          open = {this.props.isSnackbarOpen}
          message = {this.props.snackbarMessage}
          autoHideDuration = {this.props.snackbarDuration}
          onRequestClose = {() => (this.props.closeSnackbar())} />
      </div>
    )
  },
})

function mapStateToProps ({snackbar}) {
  return {
    isSnackbarOpen: snackbar.isOpen,
    snackbarMessage: snackbar.message,
    snackbarDuration: snackbar.duration,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(snackbarActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
