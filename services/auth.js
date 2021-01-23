const authorize = () => {
    console.log('init authorization')
    return (req, res, next) => {
        console.log('authorized')
        // return res.status(401).json({ message: 'Unauthorized' })
        next()
    }
}

const authenticate = async () => {
    return { status: 'ok' }
}

const refreshToken = async () => {
    return { status: 'ok' }
}

module.exports = {
    authorize,
    authenticate,
    refreshToken
};