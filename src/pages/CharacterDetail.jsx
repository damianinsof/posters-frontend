import {React,useState} from 'react'
import { useParams ,Link} from 'react-router-dom'
import '../css/CharacterDetail.css'
import { useCharactersPage } from '../hooks/useCharactersPage'
import {PlusCircleFilled, MinusCircleFilled} from '@ant-design/icons'
import {getEpisodeByPage} from '../services/episodePageService'
import {useQueryClient} from '@tanstack/react-query'
import { useEpisodePage } from '../hooks/useEpisodePage'
import { useGlobalContext } from '../context/GlobalContextProvider'
import Error404 from '../components/Error404'


const CharacterDetail = () => {
   
  
    const {id} =useParams()



    const {handleAddProduct,handleDelProduct, getPageById,
          getIndexArrayById,getUser,openNotificationWithIcon,priceList}=useGlobalContext()

          
          
    const page= getPageById(id)
    const idIndiceArray = getIndexArrayById(id)
      const usuario =getUser()? getUser() : ""
    if (usuario===""){
      openNotificationWithIcon("warning","Login","The user must be logged in to access their own online purchase")
    }
    /* cargo datos de pagina*/ 
   const {isLoading,  characters  } =  useCharactersPage({page:page})
   var  characterSelected = (characters)? characters.results[idIndiceArray] : null
   const listaEpisodios = (characters) ? (characters.results[idIndiceArray].episode).map(p=>Number(p.split('/').pop())):null;
   
   const prices = JSON.parse(localStorage.getItem('prices'))
  console.log("user"+usuario)
  if (isLoading) {return <div>Loading....</div>}
  const content=(
    <div className='popover'>
    </div>
    )
  return (
    <>
    <div>
    {
      ((characterSelected))?
      <>
      <h3>Character Selected</h3>
      
      <div className="fichaCharacter">
      <div className="img-price">
        <img src={characterSelected.image} alt="" />
        <p className='precio'> ${(prices)? prices[id - 1].price : 0}</p>  {/*characterSelected.price*/ }
      </div>
      <div className="dataCharacter">
        <p className='name'>{characterSelected.name} </p>
        <p>Especie:{characterSelected.species} <span>(id:{id})</span> </p>
        <p>State:{characterSelected.status}
           Gender:{characterSelected.gender}</p>
        <p>Created:{(characterSelected.created)}</p>
        <p>Origin:{characterSelected.origin.name} </p>
        <p>Location: {characterSelected.location.name}</p>
        <p>{characterSelected.type =='' ?'':'tipo:'}{characterSelected.type}</p>
        
         

        {/*            Boton de compra     */ }
        <div  className='buttonContent'>
   
           <PlusCircleFilled disabled={!characterSelected.price || usuario==""} 
                className='little'
                onClick={()=>{(usuario!="") && handleAddProduct(characterSelected)}}/>
           <MinusCircleFilled 
                disabled={!characterSelected.price || usuario==""} 
                onClick={()=>{(usuario!="") && handleDelProduct(characterSelected)}}
                className='little'/>
   
 
          {/*}
          <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
              <Button type="primary" ghost>
                Primary
              </Button>
              </Flex>*/}
        </div>
      </div>
        
       </div>

        <div className='contentEpisode'>

          <h3 className='h2-title'>Episodes</h3>

        {
          ((listaEpisodios))?
          <>
        
          {
          listaEpisodios.map((e,index)=>(
            <button key={index} type='dashed'
             >
            <CardEpisode   
              episodenumber={e } 
           
              />
              </button>
                ))
            
            
          }                
                </>        
          :<div>cc</div>
        }
        </div>
      </>  
      : 
      <>
      <Error404 mensaje={"error en carga"}></Error404>
      </>
    }
    </div>
        </>
  )
}

export default CharacterDetail

const CardEpisode = ({episodenumber}) =>{

  const page = (episodenumber % 20) == 0 ? Math.trunc(episodenumber/20) : Math.trunc(episodenumber/20)+1
  const idIndiceArray =(episodenumber % 20) ==0 ? 19 : (episodenumber % 20) -1

  const queryClient = useQueryClient()

  const {episode,isSuccess } =  useEpisodePage({page})




//const estaID = characters.results.find(p=>p.id == charId)

  var miEpi =  (episode)? episode.results[idIndiceArray] : null



  const onMouseEnter = ()=>{
    queryClient.prefetchQuery({
        queryFn:()=> getEpisodeByPage(page),
        queryKey:["episodes",page]
    })
  }




 // const {page,id} = getPageEpByEpNumber(episodenumber)
//console.log(page)
//console.log(id)
 /* const {isLoading,  episode, isSuccess  } =  useEpisodePage({page})
  if (isSuccess){
    var episodeCard = episode.results[id-1]
    console.log(episodeCard)
  }*/
  return(
      <>
      {
        (isSuccess)
        ?<>
        <Link to={'/episode/'+episodenumber}>
        <div className='cardEpisode-single' 
        onMouseEnter={()=>{onMouseEnter}}  
        >
    
    
          <p>{(miEpi.episode).substr(1,2)}-{(miEpi.episode).substr(4,2)}</p>
          </div>
          </Link>
          </>
        :<></>
      }
      </>
    )
    
    }  
  
  export {CardEpisode}
  
