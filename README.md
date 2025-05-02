# AWS SAM GraphQL AppSync POC Project

This project demonstrates the implementation of a serverless GraphQL API using AWS AppSync, DynamoDB, and AWS SAM (Serverless Application Model). The API manages employee data, providing queries, mutations, and subscriptions for CRUD operations.

---

## Features

- **GraphQL API**: A flexible and efficient API for managing employee data.
- **AWS AppSync**: Managed GraphQL service with real-time data synchronization.
- **DynamoDB**: NoSQL database for storing employee data.
- **AWS SAM**: Simplified deployment and management of serverless resources.
- **Resolvers**: Custom logic for handling GraphQL operations.
- **Subscriptions**: Real-time updates for employee creation, updates, and deletions.

---

## Project Structure

```plaintext
src/
├── schema/
│   └── [schema.graphql]    # GraphQL schema defining API structure
├── resolvers/
│   ├── query/
│   │   ├── [getEmployee.js]   # Resolver for getEmployeeDetails query
│   │   └── [listEmployees.js]# Resolver for listEmployees query
│   ├── mutations/
│   │   ├── [createEmployee.js] # Resolver for createEmployee mutation
│   │   ├── [updateEmployee.js] # Resolver for updateEmployee mutation
│   │   └── [deleteEmployee.js] # Resolver for deleteEmployee mutation
[template.yaml]          # AWS SAM template for defining resources
[samconfig.toml]             # Configuration for SAM deployment


GraphQL Schema
The schema defines the structure of the API, including types, queries, mutations, and subscriptions.

type Employee {
    Empid: String!
    Name: String
    Address: String
    PhoneNumber: String
}

type Query {
    getEmployeeDetails(Empid: String!): Employee
}

type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee
}

type Subscription {
    onCreateEmployee(
        Empid: String,
        Name: String,
        Address: String,
        PhoneNumber: String
    ): Employee
        @aws_subscribe(mutations: ["createEmployee"])
}

Resolvers
Resolvers handle the logic for GraphQL operations and interact with the DynamoDB data source.

Example: getEmployeeDetails Query
File: src/resolvers/query/getEmployee.js
Logic: Fetches an employee's details by Empid from DynamoDB.
Example: createEmployee Mutation
File: src/resolvers/mutations/createEmployee.js
Logic: Adds a new employee to DynamoDB, ensuring the Empid is unique.


Data Source
The project uses DynamoDB as the data source for storing employee data. The table is configured in the template.yaml file.

EmployeeTableDataSource:
  Type: AWS::AppSync::DataSource
  Properties:
    ApiId: !GetAtt EmployeeManagementApi.ApiId
    Name: EmployeeTableDataSource
    Type: AMAZON_DYNAMODB
    DynamoDBConfig:
      TableName: Employee
      AwsRegion: !Ref AWS::Region
    ServiceRoleArn: !GetAtt AppSyncServiceRole.Arn


Deployment
The project uses AWS SAM for deployment.

Steps to Deploy
- "sam build"  : Build the Application
- "sam deploy --guided" : Deploy the Application


Resources
AWS AppSync Documentation: https://docs.aws.amazon.com/appsync/
AWS SAM Documentation: https://docs.aws.amazon.com/serverless-application-model/
DynamoDB Documentation: https://docs.aws.amazon.com/dynamodb/