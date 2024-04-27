import React, { useEffect, useState } from 'react'
import '../css/JoinUs.css'

const JoinUs = () => {

    const [getIn,setGetIn]=useState(true)

    var estado = getIn ? 'hide':''
    var estado2 = getIn ? '':'hide'
    const container = document.querySelector('.container');

    function toggleActive(){
        console.log('dsdsdds')
        setGetIn(!getIn)
        console.log(getIn)
      
        useEffect(()=>{toggleActive(),[getIn]});
        
       // container.classList.toggle({estado});
    }

    const toggleForm = () => {
        const container = document.querySelector('.container');
        container.classList.toggle('active');
      };
 //useEffect(()=>{toggleActive,[getIn]})
  return (

    <section>
      <div className="container" >
        <div className={"user signinBx "+estado} >
          <div className="imgBx"><img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg" alt="" /></div>
          <div className="formBx">
            <form action="" onSubmit={null} >
              <h2>Sign In</h2>
              <input type="text" name="uName" placeholder="Username" />
              <input type="password" name="uPass" autoComplete='on' placeholder="Password" />
              <input type="submit" name="login" value="Login" />
              <p className="signup">
                Don't have an account ?
                <a href="#" onClick={()=>toggleActive()}>Sign Up.</a>
              </p>
            </form>
          </div>
        </div>
        <div className={"user signinBx "+estado2}>
          <div className="formBx">
            <form action="" onSubmit={null}>
              <h2>Create an account</h2>
              <input type="text" name="usern" placeholder="Username" />
              <input type="email" name="password" placeholder="Email Address" />
              <input type="password" name="createPass" autoComplete='on' placeholder="Create Password" />
              <input type="password" name="confirmPass" autoComplete='on' placeholder="Confirm Password" />
              <input type="submit" name="submit" value="Sign Up" />
              <p className="signup">
                Already have an account ?
                <a href="#" onClick={()=>toggleActive()}>Sign in.</a>
              </p>
            </form>
          </div>
          <div className="imgBx"><img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg" alt="" /></div>
        </div>
      </div>
    </section>


  )
}

export default JoinUs