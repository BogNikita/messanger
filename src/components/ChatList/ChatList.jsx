import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRequest } from '../../store/action/chat';
import { getChat } from '../../store/action/activeChat';
import { logout } from '../../store/action/auth';
import classes from './ChatList.module.css';
import Input from '../Input/Input';
import throttle from 'lodash.throttle';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';
import TypeChatList from '../TypeChat/TypeChatList';



export default function ChatList() {
  const [searchElements, setSearch] = useState([]);
  const [searchId, setSearchId] = useState([]);
  const [valueSearch, setValueSearch] = useState('content');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatRequest());
  }, [dispatch]);

  const { chatList } = useSelector((state) => state.chat);

  const typeChats = useRef([
    { type: 'waiting', title: 'В ожидании' },
    { type: 'active', title: 'Активные' },
    { type: 'offline', title: 'Завершенные' },
    { type: 'save', title: 'Сохраненные' },
  ]);

  const handleChange = useMemo(
    () =>
      throttle((event) => {
        const value = event.target.value.trim();
        const result = [];
        const id = [];
        if (!!value) {
          chatList.forEach((chat) => {
            const find = chat.messages.filter((item) =>
              item[valueSearch].toLowerCase().includes(value.toLowerCase()),
            );
            if (find.length) {
              find.forEach(() => {
                id.push(chat.id);
              });
            }
            result.push(...find);
          });
        }
        setSearchId([...id]);
        setSearch([...result]);
      }, 1000),
    [chatList, valueSearch],
  );

  const clickHandler = (id) => {
    const chat = chatList.find((chat) => chat.id === id);
    dispatch(getChat(chat));
  };

  const clickHandlerLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={classes.ChatList}>
      <div className={classes.TopWrapper}>
        <select className={classes.select} onChange={(e) => setValueSearch(e.target.value)}>
          <option value="content">text</option>
          <option value="writtenBy">client</option>
        </select>
        <Input name="search" onChange={handleChange} />
      </div>

      {searchElements.length ? (
        <Dropdown
          id={searchId}
          elements={searchElements}
          value={valueSearch}
          onClick={clickHandler}
        />
      ) : null}
      <TypeChatList typeChats={typeChats.current} />
      <Button onClick={clickHandlerLogout}>Выйти</Button>
    </div>
  );
}
