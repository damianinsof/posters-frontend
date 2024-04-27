import {React } from 'react'
import {useParams, Link} from 'react-router-dom'
import { useEpisodePage } from '../hooks/useEpisodePage'
import BotonesPage from '../components/BotonesPage'
import '../css/episodePage.css'


const EpisodePage = ({isPageOne}) => {
  const pagina =useParams()
  const page = (isPageOne) ? 1 : pagina.page
  const {isLoading,  episode, isSuccess  } =  useEpisodePage({page})
  if (isLoading) {return <div>Cargando.....</div>}
  return (
    <>
    {

      (isSuccess)?
      <>
      <h2>Episodes</h2>
      <div><BotonesPage info={episode.info} page={page} adonde='episodes'/> </div>
      
      <div  className="content-episodes">
    {
    episode.results.map(({id,name,air_date,episode,created})=> (
      <Episode 
      key={id} 
      id={id}
      name={name} 
      air_date={air_date} 
      episode={episode} 
      created={created} />
    ) )
    }
    </div>
     </>
      :
      <></>
    }
    </>
  )
}
export default EpisodePage


const Episode = ({id,name,air_date,episode,created}) => {

  return(
    <>
    <Link to={'/episode/'+id}>
    <div  className="cardEpisode">
      <p className='epi-title-card'><span>{id} -{name}</span></p>
      <p>On Air: {air_date}</p>
      <p>Created: {created}</p>
      <p>Season: {episode}</p>

  
    </div>
    </Link>
    </>

  )
  }

export {Episode}
