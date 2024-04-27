import { useQuery} from "@tanstack/react-query";
import { getLocationsByPage } from '../services/locationPageService';

interface Options{
    page:number,
  }

export const useLocationsPage = ({page}:Options) => {
      /* Obtenemos los datos de la API y guardamos en cache*/ 
  const {   data:locations  , isFetching,isSuccess,error   } =  useQuery({
    queryKey:["locations",+page],
   queryFn:() => getLocationsByPage(+page),
  staleTime:1000*60*60*24,
    }, 
     );
  return {locations,isFetching,isSuccess,error }
}
