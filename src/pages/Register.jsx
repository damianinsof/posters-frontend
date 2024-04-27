import {React,useEffect,useState} from 'react';
import locale from 'antd/es/date-picker/locale/fr_FR';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import '../css/register.css'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Checkbox,
} from 'antd';
import { useGlobalContext } from '../context/GlobalContextProvider';




const Register = () => {

  const navigate = useNavigate()

  const { RangePicker } = DatePicker;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
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
// formulario visual
  const [formulario, setFormulario]=useState({})
  const [repeatUsername, setRepeatUsername] = useState(false)
  
  const {openNotificationWithIcon,userIn}=useGlobalContext()
  
  //const [errList,setErrList]=useState([])
  const [check, setCheck] = useState(false);


  const onCheckboxChange = (e) => {
console.log(e)
    setCheck(e.target.checked);
  };
  // const onCheck = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     console.log('Success:', values);
  //   } catch (errorInfo) {
  //     console.log('Failed:', errorInfo);
  //   }
  // };

  const handleSubmit = async ()=>{
    // registro un nuevo usuario
    try {
      const resp = await axios.post('http://localhost:8080/api/user/register',
      formulario);

 if (resp.data.status ===200){
      if (resp.data.ok){ //usuario inexistente, se agrego Ok 
        console.log(resp)
        openNotificationWithIcon("success", "Register a new user",resp.data.message)
        userIn({token:resp.data.accessToken,prices: JSON.stringify(resp.data.prices)})
        navigate('/')
      }else{//usuario existente 
        openNotificationWithIcon("warning", "User found",resp.data.message)
      }

 }else{
   openNotificationWithIcon("error", "Register a new user",resp.data.message)
 }
    } catch (error) {
      openNotificationWithIcon("error", "Error",error.response.data.message)
      //console.error(error.response.data.message)
    }
  }

  return (
    <>
    <h3> Register</h3>
    <Form className='formulario'
    {...formItemLayout}
    variant="filled"
    onFinish={(values)=>{
         setFormulario({
        'firstName' : values.Firstname,
        'lastName':values.Lastname,
        'user':values.User,
        'address':values.Address,
        'password':values.Password,
        'email':values.email,
        'fechaNacimiento': ('0'+(values.DatePicker.$D)).slice(-2)+'/'+('0'+(values.DatePicker.$M+1)).slice(-2)+'/'+values.DatePicker.$y    
      });
       console.log(formulario)
       handleSubmit()
      }}
  
    onFinishFailed={(f)=>{openNotificationWithIcon("error","check field: "+f.errorFields[0].name[0],f.errorFields[0].errors[0])}}
  >
    <Form.Item
      label="lastName"
      name="Lastname"
      hasFeedback
      
      rules={[
        {
          required: true,
          message: 'Please enter your lastname',
        },
      ]}
    >
      <Input allowClear/>
    </Form.Item>

    <Form.Item
      label="Firstname"
      name="Firstname"
      hasFeedback
      
      rules={[
        {
          required: true,
          message: 'Please enter your firstname'
        },
      ]}
    >
      <Input allowClear/>
    </Form.Item>

    <Form.Item
      label="Born Date"
      name="DatePicker"
      hasFeedback
      
      
      rules={[
        {
          required: true,
          message: 'Please enter your date of born ',
        },
      ]}
    >
      <DatePicker allowClear style={{ width: '100%'}} format='DD/MM/YYYY' locale={locale} placement ='topRight'/>
    </Form.Item>


    <Form.Item
      label=" Address"
      name="Address"
      hasFeedback
      
      rules={[
        {
          required: true,
          message: 'Please enter your complete address ',
        },
      ]}
    >
      <Input allowClear/>
    </Form.Item>

    <Form.Item
      label=" User"
      name="User"
      hasFeedback
      
      rules={[
        {min:4},
        {
          required: true,
          message: 'Please enter your user name ',
        },
      ]}
    >
      <Input allowClear autoComplete='new-password'/>
    </Form.Item>


    <Form.Item
      label="Email"
      name="email"
      hasFeedback
      
      rules={[
        {
          required: true,
          message: 'Please enter you email ',
        },
       {type:'email',message:'Please enter a valid email'}
      ]}
    >
      <Input allowClear/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="Password"
      hasFeedback
      //validateStatus="success"
      rules={[
        {
          required: true,
          message: 'Please enter your Password ',
        },
        {min:6},
        {
          validator:(_,value)=>
            value && /[A-Z]/.test(value) ? Promise.resolve() :
            Promise.reject('At least 6 characters and one letter uppercase')
          
        }
      
        //{type:'email',message:'Please enter a valid email'}
      ]}
    >
      <Input.Password allowClear autoComplete='new-password' placeholder="Password" />
      
    </Form.Item>
    <Form.Item
      label="Password"
      name="Password2"
      dependencies={['Password']}
      hasFeedback
      //validateStatus={validPass}
      rules={[
        {
          required: true,
         //  message: 'Please enter your Password again !',
        },
        ({getFieldValue,getFieldsValue})=>({
          
          validator(_,value){
            if(!value || getFieldValue('Password')=== value){
             return Promise.resolve()
            }
            
            return Promise.reject('the two passwords doesn`t match')
          }
        })
      ]}
    >
      <Input.Password allowClear autoComplete='new-password' type="password" placeholder="Please password again" />
    </Form.Item>

      <Form.Item
        name="agreement"
        //wrapperCol={{span:24}}
        valuePropName='checked'
        rules={[
          {
            required: true,
             message: 'Please check agreement',
          },
          {
            validator:(_,value)=>
              value && value ===true ? Promise.resolve() :
              Promise.reject('You Must accept agreement')
            
          }
        ]}
      >
        <Checkbox checked={check} onChange={onCheckboxChange}>
          Agreement is required
        </Checkbox>

      </Form.Item>

   
    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button className='button' type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    {repeatUsername && <span>Can´t take that User, actually is in use.</span>}
        <span>Do you have an acccount? </span>

  </>
  )
}

export default Register