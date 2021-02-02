// import action type variables from actiontypes.js
import { LOGIN, SIGN_OUT, ADD_ERROR, REMOVE_ERROR } from '../actionTypes'

const API = process.env.REACT_APP_BACKEND_BASE_URL
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

export const login = (e, user, path, history) => {
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
                    dispatch({type: REMOVE_ERROR})
                    history.push('community-garden')
                } else {
                    console.log(data.messages)
                    dispatch({type: ADD_ERROR, payload: data.messages})
                }
            })
            .catch(error => console.log(error))
    }
    
}

export const reAuth = () => {
    return dispatch => {
        fetch(API + '/re_auth', {
            method: 'GET',
            headers: authHeaders
        })
            .then(resp => resp.json())
            .then(data => {
             
                if (data.user) {
                    dispatch({type: LOGIN, payload: data.user})
                    dispatch({type: REMOVE_ERROR})
                } else {
                    dispatch({type: ADD_ERROR, payload: data.messages})
                }
            })
            .catch(error => console.log(error))
    }
}


export const handleLogout = () => {
    return dispatch => {
        localStorage.removeItem('token')
        dispatch({type: SIGN_OUT})
    }
}
