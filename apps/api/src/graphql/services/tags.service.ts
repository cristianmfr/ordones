import { Injectable, NotFoundException } from '@nestjs/common'
import { TagCreateInput } from '@/common/database/dto/tag-create-input.dto'
import { TagUpdateInput } from '@/common/database/dto/tag-update-input.dto'
import { Tag } from '@/common/database/entities/tag.entity'
import { TagPagination } from '@/common/database/entities/tag-pagination.entity'
import { OperationResult } from '@/common/interfaces/operation-result.dto'
import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { PrismaService } from '@/shared/prisma/prisma.service'

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTag(data: TagCreateInput): Promise<Tag> {
    const tag = await this.prisma.tag.create({
      data: {
        name: data.name,
        isActive: data.isActive,
      },
    })

    return tag
  }

  async updateTag(id: string, data: TagUpdateInput): Promise<Tag> {
    const tag = await this.prisma.tag.update({
      where: { id },
      data: {
        ...data,
      },
    })

    return tag
  }

  async deleteTag(id: string): Promise<OperationResult> {
    const tag = await this.prisma.tag.delete({
      where: { id },
    })

    if (!tag) {
      throw new NotFoundException('Tag not found!')
    }

    return {
      message: 'Tag deleted successfully',
      success: true,
    }
  }

  async getTagsWithPagination(
    query?: QueryPaginationInput
  ): Promise<TagPagination> {
    const where: any = {}

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.tag.findMany({ where, skip, take }),
      this.prisma.tag.count({ where }),
    ])

    return {
      items,
      total,
    }
  }

  async getTagById(id: string): Promise<Tag> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    })

    if (!tag) {
      throw new NotFoundException('Tag not found!')
    }

    return tag
  }
}
