import React from 'react'
import {Outlet as Page,useNavigation} from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import Header from '../components/Header'
import '../css/LayouPublic.css'
   

export const LayoutPublic = ({children}) => {
    
    const navigation = useNavigation();

  return (
    
  
    <main style={{display:'flex',flexDirection:'column',justifyContent:'' }}>
        <div style={{backgroundColor:'black',color:'white'}}>
            <Header/>
        </div>
        <div>
        <div className='main-content' >
            <NavBar/>
            <div>
                
                <div >
                    {/*navigation.state ==="loading"&&(
                        <div>Loading...</div> 
                    )*/}
                    <Page/>
                </div>
            </div>
        </div>   
        </div>
  
        <footer style={{backgroundColor:'lightblue',color:'lightred',display:'flex',justifyContent:'center'}}> Desarrollo Software - contacto  sabypna@gmail.com</footer>
    </main>
   
  )
}
