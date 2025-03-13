import { notification } from 'antd';
import { CloseCircleFilled, CloseCircleTwoTone, CheckCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@ant-design/icons';

const openNotification = (placement, type, message, description, duration = 5) => {
  let icon;
  let style;

  switch (type) {
    case 'error':
      icon = <CloseCircleFilled />;
      style = {
        border: '1px solid red',
        borderRadius: '5px',
        backgroundColor: '#ffcccc',
        color: 'red'
      };
      break;
    case 'success':
      icon = <CheckCircleFilled />;
      style = {
        border: '1px solid green',
        borderRadius: '5px',
        backgroundColor: '#ccffcc',
        color: 'green',
        zIndex: '10000'
      };
      break;
    case 'warning':
      icon = <ExclamationCircleFilled />;
      style = {
        border: '1px solid #ffc107',
        borderRadius: '5px',
        backgroundColor: '#fff7e6',
        color: '#ffc107',
        zIndex: '10000'
      };
      break;
    case 'info':
      icon = <InfoCircleFilled />;
      style = {
        border: '1px solid #1890ff',
        borderRadius: '5px',
        backgroundColor: '#e6f7ff',
        color: '#1890ff',
        zIndex: '10000'
      };
      break;
    default:
      icon = <CloseCircleTwoTone />;
      style = {
        border: '1px solid gray',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        color: 'gray',
        zIndex: '10000'
      };
  }

  notification.open({
    message,
    description,
    duration,
    placement,
    icon,
    style,
  });
};

export default openNotification;
