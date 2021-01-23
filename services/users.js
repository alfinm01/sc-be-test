const db = require('../_helpers/mongodb');
const role = require('../config.json').role;

const bcrypt = require('bcrypt');

const getAll = async () => {
    const users = await db.User.find();
    return users;
}

const getById = async (id) => {
    const user = await db.User.findById(id);
    return user;
};

const create = async (params) => {
    const hashedPassword = await bcrypt.hash(params.password, 10);
    const user = await db.User.create({
        username: params.username,
        name: params.name,
        email: params.email,
        password: hashedPassword,
        role: role.USER
    });
    return user;
};

const updateById = async (id, params) => {
    console.log({params})
    const user = await db.User.findByIdAndUpdate(id, {
        username: params.username,
        name: params.name,
        email: params.email
    }, { new: true });
    return user;
};

const deleteById = async (id) => {
    const user = await db.User.findByIdAndDelete(id);
    return user;
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};