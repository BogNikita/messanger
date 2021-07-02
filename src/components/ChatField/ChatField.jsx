/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import throttle from 'lodash.throttle';
import { usePubNub } from 'pubnub-react';
import Select from 'react-select';
import { chatTyping } from '../../store/action/chat';
import { closeChatList } from '../../store/action/styles';
import { fetchLogout } from '../../store/action/auth';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Button from '../Button';
import TypeChatList from '../TypeChat';
import ProfileEditModal from '../ProfileEditModal';
import classes from './ChatField.module.css';

const customStyles = {
  option: (provided) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    padding: 10,
  }),
  control: () => ({
    minWidth: 110,
    padding: '1px 5px 2px',
    background: '#f3f3f3',
    borderRadius: 5,
    borderRight: 'none',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#f3f3f3',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '2px 0',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '8px 2px!important',
  }),
};

export default function ChatField() {
  const { chatList, isSuccess } = useSelector((state) => state.chat);
  const { isOpenChatList } = useSelector((state) => state.styles);
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

  const pubnub = usePubNub();
  const history = useHistory();

  const typingSignal = useCallback(
    (s) => {
      if (s.message.typing === '0' && s.message.author === 'client') {
        dispatch(chatTyping(s.message.id, false));
      }
      if (s.message.typing === '1' && s.message.author === 'client') {
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
    }
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
        history.push(`/${id}/${key}`);
        dispatch(closeChatList());
      }
    }
  };

  const clickHandlerLogout = useCallback(() => {
    dispatch(fetchLogout());
    history.push('/auth');
  }, []);

  const selectHandler = ({ value }) => {
    setValueSearch(value);
  };

  const cls = isOpenChatList
    ? [[classes.ChatList, classes.ChatListOpen].join(' ')]
    : classes.ChatList;

  return (
    <div className={cls}>
      <div className={classes.TopWrapper}>
        <div className={classes.ChatFieldIconButton} onClick={() => setIsOpen(!modalIsOpen)}>
          <i className="fas fa-user-edit"></i>
        </div>
        <Select
          name="option-search"
          options={searchSelectOption.current}
          defaultValue={searchSelectOption.current[0]}
          onChange={selectHandler}
          styles={customStyles}
          noOptionsMessage={() => null}
          menuPlacement={'auto'}
          isSearchable={false}
          classNamePrefix="ChatList-Search"
        />
        <Input name="search" onChange={handleChange} widthInput="100%" />
        <div className={classes.ChatFieldIconButton} onClick={() => dispatch(closeChatList())}>
          <i className="fas fa-arrow-right"></i>
        </div>
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
