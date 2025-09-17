import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TagCreateInput } from '@/common/database/dto/tag-create-input.dto'
import { TagUpdateInput } from '@/common/database/dto/tag-update-input.dto'
import { Tag } from '@/common/database/entities/tag.entity'
import { TagPagination } from '@/common/database/entities/tag-pagination.entity'
import { AuthGuard } from '@/common/guards/auth.guard'
import { OperationResult } from '@/common/interfaces/operation-result.dto'
import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { TagsService } from '../services/tags.service'

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Tag, { name: 'tagCreate' })
  async createTag(@Args('data') data: TagCreateInput) {
    return this.tagsService.createTag(data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Tag, { name: 'tagUpdate' })
  async updateTag(@Args('id') id: string, @Args('data') data: TagUpdateInput) {
    return this.tagsService.updateTag(id, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OperationResult, { name: 'tagDelete' })
  async deleteTag(@Args('id') id: string) {
    return this.tagsService.deleteTag(id)
  }

  @Query(() => TagPagination, { name: 'tags' })
  async getTags(@Args('query') query: QueryPaginationInput) {
    return this.tagsService.getTagsWithPagination(query)
  }

  @Query(() => Tag, { name: 'tag' })
  async getTagById(@Args('id') id: string) {
    return this.tagsService.getTagById(id)
  }
}
