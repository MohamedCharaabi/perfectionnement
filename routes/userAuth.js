import express from 'express';
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'



const router = express.Router();

router.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,

    })
    const result = await user.save();
    const { password, ...data } = await result.toJSON();
    res.send(data);
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid password'
        })
    }



    // jwt token
    const token = jwt.sign({ _id: user._id }, 'secret')

    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');


    //store the token on cookies
    res.cookie('jwt', token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000, //1 day
        // sameSite: 'lax',
        // secure: true
        sameSite: 'none',
        secure: true
    })
    res.cookie('hi', 'cool', {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
    })

    res.send({ message: 'succcess' });





})


router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({ message: 'Unauthenticated' })
        }

        const user = await User.findOne({ _id: claims._id })
        const { password, ...data } = await user.toJSON();

        res.send(data)
    } catch (error) {
        return res.status(401).send({ message: 'error => ' + error.message })

    }
})


router.post('/logout', async (req, res) => {

    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    try {
        res.cookie('jwt', { maxAge: 0, }); //remove the cookie by setting the age to 0
        res.send({ message: ' log out success' })
    } catch (error) {
        res.sent({ erroer: error })
    }

})


export default router;