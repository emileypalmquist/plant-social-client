// import action type variables from actiontypes.js
import { LOGIN, SIGN_UP, SIGN_OUT, ADD_ERROR } from '../actionTypes'

const API = process.env.REACT_APP_BACKEND_BASE_URL
console.log(API)
const token = localStorage.token
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const authHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
}

export const login = (e, user, path) => {
    e.preventDefault()
    return dispatch => {
        fetch(API + path, {
            method: 'POST',
            headers,
            body: JSON.stringify({user})
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.user) {
                    localStorage.setItem('token', data.jwt)
                    dispatch({type: LOGIN, payload: data.user})
                } else {
                    dispatch({type: ADD_ERROR, paylod: data.error})
                }
            })
            .catch(error => console.log(error))
    }
    
}

// export const signUp = (e, userInfo) => {
//     e.preventDefault()
//     return dispatch => {
//         fetch(API + '/users', {
//             method: 'POST',
//             headers,
//             body: JSON.stringify(userInfo)
//         })
//             .then(resp => resp.json())
//             .then(data => console.log(data))
//             .catch(error => console.log(error))
//     }
    
// }