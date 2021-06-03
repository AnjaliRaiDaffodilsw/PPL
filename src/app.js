const express = require('express');
const app = express();
require('./db/conn');
const path = require('path');
const hbs = require('hbs');
const PPLSchema = require('../src/models/pplSchema');

const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render("start");
});
app.get('/register', (req, res) => {
    res.render("register");
});
app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const pplDetails = new PPLSchema({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            });
            const detailsSaved = await pplDetails.save();
            res.status(200).render("login");
        } else {
            res.send(`Sorry passwords are not matching 😞`);
        }

    } catch (err) {
        res.status(400).send(err);
    }
});
app.get('/login', (req, res) => {
    res.render("login");
});


const port = 8080;
app.listen(port, () => {
    console.log(`Server is connected successfuly`);
})