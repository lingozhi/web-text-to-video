/*
 * @Author: chen 13714733197@163.com
 * @Date: 2023-07-07 05:16:58
 * @LastEditors: chen 13714733197@163.com
 * @LastEditTime: 2023-08-19 21:57:05
 * @FilePath: \web-to-video\src\pages\Home\components\clipping-configuration\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Button, Space, Input, message } from 'antd';
import { fetchDoDddKeys, fetchDoAlign, fetchDoDddXKeys, fetchDoDddYKeys, fetchDoEnter } from '@/api';
import './index.less';

function ClippingConfiguration() {
    const [inputValue, setInputValue] = useState('');

    // 创建一个函数来处理输入框的值改变事件
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const getAddKeys = async () => {
        const res = await fetchDoDddKeys({ file_path: inputValue });
        if (res.code === 200) {
            message.success('操作成功');
        } else {
            message.error('操作失败');
        }
    };
    const getDoEnter = async () => {
        const res = await fetchDoEnter({ file_path: inputValue });
        if (res.code === 200) {
            message.success('操作成功');
        } else {
            message.error('操作失败');
        }
    };
    const getAddYKeys = async () => {
        const res = await fetchDoDddYKeys({ file_path: inputValue });
        if (res.code === 200) {
            message.success('操作成功');
        } else {
            message.error('操作失败');
        }
    };
    const getAddXKeys = async () => {
        const res = await fetchDoDddXKeys({ file_path: inputValue });
        if (res.code === 200) {
            message.success('操作成功');
        } else {
            message.error('操作失败');
        }
    };

    const getAlign = async () => {
        const res = await fetchDoAlign({ file_path: inputValue });
        if (res.code === 200) {
            message.success('操作成功');
        } else {
            message.error('操作失败');
        }
    };
    return (
        <div className="clipping-configuration-btn">
            <div className="input-set">
                <div className="lable">输入剪映草稿地址：</div>
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    // eslint-disable-next-line no-octal-escape
                    placeholder="如：C:\Users\12438\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft\7月23日\draft_content.json"
                />
            </div>

            <Space wrap>
                <Button className="draw" onClick={getAlign}>
                    音视频对齐
                </Button>
                {/* <Button className="draw" onClick={getDoEnter}>
                    添加出入场动画
                </Button>
                <Button className="draw" onClick={getAddKeys}>
                    添加随机关键帧
                </Button> */}
                <Button className="draw" onClick={getAddYKeys}>
                    添加上下关键帧
                </Button>
                <Button className="draw" onClick={getAddXKeys}>
                    添加左右关键帧
                </Button>
            </Space>
        </div>
    );
}

export default ClippingConfiguration;
