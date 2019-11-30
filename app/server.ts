import { Server, ServerRoute } from '@hapi/hapi';

interface ChatApiServerParamsType {
    host: string;
    port: number;
}

export class ChatApiServer {
    constructor(params: ChatApiServerParamsType) {
        this.params = params;
    }
    public server: Server | undefined;
    private params: ChatApiServerParamsType;
    
    public async start() {
        const { port, host } = this.params;
        this.server = new Server({
            port,
            host,
        });

        await this.server.start();
        
        console.log('Server running on %s', this.server.info.uri);
    }

    public setRoutes(routes: ServerRoute[]) {
        if (this.server) {
            this.server.route(routes);

            return;
        }

        console.error('Server\'s NOT started ');
    }
}