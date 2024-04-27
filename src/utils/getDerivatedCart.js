import { useGlobalContext } from "../context/GlobalContextProvider"

const {cart,prices}= useGlobalContext()

export const getDerivatedCart = (cart)=>{
    const derivatedCart =()=> []
    cart.forEach(item=>{
      const existingItem = derivatedCart.find(ditem=>ditem.id === item.id)
      if (existingItem){
        existingItem++
        existingItem.totalPrice += prices[item.id-1].price
      }else{
        derivatedCart.push({
          id: item.id,
          name: item.name,
          quantity : 1,
          price: prices[item.id-1].price,
          totalPrice: prices[item.id-1].price,
        })
      }
    })
    }