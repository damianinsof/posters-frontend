import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import { globalConfig } from 'antd/es/config-provider';

const Modal = (bodyModal) => {
  
  const {isModalOpen, setIsModalOpen}=globalConfig()
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Button type="primary" onClick={showModal}>
      Open Modal
    </Button>
    <Modal title="Basic Modal" 
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={handleCancel}>
        <>
        <p>{bodyModal}</p>
        </>
    </Modal>
  </>
  )
}

export default Modal