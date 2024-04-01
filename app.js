const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const Product = require('./models/Product');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();


// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());



// Database connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});


// Landing page route handler
app.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        const successMsg = req.flash('success');
        const errorMsg = req.flash('error');
        res.render("index.ejs", { products, successMsg, errorMsg });
    } catch (err) {
        req.flash('error', 'Product not Found');
        res.redirect('/');
    }
});


//Create Route
app.get("/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/new", async (req, res) => {
    try {
        const currentDate = new Date();

        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            createdAt: currentDate, 
            lastUpdated: currentDate, 
        });

        await newProduct.save();

        res.redirect("/");

    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).send('Internal Server Error');
    }
});

//Show Product
app.get("/show/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/');
        }
        const successMsg = req.flash('success');
        const errorMsg = req.flash('error');
        res.render("show.ejs", { product, successMsg, errorMsg });

    } catch (err) {
        req.flash('error', 'Product not found');
        res.redirect('/');
    }
});


//Edit Route
app.get("/edit/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/');
        }
        const successMsg = req.flash('success');
        const errorMsg = req.flash('error');
        res.render("update.ejs", { product, successMsg, errorMsg });

    } catch (err) {
        req.flash('error', 'Product Not Found');
        res.redirect('/');
    }
});



app.post("/edit/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const { title, description, status } = req.body; 
        const currentDate = new Date();

        const product = await Product.findByIdAndUpdate(productId, {
            title,
            description,
            status,
            lastUpdated: currentDate,
        }, { new: true });

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.redirect(`/show/${product._id}`); 
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Internal Server Error');
    }
});

//Delete Route
app.get("/delete/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            req.flash('error', 'Product not found');
        } else {
            req.flash('success', 'Product deleted successfully');
        }
        res.redirect("/"); 
    } catch (err) {
        req.flash('error', 'Product Not Found');
        res.redirect('/');
    }
});




app.get("*",(req,res)=>{
    res.redirect("/");
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


app.listen(8080,()=>{
    console.log("Listening to Port : 8080");
});
