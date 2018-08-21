const cors = require('cors')
const express = require('express')
const router = express.Router()

router.options('*', cors())

/**
 * @api {POST} /user/authenticate Fake authenticator
 */
router.post('/authenticate', (req, res) => {
  const params = req.body
  if (
    params &&
    params.email === 'hardcoded@user.com' &&
    params.password === 'hardcodedpassword'
  )
    return res.status(200).send({ token: 'faketoken' })
  else return res.status(401).send('Invalid user or password')
})

module.exports = router
