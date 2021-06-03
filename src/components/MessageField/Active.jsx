import React from 'react';
import Button from '../Button/Button';
import Select from 'react-select';

export default function Active({ status, isContinue, email, clickHandler }) {
  const textButton = {
    active: 'Продолжить чат',
    waiting: 'Войти в чат',
    save: 'Удалить чат',
    offline: 'Сохранить чат',
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const usl = status === 'active' && isContinue;

  if (usl) {
    return (
      <>
        <Select
          isMulti
          name="messange"
          options={options}
          // onInputChange={(e) => console.log(e)}
          // onChange={(e) => console.log(e)}
          classNamePrefix="select"
        />
        <Button>Отправить сообщение</Button>
      </>
    );
  }
  return <Button onClick={() => clickHandler(status, email)}>{textButton[status]}</Button>;
}
