# BidBay

The BidBay is a trading platform that allows people to connect and trade technology products such as
notebooks, mice, keyboards, and other items that facilitate their work process, optimizing their workspace costs.
The platform promotes direct negotiation between users, eliminating the need for intermediaries or third parties.

## Architecture and Design Principles

The API BidBay is built using a combination of modern technologies and architectural principles, including:

- `Hexagonal Architecture`: The application follows the principles of Hexagonal Architecture, also known as Ports and
  Adapters, to achieve a clean separation of concerns and maintain a highly decoupled and testable codebase.
- `Domain-Driven Design (DDD)`: DDD principles are applied to model the business domain and design the core entities,
  aggregates, repositories, and domain services. This helps to ensure a clear and expressive domain model that reflects
  the business requirements.
- `Express.js`: The API is built using Express.js, a fast and minimalist web framework for Node.js, which provides a
  robust foundation for handling HTTP requests and building scalable APIs.
- `MongoDB`: MongoDB, a NoSQL document database, is used as the data store to provide flexibility and scalability for
  storing and retrieving data related to users, products, negotiations, and other entities.
- `Swagger/OpenAPI`: The API documentation is generated using Swagger/OpenAPI, which provides a standardized and
  interactive documentation format to help developers understand the available endpoints, request/response formats, and
  authentication requirements.
- `Docker/Docker Compose`: The application can be easily containerized using Docker, allowing for consistent deployment
  across different environments. Docker Compose is utilized to define and manage the multi-container application stack,
  including dependencies such as MongoDB and the Swagger UI.

## Technology Stack

- `Node.js`: A JavaScript runtime environment that powers the server-side application.
- `Express.js`: A fast and minimalist web framework for building robust APIs.
- `MongoDB`: A popular NoSQL database for storing and managing application data.
- `Swagger`: A powerful tool for designing, building, and documenting RESTful APIs.
- `Jest`: A JavaScript testing framework for creating unit tests.
- `Supertest`: A library for testing HTTP requests and responses.
- `Bcrypt`: A library for hashing passwords and providing secure password storage.
- `Jsonwebtoken`: A library for creating and verifying JSON Web Tokens (JWT) for authentication and authorization.
- `Docker`: A containerization platform for packaging and deploying applications.
- `Docker`: Compose: A tool for defining and running multi-container Docker applications.

## Setup

```bash
# Clone the repository
git clone https://git.

# Enter in the directory
cd api-bidbay
```

## Running

```bash
# Create the container
docker-compose up -d
```

This initializes application in the port 3001.

## API Testing

You can test the API endpoints using the provided collection file located in the `doc` directory. This collection can be
imported into popular API testing tools like Insomnia or Postman.

### Importing into Insomnia

1. Open Insomnia.
2. Go to `Application` > `Data` > `Import Data` > `From File`.
3. Navigate to the `doc` directory in the project.
4. Select the collection file (e.g., `api-bidbay.yaml`).
5. Insomnia will import the collection and make it available for testing.

### Importing into Postman

1. Open Postman.
2. Go to `File` > `Import` > `files`.
3. Select the `Import File` tab.
4. Navigate to the `doc` directory in the project.
5. Select the file (e.g., `api-bidbay.yaml`).
6. Postman will import the collection and make it available for testing.

Feel free to explore the available endpoints and make requests to interact with the API.

## Documentation

To see the documentation, run the project and access the url http://localhost:3000/.

## References

- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [openapi](https://www.npmjs.com/package/openapi)
- [Mongodb](https://www.mongodb.com/)

