import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { URL_API } from "../../config"

export const verifyToken = () => {

    const navigate = useNavigate()
    fetch(URL_API+'/auth/verify', {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem('auth-token-app')
      }
      }).then(res => res.json())
      .then(data =>{
        console.log(data)
        if(data.status == 200){
          navigate('/')
        }
    })
  }