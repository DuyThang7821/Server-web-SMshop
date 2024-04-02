const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')
const cookieParser = require ('cookie-parser');
const cors = require ('cors');


const app = express();
const allowedOrigins = [
    'http://localhost:3000',
    'https://smart-device-shop.vercel.app',
    // thêm các nguồn gốc khác mà bạn muốn cho phép ở đây
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) > -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
const port = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect();
initRoutes(app);


app.listen(port, () => {
    console.log('Server running on the port: ' + port);
})