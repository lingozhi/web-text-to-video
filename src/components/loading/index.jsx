import React from 'react';
import { Spin } from 'antd';
import './index.less';

const Loading = () => {
    return (
        <div className="page-loading">
            <Spin size="large" tip="Loading" />
        </div>
    );
};

export default Loading;
