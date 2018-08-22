const cors = require('cors')
const axios = require('axios')
const express = require('express')
const router = express.Router()
const authHelper = require('./helpers/authHelper')

router.options('*', cors())

/**
 * @api {GET} /album/{albumId} Get a Album by his Id
 * @apiName Album
 * @apiGroup SpotifyAPI
 * @apiVersion 1.0.0
 *
 * @apiDescription This is just a proxy between the local server and the real Spotify api,
 * the documentation of the response is here: https://developer.spotify.com/web-api/get-album/
 */
router.get('/:albumId', async (req, res) => {
  const token = await authHelper.getToken()
  const authStr = 'Bearer '.concat(token)
  axios
    .get(`https://api.spotify.com/v1/albums/${req.params.albumId}`, {
      headers: { Authorization: authStr }
    })
    .then(resp => res.status(resp.status).send(resp.data))
    .catch(err => res.status(err.response.status).send(err.response.data))
})

module.exports = router
