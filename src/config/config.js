// TODO user git secrets to hide password and sensitve data
module.exports = {
    DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb+srv://phellipeperin:zg73fSmcf09hgEWG@edirecttodocluster-sr2xm.mongodb.net/edirect?retryWrites=true&w=majority',
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 3000,
    SECRET_KEY: '62S2Cp2JmBKCe7sAkFXR',
};
