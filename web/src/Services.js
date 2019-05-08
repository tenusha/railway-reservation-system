import config from './config.json'

const baseUrl = config.baseUrl

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

export function trains() {
    return callGet(baseUrl + '/railway/trains/');
}

export function trainsByRoute(route) {
    return callGet(baseUrl + '/railway/trains/' + route);
}

export function classes() {
    return callGet(baseUrl + '/railway/classes/');
}

export function schedules() {
    return callGet(baseUrl + '/railway/schedules/');
}

export function validateCard(body) {
    return callPost(baseUrl + '/payment/card', body);
}

export function validatePhone(body) {
    return callPost(baseUrl + '/payment/phone', body);
}

export function makeReservation(body) {
    return callPost(baseUrl + '/railway/reservations', body);
}

export function getReservations(user) {
    return callGet(baseUrl + '/railway/reservations/' + user);
}

export function deleteReservation(id) {
    return callDelete(baseUrl + '/railway/reservations/' + id);
}

export function updateAccount(body, id) {
    return callPut(baseUrl + '/users/' + id, body)
}

export function contact(body) {
    return callPost(baseUrl + '/railway/contact', body);
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

const callPut = (url, body) => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callDelete = (url) => {
    return fetch(url, {
        method: 'DELETE'
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
    }
}