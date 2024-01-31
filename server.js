import http from 'http';
import app from './app/app.js';
const PORT=process.env.PORT

const server =http.createServer(app)

server.listen(PORT,()=>console.log(`this is running on port ${PORT}`))