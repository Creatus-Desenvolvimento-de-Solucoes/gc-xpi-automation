import fastify from 'fastify';
import cors from '@fastify/cors';

export default async () => {
    const server = fastify();
    await server.register(cors, {});
    return server;
};

// Expected indentation of 2 spaces but found 4.eslint@typescript-eslint/indent
