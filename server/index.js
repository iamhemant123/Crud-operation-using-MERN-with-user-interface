let express = require('express');
let mongoose = require('mongoose');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();
let app = express();
let cors = require('cors');

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/website/enquiry', enquiryRouter);

// Connect to MongoDB
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT ||3000, () => {
            console.log(`Server is running on port`);
    });
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});