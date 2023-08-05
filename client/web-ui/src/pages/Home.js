import react, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "../design/home.css";
import Modal from "../components/Modal";
import io from "socket.io-client";

const Home = (props) => {
  const navigate = useNavigate();
  const serverAdress = 'http://localhost:5000/'

  const handleLogin = (username) => {
    const socket = io.connect(serverAdress);
    props.setSocket(socket);
    props.setUsername(username);
    navigate('/chats');
  };
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [modalName, setModalName] = useState("login");
  const users = props.users;
  const isLogin = modalName === "login";
  const registerationFields = [
    {
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      id: "username",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      id: "password",
    },
    {
      label: "Verify password",
      type: "password",
      placeholder: "Enter again your password",
      id: "verifyPassword",
    },
    {
      label: "Display name",
      type: "text",
      placeholder: "Enter your name",
      id: "name",
    },
    {
      label: "Picture",
      type: "file",
      id: "pic",
      onChange: (event) => setSelectedPicture(event.target.files[0]),
    },
  ];

  const loginField = [
    {
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      id: "username",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your Password",
      id: "password",
    },
  ];

  const isValidation = (fieldsValues) => {
    const keysLength = isLogin ? loginField.length : registerationFields.length;
    return fieldsValues.length === keysLength;
  };

  const registerationData = {
    type: "registeration",
    title: "Registeration",
    onClick: (fieldsValues, id) => {
      //console.log(id);
      if (id === "a") {
        setModalName("login");
        return;
      }
      if (
          !fieldsValues.username ||
          !fieldsValues.password ||
          !fieldsValues.verifyPassword ||
          !fieldsValues.name ||
          !fieldsValues.pic
      ) {
        alert("you must fill all the inputs");
        return;
      }
      //console.log("fieldsValues", fieldsValues);
      if (fieldsValues.password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
      if (fieldsValues.password !== fieldsValues.verifyPassword) {
        alert("Passwords do not match.");
        return;
      }
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(fieldsValues.password)) {
        alert(
            "Password must contain at least one lower-case letter,one upper-case letter, one number, and be at least 8 characters long."
        );
        return;
      }
      const existing = users.find(
          (user) => user.username === fieldsValues.username
      );
      if (existing) {
        alert("Invalid username");
        return;
      }

      if (isValidation) {
        const newUser = {
          username: fieldsValues.username,
          password: fieldsValues.password,
          displayName: fieldsValues.name,
          profilePic: fieldsValues.pic,
        };
        props.handleUsers(newUser);
        setModalName("login");
      }
    },
    fields: registerationFields,
  };


  const loginData = {
    type: "login",
    title: "Login",
    onClick: async (fieldsValues, id) => {
      if (id === "a") {
        setModalName("registeration");
        return;
      }
      if (!fieldsValues.username || !fieldsValues.password) {
        alert("You must fill all the inputs");
        return;
      }
        const loggedInUser = {
          username: fieldsValues.username,
          password: fieldsValues.password
        };

        try {
          const response = await fetch(`${serverAdress}api/Tokens`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loggedInUser)
          })
          .then(response=> {
            return response.text();
          })
              .then(html => {
                sessionStorage.setItem('token', html);
              })
        } catch (error) {
          console.error('Error:', error);
        }

        try {
          const response = await fetch(`${serverAdress}api/Users/${fieldsValues.username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + sessionStorage.getItem('token')
            },
          });

          if (response.ok) {
            // Registration successful
            handleLogin(fieldsValues.username);
          }
          else {
            alert("Wrong username or password!");
            return;
          }
        } catch (error) {
          console.error('Error:', error);
        }
    },
    fields: loginField,
  };

  const modaData =
      modalName === "registeration" ? registerationData : loginData;

  return (
      <div className="homeContainer">
        <Modal
            data={modaData}
            selectedPicture={selectedPicture}
            setSelectedPicture={setSelectedPicture}
        />
      </div>
  );
};


export default Home;