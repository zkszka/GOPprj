import axios from 'axios';

const dbAxios = axios.create({
    baseURL : 'http://localhost:9977/api',
    withCredentials: true, // 세션 쿠키를 포함
    headers : {
        'Content-Type' : 'application/json',

        
    },
});

export default dbAxios; 