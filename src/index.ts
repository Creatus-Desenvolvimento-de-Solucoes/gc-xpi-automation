import { ToadScheduler, SimpleIntervalJob, Task } from 'toad-scheduler';
import EventEmitter from 'events';
import server from './server';
import puppeteer from './puppeteer';
import socket from './socket';

(async () => {
    const event = new EventEmitter();

    const scheduler = new ToadScheduler();
    const page = await puppeteer();

    const task = new Task('xpi-automation', async () => {
        const selector = '#row-WINV22';
        const rows = await page.$$eval(selector, (trs) => {
            return trs.map((tr) => {
                const tds = [...tr.getElementsByTagName('td')];
                return tds.map((td) => {
                    return td.textContent;
                });
            });
        });
        event.emit('rows', rows);
    });

    const job = new SimpleIntervalJob({ milliseconds: 500 }, task);

    const instance = await server();
    socket(instance);

    instance.get('/start', async (request, reply) => {
        if (job.getStatus() !== 'running') {
            scheduler.addSimpleIntervalJob(job);
            reply.send({ status: 'started' });
        }

        reply.send({
            status: 'already running',
        });
    });

    instance.ready().then(() => {
        event.on('rows', (rows) => {
            instance.io.emit(
                'rows',
                rows.map((row: string[]) => {
                    return {
                        ativo: row[0],
                        posicao_total: row[1],
                        posicao_dt: row[2],
                        preco_medio: row[3],
                        ultimo: row[4],
                        lp_apurado: row[5],
                        lp_projetado: row[6],
                        total: row[7],
                    };
                    // eslint-disable-next-line @typescript-eslint/comma-dangle
                })
            );
        });
    });

    await instance.listen({
        port: 3000,
    });
})();
