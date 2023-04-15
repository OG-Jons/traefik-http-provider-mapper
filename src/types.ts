export type Entrypoints = 'web' | 'websecure' | string;
export type Middlewares =
  | 'redirect-to-https'
  | 'redirect-to-non-www'
  | 'redirect-to-http'
  | 'redirect-to-www'
  | string;

export interface Router {
  entrypoints: Entrypoints[];
  rule: string;
  service: string;
  middlewares: Middlewares[];
  tls?: {
    certresolver?: 'letsencrypt' | string;
    domains?: {
      main: string;
    };
  };
}

export interface Service {
  loadbalancer: {
    servers: { url: string }[];
  };
}

export interface TraefikDefinition {
  http: {
    routers: Record<string, Router>;
    services: Record<string, Service>;
    middlewares: Record<string, any>;
  };
}

export interface Application {
  id: string;
  name: string;
  fqdn: string;
  repository: string;
  configHash: string;
  branch: string;
  buildPack: string;
  projectId: number;
  port: number;
  exposePort: number;
  installCommand: string;
  buildCommand: string;
  startCommand: string;
  baseDirectory: null;
  publishDirectory: null;
  deploymentType: null;
  phpModules: null;
  pythonWSGI: null;
  pythonModule: null;
  pythonVariable: null;
  dockerFileLocation: string;
  denoMainFile: string;
  denoOptions: null;
  dockerComposeFile: null;
  dockerComposeFileLocation: string;
  dockerComposeConfiguration: string;
  createdAt: Date;
  updatedAt: Date;
  destinationDockerId: string;
  gitSourceId: string;
  gitCommitHash: null;
  baseImage: string;
  baseBuildImage: string;
  dockerRegistryId: null;
  dockerRegistryImageName: null;
  simpleDockerfile: null;
  teams: Team[];
  destinationDocker: DestinationDocker;
  settings: Settings;
}

export interface DestinationDocker {
  id: string;
  network: string;
  name: string;
  engine: string;
  remoteEngine: boolean;
  remoteIpAddress: null;
  remoteUser: null;
  remotePort: null;
  remoteVerified: boolean;
  isCoolifyProxyUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
  sshKeyId: null;
  sshLocalPort: null;
}

export interface Settings {
  id: string;
  applicationId: string;
  dualCerts: boolean;
  debug: boolean;
  previews: boolean;
  autodeploy: boolean;
  isBot: boolean;
  isPublicRepository: boolean;
  isDBBranching: boolean;
  isCustomSSL: boolean;
  isHttp2: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  databaseId: null;
  serviceId: null;
}
