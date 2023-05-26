import CreateUser from "../../application/usecase/user/CreateUser";
import RetrieveUser from "../../application/usecase/user/RetrieveUser";
import UserRepositoryDatabase from "../repository/database/UserRepositoryDatabase";
import {MongoClient} from "mongodb";

exports.requestUsers = async (req: any, res: any) => {
    try {
        // Lógica da sua função aqui
        console.log("Req: " + JSON.stringify(req, null, 2))
        console.log('setting client URL:', process.env.DB_CONN_STRING);
        console.log('connecting to mongo');
        const client = await MongoClient.connect(process.env.DB_CONN_STRING as string)
        console.log('connected to mongo');


        const userRepository = new UserRepositoryDatabase(client);
        await userRepository.connect();
        const createUser = new CreateUser(userRepository)
        const retrieveUser = new RetrieveUser(userRepository);

        const method = "GET";
        const resourcePath = "/api/v1/users/{userId}";
        const action = method + resourcePath;

        let response = {
            statusCode: 404,
            body: JSON.stringify({message: 'Path não configurado!!! ' + action}),
        };

        if (action === 'GET/api/v1/users/{userId}') {
            const userId = 0;
            const outputUser = await retrieveUser.execute(userId);
            response = {
                statusCode: 200,
                body: JSON.stringify(outputUser),
            }
        } else if (action === 'POST/api/v1/users') {
            const outputUser = await createUser.execute(JSON.parse(req.body));
            response = {
                statusCode: 200,
                body: JSON.stringify(outputUser),
            }

        }
        res.status(response.statusCode).send(response.body);
    } catch (error) {
        res.status(500).send(JSON.stringify({message: 'Ocorreu um erro na execução da função Lambda.' + error}));
    }
};