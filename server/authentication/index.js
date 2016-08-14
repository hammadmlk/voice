const AUTHENTICATED_USERNAME_HEADER_NAME = process.env.AUTHENTICATED_USERNAME_HEADER_NAME

/**
  Gets the username of the authenticated user from the socket request header

  return: {string} the username. Or 'nobody' if unauthenticated.
*/
export function getAuthenticatedUserFromSocket (socket) {
  try {
    const sentryUserString = socket.request.headers[AUTHENTICATED_USERNAME_HEADER_NAME]
    const username = getUsernameFromSentryUserString(sentryUserString)
    return username
  } catch (e) {
    console.error('Unable to get authenticated user from socket. ', e)
    return 'nobody'
  }
}

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
