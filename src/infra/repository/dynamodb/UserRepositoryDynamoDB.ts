import UserRepository from "../../../application/repository/UserRepository";
import User from "../../../domain/entity/User";
import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

export default class UserRepositoryDynamoDB implements UserRepository {

    private dynamodb: DocumentClient;

    private tableName: string = 'user-table';


    constructor() {
        console.log('connecting to dynamodb')
        this.dynamodb = new DynamoDB.DocumentClient()
        console.log('connected to dynamodb')
    }

    async getNextSequenceId(sequenceName: string): Promise<number> {
        console.log('getNextSequenceId')
        const params = {
            TableName: 'id-sequences',
            Key: {sequence_name: sequenceName},
            UpdateExpression: 'SET current_sequence = current_sequence + :incr',
            ExpressionAttributeValues: {':incr': 1},
            ReturnValues: 'UPDATED_NEW'
        };

        const result = await this.dynamodb.update(params).promise();
        console.log('getNextSequenceId result:', result)
        return result.Attributes?.current_sequence as number;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                email,
            },
        };

        const response = await this.dynamodb.get(params).promise();
        const user = response.Item as User;

        return user;
    }

    async findById(id: number): Promise<User | undefined> {
        console.log('findById')
        const params: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                id,
            },
        };

        const response = await this.dynamodb.get(params).promise();
        const user = response.Item as User;
        console.log('findById result:', user)
        return user;
    }


    async findByLogin(login: string): Promise<User | undefined> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                login,
            },
        };

        const response = await this.dynamodb.get(params).promise();
        const user = response.Item as User;

        return user;
    }

    async saveUser(user: User): Promise<User> {
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: {
                id: this.getNextSequenceId('user-sequence'),
                name: user.name,
                password: user.password,
                email: user.email,
                login: user.login,
                location: user.location,
                invites: user.getInvites(),
            },
        };

        await this.dynamodb.put(params).promise();

        return user;
    }

    async updateUser(user: User): Promise<User> {
        return user;
    }
}