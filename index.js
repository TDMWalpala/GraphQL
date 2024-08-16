const {ApolloServer,gql} = require('apollo-server');
const employees = require('./data/employees.json');

const typeDefs = gql`
     type Query {
         employees:[Employee]
     }
     type Employee {
         id: ID!
         firstName: String,
         lastName: String,
         destination: String,
         department: String  @deprecated ( reason:"Since company moving"),
         nearestCity: String
    }
    `;

const resolvers = {
    Query: {
        employees : ()=> {
            return employees
        }
    }
}

const gplServer  = new ApolloServer({typeDefs, resolvers});

gplServer.listen({port : process.env.PORT || 4000})
         .then(({url}) => console.log(`GraphQL server start on ${url}`));