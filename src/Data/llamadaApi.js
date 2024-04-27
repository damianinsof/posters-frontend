import axios from "axios";

const llamadaApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers:{'Content-type':'Application/json'},
  timeout: 1000*60*2
});



    llamadaApi.interceptors.response.use(
      response=>{
        const getPrices = JSON.parse(localStorage.getItem('prices')) 
            /* Es pagina de Character que solicita 20 characters */
          if (response.config.url?.includes('character') && response.config.url?.includes('?')){
            //var infor = response.data.info
            if (getPrices) {
              var chara = response.data.results.map(p=>Object.assign(p,{price: getPrices.find(h=>h.id ===p.id).price}))
            }else{
              var chara = response.data.results.map(p=>Object.assign(p,{price: 0}))
            }
            //var chara = response.data.results.map(p=>Object.assign(p,{price:buscarPrecio2(p.id)}))
            return{
            info: response.data.info,
            results: chara //.map(p=>Object.assign(p,{price: buscarPrecio(p.id)}))
            }
          }else if (response.config.url?.includes('character/')) {
            /* Es pagina de Character que solicita 1 character */
             return {...response.data,price:getPrices.find(p=>response.data.id ==p.id).price}
          }
          /*   Resto de las páginas*/ 
          else{
            return response.data
          }
          
      },
      (error)=>{
          return Promise.reject(error)
      }
    )




export { llamadaApi}