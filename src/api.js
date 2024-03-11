import axios from 'axios';

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: "AIzaSyDL2ciIVKlsrFBJXVJJ-ZhNw04fL4vzCTc"
        // key: "AIzaSyDUONNcy5lcXRM9q2cUFwdfzCcq5OoSxjo"
        // key: process.env.REACT_APP_YTC_API_KEY
    }
});

export default request;