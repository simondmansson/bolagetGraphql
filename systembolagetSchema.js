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
  getProductById,
  getProductsBySearch,
  getSitesBySearch
} = require('./lib/SystembolagetClient.js')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product information',
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

const PositionType = new GraphQLObjectType({
  name: 'Position',
  description: 'Latitude and longitude of a store',
  fields: () => ({
    Long: { type: GraphQLFloat },
    Lat: { type: GraphQLFloat }
  })
})

const SiteType = new GraphQLObjectType({
  name: 'SiteType',
  description: 'Systembolaget store information',
  fields: () => ({
    IsTastingStore: { type: GraphQLBoolean },
    SiteId: { type: GraphQLString },
    Alias: { type: GraphQLString },
    Address: { type: GraphQLString },
    DisplayName: { type: GraphQLString },
    PostalCode: { type: GraphQLString },
    City: { type: GraphQLString },
    County: { type: GraphQLString },
    Country: { type: GraphQLString },
    IsStore: { type: GraphQLBoolean },
    IsAgent: { type: GraphQLBoolean },
    IsActiveForAgentOrder: { type: GraphQLBoolean },
    Phone: { type: GraphQLString },
    Email: { type: GraphQLString },
    Services: { type: GraphQLString },
    OpeningHours: { type: GraphQLString },
    Depot: { type: GraphQLString },
    Name: { type: GraphQLString },
    Position: { type: PositionType }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'SystembolagetQuery',
  description: 'Product related query options.',
  fields: () => ({
    product: {
      type: ProductType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => getProductById(args.id)
    },
    products: {
      type: GraphQLList(ProductType),
      resolve: () => getProducts()
    },
    productSearch: {
      type: GraphQLList(ProductType),
      description: 'Search for products matching the supplied arguments',
      args: {
        SearchQuery: { type: GraphQLString },
        Type: { type: GraphQLString },
        PriceMin: { type: GraphQLFloat },
        PriceMax: { type: GraphQLFloat }
      },
      resolve: (root, args) => {
        const argString = Object.keys(args)
          .map(k => `${k}=${args[k]}`)
          .join('&')
        return getProductsBySearch(argString)
      }
    },
    siteSearch: {
      type: GraphQLList(SiteType),
      description: 'Search for sites matching the supplied arguments',
      args: {
        SearchQuery: { type: GraphQLString }
      },
      resolve: (root, args) => {
        const argString = Object.keys(args)
          .map(k => `${k}=${args[k]}`)
          .join('&')
        return getSitesBySearch(argString)
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: QueryType
})
