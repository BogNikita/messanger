import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import Input from '../Input/Input';
import AutoCompleteMessage from './AutoCompleteMessage';
import classes from './DialogSettings.module.css';

const customStyles = {
  content: {
    top: '0',
    left: '50%',
    right: '0',
    bottom: '0',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
};

Modal.setAppElement('#root');

export default function DialogSettings({ modalIsOpen, setIsOpen }) {
  const { messages } = useSelector((state) => state.autoComplete);

  function openModal() {
      setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className={classes.DialogSettingsButton} onClick={openModal}>
        <i className="fas fa-bars"></i>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={300}>
        <div className={classes.ModalHeaderWrapper}>
          <h2>Настройка диалогов</h2>
          <button className={classes.ModalCloseButton} onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <ul className={classes.DialogSettingsList}>
          <h3>Готовые фразы:</h3>
          {messages?.map((item, i) => (
            <AutoCompleteMessage key={`${item.label}_${i}`} message={item.label} />
          ))}
          <Button>Добавить еще</Button>
        </ul>
        <form>
            <Input title='Автоматическое приветствие' placeholder='Введите сообщение при входе в диалог'/>
        </form>
      </Modal>
    </div>
  );
}
