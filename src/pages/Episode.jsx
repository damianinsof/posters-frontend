import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { useEpisodePage } from '../hooks/useEpisodePage'
import {useCharactersPage} from '../hooks/useCharactersPage'

import { getCharactersByPage } from '../services/characterPageService'
import {useQueryClient} from '@tanstack/react-query'



const Episode = () => {

    const {id} =useParams()
   
    const page = (id % 20) ==0 ? Math.trunc(id/20) : Math.trunc(id/20)+1
    const id_offset =(id % 20) ==0 ? 19 : (id % 20) -1
    
   // const {episode}=useGlobalContext()
   //
   const {isLoading,  episode, isSuccess  } =  useEpisodePage({page})

    const miEpisode = episode.results[id_offset]
    
    
    //const chars = miEpisode.characters.map(p=>p.split('/').pop())
    const charsN = miEpisode.characters.map(p=>Number(p.split('/').pop()))

   /* async function getCharPages(charid) {
        await queryClient.prefetchQuery({
           queryKey: ["characters",page],
           queryFn : getCharactersByPage(page),
           staleTime: 1000*60*60*24
               })
           }
*/
    
    return (
        <div>
            {
                (miEpisode)?
                <>
                <h2>Episode Number {miEpisode.id} </h2>
                <div className='epi-detail-one'>
                <p>
                    <span >Name:</span> 
                    {miEpisode.name} 
                </p>
                <p>
                 <span>Season: </span> 
                        {(miEpisode.episode).substr(1,2)}
                        <span >  Episode: </span> 
                    {(miEpisode.episode).substr(4,2)}

                </p>
                <p>
                    <span >Created:</span>
                    {miEpisode.created}
                </p>
                <p>
                    <span >On air:</span>
                    {miEpisode.air_date}
                </p>
                </div>
                
                <h2 className='h2-mas-suave'>Characters in this episode</h2>
                
                <div className="epi-char-container">
                {
                    charsN.map((idChar,index)=>(
                        <CharFromEpisode
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

export default Episode


const CharFromEpisode = ({charId}) =>{
    
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
 

    return(
      <>
      <Link to={'/characterDetail/'+charId}>
      { (estaID)
        ?
        
          <img className='imagen-chica' src={estaID.image} alt="" />
         
                :
           <div className='cardChar-single'
           onClick={()=>onMouseEnter()}
           >{charId}  </div>
            
        }
       </Link>
      </>
    )
  
    }  
  
  export {CharFromEpisode}
/* <img className='imagen-chica' src={charId} alt="" />*/