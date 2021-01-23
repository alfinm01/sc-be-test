var express = require('express');
var router = express.Router();
const authService = require('../services/auth');

router.post('/login', login);
router.post('/refresh-token', refreshToken);

async function login(req, res, next) {
    const { refreshToken, ...user } = await authService.authenticate(req.body.username, req.body.password);
    if (refreshToken) {
        setTokenCookie(res, refreshToken);
    }
    return res.json(user);
}

async function refreshToken(req, res, next) {
    const token = req.cookies.refreshToken;
    const { refreshToken, ...user } = await authService.refreshToken(token);
    if (refreshToken) {
        setTokenCookie(res, refreshToken);
    }
    return res.json(user);
}

function setTokenCookie(res, token) {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}

module.exports = router;
