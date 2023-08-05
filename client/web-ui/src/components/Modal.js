import React, { useRef, useState } from "react";
import "../design/styles.css";

const Modal = ({ data, selectedPicture, setSelectedPicture }) => {
  const { title, onClick, fields, type } = data;
  const isLogin = type === "login";
  const fieldsValues = useRef({});
  const renderField = (field, index) => {
    const { placeholder, label, type, id } = field;

    const onChange = (e, id) => {
      fieldsValues.current = {
        ...fieldsValues.current,
        [id]: e.target.value,
      };
    };

    if (type === "file") {
      return (
        <div key={index}>
          <label>{label}</label>
          <input
            onChange={(e) => {
              onChange(e, id);
              const file = e.target.files[0];
              setSelectedPicture(file); // Update selectedPicture state with the chosen file
              const reader = new FileReader();

              reader.onload = () => {
                const imageBase64 = reader.result;
                fieldsValues.current = {
                  ...fieldsValues.current,
                  [id]: imageBase64,
                };
              };

              reader.readAsDataURL(file);
            }}
            type={type}
            accept="image/*"
          />
          {selectedPicture && (
            <img
              src={URL.createObjectURL(selectedPicture)}
              id="pic"
              alt="Selected"
              onLoad={() => URL.revokeObjectURL(selectedPicture)}
            />
          )}
        </div>
      );
    }

    return (
      <div key={index}>
        <label>{label}</label>
        <input
          onChange={(e) => onChange(e, id)}
          type={type}
          placeholder={placeholder ? placeholder : undefined}
        ></input>
      </div>
    );
  };

  return (
    <div className="modalContainer">
      <h1>{title}</h1>
      <form id="form" action="/chats">
        {fields.map((field, index) => {
          return renderField(field, index);
        })}
      </form>
      <div>
        <button
          id="button"
          onClick={() => onClick(fieldsValues.current, "button")}
        >
          {title}
        </button>
        {isLogin ? (
          <p>
            Not registered yet?{" "}
            <a id="a" onClick={() => onClick(fieldsValues.current, "a")}>
              Click here{" "}
            </a>{" "}
            to register
          </p>
        ) : (
          <p>
            already registered?{" "}
            <a id="a" onClick={() => onClick(fieldsValues.current, "a")}>
              Click here{" "}
            </a>{" "}
            to login
          </p>
        )}
      </div>
    </div>
  );
};

export default Modal;
