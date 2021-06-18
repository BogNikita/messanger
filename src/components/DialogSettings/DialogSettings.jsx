import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray } from 'formik';
import { fetchUserDialogSettingsUpdate } from '../../store/action/userDialogSettings';
import Error from '../Error/Error';
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
  const { messages, autoGreeting, isError, errorMessage } = useSelector(
    (state) => state.userDialogSettings,
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmitHandler = ({ messages, autoGreeting }) => {
    const sortMessages = messages.filter((item) => !!item.label);
    const prepareMessages = sortMessages.map(({ label }) => ({
      label,
      value: label.toLowerCase(),
    }));
    dispatch(fetchUserDialogSettingsUpdate(token, prepareMessages, autoGreeting));
    if (!isError) {
      closeModal();
    }
  };

  return (
    <div>
      <div className={classes.DialogSettingsButton} onClick={openModal}>
        <i className="fas fa-bars"></i>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="DialogSettings"
        id='DialogSettings'
        closeTimeoutMS={300}>
        <div className={classes.ModalHeaderWrapper}>
          <h2>Настройка диалогов</h2>
          <button className={classes.ModalCloseButton} onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <Formik initialValues={{ messages, autoGreeting }} onSubmit={onSubmitHandler}>
          {({ values }) => (
            <Form>
              <FieldArray
                name="messages"
                render={(arrayHelpers) => (
                  <ul className={classes.DialogSettingsList}>
                    <h3>Готовые фразы:</h3>
                    {values.messages && values.messages.length > 0 ? (
                      values.messages.map((messages, index) => (
                        <AutoCompleteMessage
                          key={index}
                          name={`messages.${index}.label`}
                          index={index}
                          removeItem={arrayHelpers.remove}
                          widthInput="100%"
                        />
                      ))
                    ) : (
                      <span>У вас пока нет готовых сообщений</span>
                    )}
                    <div>
                      <Button type="button" onClick={() => arrayHelpers.push()}>
                        Добавить сообщения
                      </Button>
                    </div>
                  </ul>
                )}
              />
              <FieldArray
                name="autoGreeting"
                render={() => (
                  <Field name="autoGreeting">
                    {({ field }) => (
                      <div className={classes.DialogSettingsAutoGreeting}>
                        <Input
                          title="Автоматическое приветствие"
                          placeholder="Введите сообщение при входе в диалог"
                          widthInput="100%"
                          {...field}
                        />
                      </div>
                    )}
                  </Field>
                )}
              />
              <Button style={classes.DialogSettingsButtonSubmit} type="submit">
                Сохранить изменения
              </Button>
              {isError && <Error message={errorMessage} />}
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
