const axios = require('axios')
const client = axios.create({
  'baseURL': 'https://api-extern.systembolaget.se/',
  'Ocp-Apim-Subscription-Key': process.env.SYSTEMBOLAGETAPIKEY
}

module.exports.getProducts = async () => {
  let products = await client.get('product/v1/product')
  console.log(products)
}
