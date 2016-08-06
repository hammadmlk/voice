import React, { PropTypes } from 'react'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired,
}

export default function Authenticate ({isAuthed, isFetching, error}) {
  return (
    <section>
      {isAuthed === true ? <span>{'You are authed'}</span> : null}
      {isFetching === true ? <span>{'Authenticating...'}</span> : null}
      {error ? <span>{error}</span> : null}
    </section>
  )
}
