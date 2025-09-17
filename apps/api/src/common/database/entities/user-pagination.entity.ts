import { ObjectType } from '@nestjs/graphql'
import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { User } from './user.entity'

@ObjectType()
export class UserPagination extends Paginated(User) {}
