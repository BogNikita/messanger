import React, { useRef } from 'react';
import Button from '../Button/Button';
import Select from 'react-select';

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
    autoComplete
  } = props;

  const textButton = useRef({
    active: 'Продолжить чат',
    waiting: 'Войти в чат',
    save: 'Удалить чат',
    offline: 'Сохранить чат',
  });

  const usl = status === 'active' && isContinue;

  const onInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      setInputMessage(inputValue);
      return;
    }
    return
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
          onInputChange={onInputChange}
          onChange={(e) => setSelectMessage(e)}
          styles={customStyles}
          placeholder="Введите ваше сообщение"
          noOptionsMessage={() => null}
          menuPlacement={'auto'}
        />
        <Button type="submit">Отправить сообщение</Button>
      </>
    );
  }
  return <Button onClick={() => clickHandler(status, email)}>{textButton.current[status]}</Button>;
}
