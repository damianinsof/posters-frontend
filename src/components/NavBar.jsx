import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {
   GlobalOutlined,
   FormOutlined ,
   RocketOutlined,
   TableOutlined ,
   MailOutlined,
   IdcardOutlined,
   TeamOutlined,
   SignatureOutlined,
   ShoppingCartOutlined 
} from '@ant-design/icons';
import { Button, Menu } from 'antd';


function getItem(label, key, icon, children, type,disabled) {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled
  };
}
const items = [
  getItem('Characters', '1', <TableOutlined />),
  getItem('Locations', '2', <GlobalOutlined /> ),
  getItem('Episodes', '3',<RocketOutlined />),
  getItem('Contact Us', '4', <MailOutlined />),
  getItem('Project', '5', <IdcardOutlined />),
  getItem('Join', 'Sub1', <TeamOutlined />, [
    getItem('Register', '6',<FormOutlined />),
    getItem('Login', '7',<SignatureOutlined />),
  ]),
   getItem('My Cart', '8',<ShoppingCartOutlined />),
    //getItem('Last Buy', '10'),
    //getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ,
];

export const NavBar = () => {

    const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState(true);
  const [theme, setTheme] = useState('dark');


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClickMenu = (e) => {
    //console.log('click ', e);
    setCurrent(e.key);
    switch (e.key) {
        case '1':
         navigate("/")
        break;
        case '2':
            navigate("/locations")
           break;
        case '3':
        navigate("/episodes")
        break; 
        case '4':
        navigate("/ContactUs")
        break; 
        case '5':
        navigate("/About")
        break; 
        case '6':
        navigate("/register")
        break;
        case '7':
        navigate("/login")
        break;
        case '8':
        navigate("/mycart")
        break;       
      default:
        break;
    }
    };

  return (
    <div
      style={{
        width: 256,
      }}
    >
      {/*<Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>*/}
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['Sub1']}
        mode="inline"
        theme={theme}
        onClick={onClickMenu}
        inlineCollapsed={!collapsed}
        items={items}
      />
    </div>
  )
}
