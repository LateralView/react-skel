const cors = require('cors')
const axios = require('axios')
const express = require('express')
const router = express.Router()

router.options('*', cors())

/**
 * @api {GET} /search?q={searchPayload} Search inside the Spotify API for Albums
 * @apiName Search
 * @apiGroup SpotifyAPI
 * @apiVersion 1.0.0
 *
 * @apiDescription This is just a proxy between the local server and the real Spotify api,
 * the documentation of the response is here: https://developer.spotify.com/web-api/search-item/
 */
router.get('/', (req, res) => {
  if (req.query.q && req.query.q.length > 3) {
    axios
      .get(`https://api.spotify.com/v1/search?q=${req.query.q}&type=album`)
      .then(resp => res.status(resp.status).send(resp.data))
      .catch(err => res.status(err.response.status).send(err.response.data))
  } else {
    res.status(400).send({
      message: 'Query Parameter not found or too short'
    })
  }
})

module.exports = router
