import { ObjectType } from '@nestjs/graphql'
import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Category } from './category.entity'

@ObjectType()
export class CategoryPagination extends Paginated(Category) {}
