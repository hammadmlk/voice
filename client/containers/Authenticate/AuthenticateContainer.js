import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Authenticate } from 'components'
import * as authActionCreators from 'redux/modules/auth'
import { bindActionCreators } from 'redux'

const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    fetchAndHandleAuth: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount () {
    this.handleAuth()
  },
  handleAuth () {
    const nextPathName = this.props.location.query.nextPathName || '/'
    this.props.fetchAndHandleAuth()
      .then(() => { this.context.router.replace(nextPathName) })
  },
  render () {
    return (
      <Authenticate
        isFetching= {this.props.isFetching}
        error={this.props.error}
        isAuthed={this.props.isAuthed} />
    )
  },
})

function mapStateToProps ({auth}) {
  return {
    isFetching: auth.isFetching,
    error: auth.error,
    isAuthed: auth.isAuthed,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(authActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
