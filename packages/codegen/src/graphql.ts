/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isHighlight: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: Scalars['Boolean']['input'];
  isHighlight?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CategoryPagination = {
  __typename?: 'CategoryPagination';
  items: Array<Category>;
  total: Scalars['Int']['output'];
};

export type CategoryUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isHighlight?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum DocumentType {
  Cnh = 'CNH',
  Cpf = 'CPF',
  Rg = 'RG'
}

export enum FileStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Missing = 'MISSING',
  Processing = 'PROCESSING'
}

export type FrenetShippingResponseDto = {
  __typename?: 'FrenetShippingResponseDto';
  RecipientAddress?: Maybe<Scalars['String']['output']>;
  ShippingSevicesArray: Array<FrenetShippingServiceDto>;
  Timeout: Scalars['Float']['output'];
};

export type FrenetShippingServiceDto = {
  __typename?: 'FrenetShippingServiceDto';
  Carrier: Scalars['String']['output'];
  CarrierCode: Scalars['String']['output'];
  DeliveryTime: Scalars['String']['output'];
  Error: Scalars['Boolean']['output'];
  Msg: Scalars['String']['output'];
  OriginalDeliveryTime: Scalars['String']['output'];
  OriginalShippingPrice: Scalars['String']['output'];
  ServiceCode: Scalars['String']['output'];
  ServiceDescription: Scalars['String']['output'];
  ShippingPrice: Scalars['String']['output'];
};

export type IdentityDocument = {
  __typename?: 'IdentityDocument';
  createdAt: Scalars['DateTime']['output'];
  documentNumber: Scalars['String']['output'];
  documentType: DocumentType;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IdentityDocumentCreateInput = {
  documentNumber: Scalars['String']['input'];
  documentType: DocumentType;
  userId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  categoryCreate: Category;
  categoryDelete: OperationResult;
  categoryUpdate: Category;
  createEmailTokenAndSend: Scalars['String']['output'];
  orderCancel: Order;
  orderConfirm: Order;
  orderCreate: Order;
  orderDelete: OperationResult;
  orderDeliver: Order;
  orderShip: Order;
  orderUpdate: Order;
  productCreate: Product;
  productCreateImage: OperationResult;
  productCreateMany: Array<Product>;
  productCreateWithImages: ProductWithImagesResponse;
  productDelete: OperationResult;
  productImageDelete: OperationResult;
  productUpdate: Product;
  signIn: Scalars['String']['output'];
  signUp: UserRegisterOutput;
  storageFileCreate: StorageFileWithPresignedUrl;
  storageFileUpdate: StorageFile;
  tagCreate: Tag;
  tagDelete: OperationResult;
  tagUpdate: Tag;
  userCreate: User;
  userCreateDocument: IdentityDocument;
  userDelete: OperationResult;
  userUpdate: User;
};


export type MutationCategoryCreateArgs = {
  data: CategoryCreateInput;
};


export type MutationCategoryDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationCategoryUpdateArgs = {
  data: CategoryUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationCreateEmailTokenAndSendArgs = {
  email: Scalars['String']['input'];
};


export type MutationOrderCancelArgs = {
  id: Scalars['String']['input'];
};


export type MutationOrderConfirmArgs = {
  id: Scalars['String']['input'];
};


export type MutationOrderCreateArgs = {
  data: OrderCreateInput;
};


export type MutationOrderDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationOrderDeliverArgs = {
  id: Scalars['String']['input'];
};


export type MutationOrderShipArgs = {
  id: Scalars['String']['input'];
};


export type MutationOrderUpdateArgs = {
  data: OrderUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationProductCreateArgs = {
  data: ProductCreateInput;
};


export type MutationProductCreateImageArgs = {
  fileId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};


export type MutationProductCreateManyArgs = {
  products: Array<ProductCreateInput>;
};


export type MutationProductCreateWithImagesArgs = {
  data: ProductCreateWithImagesInput;
};


export type MutationProductDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationProductImageDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationProductUpdateArgs = {
  data: ProductUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  user: UserRegisterInput;
};


export type MutationStorageFileCreateArgs = {
  data: StorageFileCreateInput;
};


export type MutationStorageFileUpdateArgs = {
  data: StorageFileUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationTagCreateArgs = {
  data: TagCreateInput;
};


export type MutationTagDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationTagUpdateArgs = {
  data: TagUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationUserCreateArgs = {
  data: UserCreateInput;
};


export type MutationUserCreateDocumentArgs = {
  document: IdentityDocumentCreateInput;
};


export type MutationUserDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationUserUpdateArgs = {
  data: UserUpdateInput;
  id: Scalars['String']['input'];
};

export type OperationResult = {
  __typename?: 'OperationResult';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Order = {
  __typename?: 'Order';
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deliveredAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  orderNumber: Scalars['String']['output'];
  shippedAt?: Maybe<Scalars['DateTime']['output']>;
  shippingAddressId?: Maybe<Scalars['String']['output']>;
  shippingMethodId?: Maybe<Scalars['String']['output']>;
  status: OrderStatus;
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type OrderCreateInput = {
  orderNumber: Scalars['String']['input'];
  shippingAddressId?: InputMaybe<Scalars['String']['input']>;
  shippingMethodId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
  total: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};

export type OrderPagination = {
  __typename?: 'OrderPagination';
  items: Array<Order>;
  total: Scalars['Int']['output'];
};

export type OrderQueryFilterInput = {
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<OrderStatus>>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED'
}

export type OrderUpdateInput = {
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  shippingAddressId?: InputMaybe<Scalars['String']['input']>;
  shippingMethodId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
  total?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename?: 'Product';
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discount: Scalars['Int']['output'];
  hasCustomModel: Scalars['Boolean']['output'];
  hasCustomOption: Scalars['Boolean']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ProductImage>>;
  installments: Scalars['Int']['output'];
  length: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  status: ProductStatus;
  stock: Scalars['Int']['output'];
  tags?: Maybe<Array<Tag>>;
  updatedAt: Scalars['DateTime']['output'];
  weight: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type ProductCreateInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Int']['input']>;
  hasCustomModel?: InputMaybe<Scalars['Boolean']['input']>;
  hasCustomOption?: InputMaybe<Scalars['Boolean']['input']>;
  height: Scalars['Float']['input'];
  installments?: InputMaybe<Scalars['Int']['input']>;
  length: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sku: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  status?: InputMaybe<ProductStatus>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  weight: Scalars['Float']['input'];
  width: Scalars['Float']['input'];
};

export type ProductCreateWithImagesInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  hasCustomModel: Scalars['Boolean']['input'];
  hasCustomOption: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productImagesInputs: Array<StorageFileCreateInput>;
  sku: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  status?: InputMaybe<ProductStatus>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  createdAt: Scalars['DateTime']['output'];
  file: StorageFile;
  id: Scalars['ID']['output'];
  presignedUrl?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductPagination = {
  __typename?: 'ProductPagination';
  items: Array<Product>;
  total: Scalars['Int']['output'];
};

export type ProductReviews = {
  __typename?: 'ProductReviews';
  averageRating: Scalars['Int']['output'];
  ratingCounts: RatingCount;
  totalReviews: Scalars['Int']['output'];
};

export enum ProductStatus {
  Active = 'ACTIVE',
  Highlight = 'HIGHLIGHT',
  Inactive = 'INACTIVE',
  OnSale = 'ON_SALE',
  OutOfStock = 'OUT_OF_STOCK',
  SoldOut = 'SOLD_OUT'
}

export type ProductUpdateInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Int']['input']>;
  hasCustomModel?: InputMaybe<Scalars['Boolean']['input']>;
  hasCustomOption?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  installments?: InputMaybe<Scalars['Int']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type ProductWithImagesResponse = {
  __typename?: 'ProductWithImagesResponse';
  product: Product;
  storageFilesWithPresignedUrls: Array<StorageFileWithPresignedUrl>;
};

export type ProductsQueryFiltersInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  categories: CategoryPagination;
  category: Category;
  myOrders: Array<Order>;
  myOrdersPaginated: OrderPagination;
  order: Order;
  orders: OrderPagination;
  ordersByUserId: Array<Order>;
  ordersByUserIdPaginated: OrderPagination;
  ordersList: Array<Order>;
  product: Product;
  productImages: Array<StorageFileWithPresignedUrl>;
  productShippingQuote: FrenetShippingResponseDto;
  products: ProductPagination;
  productsShippingQuote: FrenetShippingResponseDto;
  productsWithFilters: ProductPagination;
  reviewsProduct: Array<ReviewProductOutput>;
  reviewsProductSummary: ProductReviews;
  storageFileUploadUrl: StorageFileWithPresignedUrl;
  tag: Tag;
  tags: TagPagination;
  user: User;
  userAuthenticated: UserAuthenticated;
  userByEmail: User;
  users: UserPagination;
  validateUserEmailToken: Scalars['String']['output'];
};


export type QueryCategoriesArgs = {
  query: QueryPaginationInput;
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryMyOrdersPaginatedArgs = {
  query: OrderQueryFilterInput;
};


export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrdersArgs = {
  query: OrderQueryFilterInput;
};


export type QueryOrdersByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryOrdersByUserIdPaginatedArgs = {
  query: OrderQueryFilterInput;
  userId: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductImagesArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductShippingQuoteArgs = {
  productId: Scalars['String']['input'];
  quantity?: Scalars['Float']['input'];
  recipientCEP: Scalars['String']['input'];
  recipientCountry?: Scalars['String']['input'];
  sellerCEP: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  query: QueryPaginationInput;
};


export type QueryProductsShippingQuoteArgs = {
  productIds: Array<Scalars['String']['input']>;
  quantity?: Scalars['Float']['input'];
  recipientCEP: Scalars['String']['input'];
  recipientCountry?: Scalars['String']['input'];
  sellerCEP: Scalars['String']['input'];
};


export type QueryProductsWithFiltersArgs = {
  filters: ProductsQueryFiltersInput;
};


export type QueryReviewsProductArgs = {
  productId: Scalars['String']['input'];
};


export type QueryReviewsProductSummaryArgs = {
  productId: Scalars['String']['input'];
};


export type QueryStorageFileUploadUrlArgs = {
  fileKey: Scalars['String']['input'];
};


export type QueryTagArgs = {
  id: Scalars['String']['input'];
};


export type QueryTagsArgs = {
  query: QueryPaginationInput;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  query: UserQueryFilterInput;
};


export type QueryValidateUserEmailTokenArgs = {
  token: Scalars['String']['input'];
};

export type QueryPaginationInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type RatingCount = {
  __typename?: 'RatingCount';
  five: Scalars['Int']['output'];
  four: Scalars['Int']['output'];
  one: Scalars['Int']['output'];
  three: Scalars['Int']['output'];
  two: Scalars['Int']['output'];
};

export type ReviewProductOutput = {
  __typename?: 'ReviewProductOutput';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type StorageFile = {
  __typename?: 'StorageFile';
  createdAt: Scalars['DateTime']['output'];
  fileBucket: Scalars['String']['output'];
  fileKey: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  fileStatus: FileStatus;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StorageFileCreateInput = {
  fileBucket: Scalars['String']['input'];
  fileKey: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};

export type StorageFileUpdateInput = {
  fileBucket?: InputMaybe<Scalars['String']['input']>;
  fileKey?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileStatus: FileStatus;
};

export type StorageFileWithPresignedUrl = {
  __typename?: 'StorageFileWithPresignedUrl';
  presignedUrl: Scalars['String']['output'];
  storageFile: StorageFile;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TagCreateInput = {
  isActive: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type TagPagination = {
  __typename?: 'TagPagination';
  items: Array<Tag>;
  total: Scalars['Int']['output'];
};

export type TagUpdateInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  birthdate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  resetToken?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserAuthenticated = {
  __typename?: 'UserAuthenticated';
  birthdate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  document?: Maybe<Scalars['String']['output']>;
  documentType?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  resetToken?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserCreateInput = {
  birthdate?: InputMaybe<Scalars['DateTime']['input']>;
  documentNumber?: InputMaybe<Scalars['String']['input']>;
  documentType: DocumentType;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  items: Array<User>;
  total: Scalars['Int']['output'];
};

export type UserQueryFilterInput = {
  role?: InputMaybe<Array<Scalars['String']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type UserRegisterInput = {
  birthdate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type UserRegisterOutput = {
  __typename?: 'UserRegisterOutput';
  accessToken: Scalars['String']['output'];
  user: User;
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Guest = 'GUEST',
  Super = 'SUPER',
  User = 'USER'
}

export type UserUpdateInput = {
  birthdate?: InputMaybe<Scalars['DateTime']['input']>;
  documentNumber?: InputMaybe<Scalars['String']['input']>;
  documentType?: InputMaybe<DocumentType>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};
