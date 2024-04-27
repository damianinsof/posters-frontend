import { axios } from "axios";

const llamadaApiChar = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    headers:{}
  });
  
  axios.interceptors.request.use(config=>{
    console.log("config")
        console.log(config)
    return config
},
(error)=>{
    return Promise.reject(error)
}
)

llamadaApiChar.interceptors.response.use(
    response=>{
        console.log("response")
        console.log(response)
        return response
    },
    (error)=>{
        return Promise.reject(error)
    }
)