export default class Data {
    constructor() {

    }

    static get(url, params = null, headers = {}) {
        let request = null;
        try {
            request = new URL(url);
        } catch (e) {
            request = new URL(`${window.location.origin}${url}`)
        }

        const settings = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };

        if (params != null) {
            request.search = new URLSearchParams(params);
        }

        return fetch(request, settings).catch(e => { throw e });
    }
}
