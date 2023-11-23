import * as express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(express.json()); 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://34.197.2.245:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);