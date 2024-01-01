import Fastify from 'fastify';
import pino from 'pino';
import loadConfig from './config'
loadConfig()


function getLoggerOptions(environment?: string) {
  if (process.env.NODE_ENV === 'production') {
    return true;
  } else if (process.env.NODE_ENV === 'development') {
    return {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
      level: 'debug',
    };
  } else {
    return true;
  }
}

// export const fastify = Fastify({ logger: pino({ level: 'info' }) });
export const fastify = Fastify({ logger: getLoggerOptions(process.env.NODE_ENV)  });