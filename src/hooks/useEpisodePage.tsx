
import { useQuery} from "@tanstack/react-query";
import { getEpisodeByPage } from '../services/episodePageService.js';

interface Options{
    page:number,
  }

export const useEpisodePage = ({page}:Options) => {

      /* Obtenemos los datos de la API */ 
  const {   data:episode  , isFetching,isSuccess,error   } =  useQuery({
    queryKey:["episodes",+page],
   queryFn:() => getEpisodeByPage(+page),
  staleTime:1000*60*60*24,
  
    }, 
     );
  return {episode,isFetching,isSuccess,error }
}


