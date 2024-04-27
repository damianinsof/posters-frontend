import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContextProvider'
import '../css/resumeTicket.css'

export default function ResumeTicket ({verResume,cerrar})  {
    if(!verResume) return true

    const {cart,getTotalCartItem,getTotalTicket} =useGlobalContext()

      
      //console.log(document.getElementsByClassName('costoPedido'))


    return (
        <>
        {verResume && 
        <div className="modal">
            <div className="overlay" onClick={cerrar}></div>
            <div className="modal-content">
            <p onClick={cerrar}>X</p>
                <div className='shop-title-detail'>Detalle compra</div>
                <p className='cab-detalle'>
                    <span>Cantidad</span>
              
                    <span>Personaje</span>
                    <span>Precio</span>
                    <span>Subtotal</span>
                </p>
                {
                    cart.map((cart,index)=>(
                        <DetailLine carta = {cart} key={index}/>
    
                    ))
                }
                <p className='totalPedido'>({getTotalCartItem} Art.) Total ${getTotalTicket} </p>
                <p onClick={cerrar} className='costoPedido'>Continuar </p>
           
            
            </div>
        </div>
        }
    
        </>
        
      )

}

const DetailLine = ({carta}) =>{

  
    return(
      <>
      <div className='linea-compra'>  
      <span>{carta.quantity}</span>
      <span><img src={carta.image} alt="" width='35' style={{border: '1px solid white',borderRadius: '10px'}}/></span>
      <span>{carta.name.substr(0,15)}</span>
      <span>$ {carta.price}</span>
      <span>$ {carta.totalPrice}</span>
      </div>
  
      </>
    )
  
  }
  
  export {DetailLine}

