import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserRegisterInput } from '@/common/database/dto/user-register-input.dto'
import { UserRegisterOutput } from '@/common/database/dto/user-register-output.dto'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String, { name: 'signIn' })
  async authenticate(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    return await this.authService.authenticate(email, password)
  }

  @Mutation(() => String, { name: 'createEmailTokenAndSend' })
  async createEmailToken(@Args('email') email: string) {
    return await this.authService.createEmailToken(email)
  }

  @Query(() => String, { name: 'validateUserEmailToken' })
  async validateToken(@Args('token') token: string) {
    return await this.authService.validateEmailToken(token)
  }

  @Mutation(() => UserRegisterOutput, { name: 'signUp' })
  async register(@Args('user') user: UserRegisterInput) {
    return await this.authService.register(user)
  }
}
