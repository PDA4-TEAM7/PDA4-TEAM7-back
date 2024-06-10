export interface AppConfig {
    port: number;
    baseUrl: string;
}

const appConfig: AppConfig = {
    port: 3000,
    baseUrl: 'http://localhost:3000',
};

export default appConfig;
