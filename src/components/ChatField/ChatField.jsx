/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import throttle from 'lodash.throttle';
import { usePubNub } from 'pubnub-react';
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { chatTyping } from '../../store/action/chat';
import { closeChatList } from '../../store/action/styles';
import { fetchLogout } from '../../store/action/auth';
import Dropdown from '../Dropdown';
import TypeChatList from '../TypeChat';
import ProfileEditModal from '../ProfileEditModal';
import classes from './ChatField.module.css';

export default function ChatField() {
  const { chatList, isSuccess } = useSelector((state) => state.chat);
  const { isOpenChatList } = useSelector((state) => state.styles);
  const dispatch = useDispatch();

  const [searchElements, setSearch] = useState([]);
  const [searchId, setSearchId] = useState([]);
  const [valueSearch, setValueSearch] = useState('content');
  const [modalIsOpen, setIsOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

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
              const find = chat.messages.filter((item, i) => {
                if (valueSearch === 'writtenBy' && i > 1) return false;
                return item[valueSearch].toLowerCase().includes(value.toLowerCase());
              });
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
        setSearch([]);
        setSearchId([]);
        
        dispatch(closeChatList());
      }
    }
  };

  const clickHandlerLogout = useCallback(() => {
    dispatch(fetchLogout());
    history.push('/auth');
  }, []);

  const cls = isOpenChatList
    ? [[classes.ChatList, classes.ChatListOpen].join(' ')]
    : classes.ChatList;

  const dropDownItem = searchSelectOption.current.map(({ value, label }, i) => (
    <DropdownItem key={`${value}_${i}`} onClick={() => setValueSearch(value)}>
      {label}
    </DropdownItem>
  ));

  return (
    <div className={cls}>
      <div className={classes.TopWrapper}>
        <div className={classes.ChatFieldIconButton} onClick={() => setIsOpen(!modalIsOpen)}>
          <i className="fas fa-user-edit"></i>
        </div>
        <InputGroup>
          <InputGroupButtonDropdown
            addonType="append"
            isOpen={dropdownOpen}
            toggle={toggleDropDown}>
            <DropdownToggle caret color="secondary">
              Поиск по
            </DropdownToggle>
            <DropdownMenu>{dropDownItem}</DropdownMenu>
          </InputGroupButtonDropdown>
          <Input name="search" onChange={handleChange} />
        </InputGroup>
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
      <Button color="secondary" size="lg" block onClick={clickHandlerLogout} className="w-100">
        Выйти
      </Button>
    </div>
  );
}
