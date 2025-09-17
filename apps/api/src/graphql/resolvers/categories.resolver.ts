import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryCreateInput } from '@/common/database/dto/category-create-input.dto'
import { CategoryUpdateInput } from '@/common/database/dto/category-update-input.dto'
import { Category } from '@/common/database/entities/category.entity'
import { CategoryPagination } from '@/common/database/entities/category-pagination.entity'
import { AuthGuard } from '@/common/guards/auth.guard'
import { OperationResult } from '@/common/interfaces/operation-result.dto'
import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { CategoriesService } from '../services/categories.service'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Category, { name: 'categoryCreate' })
  async createCategory(@Args('data') data: CategoryCreateInput) {
    return this.categoriesService.createCategory(data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Category, { name: 'categoryUpdate' })
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: CategoryUpdateInput
  ) {
    return this.categoriesService.updateCategory(id, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OperationResult, { name: 'categoryDelete' })
  async deleteCategory(@Args('id') id: string) {
    return this.categoriesService.deleteCategory(id)
  }

  @Query(() => CategoryPagination, { name: 'categories' })
  async getCategories(@Args('query') query: QueryPaginationInput) {
    return this.categoriesService.getCategoriesWithPagination(query)
  }

  @Query(() => Category, { name: 'category' })
  async getCategoryById(@Args('id') id: string) {
    return this.categoriesService.getCategoryById(id)
  }
}
