import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import throttle from 'lodash.throttle';
import { usePubNub } from 'pubnub-react';
import { chatTyping } from '../../store/action/chat';
import { logout } from '../../store/action/auth';
import Input from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';
import TypeChatList from '../TypeChat/TypeChatList';
import ProfileEditModal from '../ProfileEditModal/ProfileEditModal';
import classes from './ChatField.module.css';

export default function ChatField() {
  const { chatList, isSuccess } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const [searchElements, setSearch] = useState([]);
  const [searchId, setSearchId] = useState([]);
  const [valueSearch, setValueSearch] = useState('content');
  const [modalIsOpen, setIsOpen] = useState(false);

  const typeChats = useRef([
    { type: 'waiting', title: 'В ожидании' },
    { type: 'active', title: 'Активные' },
    { type: 'offline', title: 'Завершенные' },
    { type: 'save', title: 'Сохраненные' },
  ]);

  const pubnub = usePubNub();
  const history = useHistory();

  const typingSignal = useCallback(
    (s) => {
      if (s.message.typing === '0') {
        dispatch(chatTyping(s.message.id, false));
      }
      if (s.message.typing === '1') {
        dispatch(chatTyping(s.message.id, true));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (isSuccess) {
      pubnub.addListener({
        signal: typingSignal,
      });
      pubnub.subscribe({ channels: ['typing'] });
    }
    return () => {
      pubnub.unsubscribeAll();
    };
  }, [isSuccess, typingSignal, pubnub]);

  const handleChange = useMemo(
    () =>
      throttle((event) => {
        const value = event.target.value.trim();
        const result = [];
        const id = [];
        if (!!value) {
          for (const key in chatList) {
            chatList[key].chats.forEach((chat) => {
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
        }
        setSearchId([...id]);
        setSearch([...result]);
      }, 1000),
    [chatList, valueSearch],
  );

  const clickHandler = (id) => {
    for (const key in chatList) {
      const chat = chatList[key].chats.find((chat) => chat.id === id);
      if (chat) {
        history.push(`/${key}/${id}`);
      }
    }
  };

  const clickHandlerLogout = () => {
    dispatch(logout());
  };

  const searchSelectOption = useRef([
    {
      label: 'Поиск по тексту',
      value: 'content',
    },
    {
      label: 'Поиск по автору',
      value: 'writtenBy',
    },
  ]);
  return (
    <div className={classes.ChatList}>
      <div className={classes.TopWrapper}>
        <div className={classes.ModalButton} onClick={() => setIsOpen(!modalIsOpen)}>
          <i className="fas fa-user-edit"></i>
        </div>
        <select className={classes.CustomSelect} onChange={(e) => setValueSearch(e.target.value)}>
          <option value="content">Поиск по тексту</option>
          <option value="writtenBy">Поиск по автору</option>
        </select>
        <Input name="search" onChange={handleChange} />
      </div>
      {modalIsOpen && <ProfileEditModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />}
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
