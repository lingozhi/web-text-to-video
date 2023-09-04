import axios from 'axios';
import { message } from 'antd';
import { exitLogin, storage } from '@/utils';

const instance = axios.create({ baseURL: '/to_video', timeout: 300000000 });

// 用于存储pending的请求（处理多条相同请求）
const pendingRequest = new Map();

// 生成request的唯一key
const generateRequestKey = (config = {}) => {
    const { url, method, params, data } = config;
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
};

// 将重复请求添加到pendingRequest中
const addPendingRequest = (config) => {
    const extendConfig = config;
    const key = generateRequestKey(extendConfig);
    if (!pendingRequest.has(key)) {
        extendConfig.cancelToken = new axios.CancelToken((cancel) => {
            pendingRequest.set(key, cancel);
        });
    }
};

// 取消重复请求
const removePendingRequest = (config) => {
    const key = generateRequestKey(config);
    if (pendingRequest.has(key)) {
        const cancelToken = pendingRequest.get(key);
        cancelToken(key); // 取消之前发送的请求
        pendingRequest.delete(key); // 请求对象中删除requestKey
    }
};

instance.interceptors.request.use(
    (config) => {
        removePendingRequest(config); // 在一个ajax发送前执行一下取消操作
        addPendingRequest(config);

        const extendConfig = config;
        const TOKEN = storage.get('electric-ops_token');
        // 获取token，配置请求头
        const curFactory = storage.getObj('electric-ops_currentFactory');

        let factoryId = '';
        try {
            factoryId = curFactory.cid;
        } catch (e) {
            factoryId = '';
        }

        if (TOKEN) {
            if (extendConfig['Content-Type']) {
                extendConfig.headers['Content-Type'] = extendConfig['Content-Type'];
            } else {
                extendConfig.headers['Content-Type'] = 'application/json';
            }
            // 配置请求头 token
            extendConfig.headers.Authorization = TOKEN;
        }
        if (extendConfig['Content-Type'] === 'multipart/form-data') {
            // 文件上传相关处理
            // extendConfig.data.append('cid', factoryId);
        } else if (extendConfig.method === 'post') {
            if (extendConfig.data !== undefined) {
                extendConfig.data = { ...extendConfig.data };
            } else {
                extendConfig.data = {};
            }
        } else if (extendConfig.method === 'get') {
            if (extendConfig.params) {
                extendConfig.params = { cid: factoryId, ...extendConfig.params };
            } else {
                extendConfig.params = { cid: factoryId };
            }
        }

        return extendConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        removePendingRequest(response.config);
        const { status } = response;
        if (status === 401) {
            exitLogin();
        }
        return response.data;
    },
    (error) => {
        // 对响应错误做点什么
        const { status } = error?.response || {};
        if (status === 500) {
            message.destroy();
            message.error('服务器异常');
        } else if (status === 401) {
            exitLogin();
        }
        return Promise.reject(error);
    }
);

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;
export default instance;
