const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} = require('graphql')
const {
  getProducts,
  getProduct } = require('./lib/SystembolagetClient.js')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: '...',
  fields: () => ({
    ProductId: { type: GraphQLString },
    ProductNumber: { type: GraphQLString },
    ProductNameBold: { type: GraphQLString },
    ProductNameThin: { type: GraphQLString },
    Category: { type: GraphQLString },
    ProductNumberShort: { type: GraphQLString },
    ProducerName: { type: GraphQLString },
    SupplierName: { type: GraphQLString },
    IsKosher: { type: GraphQLBoolean },
    BottleTextShort: { type: GraphQLString },
    Seal: { type: GraphQLString },
    RestrictedParcelQuantity: { type: GraphQLInt },
    IsOrganic: { type: GraphQLBoolean },
    IsEthical: { type: GraphQLBoolean },
    EthicalLabel: { type: GraphQLString },
    IsWebLaunch: { type: GraphQLBoolean },
    SellStartDate: { type: GraphQLString },
    IsCompletelyOutOfStock: { type: GraphQLBoolean },
    IsTemporaryOutOfStock: { type: GraphQLBoolean },
    AlcoholPercentage: { type: GraphQLFloat },
    Volume: { type: GraphQLFloat },
    Price: { type: GraphQLFloat },
    Country: { type: GraphQLString },
    OriginLevel1: { type: GraphQLString },
    OriginLevel2: { type: GraphQLString },
    Vintage: { type: GraphQLInt },
    SubCategory: { type: GraphQLString },
    Type: { type: GraphQLString },
    Style: { type: GraphQLString },
    AssortmentText: { type: GraphQLString },
    BeverageDescriptionShort: { type: GraphQLString },
    Usage: { type: GraphQLString },
    Taste: { type: GraphQLString },
    Assortment: { type: GraphQLString },
    RecycleFee: { type: GraphQLFloat },
    IsManufacturingCountry: { type: GraphQLBoolean },
    IsRegionalRestricted: { type: GraphQLBoolean },
    IsInStoreSearchAssortment: { type: GraphQLString },
    IsNews: { type: GraphQLBoolean }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    product: {
      type: ProductType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => getProduct(args.id)
    },
    products: {
      type: GraphQLList(ProductType),
      resolve: () => getProducts()
    }
  })
})

module.exports = new GraphQLSchema({
  query: QueryType
})
