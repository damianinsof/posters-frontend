import React from 'react'
import { Button, Form, Input } from 'antd';
import '../css/contactUs.css'
import { useGlobalContext } from '../context/GlobalContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../../config';

const ContactUs = () => {


 const {getUser,openNotificationWithIcon}=useGlobalContext()

 const navigate = useNavigate()
 const token = localStorage.getItem('auth-token-app')

 const handleContact = async (contact)=>{
  try {
    const resp = await axios.post(URL_API+'/api/user/contactus',
    contact,
   {headers: {'Authorization': token}}); 
   if (resp.status ===200){
    openNotificationWithIcon("success","Notification","Thank you for your comment.");
    navigate('/')}
  else openNotificationWithIcon("info","Notification",resp.message);
  } catch (error ) {console.log(error)}
 }

 const handleListContact = async (user)=>{
  try {
    const resp = await axios.post(URL_API+'/api/user/contaclist',
    user,
   {headers: {'Authorization': token}}); 
   if (resp.status ===200){

   }
    
  else openNotificationWithIcon("success","Notification",resp.message);
  } catch (error ) {console.log(error)}
 }


 if (getUser()===""){ 
  openNotificationWithIcon("info","Please","Register or login first");
  navigate('/')
}
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  return (
    <div className='contact'>
      <p className='title2'>Contact with Us </p>
    <Form     {...formItemLayout}
    variant="filled"
    onFinish={(v)=>{
      const mail = (v.email)?v.email:''
      const usr = getUser()
      console.log({msg:v.msg,email:mail ,user:usr,name:v.name})
      handleContact({msg:v.msg, email: mail,user:getUser(),name:v.name})
   
    }}
    onFinishFailed={(f)=>{openNotificationWithIcon("error","check field: "+f.errorFields[0].name[0],f.errorFields[0].errors[0])}}
    style={{
      width:600,
      maxWidth: 600,
      maxHeight: 800,
      height: 300
    }}
>  <Form.Item
      label="Nombre"
      name="name"
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please input your name',
        },
      ]}
    >
      <Input allowClear/>
    </Form.Item>

    <Form.Item
      label="Secondary email"
      name="email"
      hasFeedback
      
      rules={[
        {
          required: false,
          message: 'Please enter you email ',
        },
       {type:'email',message:'Please enter a valid email'}
      ]}
    >
      <Input allowClear/>
    </Form.Item>

    <Form.Item
      label="Message"
      name="msg"
      hasFeedback
      rules={[
        {
          required: false,
          message: 'Please input!',
        },
      ]}
    >
      <Input.TextArea   showCount maxLength={150}/>


    </Form.Item>
    <div className="botones">
      <Button type="primary" disabled={getUser()===""} onClick={()=>navigate('/')} > Cancel</Button>
      {/*<Button type="primary" disabled={getUser()===""} > Previous msgs </Button>*/}
      <Button type="primary" disabled={getUser()===""} htmlType="submit"> Send </Button>
    </div>
    </Form>
    </div>
  )
}

export default ContactUs