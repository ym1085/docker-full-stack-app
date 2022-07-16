import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    // DB 값을 가져온다
    axios.get('/api/values').then((response) => {
      console.log(`response => ${response}`);
      setLists(response.data);
    });
  }, []);

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // 원래 버튼 눌렀을때 이벤트 차단
    axios.post('/api/value', { value: value }).then((response) => {
      if (response.data.success) {
        console.log(`response =>`, response);
        setLists([...lists, response.data]); // 기존 데이터 다음에 삽입
        setValue('');
      } else {
        alert('값을 DB에 넣는데 실해했습니다.');
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value}</li>)}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요.."
              onChange={changeHandler}
              value={value}
            ></input>
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
