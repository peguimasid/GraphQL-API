import { ApolloServer } from 'apollo-server'
import { } from 'graphql'

function startServer({ typeDefs , resolvers }: any) {
  const server = new ApolloServer({ typeDefs, resolvers })

  server.listen().then(({ url }) => console.log(`🍄 Server started at ${url}`))
}

export default startServer