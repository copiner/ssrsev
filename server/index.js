import express from 'express';
import ssr from './middleware/ssr';

const app = express();

app.use(express.static('./dist/client'));

app.use(ssr);

app.listen(9999, () => console.log(`server port :9999`));
