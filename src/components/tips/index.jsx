/*
 * @Author: chen 13714733197@163.com
 * @Date: 2023-07-21 20:34:10
 * @LastEditors: chen 13714733197@163.com
 * @LastEditTime: 2023-07-21 20:35:50
 * @FilePath: \web-to-video\src\components\tips\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Space, Table, Button, Form, InputNumber, Tooltip, Typography, Input, Modal, TextArea, Tour, Tag } from 'antd';

function Tips() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOk = () => {
        setIsOpen(false);
    };
    const handle = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };
    const handleCan = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <Modal title="注意" open={isOpen} onOk={handle} onCancel={handleCan} width={600}>
                <div></div>
            </Modal>
        </div>
    );
}

export default Tips;
