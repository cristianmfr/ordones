import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrderCreateInput } from '@/common/database/dto/order-create-input.dto'
import { OrderQueryFilterInput } from '@/common/database/dto/order-query-filter-input.dto'
import { OrderUpdateInput } from '@/common/database/dto/order-update-input.dto'
import { Order } from '@/common/database/entities/order.entity'
import { OrderPagination } from '@/common/database/entities/order-pagination.entity'
import { GetCurrentUser } from '@/common/decorators/get-current-user.decorator'
import { AuthGuard } from '@/common/guards/auth.guard'
import { OperationResult } from '@/common/interfaces/operation-result.dto'
import { CurrentUser } from '@/common/types/current-user.type'
import { OrdersService } from '../services/orders.service'

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Order, { name: 'orderCreate' })
  async createOrder(@Args('data') data: OrderCreateInput) {
    return this.ordersService.createOrder(data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Order, { name: 'orderUpdate' })
  async updateOrder(
    @Args('id') id: string,
    @Args('data') data: OrderUpdateInput
  ) {
    return this.ordersService.updateOrder(id, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OperationResult, { name: 'orderDelete' })
  async deleteOrder(@Args('id') id: string) {
    return this.ordersService.deleteOrder(id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Order, { name: 'orderConfirm' })
  async confirmOrder(@Args('id') id: string) {
    return this.ordersService.confirmOrder(id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Order, { name: 'orderShip' })
  async shipOrder(@Args('id') id: string) {
    return this.ordersService.shipOrder(id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Order, { name: 'orderDeliver' })
  async deliverOrder(@Args('id') id: string) {
    return this.ordersService.deliverOrder(id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Order, { name: 'orderCancel' })
  async cancelOrder(@Args('id') id: string) {
    return this.ordersService.cancelOrder(id)
  }

  @UseGuards(AuthGuard)
  @Query(() => OrderPagination, { name: 'orders' })
  async getOrders(@Args('query') query: OrderQueryFilterInput) {
    return this.ordersService.getOrdersWithPagination(query)
  }

  @UseGuards(AuthGuard)
  @Query(() => [Order], { name: 'ordersList' })
  async getOrdersList() {
    return this.ordersService.getOrders()
  }

  @UseGuards(AuthGuard)
  @Query(() => Order, { name: 'order' })
  async getOrderById(@Args('id') id: string) {
    return this.ordersService.getOrderById(id)
  }

  @UseGuards(AuthGuard)
  @Query(() => [Order], { name: 'ordersByUserId' })
  async getOrdersByUserId(@Args('userId') userId: string) {
    return this.ordersService.getOrdersByUserId(userId)
  }

  @UseGuards(AuthGuard)
  @Query(() => OrderPagination, { name: 'ordersByUserIdPaginated' })
  async getOrdersByUserIdWithPagination(
    @Args('userId') userId: string,
    @Args('query') query: OrderQueryFilterInput
  ) {
    return this.ordersService.getOrdersByUserIdWithPagination(userId, query)
  }

  @UseGuards(AuthGuard)
  @Query(() => [Order], { name: 'myOrders' })
  async getMyOrders(@GetCurrentUser() user: CurrentUser) {
    return this.ordersService.getOrdersByUserId(user.userId)
  }

  @UseGuards(AuthGuard)
  @Query(() => OrderPagination, { name: 'myOrdersPaginated' })
  async getMyOrdersWithPagination(
    @GetCurrentUser() user: CurrentUser,
    @Args('query') query: OrderQueryFilterInput
  ) {
    return this.ordersService.getOrdersByUserIdWithPagination(
      user.userId,
      query
    )
  }
}
