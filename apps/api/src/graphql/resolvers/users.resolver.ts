import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { IdentityDocumentCreateInput } from '@/common/database/dto/identity-document-create-input.dto'
import { UserCreateInput } from '@/common/database/dto/user-create-input.dto'
import { UserQueryFilterInput } from '@/common/database/dto/user-query-filter-input.dto'
import { UserUpdateInput } from '@/common/database/dto/user-update-input.dto'
import { IdentityDocument } from '@/common/database/entities/identity-document.entity'
import { User } from '@/common/database/entities/user.entity'
import { UserAuthenticated } from '@/common/database/entities/user-authenticated.entity'
import { UserPagination } from '@/common/database/entities/user-pagination.entity'
import { GetCurrentUser } from '@/common/decorators/get-current-user.decorator'
import { AuthGuard } from '@/common/guards/auth.guard'
import { OperationResult } from '@/common/interfaces/operation-result.dto'
import { CurrentUser } from '@/common/types/current-user.type'
import { UsersService } from '../services/users.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'userCreate' })
  async createUser(@Args('data') data: UserCreateInput) {
    return this.userService.createUser(data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => IdentityDocument, { name: 'userCreateDocument' })
  async createUserDocument(
    @Args('document') document: IdentityDocumentCreateInput
  ) {
    return this.userService.createUserDocument(document)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'userUpdate' })
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UserUpdateInput
  ) {
    return this.userService.updateUser(id, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OperationResult, { name: 'userDelete' })
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id)
  }

  @UseGuards(AuthGuard)
  @Query(() => UserPagination, { name: 'users' })
  async getUsers(@Args('query') query: UserQueryFilterInput) {
    return this.userService.getUsersWithPagination(query)
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  async getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id)
  }

  @UseGuards(AuthGuard)
  @Query(() => UserAuthenticated, { name: 'userAuthenticated' })
  async getCurrentUser(@GetCurrentUser() user: CurrentUser) {
    return this.userService.getCurrentUser(user.userId)
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'userByEmail' })
  async getUserByEmail(@Args('email') email: string) {
    return this.userService.getUserByEmail(email)
  }
}
