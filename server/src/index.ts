import express = require('express');


// const fs = require('fs');
// const os = require('os');
// const chalk = require('chalk');

require('dotenv').config();
import Middlewares = require('./config/middleware/base');



console.log("Hited");

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// const getActualRequestDurationInMilliseconds = start => {
//     const NS_PER_SEC = 1e9; // constant to convert to nanoseconds
//     const NS_TO_MS = 1e6; // constant to convert to milliseconds
//     const diff = process.hrtime(start);

//     return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
// };

// let demoLogger = (req, res, next) => {
//     let current_datetime = new Date();
//     let formatted_date =
//         current_datetime.getFullYear() +
//         "-" +
//         (current_datetime.getMonth() + 1) +
//         "-" +
//         current_datetime.getDate() +
//         " " +
//         current_datetime.getHours() +
//         ":" +
//         current_datetime.getMinutes() +
//         ":" +
//         current_datetime.getSeconds();
//     let method = req.method;
//     let url = req.url;
//     let status = res.statusCode;

//     const start = process.hrtime();
//     const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);

//     let log = `[${chalk.blue(
//         formatted_date
//     )}] ${chalk.yellow.bold(
//         method
//     )}:${chalk.magentaBright.bold(
//         url
//     )} ${chalk.greenBright.bold(
//         status
//     )} ${chalk.underline.red.bold(
//         durationInMilliseconds.toLocaleString() + "ms"
//     )}`;

//     // console.log(chalk`
//     // CPU: {red ${os.cpu.totalPercent}%}
//     // RAM: {green ${os.ram.used / os.ram.total * 100}%}
//     // DISK: {rgb(255,131,0) ${os.disk.used / os.disk.total * 100}%}
//     // `);


//     console.log(log);
//     fs.appendFile("server.txt", log + "\n", err => {
//         if (err) {
//             console.log(err);
//         }
//     });
//     next();
// };

// app.use(demoLogger); 

app.set("port", port);
app.use(Middlewares.configuration);


if (process.env.NODE_ENV == 'development') {
    app.listen(port, '0.0.0.0', () => {
        console.log("Inside Local");

        console.log("Node app is running at localhost:" + port);
    })
} else {
    app.listen(port, '0.0.0.0', () => {
        console.log("Node app is running at localhost:" + port);
    })
}
