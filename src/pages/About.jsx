import React from 'react'
import '../css/About.css'
const About = () => {
  return (
    <div className='about'>
      <h3>UTN-BA FullStack MERN </h3>
      <h5>Idea del proyecto</h5>
      <p>Se propone un sitio de venta de Posters, utilizando una API existente (Rick & Morty -- <span style={{color:'white'}}>https://rickandmortyapi.com</span>)</p>
      <p>      con una aplicación que matiene la lista de precios, pedido en proceso (una por usuario) y compras.</p> 
      <br />
      
      <p>Existen tres listas de precios </p>
      <p>Lista-1: rango $3.000 y $4.000  </p>
      <p>Lista-2: rango $4.000 y $5.000 </p>
      <p> Lista-3: rango  $5.000 $6.000 (por defecto para cada nuevo usuario)</p>
      <br />
      <p> A modo de prueba se generaron tres usuarios con diferente lista de precios </p>
      <p>Usuario: pepe1 password: Q12345 (lista1)</p>
      <p>Usuario: pepe2 password: Q12345 (lista2)</p>
      <p>Usuario: pepe3 password: Q12345 (lista3)</p>
      <br />
      <h4>Equema de la página</h4>
      <p>Existen tres formas de navegar entre los personajes para realizar el pedido: </p>
      <p>CHARACTERS: Se puede navegar entre los diferentes personajes ordenados por Identificación (paginación de a 20)</p>
      <p>LOCATIONS y EPISODES: contienen sus propios personajes</p>
      <p>haciendo click en alguno de ellos se muestra el detalle de cada personaje y se puede agregar o quitar a la cesta de compra </p>
      <p style={{color:'lightblue'}}> (IMPORTANTE: El usuario debe estar logueado para enviar notificaciones, comprar o almacenar pedidos)</p>
      <p>Si no está logueado, podrá navegar entre los personajes pero no tendran precio ni podrá manipular el carrito</p>
      <br />
      <h4>Contacto</h4>
      <p>Un usuario registrado puede enviar mensajes al sitio</p>
      <p>Registro y Login</p>
      <p>para registrase, se deben completar todos los campos, cada campo tiene un esquema de validación, para continuar</p>
      <p>debe tener todos los items con el tilde en verde y aceptar los terminos y condiciones de la página</p>
      <p>de lo contrario no podrá continuar con el registro. </p>
      <br />
      <p>Un usuario logueado deberá desloguearse para salir de su cuenta desde el menu de Login</p>
      <h4>Almacenamiento</h4>
      <p>Se puede almacenar en cada cuenta un carrito para poder seguir eligiendo posteriormente, si el usuario.</p>
      <p>graba un carrito y sale de la página, lo recupera en el próximo login, (desde menu My Cart)</p>
      <br />
      <p>En éste menú, se puede manipular de mejor manera el pedido.</p>
      <p> Se puede agregar por id (primer botón), quitar, modificar cantidad o eliminar todas las cantidades de un personaje (con los botones en cada fila), 
       tambien se puede recuperar o elimninar el pedido grabado</p>
       <br />
      <p>Haciendo click en Store This, se guarda en la Base de datos el pedido actual, si había uno previamente se elimina para almacenar el actual</p> 
      <p>Un Usuario al hacer login, recupera su acrrito guarado (si lo tiene) y su respectiva lista de precios</p>
      <br />
      <h5>Compra final</h5>
      <p>Haciendo click en Comprar, toma el pedido que actualmente se visualiza en pantalla.Se le otorga al cliente un número de pre-compra. Éste número, con la copia del comprobante de depósito se debe enviar por correo electrónico. Una vez que se haya comprobado el depósito se envía al cliente el link de tracking para hacer seguimiento de envío de la compra.</p>
       
    </div>
  )

  /*        ver compra final, carteles, listado de mensajes, listado de compras  */ 
}

export default About