const axios = require('axios')
const client = axios.create({
  'baseURL': 'https://api-extern.systembolaget.se/',
  headers: {
    'Ocp-Apim-Subscription-Key': process.env.SYSTEMBOLAGETAPIKEY
  }
})

module.exports.getProducts = async () => {
  try {
    const products = await client.get('product/v1/product')
    return products.data
  } catch (error) {
    console.error(error)
    throw Error('Invalid request')
  }
}

module.exports.getProductById = async (productId) => {
  try {
    const product = await client.get(`product/v1/product/${productId}`)
    return product.data
  } catch (error) {
    console.error(error)
    throw Error('Invalid request')
  }
}

module.exports.getProductBySearch = async (params) => {
  try {
    const products = await client.get(`product/v1/product/search${params}`)
    return products.data
  } catch (error) {
    console.error(error)
    throw Error('Invalid request')
  }
}
