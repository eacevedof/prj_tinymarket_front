export const APP_ENV = process.env.NODE_ENV
export const APP_VERSION = process.env.REACT_APP_ENV_APPVERSION

//habría que probar process.env.<VARIABLE_KEY>
alert(JSON.stringify(process.env))
/**/
//necesita: token_dbsapify
export const APIFY_BASEURL = process.env.REACT_APP_ENV_APIFY_BASEURL
export const APIFY_CONTEXT = process.env.REACT_APP_ENV_APIFY_CONTEXT
export const APIFY_SCHEMA = process.env.REACT_APP_ENV_APIFY_SCHEMA
//necesita: token_upload
export const UPLOAD_BASEURL = process.env.REACT_APP_ENV_UPLOAD_BASEURL
/**/

/**
//necesita: token_dbsapify
export const APIFY_BASEURL = "http://localhost:10000"
export const APIFY_CONTEXT = "c4"
export const APIFY_SCHEMA = "db-tinymarket"
//necesita: token_upload
export const UPLOAD_BASEURL = "http://localhost:4000"
/**/

/**
export const APIFY_BASEURL = "https://dbsapify.theframework.es"
export const APIFY_CONTEXT = "c4"
export const APIFY_SCHEMA = "db-tinymarket"
export const UPLOAD_BASEURL = "https://upload.theframework.es"
/***/