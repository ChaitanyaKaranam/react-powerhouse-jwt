if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const SECRET = process.env.SECRET;
const RSECRET = process.env.RSECRET;

const USER_DB = {
    admin: {
        role: 'admin',
        password: 'admin',
    },
    krishna: {
        role: 'user',
        password: 'test',
    },
};

const ROLES_DB = {
    ADMIN: 'admin',
    USER: 'user',
};

const TOKEN_TYPE = {
    ACCESS: 'access',
    REFRESH: 'refresh',
};

module.exports = {
    SECRET,
    RSECRET,
    USER_DB,
    ROLES_DB,
    TOKEN_TYPE,
};
