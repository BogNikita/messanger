/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import { useInputValue } from '../../hooks/input.hook';
import Select from 'react-select';
import { Picker } from 'emoji-mart';
import { usePubNub } from 'pubnub-react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './MessageField.module.css';
import 'emoji-mart/css/emoji-mart.css';

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
  valueContainer: () => ({
    padding: 10,
  }),
};

export default React.memo(function MessageFieldForm(props) {
  const { status, isContinue, email, clickHandler, autoComplete, channels, isTyping, sendMessage } =
    props;

  const inputImgSrc = useInputValue('');

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isImgInput, setIsImgInput] = useState(false);
  const [inputTextValue, setInputTextValue] = useState('');
  const [selectedValue, setSelectedValue] = useState([]);

  const timeoutCache = useRef(0);
  const pubnub = usePubNub();

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

  const usl = status === 'active' && isContinue;

  const onInputChange = useCallback(
    (inputValue, { action }) => {
      clearInterval(timeoutCache.current);
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
      if (action === 'input-change') {
        setInputTextValue(inputValue);
        return;
      } else if (action === 'add-emoji') {
        setInputTextValue(inputTextValue + inputValue);
        setInputFocus();
        return;
      }
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [channels, inputTextValue, isTyping],
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputTextValue || selectedValue.length || inputImgSrc.value()) {
      const SelectMessageToStr =
        selectedValue?.reduce((acc, item) => acc + ' ' + item.label, '') || '';
      const content = `${SelectMessageToStr} ${inputTextValue}`.trim();
      sendMessage(content, inputImgSrc.value());
      setInputTextValue('');
      setSelectedValue([]);
      inputImgSrc.clear();
      setIsImgInput(false);
    }
  };

  if (usl) {
    return (
      <form className={classes.MessageForm} onSubmit={onSubmitHandler}>
        {isImgInput && (
          <Input {...inputImgSrc.bind} title="Введите URL картинки" type="URL" widthInput="75%" />
        )}
        <div className={classes.FormWrapper}>
          <Select
            isMulti
            name="messange"
            options={autoComplete}
            inputValue={inputTextValue}
            value={selectedValue}
            onInputChange={(value, action) => onInputChange(value, action)}
            onChange={setSelectedValue}
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
            className={classes.IconButton}
            onClick={() => {
              setInputFocus();
              setMenuIsOpen(!menuIsOpen);
            }}>
            <i className="far fa-smile-beam"></i>
          </div>
          <div className={classes.IconButton} onClick={() => setIsImgInput(!isImgInput)}>
            <i className="far fa-file-image"></i>
          </div>
          <div className={classes.MessageFormButton}>
            <Button type="submit" onClick={() => setMenuIsOpen(false)}>
              Отправить
            </Button>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div className={classes.MessageFormButtonWrapper}>
      <Button onClick={() => clickHandler(status, email)}>{textButton.current[status]}</Button>
    </div>
  );
});
