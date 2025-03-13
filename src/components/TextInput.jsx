import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const TextInput = ({
  id,
  label,
  placeholder,
  value,
  inputname,
  inputtype,
  errorState,
  errorMessage,
  onValueChange,
  showForgotPassword,
  showEye,
  showTooltip,
  toolTipMessage,
  required
}) => {
  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("password");
  
    // Toggle the type attribute of the password input field
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  return (
    <>
      <div className="form-group">
        <div className="form-label-group">
          <label className="form-label" for="default-01">
            {label} {required ? <span style={{ color: 'red'}}>*</span> : ''} {showTooltip ? <Tooltip style={{ color: 'red'}} placement="right" title={toolTipMessage}><QuestionCircleOutlined /></Tooltip> : ''}
          </label>
          {inputtype === "password" && showForgotPassword ? (
            <a
              className="link link-primary link-sm"
              href={`${process.env.PUBLIC_URL}/forgot-password`}
            >
              Forgot Password?
            </a>
          ) : (
            ""
          )}
        </div>
        <div className="form-control-wrap">
          {inputtype === "password" && showEye ? (
            <span
              className="form-icon form-icon-right passcode-switch lg"
              data-target="password"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer'}}
            >
              <span class="passcode-icon icon-show material-symbols-outlined">visibility</span>
              <span class="passcode-icon icon-hide material-symbols-outlined">visibility_off</span>
            </span>
          ) : (
            ""
          )}

          <input
            type={inputtype}
            id={inputname}
            name={inputname}
            className="form-control form-control-lg"
            placeholder={placeholder}
            onChange={onValueChange}
            value={value}
            style={errorState ? { borderColor: "red" } : {}}
            required={required}
          />

        </div>
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

export default TextInput;
