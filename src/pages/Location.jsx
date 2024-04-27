import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { useLocationsPage } from '../hooks/useLocatiosPage'
import {useCharactersPage} from '../hooks/useCharactersPage'

import { getCharactersByPage } from '../services/characterPageService'
import {useQueryClient} from '@tanstack/react-query'

const Location = () => {

    const {id} =useParams()
    const page      = (id % 20) ==0 ? Math.trunc(id/20) : Math.trunc(id/20)+1
    const id_offset = (id % 20) ==0 ? 19 : (id % 20) -1


   const {isLoading, locations, isSuccess  } =  useLocationsPage({page})

   //const estaID = characters.results.find(p=>p.id == charId)
const myLocation =  locations.results[id_offset] 

 //const myLocation = locations.results[id_offset]
 const chars = myLocation.residents.map(p=>p.split('/').pop())
  //const charsN = myLocation.residents.map(p=>Number(p.split('/').pop()))
 
  



  return (
    <div>
    {
        (myLocation)?
        <>
        <h2 className='h2-data'>Location Number {myLocation.id}</h2>
        <div className='loca-detail-one'>
        <p>Name {myLocation.name} </p>
        <p>Location: {myLocation.id} </p>
        <p>Type: {myLocation.type}</p>
        <p>Dimension: {myLocation.dimension}</p>
        <p>Created: {myLocation.created}</p>
        </div>
        <h2 className='h2-data' >Characters residents</h2>
        <div className="loca-char-container">
        {
            chars.map((idChar,index)=>(
                <CharFromLocation
                key={index}
                charId={idChar}
                />
            ))
        }
        </div>
        </>
        :
        <div></div>
    }
</div> 
  )
}

export default Location

const CharFromLocation = ({charId}) =>{
    
    const page = (charId % 20) ==0 ? Math.trunc(charId/20) : Math.trunc(charId/20)+1
    const idIndiceArray =(charId % 20) ==0 ? 19 : (charId % 20) -1
   
    const queryClient = useQueryClient()
    
    const {characters } =  useCharactersPage({page:page})
    
    //const estaID = characters.results.find(p=>p.id == charId)
    var estaID = characters ? characters.results[idIndiceArray] : null
    
      const onMouseEnter = ()=>{
        console.log(estaID.image)
        queryClient.prefetchQuery({
            queryFn:()=> getCharactersByPage(+page) ,
            queryKey:["characters",page]
        })
      }
     

    //const estaID = character.find(p=>p.id == charId)
      return(
        <>
             {(estaID)
              ?
              <Link to={'/characterDetail/'+charId}>
              <img className='imagen-chica' src={estaID.image} alt="" />
              </Link>
          :
          <div className='cardChar-single'>{charId} </div>
             }
        
        </>
      )
      }
      export {CharFromLocation}