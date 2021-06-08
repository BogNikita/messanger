import React, { useRef, useState } from 'react';
import Button from '../Button/Button';
import Select from 'react-select';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import classes from './MessageField.module.css';

const customStyles = {
  option: (provided) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    padding: 10,
  }),
  container: () => ({
    width: '100%',
    position: 'relative',
  }),
  menuList: () => ({
    width: '100%',
  }),
};

export default function Active(props) {
  const {
    status,
    isContinue,
    email,
    clickHandler,
    setSelectMessage,
    setInputMessage,
    inputMessage,
    selectMessage,
    autoComplete,
    pubnub,
    channels,
    isTyping,
  } = props;

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };

  const [inputRef, setInputFocus] = useFocus();
  const textButton = useRef({
    active: 'Продолжить чат',
    waiting: 'Войти в чат',
    save: 'Удалить чат',
    offline: 'Сохранить чат',
  });

  const timeoutCache = useRef(0);

  const usl = status === 'active' && isContinue;

  const onInputChange = (inputValue, { action }) => {
    clearInterval(timeoutCache.current)
    if ((inputValue && !isTyping) || (!inputValue && isTyping)) {
      pubnub.signal({
        channel: 'typing',
        message: {
          typing: inputValue ? '1' : '0',
          id: channels,
        },
      });
    }
    timeoutCache.current = setTimeout(() => {
      pubnub.signal({
        channel: 'typing',
        message: {
          typing: '0',
          id: channels,
        },
      });
    }, 5000);
    
    if (action === 'input-change' || action === 'add-emoji') {
      setInputMessage(inputValue);
      return;
    } else if (action === 'add-emoji') {
      setInputMessage(inputMessage + inputValue);
      setInputFocus();
      return;
    }
    return;
  };

  if (usl) {
    return (
      <>
        <Select
          isMulti
          name="messange"
          options={autoComplete}
          inputValue={inputMessage}
          value={selectMessage}
          onInputChange={(value, action) => onInputChange(value, action)}
          onChange={setSelectMessage}
          styles={customStyles}
          placeholder="Введите ваше сообщение"
          noOptionsMessage={() => null}
          menuPlacement={'auto'}
          ref={inputRef}
        />
        {menuIsOpen && (
          <Picker
            onSelect={({ native }) => onInputChange(native, { action: 'add-emoji' })}
            style={{ position: 'absolute', bottom: '45px', right: '0' }}
          />
        )}
        <div
          className={classes.Emoji}
          onClick={() => {
            setInputFocus();
            setMenuIsOpen(!menuIsOpen);
          }}>
          <i className="far fa-smile-beam"></i>
        </div>
        <div className={classes.MessageFormButton}>
          <Button type="submit" onClick={() => setMenuIsOpen(false)}>
            Отправить
          </Button>
        </div>
      </>
    );
  }
  return <Button onClick={() => clickHandler(status, email)}>{textButton.current[status]}</Button>;
}
