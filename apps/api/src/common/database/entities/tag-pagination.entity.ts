import { ObjectType } from '@nestjs/graphql'
import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Tag } from './tag.entity'

@ObjectType()
export class TagPagination extends Paginated(Tag) {}
