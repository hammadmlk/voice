import React, { PropTypes } from 'react'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
}

export default function Authenticate ({isAuthed, isFetching, error, username}) {
  return (
    <section>
      <div>{isAuthed === true ? `You are authenticated as ${username}` : 'You are not authenticated'}</div>
      {isFetching === true ? <div>{'Authenticating...'}</div> : null}
      {error ? <div>{error}</div> : null}
    </section>
  )
}
