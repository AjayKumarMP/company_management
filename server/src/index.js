import express from 'express';
import module from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import apiRouter from './routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const httPort = process.env.PORT || 8080;
process.env.TZ = 'Asia/Kolkata';

var app =express();

// Start server
if (!module.parent) {
    // Create an HTTPS service identical to the HTTP service.
http.createServer(app).listen(httPort, '0.0.0.0', (err) => {
  if(err){
    console.log(err);
    return
  }
  console.log(`Nammuru service API server listening on ${httPort}`);
});
}

// apply middlewares
app.use(cors());
app.use(cookieParser())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRouter)
// app.use(
//     express.static(path.join(__dirname, "/build"))
//   );

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "build", "index.html")
//     )
//   );