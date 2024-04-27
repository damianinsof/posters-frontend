
import {llamadaApi} from '../Data/llamadaApi.js'



export const getCharactersByPage = async (id) => {
  try {
    const prices = JSON.parse(localStorage.getItem('prices'))
    const  data  = await llamadaApi.get(`/character?page=${ id }`);
    if (prices){
      if (data.results[0].price ==='Login'){
        data.results.forEach(e => e.price = prices.find(p=>p.id ===e.id).price);
      }
    }
    // agrego precio con axios interceptors
    return data
    //return {info:data.data.info, results: data.data.results.map(e=>e.price = prices[(id - 1)].price)}
  } catch (error ) {
    throw error;
  }
}

export const getCharactersById = async (id) => {
  try {
    const  data  = await llamadaApi.get('/character/'+id );
    return data
  } catch (error ) {
    throw error;
  }
}

