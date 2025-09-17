import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './auth/auth.module'
import { GqlConfigService } from './config/graphql.config'
import { CategoriesModule } from './graphql/module/categories.module'
import { OrdersModule } from './graphql/module/orders.module'
import { ProductsModule } from './graphql/module/products.module'
import { ReviewsModule } from './graphql/module/reviews.module'
import { StorageFilesModule } from './graphql/module/storage-files.module'
import { TagsModule } from './graphql/module/tags.module'
import { UsersModule } from './graphql/module/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    TagsModule,
    StorageFilesModule,
    OrdersModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
