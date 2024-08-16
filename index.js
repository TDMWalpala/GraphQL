const {ApolloServer,gql} = require('apollo-server');

const typeDefs = gql`
     type Query {
         employees:[Employee]
     }
     type Employee {
         id: ID!
         firstName: String,
         lastName: String,
         destination: String,
         department: String,
         nearestCity: String
    }
    `;

const gplServer  = new ApolloServer({typeDefs});

gplServer.listen({port : process.env.PORT || 4000})
         .then(({url}) => console.log(`GraphQL server start on ${url}`));