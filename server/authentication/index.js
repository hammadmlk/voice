const X_FORWARDED_USER = 'x-forwarded-user'

/**
*/
export function getAuthenticatedUserFromSocket (socket) {
  try {
    const sentryUserString = socket.request.headers[X_FORWARDED_USER]
    const username = getUsernameFromSentryUserString(sentryUserString)
    return username
  } catch (e) {
    console.error('Unable to get authenticated user from socket. ', e)
    return 'nobody'
  }
}

// x-forwarded-user': 'hammadm@ANT.AMAZON.COM

/**
  Extracts the username from a sentry user string.
  input 'hammadm@ANT.AMAZON.COM'
  output will be 'hammadm'

  sentryUserString: {string} sentry user string of form 'hammadm@ANT.AMAZON.COM'
  return: {string} the username. Example: 'hammadm'. Empty string if username if not found
  throws: Error if username is not found.
*/

function getUsernameFromSentryUserString (sentryUserString) {
  const username = sentryUserString.substr(0, sentryUserString.indexOf('@'))
  if (!username) {
    throw new Error('sentryUserString was of invalid format.')
  }
  return username
}
