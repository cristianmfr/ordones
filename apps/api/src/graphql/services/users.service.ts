import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRole } from '@ordones/database/generated'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { IdentityDocumentCreateInput } from '@/common/database/dto/identity-document-create-input.dto'
import { UserCreateInput } from '@/common/database/dto/user-create-input.dto'
import { UserQueryFilterInput } from '@/common/database/dto/user-query-filter-input.dto'
import { UserUpdateInput } from '@/common/database/dto/user-update-input.dto'
import { IdentityDocument } from '@/common/database/entities/identity-document.entity'
import { User } from '@/common/database/entities/user.entity'
import { UserAuthenticated } from '@/common/database/entities/user-authenticated.entity'
import { UserPagination } from '@/common/database/entities/user-pagination.entity'
import { OperationResult } from '@/common/interfaces/operation-result.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: UserCreateInput): Promise<User> {
    const hashPassword = await hash(data.password, 12)

    const newUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashPassword,
      role: data.role,
    }

    return this.prisma.user.create({
      data: newUser,
    })
  }

  async createUserDocument(
    document: IdentityDocumentCreateInput
  ): Promise<IdentityDocument> {
    const userDocument = await this.prisma.identityDocument.create({
      data: document,
    })

    return userDocument
  }

  async updateUser(id: string, data: UserUpdateInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        document: true,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    const userUpdated = {
      name: data.name,
      birthdate: data.birthdate,
      email: data.email,
      phone: data.phone,
      role: data.role,
    }

    if (!user.document && data.documentNumber && data.documentType) {
      await this.prisma.identityDocument.create({
        data: {
          documentNumber: data.documentNumber,
          documentType: data.documentType,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
    }

    if (user.document && data.documentNumber && data.documentType) {
      await this.prisma.identityDocument.update({
        where: {
          userId: user.id,
        },
        data: {
          documentNumber: data.documentNumber,
          documentType: data.documentType,
        },
      })
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...userUpdated,
      },
    })
  }

  async deleteUser(id: string): Promise<OperationResult> {
    const user = await this.prisma.user.delete({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    return {
      message: 'User deleted successfully',
      success: true,
    }
  }

  async getUsersWithPagination(
    query?: UserQueryFilterInput
  ): Promise<UserPagination> {
    const where: any = {}

    if (query?.role && query.role.length > 0) {
      where.role = {
        in: query.role as UserRole[],
      }
    }

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({ where, skip, take }),
      this.prisma.user.count({ where }),
    ])

    return {
      items,
      total,
    }
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    return user
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    return user
  }

  async getCurrentUser(id: string): Promise<UserAuthenticated> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        document: true,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthdate: user.birthdate,
      role: user.role,
      resetToken: user.resetToken,
      document: user.document?.documentNumber,
      documentType: user.document?.documentType,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return currentUser
  }
}
