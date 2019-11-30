import { ChatApiServer } from './server';
import { hostParams } from './config';
import { connect } from 'mongoose';
import { userRoutes } from './routes/user';

connect('mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB is connected'))
    .catch((err) => {
        console.log(`DB conncetion error: ${err}`);
    });

const { host, port } = hostParams;
const server = new ChatApiServer({
    host,
    port,
});

server.start();
server.setRoutes([
    ...userRoutes,
]);
