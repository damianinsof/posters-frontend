import { createBrowserRouter } from 'react-router-dom';
import { LayoutPublic } from '../layout/LayoutPublic';
import CharacterPage  from '../pages/CharacterPage';
import EpisodePage  from '../pages/EpisodePage';
import LocationPage from '../pages/Locationpage';
import NotFound from '../pages/NotFound';
import CharacterDetail from '../pages/CharacterDetail';
import Episode from '../pages/Episode'
import Location from '../pages/Location';
import Login2 from '../pages/Login2';
import Register from '../pages/Register';
import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import MyCart from '../pages/MyCart';
import JoinUs from '../pages/JoinUs';


const router = createBrowserRouter([
{
path:'/',
element:<LayoutPublic/>,
errorElement:<NotFound/>,
children:[
    {
        //index:true,
        index:true,
        //path:"/",
        element:<CharacterPage isPageOne={true}/>,  
        //loader : loaderCharacterPage  
    },
        {
        //index:true,
        path:"/character/:page",
        element:<CharacterPage isPageOne={false}/>,  
        // loader : loaderCharacterPage  
    }, 
    {
        path:"/episodes",
        element:<EpisodePage isPageOne={true}/>,
    },
    {
        path:"/episodes/:page",
        element:<EpisodePage isPageOne={false}/>,
    },
    {
        path:"/episode/:id",
        element:<Episode/>,
    },
    {
        path:"/locations",
        element:<LocationPage isPageOne={true}/>,
    },
    {
        path:"/locations/:page",
        element:<LocationPage isPageOne={false}/>,
    },
    {
        path:"/location/:id",
        element:<Location/>,
    },
    {
        path:"/CharacterDetail/:id",
        element:<CharacterDetail />,
    },
    {
        path:"/login",
        element:<Login2 />,
    },
    {
        path:"/register",
        element:<Register />,
    },
    {
        path:"/about",
        element:<About />,
    },
    {
        path:"/contactUs",
        element:<ContactUs />,
    },
    {
        path:"/mycart",
        element:<MyCart />,
    },
    {
        path:"/Joinus",
        element:<JoinUs />,
    },

]
},
    

]);

export  {router}