import { useQuery} from "@tanstack/react-query"
import { getCharactersByPage,getCharactersById   } from '../services/characterPageService.js';
import NotFound from "../pages/NotFound.jsx";

interface Options{
  page:number,
  id:number
}
export const  useCharactersPage = ({page}:Options) => {
  /* Obtenemos los datos de la API */ 
  const {   data:characters  , isFetching,isSuccess,error   } =  useQuery({
     queryKey:["characters",+page],
    queryFn:() => getCharactersByPage(+page),
   staleTime:1000*60*60*24,
     },);
  return {characters, isFetching,isSuccess,error}
}

export const  useCharactersById = ({id}) => {
  console.log(id)
  /* Obtenemos los datos de la API */ 
  const {   data:character  , isFetching,isSuccess,error   } =  useQuery({
     queryKey:["character",+id],
    queryFn:() => getCharactersById(+id),
   staleTime:1000*60*60*24,
   
     }, 
      );
    return {character, isFetching,isSuccess,error}
}



