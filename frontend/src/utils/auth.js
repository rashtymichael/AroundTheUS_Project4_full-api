export const BASE_URL = 'https://register.nomoreparties.co';

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(`Something went wrong: ${response.status}, ${response.statusText}`);
    }
}

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            if (data.error) {
                throw new Error('one of the fields was filled in incorrectly')
            }

            console.log(data);
        })
}

export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token)
                return data;
            } else {
                return;
            }
        })
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => checkResponse(res))
        .then(data => data)

}

