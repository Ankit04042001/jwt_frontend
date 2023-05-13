import { Url } from "../utils/utils";

import axios from "axios";


export const parseJwt = function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const refresh = async ()=>{
    try{
        const res = await axios.post(`${Url}/refresh/`, {'refresh' : localStorage.refresh})
        return res
    }catch(e){
        return false;
    }
}

export const test = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access}`
    }
    try {
        const res = await axios.get(`${Url}/test/`, {headers : headers})
        return res;
    } catch {
        alert('somthing unexpected occurs.')
        return false;
    }
}


export const getUser = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access}`
    }
    try {
        const res = await axios.get(`${Url}/get_user/`, { headers: headers })
        return res;
    } catch {
        alert('something unexpected occurs.')
        return false;
    }
}

export const register = async (fname, lname, email, password, confirm_password) => {
    const data = {
        'first_name' : fname,
        'last_name' : lname,
        'email' : email,
        'password' : password,
        'confirm_password' : confirm_password
    }
    try{
        const res = await axios.post(`${Url}/register/`, data);
        return res;            
    }catch(e){
        alert(e);
    }
}

export const verify_otp = async (otp, state) => {
    const data = {
        'otp' : otp
    }
    console.log(state)
    try{
        const res = await axios.post(`${Url}/otp/`, data);
        return res;            
    }catch(e){
        alert(e);
    }
}

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${Url}/login/`, { 'email': email, 'password': password })
        if (res.data.status) {
            localStorage.setItem('access', res.data.data['access_token']);
            localStorage.setItem('refresh', res.data.data['refresh_token']);
        }
        return res;
    } catch {
        alert('something unexpected occurs')
        return false;
    }
}


export const logout = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access}`
    }
    try {
        const res = await axios.post(`${Url}/logout/`, { 'refresh': localStorage.refresh }, { headers: headers })

        if (res.data.status) {
            localStorage.clear();
        }
        return res;
    } catch {
        alert('something unexpected occur.')
        return false;
    }
}
