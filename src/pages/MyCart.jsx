import React, { useEffect, useState } from 'react'
import '../css/MyCart.css'
import { useGlobalContext } from '../context/GlobalContextProvider'
import {useReactTable,getCoreRowModel,flexRender} from '@tanstack/react-table'
import {PlusSquareOutlined ,MinusSquareOutlined ,DeleteOutlined } from '@ant-design/icons'
import { Button, Modal, InputNumber,Input} from 'antd';
import { getCharactersById } from '../services/characterPageService'
import axios from 'axios'
import { cartToSales } from '../services/cartServices'
import { useNavigate } from 'react-router-dom'
import ModalInfo from '../components/modalInfo'
import { URL_API } from '../../config'



const MyCart = () => {
  const navigate = useNavigate()
  
  //modal que pide ID para agregar a cart
  const [openAdd, setOpenAdd] = useState(false);

  //modal que pide ID para agregar a cart
  const [openConfirm, setOpenConfirm] = useState(false);

  const [cerrarModal,setCerrarModal]=useState(false)
  const [textoModal,setTextoModal]=useState('')

  // id en ingreso manual 
  const [valueSel, setValueSel] = useState(0);
// email para reenviar pedido
const [email,setEmail]=useState('pepe@pepe.com')

  const {cart,priceList,setCart,getTotalTicket,getTotalCartItem,handleAddProduct,handleDelProduct,getUser,openNotificationWithIcon}=useGlobalContext()

 const userNow = getUser() ? getUser() :""

 const calculateTot = getTotalTicket.toString()
  
const token = localStorage.getItem('auth-token-app')



// BOTON guardar pedido en BD
async function storeThisOrder(){
  if (cart.length ===0) {openNotificationWithIcon("info","Save Store Order","Must add at least one to store it")}
    else{
      try {
        const resp = await axios.post(URL_API+'/api/user/setorder', {cart:cart,user: userNow},
        {headers: {'Authorization': token}});
          if (resp.data.ok){openNotificationWithIcon("success", "Save Store Order",resp.data.message)}
         else{openNotificationWithIcon("error", "Sassve Store Order",resp.data.message)};
      } catch (error) {console.log(error)}
    }
  }

  // BOTON recuperar pedido BD
async function getOrder(){
  try {
    const resp = await axios.post(URL_API+'/api/user/getorder', {user:userNow},
    {headers: {'Authorization': token}});
      if (resp.data.ok){openNotificationWithIcon("info", "Get Store Order",resp.data.message)
      console.log(resp)
        const mydata = JSON.parse(resp.data.lastOrder)
    setCart(mydata)
   } else {
    console.log(resp)
    openNotificationWithIcon("info", "Get Store Order",resp.data.message)
   }} 
     catch (error) {openNotificationWithIcon("info", "Get Store Order",error.response.data.message)}
}


// BOTON delete pedido guardado
async function delOrder(){
  try {
    const resp = await axios.post(URL_API+'/api/user/deleteOrder',
    {user:userNow},
   {headers: {'Authorization': token}});   
   if (resp.data.ok){
      setCart([])
      openNotificationWithIcon("info", "Delete Store Order",resp.data.message)
   }
    
  else
    {openNotificationWithIcon("info", "Delete Store Order",resp.data.message)
  }
  } catch (error) {
    openNotificationWithIcon("info", "Delete Store for "+userNow,"not found")
  }
}





// BOTON "ADD By id" [Modal 1]
  // OK -> Solo actualizo cart Si pulsa en Ok 
  async function  onChangeOk()  {
    
    const chars = await getCharactersById(valueSel,priceList)
    handleAddProduct(chars)
    setValueSel(100)
    setOpenAdd(false)
 }
   // actualizo valor en cada tipeo 
  function onChange(value)
  {
    if (openAdd){setValueSel(value)}
    if (openConfirm){setEmail(value)}
  } 

  //boton comprar (AL FINAL DE LA SELECCION BOTON ROJO )[modal 2]
  async function onChangeOkConfirm(){
    if (getTotalCartItem > 0){
      const resp = await cartToSales({user:userNow,cart:cart,email:email})
      if(resp.data.ok){
       //setOpenConfirm(false)
       setCart([])
       setTextoModal("Your order code is "+ resp.data.lastId +" Thank you.")
       setCerrarModal(true)
       //console.log(txt)
       //openNotificationWithIcon("Success","Order Saved","your order code is:"+ resp.data.lastId +" Thank you.")
       //navigate('/')
      
    }
    
   }
   //setOpenConfirm(false)
  }
   // actualizo valor en cada tipeo (modal2)
   function onChange2(value){

    setEmail(value)
} 

  const columns =[
    {
      accessorKey:'id',
      header:"Id",
      footer:"Totales: "
    },
    {
      accessorKey:'quantity',
      header:"Quantity",
      footer:getTotalCartItem
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: info =><img src={info.renderValue()}/>
      //onClick={()=>navigate('CharacterDetail/'+String(info.cell.row.original.id))}/> 
      
    },
    {
      accessorKey:"name",
      header:"Name",
      
    },{
      accessorKey: "price",
      header: "Price",
      
    },{
      accessorKey: "totalPrice",
      header: "Subtotal",
       footer:calculateTot
    },
    {
      accessorKey: "Actions",
      header: "Actions",
      cell: info =><>
      <PlusSquareOutlined  onClick={()=>handleAddProduct(info.row.original)}/>
      <MinusSquareOutlined onClick={()=>handleDelProduct(info.row.original)}/>
      <DeleteOutlined  onClick={()=>setCart(cart.filter((_, index) => index !== info.row.index))}/></>
    },
  ]

  const table = useReactTable({
    data: cart,  
    columns:columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
    {
      (cart) ? 
      <>
      
  

      <div id="content">
    <table>
      <thead>
        {
          table.getHeaderGroups().map(headerGroup=>(
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header=>(
             <th key={header.id}>
               {flexRender(header.column.columnDef.header,header.getContext())}
              </th>
                ))

            }

          </tr>
          ))
        }
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row)=>(
              <tr key={row.id}>
                {row.getVisibleCells().map((cell)=>(
                  
                  //((cell.column.columnDef.cell).includes("https"))?
                  //<td> <img src={cell.column.columnDef.cell} alt="" /></td>
                  //:
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell,
                      cell.getContext())
                    }
                  </td>
                  ))
                }
              </tr>
            ))
          }

        </tbody>
        <tfoot>
       {
        table.getFooterGroups().map((footerGroup)=>(
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((footer)=>(
              <th key={footer.id}>
                {flexRender(footer.column.columnDef.footer,
                footer.getContext()
                )}
              </th>
              
            ))}

          </tr>
        ))
       }
        </tfoot>
    
    </table>
    <div className="buttons" style={{backgroundColor:'grey'}}>
      <Button type="primary" style={{backgroundColor:'dodgerblue', color:'gold',fontWeight:800}} disabled={userNow===""} onClick={()=>{setOpenAdd(true)}}>Add By Id</Button>
       <Button type="primary" style={{backgroundColor:'dodgerblue', color:'gold',fontWeight:400}}disabled={userNow===""} onClick={()=>setCart([])}>Delete Cart</Button>
       <Button type="primary" style={{backgroundColor:'darkblue', color:'palegreen'}} disabled={userNow===""} onClick={()=>storeThisOrder()}>Store this</Button>
       <Button type="primary" style={{backgroundColor:'darkblue', color:'palegreen'}} disabled={userNow===""} onClick={()=>getOrder()}>Get Stored</Button>
       <Button type="primary" style={{backgroundColor:'darkblue', color:'red'}} disabled={userNow===""} onClick={()=> delOrder()}>Delete Stored</Button>
       <Button type="primary" disabled={userNow===""} onClick={()=> { onChangeOkConfirm()}}
            style={{backgroundColor:'firebrick',color:'lime',fontWeight:'700'}}>buy This</Button>
      {/*<Button type="warning" style={{backgroundColor:'red',color:'yellow',fontWeight:'700'}} 
             onClick={setOpenConfirm(true)} disabled={userNow===""} >Comprar</Button>*/}


    </div>
    
          <>
              <Modal
                title="Add your Character Id"
                centered
                open={openAdd}
                onOk={() => onChangeOk()}
                onCancel={() => {setValueSel(0); setOpenAdd(false)}}
                width={1000}
              >
                <p>Range: [1-826]</p>
                <InputNumber min={1} max={826} defaultValue={valueSel} onChange={onChange} />
              </Modal>

              {cerrarModal && <ModalInfo  cerrar={()=>setCerrarModal(false)} myModal={textoModal}/>}
{/*
              <Modal
                title="Buying this Cart"
                centered
                open={openConfirm}
                onOk={() => onChangeOkConfirm()}
                onCancel={() => setOpenConfirm(false)}
                width={800}
              >
                <p>Please, Add a email to send a copy cart with your order number</p>
                <p>Thank you .... !!</p>
                <Input  onSubmitCapture={(e) => e.preventDefault()} placeholder="input with clear icon" allowClear onChange={onChange}  />
                {}
              </Modal>*/}

              </>
    </div>
        
    </>
    :
    <></>
    }
    </>
  )
}

export default MyCart