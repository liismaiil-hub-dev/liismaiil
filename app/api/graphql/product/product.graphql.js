export const productDefs = `
type Product {
  _id:ID!
  title: String
  titleSlug: String
  description:String
  price:Int
  author: String
  author_stripe_account_id:String
  image:ImageType
  productStatus: String
  promotedBy:[PromoteRate]
  selection:String
  discount:Int
  stock: Int
  rate: Int
  promo: Int
  reviews:[String]
  updatedAt: String
  createdAt: String
}
type ImageType {
  url:String
  public_id:String
}
type PromoteRate  {
  profile:String
  rate:Int
}


input UpdateProductInput {
  title: String
  titleSlug:String!
  description:String
  price:Int
  image:InputImageType
   productStatus: String
  stock: Int
  promo: Int
  author:String
  selection:String
}
input PromoteProductInput {
  titleSlug:String!
  profile:String
  selectionSlug:String
  rate: Int
}
input ProductInput {
  title: String!
  description:String!
  price:Int!
  image:InputImageType
   productStatus: String
  stock: Int
  promo: Int
  discount: Int
  author:String
  selection:String
}
input RemoveProductInput  {
  slug: String
  image_id: String
  selection:String
}

type RemoveProductOutput {
  success: Boolean
}
type Query {
    products: [Product!]
    productsById(id:String): [Product!]
    productsByEmail(email:String): [Product!]
    productsByEmail(email:String): [Product!]
    discounts: [Product!]
    vracs: [Product!]
    product(titleSlug: String):  Product
}

type Mutation {
    addProduct(input: ProductInput): Product!
    makeDiscount(input: ProductInput): Product!
    updateProduct(input:UpdateProductInput): Product!
    promoteProduct(input:PromoteProductInput): RemoveProductOutput
    removeProducts(input: [RemoveProductInput]): RemoveProductOutput
}
enum ProductStatus {
    ORGA
    FAMI
    FRONT
    LIIS
    VRAC
  }
`;
