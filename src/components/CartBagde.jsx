import { ShoppingCartOutlined  } from '@ant-design/icons';
import React from 'react';
import { Avatar, Badge, Space } from 'antd';
import  { useGlobalContext } from '../context/GlobalContextProvider';
import ResumeTicket from './ResumeTicket';



export const CartBagde = () => {

 const { getTotalCartItem,verResume,setVerResume} = useGlobalContext()



  const total = (getTotalCartItem)? getTotalCartItem : 0 
//console.log(getTotalCartItem)
  return (
<>
    <Space size={24}  onClick={()=>setVerResume(true)} >
    <Badge count={total}>
      <Avatar shape="square" icon={<ShoppingCartOutlined style={{fontSize:'1.2rem'}}/>} />
    </Badge>
  </Space>
  <ResumeTicket cerrar={()=>setVerResume(false)} verResume={verResume} />

  
  </>
  )
}
/*
los métodos de array funcionan con arrays no vacíos, 
el error que dispara es "is not a function"
*/ 