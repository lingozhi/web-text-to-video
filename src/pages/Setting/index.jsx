import React from 'react';
import { Input, Button } from 'antd';
import './index.less';

function Setting() {
    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
        defaultFileList: [
            {
                uid: '1',
                name: 'xxx.png',
                status: 'uploading',
                url: 'http://www.baidu.com/xxx.png',
                percent: 33,
            },
            {
                uid: '2',
                name: 'yyy.png',
                status: 'done',
                url: 'http://www.baidu.com/yyy.png',
            },
            {
                uid: '3',
                name: 'zzz.png',
                status: 'error',
                response: 'Server Error 500',
                // custom error message to show
                url: 'http://www.baidu.com/zzz.png',
            },
        ],
    };
    return (
        <div>
            <div className="setting_input">
                <div className="list">
                    <Input placeholder="请输入key_api" />
                    <Button onClick={() => {}} className="draw">
                        测试连接GPT
                    </Button>
                </div>
                <div className="list">
                    <Input placeholder="请输入stable diffusion地址" />
                    <Button onClick={() => {}} className="draw">
                        测试连接SD
                    </Button>
                </div>
                <div className="list">
                    <Input placeholder="请输入文章本机地址" />
                    <Button onClick={() => {}} className="draw">
                        测试连接
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Setting;
