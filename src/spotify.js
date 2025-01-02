import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";

const clientId = "b430fd98891445ab9600b6ca30fadb2f";
// const redirectUri = "http://localhost:3000";
const redirectUri = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_REDIRECT_URI_PROD
  : process.env.REACT_APP_REDIRECT_URI_DEV;
const scopes = ["user-library-read","playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",

});



export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function(config){
        config.headers.Authorization = "Bearer " + token;
        
        return config;
    });
};

export default apiClient;