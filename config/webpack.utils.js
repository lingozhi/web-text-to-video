const ENV = process.env.NODE_ENV;
const isDev = ENV === 'development';

module.exports = {
    ENV,
    isDev,
};
