import { HttpClient, json } from 'aurelia-fetch-client';
export class HttpClientService extends HttpClient {
    async get(url, query, init) {
        if (!init)
            init = {};
        init.method = 'GET';
        if (!init.cache)
            init.cache = 'no-cache';
        if (query)
            url = addUrlQuery(url, query);
        return await this.fetch(url, init);
    }
    async post(url, data, init) {
        if (!init)
            init = {};
        init.method = 'POST';
        init.body = data && data.toString().indexOf('FormData') >= 0 ? data : json(data);
        return await this.fetch(url, init);
    }
    async put(url, data, init) {
        if (!init)
            init = {};
        init.method = 'PUT';
        init.body = json(data);
        return await this.fetch(url, init);
    }
    async delete(url, data, init) {
        if (!init)
            init = {};
        init.method = 'DELETE';
        init.body = json(data);
        return await this.fetch(url, init);
    }
    async upload(url, data, init) {
        if (!init)
            init = {};
        init.method = 'POST';
        //init.headers = {
        //  'Access-Control-Allow-Origin': '*',
        //  'Access-Control-Allow-Headers': 'Content-Type',
        //  'Content-Type': 'multipart/form-data; boundary=something'
        //};
        init.body = data;
        return await this.fetch(url, init);
    }
}
export { json };
/**
  * Convert an object as URL query string
  * @param url
  * @param query
  */
export function addUrlQuery(url, query) {
    for (let key in query) {
        url = addUrlParam(url, key, query[key]);
    }
    return url;
}
/**
 * Add a key/value to a URL query string
 * @param url
 * @param key
 * @param value
 */
export function addUrlParam(url, key, value) {
    if (!value || typeof value === 'function' || url.toLowerCase().indexOf(key.toLowerCase()) >= 0)
        return url;
    value = encodeURIComponent(value);
    if (url.indexOf('?') < 0)
        url += '?';
    else
        url += '&';
    return url + key + '=' + value;
}
