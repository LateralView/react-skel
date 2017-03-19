/**
 * Common HTTP Methods used
 */
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD'
}

/**
 * Generate the headers needed for the requests
 * @param {String} token - Token used on Authentication
 */
export const HeaderFactory = token => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  if (token) headers.append('x-access-token', token)
  return headers
}