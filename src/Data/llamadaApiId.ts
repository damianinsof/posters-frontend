import axios from "axios";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContextProvider";

const {prices}=useGlobalContext()  

const llamadaApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers:{}
});

/*function buscarPrecio (id:number)   {
  const precio =   precioPoster.find(
      p=>(p.codigo === id))?.precio
      return precio
}*/
function buscarPrecio2 (id:number)   {
  
  const indice = id -1 
   return prices[indice].price
}
//llamadaApi.interceptors.request.use()
llamadaApi.interceptors.response.use(
  response=>{

      if (response.config.url?.includes('character')){
          
        // var infor = response.data.info
        // var chara = response.data.results.map(p=>Object.assign(p,{price:buscarPrecio(p.id)}))
        return{
        info: response.data.info,
        results: response.data.results.map(p=>Object.assign(p,{price:buscarPrecio2(p.id)}))
        }
      }else {
        return response.data
      }
      
  },
  (error)=>{
      return Promise.reject(error)
  }
)




export { llamadaApi}