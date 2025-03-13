import React from "react";
import { Checkbox } from "antd";

const CheckBox = ({
  name,
  label,
  value,
  errorState,
  errorMessage,
  required,
  disabled,
  onValueChange
}) => {
  // const [checked, setChecked] = useState(true);
  // const [disabled, setDisabled] = useState(false);

  // const onChange = (e) => {
  //   console.log('checked = ', e.target.checked);
  //   setChecked(e.target.checked);
  // };

  return (
    <>
      <div>
      <Checkbox
        value={value}
        name={name}
        required={required}
        disabled={disabled}
        style={errorState ? { borderColor: "red" } : {}}
        onChange={onValueChange}
        checked="false" 
      >
        <div
          className="text-bold"
          style={{
            fontWeight: "500",
            fontFamily: "Poppins"
          }}
        >
          {label}
        </div>
      </Checkbox>
      </div>

      {errorState && (
        <div
          className=" bg-white pl-2 rounded mb-4 flex"
          style={{
            border: "1px solid red",
            borderColor: "red",
            color: "red",
            marginTop: "-4%",
          }}
        >
          <span className="icon mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              style={{ height: "5%", width: "5%", paddingLeft: "4px" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="text-red-500 font-bold" style={{ fontSize: "12px" }}>
            {errorMessage}
          </span>
        </div>
      )}
    </>
  );
};

export default CheckBox;
