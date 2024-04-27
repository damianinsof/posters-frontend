import React from 'react'
import '../css/locationPage.css'
import { useLocationsPage } from '../hooks/useLocatiosPage'
import {useParams, Link} from 'react-router-dom'
import BotonesPage from '../components/BotonesPage'

const LocationPage = ({isPageOne}) => {
  // \location sin parámetro va a la página de location = 1
  const pagina =useParams()
  const page = (isPageOne) ? 1 : pagina.page
  


  /* cargo datos de pagina*/ 
 const {  locations,isSuccess  } =  useLocationsPage({page:page})

  return (
        <>
        
          
         { (isSuccess)? 
         <>
         <h2>Locations</h2>
         <div><BotonesPage info={locations.info} page={page} adonde='locations'/> </div>
         
        <div className="content-location">
        {
        locations.results.map(({id,name,type,dimension,created})=> (
          <Location key={id} id={id} name={name} type={type} dimension={dimension} created={created}/>
        ))
        }
        </div>
        </>
        :<></>
      }
        </>
        )
}

export default LocationPage

const Location = ({id,name,type,dimension,created}) => {
  return(
  <>
  <Link to={'/location/'+id}>
  <div className="card-locationAll">

  <p>{id}-{name}</p>
  <p>{type}</p>
  <p>{dimension}</p>
  <p>{created}</p>
  </div>
  </Link>
  </>

)
}

export {Location}