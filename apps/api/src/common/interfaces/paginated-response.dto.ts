import { Type } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'

export interface IPaginatedType<T> {
  items: T[]
  total: number
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  class PaginatedTypeClass implements IPaginatedType<T> {
    @Field(() => [classRef])
    items: T[]

    @Field(() => Int)
    total: number
  }

  const name = `Paginated${classRef.name}`
  Object.defineProperty(PaginatedTypeClass, 'name', { value: name })

  return PaginatedTypeClass as Type<IPaginatedType<T>>
}
