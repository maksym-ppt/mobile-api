// import { utils } from './helpers/utils';
import userRouter from './routes/user.router'
import imageRouter from './routes/image.router'

import { prismaPlugin } from './plugins/prisma-plugin';
import { authenticatePlugin } from './plugins/authenticate-plugin';

import { fastify } from './server'
import formbody from '@fastify/formbody'
import multipart from '@fastify/multipart'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import cors from '@fastify/cors'

async function run() {
  if (process.env.NODE_ENV === 'developement') {
    await fastify.register(cors, {
      credentials: true,
    });
    await fastify.register(rateLimit, {
      max: 200,
      timeWindow: '1 minute',
    })
  }

  await fastify.register(helmet, { hidePoweredBy: true })
  await fastify.register(formbody)
  await fastify.register(multipart)
  await fastify.register(authenticatePlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(userRouter, { prefix: '/api/v1/user' });
  await fastify.register(imageRouter, { prefix: '/api/v1/image' });
  // await fastify.register(postRouter, { prefix: '/api/v1/post' });

  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);
  })

  fastify.get('/', (request, reply) => {
    reply.send({ name: 'mobile-api' })
  })

  // fastify.get('/health-check', async (request, reply) => {
  //   try {
  //     await utils.healthCheck()
  //     reply.status(200).send()
  //   } catch (e) {
  //     reply.status(500).send()
  //   }
  // })

  if (process.env.NODE_ENV === 'production') {
    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.on(signal, () =>
        fastify.close().then((err) => {
          console.log(`close application on ${signal}`)
          process.exit(err ? 1 : 0)
        }),
      )
    }
  }

  await fastify.listen({ port: parseInt(process.env.PORT ?? '3000')})
}


run().catch((error) => {
  fastify.log.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  fastify.log.error('Unhandled promise rejection error.');
  console.error(e)
  process.exit(1)
})




