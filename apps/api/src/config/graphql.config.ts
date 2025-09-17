import { join } from 'node:path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable } from '@nestjs/common'
import { GqlOptionsFactory } from '@nestjs/graphql'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(
        process.cwd(),
        '../../packages/codegen/schema.graphql'
      ),
      playground: false,
      installSubscriptionHandlers: true,
      introspection: true,
      context: ctx => {
        return ctx
      },
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
    }
  }
}
