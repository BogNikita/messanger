import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './ProfileEditModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export default function ProfileEditModal({ modalIsOpen, setIsOpen }) {
  var subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#000';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
      <div className={classes.ModalHeaderWrapper}>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Настройки учетной записи</h2>
        <button className={classes.ModalCloseButton} onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form className={classes.ModalForm} onSubmit={(e) => e.preventDefault()}>
        <Input type="text" name="UserName" title="Имя" />
        <div>
          <Input type="src" name="avatar" title="Аватар" />
        </div>
        <Input type="password" name="password" title="Пароль" />
        <Input type="password" name="repeat_password" title="Повторите пароль" />
        <div className={classes.ModalSubmitButton}>
          <Button type="submit">Обновить данные</Button>
        </div>
      </form>
    </Modal>
  );
}
