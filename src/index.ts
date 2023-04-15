import fastify from 'fastify';
import { mapper, MapperProps } from './mapper';
import * as process from 'process';
import axios from 'axios';
import { TraefikDefinition } from './types';

const server = fastify();

const getStringFromEnv = (name: string): string | undefined => {
  const fullName = `TRAEFIK_MAPPER_${name}`;
  return process.env[fullName] ?? undefined;
};

const getStringArrayFromEnv = (name: string): string[] => {
  const stringValue = getStringFromEnv(name);
  if (!stringValue) {
    return [];
  }
  return stringValue.split(';');
};
const getBooleanFromEnv = (name: string): boolean => {
  return getStringFromEnv(name) === 'true';
};

const props: MapperProps = {
  newCertResolver: getStringFromEnv('NEW_CERT_RESOLVER'),
  newHttpEntrypointName: getStringFromEnv('NEW_HTTP_ENTRYPOINT'),
  newHttpsEntrypointName: getStringFromEnv('NEW_HTTPS_ENTRYPOINT'),
  addMiddleware: getStringFromEnv('ADD_MIDDLEWARE_NAME'),
  ignoreMiddlewareSites: getStringArrayFromEnv('IGNORE_MIDDLEWARE_SITES'),
  removeCoolify: getBooleanFromEnv('FILTER_COOLIFY'),
  removeWwwMiddlewares: getBooleanFromEnv('FILTER_WWW_MIDDLEWARE'),
  removeHttpRouters: getBooleanFromEnv('FILTER_HTTP_ROUTERS'),
  removeWwwRouters: getBooleanFromEnv('FILTER_WWW_ROUTERS'),
  mapToServerIP: getStringFromEnv('MAP_TO_SERVER_IP'),
  serverIp: getStringFromEnv('SERVER_IP'),
  adminEmail: getStringFromEnv('ADMIN_EMAIL'),
  adminPassword: getStringFromEnv('ADMIN_PASSWORD'),
};

const baseEndopint = getStringFromEnv('BASE_ENDPOINT');

if (!baseEndopint) {
  throw new Error('TRAEFIK_MAPPER_BASE_ENDPOINT is missing.');
}

server.get('/', async (request, reply) => {
  const { data } = await axios.get<TraefikDefinition>(
    `${baseEndopint}/webhooks/traefik/main.json`,
  );

  return mapper(data, props, baseEndopint);
});

server.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
