const HOST = 'http://localhost:3000';
export function get(url) {
    return fetch(HOST + url, {
        method: 'GET',
        credentials: 'inlcude',
        header: {
            'Accept': 'application/json'
        }
    }).then(res => {
            return res.json()
        }
    )
}

export function post(url, data) {
    return fetch(HOST + url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export function put(url, data) {
    return fetch(HOST + url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

