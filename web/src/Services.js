const baseUrl = "http://localhost:3001"

export function login(body) {
    return callPost(baseUrl + '/login', body);
}

export function register(body) {
    return callPost(baseUrl + '/register', body);
}

export function routes() {
    return callGet(baseUrl + '/railway/routes');
}

export function route(station) {
    return callGet(baseUrl + '/railway/route/' + station);
}

const callGet = (url) => {
    return fetch(url).then(handleres);
}

const callPost = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const handleres = (res) => {
    if (res.ok) {
        return res.json();
    }
    else {
        if (res.status === 404) {
            return Promise.reject();
        } else {
            throw res.json();
        }
        // console.log(res)
        // return Promise.reject(new Error(res))
        //throw res.json();
        //throw new Error(res.status + " : " + res.statusText);
        //return Promise.reject("new Error(res fail)");
    }
}