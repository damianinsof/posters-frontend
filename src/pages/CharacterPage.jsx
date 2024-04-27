import {React } from 'react'
import {useParams} from 'react-router-dom'
import { useCharactersPage } from '../hooks/useCharactersPage'
import BotonesPage from '../components/BotonesPage'
import CharacterCard from '../components/CharacterCard'
import '../css/characterPage.css'
import { useGlobalContext } from '../context/GlobalContextProvider'




const CharacterPage = ({isPageOne}) => {
  const pagina =useParams()
  const page = (isPageOne) ? 1 : pagina.page


/* cargo datos de pagina*/ 
 const {isLoading,  characters,isSuccess  } =  useCharactersPage({page:page})

 const {getUser}=useGlobalContext()

 const user = getUser()


 const prices = JSON.parse(localStorage.getItem('prices'))
 
 if (user && characters){
  characters.results.forEach(e => {e.price = prices.find(h=>h.id ===e.id).price    
  });
 }
  if (isLoading) {return <div>Cargando.....</div>}
  if (isSuccess){
    
  }
   return (

    <>
    {(isSuccess)?
    <>
    <h2>Characters</h2>
    <div><BotonesPage info={characters.info} page={page} adonde='character'/> </div>
    <div className="content-character">
  
    {
            characters.results.map(({id,name,image,price,species,status,location,origin})=>(        
                
                <CharacterCard key={id} id={id} name={name} image={image} price={(price) ? price : 0}
                species={species} status={status} locationName ={location.name} 
                originName={origin.name}/>
            ))
            } 

    </div>
 
    </>
    :null}
    
    
    </>
  )
}

export default CharacterPage
