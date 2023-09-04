import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

// 模块分布
import globalReducer from './modules/global';

const reducer = combineReducers({
    global: globalReducer,
});

const store = configureStore({
    reducer,
    devTools: true,

    middleware: (getDefaultMiddleware) => {
        // 如果有需要日志，那么则在后面加上 .concat(logger) 进行调试
        return getDefaultMiddleware({ serializableCheck: false });
    },
});

export default store;
