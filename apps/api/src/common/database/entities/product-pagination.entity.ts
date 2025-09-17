import { ObjectType } from '@nestjs/graphql'
import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Product } from './product.entity'

@ObjectType()
export class ProductPagination extends Paginated(Product) {}
