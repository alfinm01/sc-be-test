const authorize = () => {
    console.log('in authorize')
    return (req, res, next) => {
        console.log('authorize return function')
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