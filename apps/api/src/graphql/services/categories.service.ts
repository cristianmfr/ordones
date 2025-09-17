import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoryCreateInput } from '@/common/database/dto/category-create-input.dto'
import { CategoryUpdateInput } from '@/common/database/dto/category-update-input.dto'
import { Category } from '@/common/database/entities/category.entity'
import { CategoryPagination } from '@/common/database/entities/category-pagination.entity'
import { OperationResult } from '@/common/interfaces/operation-result.dto'
import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { PrismaService } from '@/shared/prisma/prisma.service'

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(data: CategoryCreateInput): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        isHighlight: data.isHighlight,
      },
    })

    return category
  }

  async updateCategory(
    id: string,
    data: CategoryUpdateInput
  ): Promise<Category> {
    const category = await this.prisma.category.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.isActive && { isActive: data.isActive }),
        ...(data.isHighlight && { isHighlight: data.isHighlight }),
      },
    })

    return category
  }

  async deleteCategory(id: string): Promise<OperationResult> {
    const category = await this.prisma.category.delete({
      where: { id },
    })

    if (!category) {
      throw new NotFoundException('Category not found!')
    }

    return {
      message: 'Category deleted successfully',
      success: true,
    }
  }

  async getCategoriesWithPagination(
    query?: QueryPaginationInput
  ): Promise<CategoryPagination> {
    const where: any = {}

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({ where, skip, take }),
      this.prisma.category.count({ where }),
    ])

    return {
      items,
      total,
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!category) {
      throw new NotFoundException('Category not found!')
    }

    return category
  }
}
