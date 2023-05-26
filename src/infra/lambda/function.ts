import {Handler} from 'aws-lambda';
import CreateUser from "../../application/usecase/user/CreateUser";
import RetrieveUser from "../../application/usecase/user/RetrieveUser";
import UserRepositoryDatabase from "../repository/database/UserRepositoryDatabase";
import {MongoClient} from "mongodb";


export const minhaFuncao: Handler = async (event, context) => {
    try {
        // Lógica da sua função aqui
        console.log("Event: " + JSON.stringify(event, null, 2))
        console.log("Context: " + JSON.stringify(context, null, 2))
        console.log('setting client URL:', process.env.DB_CONN_STRING);
        console.log('connecting to mongo');
        const client = await MongoClient.connect(process.env.DB_CONN_STRING as string)
        console.log('connected to mongo');


        const userRepository = new UserRepositoryDatabase(client);
        await userRepository.connect();
        const createUser = new CreateUser(userRepository)
        const retrieveUser = new RetrieveUser(userRepository);

        const method = event.httpMethod;
        const resourcePath = event.resource;
        const action = method + resourcePath;
        if (action === 'GET/api/v1/users/{userId}') {
            const outputUser = await retrieveUser.execute(event.pathParameters.userId);
            return {
                statusCode: 200,
                body: JSON.stringify(outputUser),
            }
        } else if (action === 'POST/api/v1/users') {
            const outputUser = await createUser.execute(JSON.parse(event.body));
            return {
                statusCode: 200,
                body: JSON.stringify(outputUser),
            }

        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({message: 'Path não configurado!!! ' + action}),
            };
        }
    } catch (error) {
        const response = {
            statusCode: 500,
            body: JSON.stringify({message: 'Ocorreu um erro na execução da função Lambda.' + error}),
        };

        return response;
    }
};