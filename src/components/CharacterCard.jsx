import React from 'react'
import {FontSizeOutlined, XFilled} from '@ant-design/icons';
import { Link, Navigate} from 'react-router-dom';
import '../css/characterPage.css'
import { useGlobalContext } from '../context/GlobalContextProvider';


const CharacterCard = ({id,name, image,price,species,status,locationName,originName}) => {
const {getUser, getPageById,getIndexArrayById,}=useGlobalContext()

  const page =  getPageById(id)
  const idIndiceArray = getIndexArrayById(id)

    function fit(texto){
        switch (texto){
            case 'Earth (Replacement Dimension)'                    :return 'Earth (Replace)'
            case 'Earth (Unknown dimension)'                        :return 'Earth (Unknown)'
            case 'Near-Duplicate Reality'                           :return 'Near-Duplicate...'
            case 'Cirque du Soleil Zumanity Member'                 :return 'Circle Du Solei...'
            case 'Shmlangela Shmlobinson-Shmlower'                  :return 'Shmlangela S.S.'
            case 'Tickets Please Guy Nightmare'                     :return 'Ticket Please..'
            case 'Coach Feratu (Balik Alistane)'                    :return 'Coach Feratu'
            case 'Galactic Federation President'                    :return 'President Galactic Fed.'
            case 'Hole in the Wall Where the Men Can See it All'    :return 'Hole In the Wall'
            case 'Man Painted Silver Who Makes Robot Noises'        :return 'Man Painted Silver'
            case 'Michael Denny and the Denny Singers'              :return 'Michael Denny´s Singers'
            case 'Morty Mart Manager Morty'                         :return 'Morty Mart Manager'
            case 'Earth (Fascist Dimension)'                        :return 'Earth (Fasc.Dim)'
            case 'Earth (Evil Rick\'s Target Dimension)'            :return 'Earth (Evil Ricks)'
            case 'Presidentress of The Mega Gargantuans'            :return 'Mega Gargantuans´s Pt.'
            default:
                return texto;
        }
    
       
       }
       function ocultarSiEsUnknown(texto){
        return {display: texto === 'unknown' ? 'none':''}
       }
       const colorEstado = {color: status =='Alive'?'lightgreen':(status =='Dead') ? 'red':'yellow'}

  return (
    <>
      <div className='contentCard'>
    {/*<Navigate to='/CharacterDetail' id={+id} />*/}
    <Link to={'/CharacterDetail/'+id}>  
      <div className='charCard'>
      
        <div className='charTitle'>{fit(name)}</div>   
      
        <div className='charContentData'>
          <div className='charData'>
          <span className='primeraData'><span id='idNumber'>{id} </span><span style={colorEstado}> {status} </span >  {species} </span>
          
            {/* <p style={{color:'yellow'}}>Código: {id}</p> */}
            
            <div >
              
            <p className='cabTitle'>Last known location</p>
              {/* <Link to={'/location/'+id}> */}
              <p className='cabData'>Origin:{fit(originName)} <span ></span> </p>
              {/* </Link> */}
            </div>
            <div >
              <p className='cabTitle'>First seen in</p>
              {/* <Link to={'/episode/'+id}> */}
              <p className='cabData'>{fit(locationName)}</p>
            {/* </Link> */}
            </div>
            <p id='precio'> {(price ==0)? '':'$' } {price != 0 && price}</p>
           
          </div>
          <img className='charImage' src={image} alt="" />  
        </div>
    </div>
    </Link>
    </div>
    </>
  )
}

export default CharacterCard