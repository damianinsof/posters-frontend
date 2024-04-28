import  axios  from 'axios'
import { URL_API } from '../../config';



export const getCartByUser = async ({userNow,cart,erasePrev}) => {
  const token = localStorage.getItem('auth-token-app')
    try {
        const resp = await axios.post(URL_API+'/api/user/setorder', {cart:cart,user: userNow,erasePrev:erasePrev},
        {headers: {'Authorization': token}});
        return resp
        }
        catch (error){console.log(error)}
    }

export const getStoredByUser = async () => {

      const token = localStorage.getItem('auth-token-app')
      const user = JSON.parse(atob(token.split(".")[1])).user
  
      try {
          const resp = await axios.post(URL_API+'/api/user/getorder', {user: user},
          {headers: {'Authorization': token}});
          return resp
          }
          catch (error){console.log(error)}
 }

    // tiene store guardado previo
export async function hasStore(user){
  const token = localStorage.getItem('auth-token-app')
    try {
      const resp = await axios.post(URL_API+'/api/user/countorder', {user: user},
      {headers: {'Authorization': token}});
      return resp
    } catch (error) {
      console.log(error)
    }
  }
export async function cartToSales({user,cart}){
  const token = localStorage.getItem('auth-token-app')
    try {
      const resp = await axios.post(URL_API+'/api/user/orderToSales',
      {user:user,cart:cart,email:'null'},
     {headers: {'Authorization': token}});   
      return resp;
    } catch (error) {
      console.log(error)
      //openNotificationWithIcon("info", "Delete Store for "+userNow,"not found")
    }
}