module.exports = {
    DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb+srv://phellipeperin:zg73fSmcf09hgEWG@edirecttodocluster-sr2xm.mongodb.net/test?retryWrites=true&w=majority',
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 3000,
};
