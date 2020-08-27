"use strict";
const DB_URL = process.env.NODE_ENV == 'development'
    ?
        process.env.DB_URL
    :
        (process.env.NODE_ENV == 'stagging'
            ?
                process.env.DB_URL_TEST
            :
                process.env.DB_URL_PROD);
class Constants {
}
// static DB_CONNECTION_STRING: string = process.env.DB_URL_TEST;
//  static DB_CONNECTION_STRING: string = process.env.DB_URL_PROD;
Constants.DB_CONNECTION_STRING = DB_URL;
Object.seal(Constants);
module.exports = Constants;
//# sourceMappingURL=index.js.map