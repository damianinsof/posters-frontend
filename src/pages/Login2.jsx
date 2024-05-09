import {React}  from 'react';
import { useGlobalContext } from '../context/GlobalContextProvider'
import { Button, Form, Input } from 'antd';
import {useNavigate} from 'react-router-dom'
import '../css/Login.css'
import { URL_API } from '../../config';


const Login2 = () => {
    const navigate = useNavigate()

    const {openNotificationWithIcon,getUser, userIn,userOut}=useGlobalContext()


    const handleSubmit = async (access)=>{
      try {
        const response = await fetch(URL_API +'/api/user/login', {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: access
        }).then(res => res.json())
        console.log(response)
        if(response.status == 200){
           userIn({token:response.accessToken,prices: JSON.stringify(response.prices)})
           openNotificationWithIcon('success', 'Login','Login Succesfully !!!')  
           navigate('/')
        } else if(response.status == 404 || response.status == 401){
          //setCart([])
            openNotificationWithIcon('error', 'Login','User or password Invalid !!!') 
        }
      } catch (error) {
      console.log(error)      
      }
}

function LogOutUser(){
  userOut()
  openNotificationWithIcon('success', 'Log out','User has log out Successfuly !') 
}

const onFinish = (values) => {
 handleSubmit(JSON.stringify(values))
 
};
const onFinishFailed = (errorInfo) => {
    errorInfo.errorFields.map(p=>openNotificationWithIcon('error', 'Login',"Error in "+p.name) )


};


  return( 
    <>
    <h2>Login</h2>
    <div className="login">
    
   <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      
      name="user"
      rules={[
        {min:4},
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input allowClear placeholder={getUser()}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
            required: true,
            message: 'Please enter your Password ',
          },
          {min:6},
          {
            validator:(_,value)=>
              value && /[A-Z]/.test(value) ? Promise.resolve() :
              Promise.reject('One letter uppercase')
            
          }
        
      ]}
    >
      <Input.Password allowClear />
    </Form.Item>

    <Form.Item
    
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
      
    >
      <Button disabled={ getUser()!=""}  type="primary" htmlType="submit">
        Submit
      </Button>
      <Button disabled={ getUser()===""} onClick={()=>LogOutUser()} type="primary">
        Log Out
      </Button>
    </Form.Item  >

    
  </Form>
  </div>
  </>
  
);
    }
export default Login2




