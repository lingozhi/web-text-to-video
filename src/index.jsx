import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import store from './store';
import App from './App';
import 'antd/dist/reset.css';
import './less/index.less';

dayjs.locale('zh-cn');

/* global env */
if (env === 'development') {
    window.env = 'development';
} else {
    window.env = 'production';
}

const rootTips = document.getElementById('root-tips');
const styles = window.getComputedStyle(rootTips.childNodes[0]);
if (styles.color === 'rgb(255, 0, 0)') {
    rootTips.parentNode.removeChild(rootTips);
    ReactDOM.createRoot(document.getElementById('root')).render(
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    colorPrimary: '#118DEC',
                },
            }}
        >
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    );
} else {
    rootTips.parentNode.removeChild(rootTips);
    ReactDOM.createRoot(document.getElementById('root')).render(
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    colorPrimary: '#118DEC',
                },
            }}
        >
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    );
}
