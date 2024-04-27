import React, { useState } from 'react'
import { Button, Modal, InputNumber } from 'antd';
import { getCharactersById } from '../services/characterPageService';

const [openAdd, setOpenAdd] = useState(false);

const manualAdd = () => {
  

    
    function onChange(value) {
        console.log('changed', value);
        const myNewChar = getCharactersById(value)
        console.log(myNewChar)
        setOpenAdd(false)
      }

  return (
    <>
    {/*<Button type="primary" onClick={() => setOpenAdd(!openAdd)}> Open Modal of 1000px width </Button>*/}
       <Modal
         title="Add your Character Id"
         centered
         open={open}
         onOk={() => setOpenAdd(false)}
         onCancel={() => setOpenAdd(false)}
         width={1000}
       >
         <p>Range: [1-826]</p>
          <InputNumber min={1} max={826} defaultValue={100} onChange={onChange} />

       </Modal>
     </>
  )
}

export default manualAdd