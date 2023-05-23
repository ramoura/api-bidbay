import express, {Request, Response} from 'express';

const app = express();

// Defina suas rotas e lógica de roteamento com o Express
app.get('/users', (req: Request, res: Response) => {
    // Lógica para consultar usuários
    // ...
    res.status(200).send('Consulta de usuários');
});

app.post('/users', (req: Request, res: Response) => {
    // Lógica para incluir um usuário
    // ...
    res.status(201).send('Usuário incluído com sucesso');
});

// Exporte uma função do Google Cloud Functions que encapsula o roteamento do Express
export const api = app;