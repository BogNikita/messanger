import React, { useState } from 'react';
import Modal from 'react-modal';
import { Form, Field } from 'react-final-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './ProfileEditModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeAvatar, fetchUpdateProfile } from '../../store/action/auth';

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

const required = (value) => (value ? undefined : 'Поле не должно быть пустым');
const minLength = (value) => {
  if (value) {
    return value.length > 5 ? undefined : 'Минимальная длина пароля 6 символов';
  } else return undefined;
};
const isEqual = (password) => (value) => {
  if (value) {
    return value === password ? undefined : 'Пароли должны совпадать';
  } else return undefined;
};

export default function ProfileEditModal({ modalIsOpen, setIsOpen }) {
  const { displayName, photoURL } = useSelector((state) => state.auth.user);
  const { isError, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isChangeAvatar, setChangeAvatar] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmitHandler = ({displayName, password, photoURL}) => {
    dispatch(fetchUpdateProfile(displayName, photoURL, password))
    if (!isError) {
      closeModal()
    }
  };

  const onChangeAvatar = (photoURL) => {
    dispatch(fetchChangeAvatar(photoURL));
    setChangeAvatar(false);
  };

  const Avatar = () => {
    if (photoURL) {
      return <img className={classes.Avatar} src={photoURL} alt="user avatar" />;
    } else {
      return <span>У вас поке нет аватара</span>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
      <div className={classes.ModalHeaderWrapper}>
        <h2>Настройки учетной записи</h2>
        <button className={classes.ModalCloseButton} onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <Form
        onSubmit={onSubmitHandler}
        render={({ values, handleSubmit }) => (
          <form className={classes.ModalForm} onSubmit={handleSubmit}>
            <Field
              name="displayName"
              validate={required}
              defaultValue={displayName ? displayName : ''}>
              {({ input, meta }) => (
                <>
                  <Input {...input} type="text" title="Имя" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </>
              )}
            </Field>
            <Field name="photo">
              {({ input }) => (
                <>
                  {!isChangeAvatar ? (
                    <div className={classes.AvatarWrapper}>
                      <Avatar />
                      <Button onClick={() => setChangeAvatar(true)}>Изменить аватар</Button>
                    </div>
                  ) : (
                    <>
                      <Input {...input} type="url" title="Аватар" />
                      <Button
                        style={classes.AvatarSaveButton}
                        onClick={() => onChangeAvatar(input.value)}>
                        Сохранить Аватар
                      </Button>
                    </>
                  )}
                </>
              )}
            </Field>
            <Field name="password" validate={minLength} defaultValue="">
              {({ input, meta }) => (
                <>
                  <Input {...input} type="password" title="Пароль" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </>
              )}
            </Field>
            <Field name="repeat_password" validate={isEqual(values.password)}>
              {({ input, meta }) => (
                <>
                  <Input {...input} type="password" title="Повторите пароль" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </>
              )}
            </Field>
            <div className={classes.ModalSubmitButton}>
              <Button type="submit">Обновить данные</Button>
            </div>
          </form>
        )}
      />
    </Modal>
  );
}
