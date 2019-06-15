const axios = require('axios')
const client = axios.create({
  'baseURL': 'https://api-extern.systembolaget.se/',
  headers: {
    'Ocp-Apim-Subscription-Key': process.env.SYSTEMBOLAGETAPIKEY
  }
})

module.exports.getProducts = async () => {
  try {
    let products = await client.get('product/v1/product')
    return products.data
  } catch (error) {
    console.error(error)
    throw Error('Invalid request')
  }
}

module.exports.getProduct = async (productId) => {
  try {
    let product = await client.get(`product/v1/product/${productId}`)
    return product.data
  } catch (error) {
    console.error(error)
    throw Error('Invalid request')
  }
}
