import { FastifyInstance } from 'fastify';
import fastifyIO from 'fastify-socket.io';

export default (server: FastifyInstance) => {
    server.register(fastifyIO, {
        cors: {
            origin: '*',
        },
    });

    return server.io;
};

/*
2020880
230696

*/
