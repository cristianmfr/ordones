import { ObjectType } from '@nestjs/graphql'
import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Order } from './order.entity'

@ObjectType()
export class OrderPagination extends Paginated(Order) {}