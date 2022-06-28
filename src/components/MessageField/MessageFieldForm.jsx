/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import Select from 'react-select';
import { Picker } from 'emoji-mart';
import { usePubNub } from 'pubnub-react';
import Button from '../Button';
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
  const { status, isContinue, clickHandler, autoComplete, channels, isTyping, sendMessage } = props;

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [inputTextValue, setInputTextValue] = useState('');
  const [imgSrc, setImgSrc] = useState('');
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
            author: 'operator',
          },
        });
      }
      timeoutCache.current = setTimeout(() => {
        pubnub.signal({
          channel: 'typing',
          message: {
            typing: '0',
            id: channels,
            author: 'operator',
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
    if (inputTextValue || selectedValue.length || imgSrc) {
      const SelectMessageToStr =
        selectedValue?.reduce((acc, item) => acc + ' ' + item.label, '') || '';
      const content = `${SelectMessageToStr} ${inputTextValue}`.trim();
      sendMessage(content, imgSrc);
      setInputTextValue('');
      setSelectedValue([]);
      setImgSrc('');
    }
  };

  const handleFileChange = (e) => {
    setImgSrc(e.target.files[0]);
  };

  if (usl) {
    return (
      <form className={classes.MessageForm} onSubmit={onSubmitHandler}>
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
          <div className={classes.IconButton} onChange={handleFileChange}>
            <label htmlFor="upload img">
              <i className="far fa-file-image"></i>
            </label>
            <input className={classes.uploadImg} type="file" id="upload img" />
          </div>
          <div className={[classes.MessageFormButton, classes.IconButton].join(' ')}>
            <Button type="submit" onClick={() => setMenuIsOpen(false)}>
              <i className="far fa-paper-plane"></i>
            </Button>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div className={classes.MessageFormButtonWrapper}>
      <Button onClick={clickHandler}>{textButton.current[status]}</Button>
    </div>
  );
});
