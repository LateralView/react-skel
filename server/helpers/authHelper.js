const axios = require('axios')
const qs = require('querystring')

require('dotenv').config()

module.exports = {
  getToken: async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const p = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const response = await axios
      .post(`https://accounts.spotify.com/api/token`, qs.stringify({
        grant_type: 'client_credentials'
      }), {
        headers: {
          Authorization: `Basic ${p}`
        }
      })
    return response.data.access_token
  }
}
