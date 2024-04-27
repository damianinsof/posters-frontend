import React from 'react'
import '../css/resumeTicket.css'
const ModalInfo = ({myModal,cerrar}) => {


  return (
    <>
   
    <div className="modal">
        <div className="overlay" onClick={cerrar}></div>
        <div className="modal-content">
        <p onClick={cerrar}>X</p>
            <div className='shop-title-detail'>
            {myModal}
            </div>
            
           
            <p onClick={cerrar} className='costoPedido'>Continuar </p>
       
        
        </div>
    </div>
 

    </>
  )
}

export default ModalInfo