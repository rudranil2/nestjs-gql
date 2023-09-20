import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DonationsModule } from './donations/donations.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
// import { GraphQLDateTime } from 'graphql-iso-date';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }: any) => ({ req }),
      formatError: (error: GraphQLError) => {
        const graphQlFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQlFormattedError;
      },
      subscriptions: {
        'graphql-ws': true,
        // 'subscriptions-transport-ws': true,        //*Recommended to turn this 'true' in case of Apollo-sandbox, But didn't give me error :-/
      },
      // resolvers: { DateTime: GraphQLDateTime },
    }),
    DonationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
