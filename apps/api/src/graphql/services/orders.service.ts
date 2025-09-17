import { Injectable, NotFoundException } from '@nestjs/common'
import { OrderStatus } from '@ordones/database/generated'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { OrderCreateInput } from '@/common/database/dto/order-create-input.dto'
import { OrderQueryFilterInput } from '@/common/database/dto/order-query-filter-input.dto'
import { OrderUpdateInput } from '@/common/database/dto/order-update-input.dto'
import { Order } from '@/common/database/entities/order.entity'
import { OrderPagination } from '@/common/database/entities/order-pagination.entity'
import { OperationResult } from '@/common/interfaces/operation-result.dto'

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private transformOrder(order: any): Order {
    return {
      ...order,
      total: order.total.toNumber(),
    }
  }

  async createOrder(data: OrderCreateInput): Promise<Order> {
    const newOrder = {
      orderNumber: data.orderNumber,
      status: data.status ?? OrderStatus.PENDING,
      total: data.total,
      userId: data.userId,
      shippingAddressId: data.shippingAddressId,
      shippingMethodId: data.shippingMethodId,
    }

    const order = await this.prisma.order.create({
      data: newOrder,
    })

    return this.transformOrder(order)
  }

  async updateOrder(id: string, data: OrderUpdateInput): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    const orderUpdated = {
      orderNumber: data.orderNumber,
      status: data.status,
      total: data.total,
      userId: data.userId,
      shippingAddressId: data.shippingAddressId,
      shippingMethodId: data.shippingMethodId,
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        ...orderUpdated,
      },
    })

    return this.transformOrder(updatedOrder)
  }

  async deleteOrder(id: string): Promise<OperationResult> {
    const order = await this.prisma.order.delete({
      where: { id },
    })

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    return {
      message: 'Order deleted successfully',
      success: true,
    }
  }

  async getOrdersWithPagination(
    query?: OrderQueryFilterInput
  ): Promise<OrderPagination> {
    const where: any = {}

    if (query?.status && query.status.length > 0) {
      where.status = {
        in: query.status as OrderStatus[],
      }
    }

    if (query?.userId) {
      where.userId = query.userId
    }

    if (query?.orderNumber) {
      where.orderNumber = {
        contains: query.orderNumber,
        mode: 'insensitive',
      }
    }

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ])

    return {
      items: items.map(order => this.transformOrder(order)),
      total,
    }
  }

  async getOrders(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return orders.map(order => this.transformOrder(order))
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    return this.transformOrder(order)
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return orders.map(order => this.transformOrder(order))
  }

  async getOrdersByUserIdWithPagination(
    userId: string,
    query?: OrderQueryFilterInput
  ): Promise<OrderPagination> {
    const where: any = {
      userId,
    }

    if (query?.status && query.status.length > 0) {
      where.status = {
        in: query.status as OrderStatus[],
      }
    }

    if (query?.orderNumber) {
      where.orderNumber = {
        contains: query.orderNumber,
        mode: 'insensitive',
      }
    }

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ])

    return {
      items: items.map(order => this.transformOrder(order)),
      total,
    }
  }

  async confirmOrder(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.CONFIRMED,
        confirmedAt: new Date(),
      },
    })

    return this.transformOrder(updatedOrder)
  }

  async shipOrder(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.SHIPPED,
        shippedAt: new Date(),
      },
    })

    return this.transformOrder(updatedOrder)
  }

  async deliverOrder(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.DELIVERED,
        deliveredAt: new Date(),
      },
    })

    return this.transformOrder(updatedOrder)
  }

  async cancelOrder(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.CANCELLED,
      },
    })

    return this.transformOrder(updatedOrder)
  }
}
