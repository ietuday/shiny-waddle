const DB_URL =
   process.env.NODE_ENV == 'development'
      ?
      process.env.DB_URL
      :
      (process.env.NODE_ENV == 'stagging'
         ?
         process.env.DB_URL_TEST
         :
         process.env.DB_URL_PROD);

class Constants {
    // static DB_CONNECTION_STRING: string = process.env.DB_URL_TEST;
   //  static DB_CONNECTION_STRING: string = process.env.DB_URL_PROD;
   static DB_CONNECTION_STRING: string = DB_URL;

}

Object.seal(Constants);
export = Constants;
