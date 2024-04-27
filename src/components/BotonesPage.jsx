import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import '../css/botonesPage.css'
import {RightSquareOutlined ,LeftSquareOutlined,RollbackOutlined   }  from '@ant-design/icons'
import {inEnglish }from "../Data/inEnglish"

const BotonesPage = ({info,page,adonde}) => {
 // enable botones
 const boolprev  = (info.prev) ? true : false
 const boolnext  = (info.next) ? true : false
 // Siguiente y anterior
 const pageNext = (boolnext) ? Number(info.next.split('=').pop()) : 0
 const pagePrev = (boolprev) ? Number(info.prev.split('=').pop()) : 0

 const navigate = useNavigate()
const thisPage = inEnglish.find(p=>p.number=== Number(page)).inEnglish

  return (
  
        <div className='botones-home'>
        <button className='boton-home' disabled={!boolprev}  
            onClick={()=>navigate(`/${adonde}/${pagePrev}`)} > 
                <LeftSquareOutlined  /> 
                <span className='page-per-view'>{pagePrev}</span>  
        </button>
    
        <span className='intraButton-home'> Page: {thisPage}  
            <span  className='intraButton-home-text'>({page})</span>
        </span>
        
        
        <button className='boton-home' disabled = {!boolnext} 
            onClick={()=>navigate(`/${adonde}/${pageNext}`)}>
                
                <span className='page-per-view'><RightSquareOutlined /> {info.pages - page}</span>
                
        </button>
        
        {/* <button className='page-per-view-roleBack' onClick={()=>navigate(-1)}><RollbackOutlined />Back</button>*/}
    </div>
  )
}

export default BotonesPage