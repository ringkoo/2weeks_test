import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { addTodo } from "../../../redux/modules/todos.js";

const Form = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    body: "",
    isDone: false,
  });
  const [todos, setTodos] = useState([]);

  //input 요소 값이 변경될때 호출
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  // 버튼 클릭 시 실행 되는 함수
  const onSubmitHandler = (event) => {
    event.preventDefault();// submit 때문에 새로고침 방지용 
    const newTodo = {
      id: nextId(),
      title: todo.title,
      body: todo.body,
      isDone: false,
    };
    if (newTodo.title.trim() === "" || newTodo.body.trim() === "") return; // 빈값으로 입력되는것 방지
    dispatch(addTodo(newTodo));
    setTodos([...todos, newTodo]);
    setTodo({
      id: 0,
      title: "",
      body: "",
      isDone: false,
    });
  };

  return (
    <StAddForm onSubmit={onSubmitHandler}>
      <StInputGroup>
        <StFormLabel>제목</StFormLabel>
        <StAddInput
          type="text"
          name="title"
          value={todo.title}
          onChange={onChangeHandler}
        />
        <StFormLabel>내용</StFormLabel>
        <StAddInput
          type="text"
          name="body"
          value={todo.body}
          onChange={onChangeHandler}
        />
      </StInputGroup>
      <StAddButton>추가하기</StAddButton>
    </StAddForm>
  );
};

export default Form;

const StInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StFormLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

const StAddForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;

const StAddInput = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
`;

const StAddButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;
