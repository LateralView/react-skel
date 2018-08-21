/**
 * Generates an Resolved Action
 * @param {string} type - Constant with the type of action to dispatch
 * @param {object} response - Response object
 * @param {object} payload - Response Body
 */
export const ResolvedActionFactory = (type, payload) => ({
  type: `${type}_RESOLVED`,
  payload
})

/**
 * Generates an Rejected Action
 * @param {string} type - Constant with the type of action to dispatch
 * @param {object} error - Error object
 * @param {object} payload - Response Body
 */
export const RejectedActionFactory = (type, error, payload) => ({
  type: `${type}_REJECTED`,
  error,
  payload
})
