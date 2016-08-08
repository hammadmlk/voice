// Generates a URL-friendly "slug" from a provided string.
// For example: "This Is Great!!!" transforms into "this-is-great"
export function generateSlug (value) {
  // 1) convert to lowercase
  // 2) remove pluses
  // 3) replace spaces with dashes
  // 4) remove everything but alphanumeric characters and dashes
  return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// Returns the base url of the application
export function getBaseUrl () {
  // For https://localhost:8181/ContactUs-1.0/contact?lang=it&report_type=consumer
  // https://localhost:8181

  if (!location) {
    console.error('location is undefined')
  }
  const protocol = location.protocol
  const hostname = location.hostname
  const portSegment = (location.port ? ':' + location.port : '')
  const baseUrl = protocol + '//' + hostname + portSegment
  return baseUrl
}

// true if string is blank, null or undefined
export function isBlankString (str) {
  return (!str || /^\s*$/.test(str))
}
