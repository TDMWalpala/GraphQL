const {ApolloServer,gql} = require('apollo-server');
const EmployeeService = require('./datasources/file');

const typeDefs = gql`
     type Query {
        employees (
            id: ID
            firstName: String,
            lastName: String,
            destination: String,
            department: String,
            nearestCity: String
        ):[Employee],
        findEmployeeById(id:ID): Employee

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
        employees : (parent, args, {dataSources}, info)=> {
            return dataSources.employeeService.getEmployees(args);
        },
        findEmployeeById: (params, {id}, {dataSources}, info) => {
            return dataSources.employeeService.getEmployeeById(id)[0];
        }
    }
}

const dataSources = ()=> ({
    employeeService: new EmployeeService()

});

const gplServer  = new ApolloServer({typeDefs, resolvers, dataSources});

gplServer.listen({port : process.env.PORT || 4000})
         .then(({url}) => console.log(`GraphQL server start on ${url}`));