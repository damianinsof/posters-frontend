import {llamadaApi} from '../Data/llamadaApi.js'

export const getEpisodeByPage = async (page) => {
    
    try {
      const  data  = await llamadaApi.get(`/episode?page=${ page }`);
      //return {info:data.data.info, results: data.data.results.map(e=>e.price = buscarPrecio(e.id))}
      return data
    } catch (error ) {
      throw error;
    }
  }

  export const getPageEpByEpNumber = (idNumber)=>{
    /*Paginación es de a 20 */ 
    const paginacion=20
    const indice = idNumber % paginacion
    return {  page: ((idNumber-indice)/paginacion)+1 ,
              indice : indice-1,
              id:idNumber
  }
      }

      export const getPagebyEpisodeNumber = (idNumber)=>{
        /*Paginación es de a 20 */ 
        const paginacion=20
        const indice = idNumber % paginacion
        return ((idNumber-indice)/paginacion)+1
      
         }  