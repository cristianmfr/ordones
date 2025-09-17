import { randomUUID } from 'node:crypto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { UserRegisterInput } from '@/common/database/dto/user-register-input.dto'
import { env } from '@/config/env.config'
import { ResendService } from '@/shared/resend/resend.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly resend: ResendService
  ) {}

  private async comparePassword(password: string, hashPassword: string) {
    const compare = await bcrypt.compare(password, hashPassword)

    return compare
  }

  async generateToken(user: any) {
    const emailNormalized = user.email.toLowerCase().trim()

    const payload = {
      email: emailNormalized,
      userId: user.id,
    }

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
    }
  }

  async authenticate(email: string, password: string) {
    const emailNormalized = email.toLowerCase().trim()

    const user = await this.prisma.user.findUnique({
      where: { email: emailNormalized },
    })

    if (!user) {
      throw new Error('User not exists!')
    }

    const { password: hashedPassword } = user

    const validatePassword = await this.comparePassword(
      password,
      hashedPassword
    )

    if (!validatePassword) {
      throw new Error('Password incorrect!')
    }

    const { accessToken } = await this.generateToken(user)

    return accessToken
  }

  async createEmailToken(email: string) {
    const emailNormalized = email.toLocaleLowerCase().trim()

    const hasUser = await this.prisma.user.findUnique({
      where: {
        email: emailNormalized,
      },
    })

    const hasToken = await this.prisma.emailToken.findUnique({
      where: {
        email: emailNormalized,
      },
    })

    if (hasUser || hasToken) {
      throw new Error('This email is already in use!')
    }

    const randomToken = randomUUID()

    const emailToken = await this.prisma.emailToken.create({
      data: {
        email: emailNormalized,
        token: randomToken,
      },
    })

    const linkWithToken = `${env.WEB_BASE_URL}/${emailToken.token}`

    const mailer = await this.resend.sendEmailToken(
      emailNormalized,
      linkWithToken
    )

    return `Success when sending email: ${mailer}`
  }

  async validateEmailToken(token: string) {
    const userToken = await this.prisma.emailToken.findUnique({
      where: {
        token,
      },
    })

    if (!userToken) {
      throw new NotFoundException('Token not found!')
    }

    if (userToken.status !== 'PENDING') {
      return null
    }

    return userToken.email
  }

  async register(user: UserRegisterInput) {
    const registerUserTransaction = await this.prisma.$transaction(async tx => {
      const emailToken = await tx.emailToken.findUnique({
        where: {
          token: user.token,
        },
      })

      if (!emailToken || emailToken.status !== 'PENDING') {
        throw new Error('This token is not valid!')
      }

      const hashPassword = await bcrypt.hash(user.password, 12)

      const newUser = await tx.user.create({
        data: {
          name: user.name,
          email: emailToken.email,
          birthdate: user.birthdate,
          password: hashPassword,
          role: 'CUSTOMER',
        },
      })

      await tx.emailToken.update({
        where: { token: user.token },
        data: {
          status: 'CONFIRMED',
        },
      })

      const { accessToken } = await this.generateToken(newUser)

      return { user: newUser, accessToken }
    })

    return registerUserTransaction
  }
}
