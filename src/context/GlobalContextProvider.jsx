import React, {useContext, createContext, useState, useEffect} from 'react'
import { notification} from 'antd';
import { getCharactersById } from '../services/characterPageService';
import { getStoredByUser } from '../services/cartServices';
import { QueryClient } from '@tanstack/react-query';

const GlobalContext = createContext()



/* cargo datos de pagina*/ 


const GlobalContextProvider = ({children}) => {

const [cart,setCart] = useState([])
const [verResume,setVerResume] = useState(false)
const [priceList,setPriceList]=useState([])
const [isModalOpen, setIsModalOpen] = useState(false);



/*           AL INGRESAR UN USUARIO */ 
async function userIn({token,prices}){
  setPriceList(JSON.parse(prices))
  localStorage.setItem('auth-token-app', token)
  localStorage.setItem('prices', prices)
  const user = JSON.parse(atob(token.split(".")[1])).user
  const  stored = await getStoredByUser(user)
  if (stored){
    if (stored.data.status ===200){
       const order = JSON.parse(stored.data.lastOrder)
       setCart(order)
       openNotificationWithIcon("success","user "+user,"Last order recovered succesfully ")
    }   
  }else{
    // mensaje que no tiene 
    setCart([])
    openNotificationWithIcon("success","user "+user,"doesn,t have stored order")
  }
}

async function userOut(){
  window.localStorage.clear();
  window.location.reload()
  console.log(window)
  setCart([])
  setPriceList([])

}

//
const getTotalCartItem = ( cart?.length > 0) ? cart.reduce((accum,curr)=>accum + curr.quantity,0):0
const getTotalTicket = (cart.reduce((acc, item) => acc + item.quantity * item.price, 0))

function getPageById (ids){
  return  (ids % 20) ==0 ? Math.trunc(ids/20) : Math.trunc(ids/20)+1
 }
 function getIndexArrayById(id){
   return (id % 20) ==0 ? 19 : (id % 20) -1
 }


function getPageById (ids){
  return  (ids % 20) ==0 ? Math.trunc(ids/20) : Math.trunc(ids/20)+1
 }
 function getIndexArrayById(ids){
   return (ids % 20) ==0 ? 19 : (ids % 20) -1
 }
function setToCart(array){
  setCart(array)
  //setDerivatedCart(getResumedCart(cart))
}

function getUser(){
  const token = localStorage.getItem('auth-token-app')
  if (!token){return ''} else
  return JSON.parse(atob(token.split(".")[1])).user
}
/*
function getResumedCart(cart){
  const derivated = [];
  cart.forEach((item)=>{
    const existingItem = derivated.find((ditem)=>Number(ditem.id) ===Number(item.id))
    if (existingItem){
      existingItem.quantity++;
      existingItem.totalPrice +=item.price;
    }else{
      derivated.push({
        id : item.id,
        name: item.name,
        quantity: 1,
        totalPrice : item.price
      })
    }
  })
  return derivated
}



function setCartSubById (id){
    const position = cart.findIndex(p=>p.id ===id)
    if (position >=0 ){
        delete cart[position]
        setDerivatedCart()
    }
}
*/




const handleAddProduct = (characterSelected)=> {
 // el personaje esta ya pedido ?
  //const indexId =  cart.findIndex(character => Number(character.id) === Number(characterSelected.id))
  //const characterFound = (indexId) ? cart[indexId] : null
  const InCart = cart.find(c=>Number(c.id) ===Number(characterSelected.id))
   if(InCart){
    setToCart(
      cart.map((item) =>{
        if(Number(item.id) === Number(characterSelected.id) ){
          item.quantity++
          if (typeof(item.price==='string')) {item.price = characterSelected.price}
          item.totalPrice = item.quantity * item.price
              }
        return item
      })
    )
  }
  else{
    setToCart([...cart, 
      {
        id:characterSelected.id,
          name : characterSelected.name,
          price: characterSelected.price,
          totalPrice : characterSelected.price,
          image : characterSelected.image,
          quantity: 1}])
      }
}

const handleDelProduct =(characterSelected) =>{
   const isInCart = cart.find(c=>Number(c.id)=== Number(characterSelected.id)); 
  const lastOne = cart.find(c=>Number(c.id)=== Number(characterSelected.id) && c.quantity===1)
  if (isInCart){
    if (lastOne){ 
      if (getTotalCartItem == 1){
        setToCart([])}
      else {setToCart(cart.filter((p)=> Number(p.id) !=Number(characterSelected.id)))}
    }else{
      setToCart(
        cart.map(p=>{
          if(Number(p.id) === Number(characterSelected.id) ){
            p.quantity--
            if (typeof(p.price==='string')) {p.price = characterSelected.price}
            p.totalPrice = p.price * p.quantity
          }
          return p
        })
      )
    }
  }

   
}

//           Notification
notification.config({
  placement: 'topRight',
  bottom: 50,
  duration: 3,
  rtl: true,
});
const openNotificationWithIcon = (type,message,description) => {
  notification[type]({
    message: message,
    description: description,
    
  });
};



return (
        <GlobalContext.Provider 
            value={{
                getTotalCartItem,getTotalTicket,
                openNotificationWithIcon,
                priceList,setPriceList,
                verResume,setVerResume,getUser,
                handleAddProduct,handleDelProduct,
                getPageById,getIndexArrayById,
                cart,setCart,userIn,userOut,isModalOpen, setIsModalOpen}}>
          {children}
        </GlobalContext.Provider>
      )

}
                        
export const useGlobalContext = () => useContext(GlobalContext)
            
export default GlobalContextProvider