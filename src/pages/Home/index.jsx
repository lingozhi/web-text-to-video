/*
 * @Author: chen 13714733197@163.com
 * @Date: 2023-07-05 21:28:21
 * @LastEditors: chen 13714733197@163.com
 * @LastEditTime: 2023-08-20 19:08:15
 * @FilePath: \web-to-video\src\pages\Home\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './index.less';
import React, { useEffect } from 'react';
import { Tabs } from 'antd';

import { DrawingProduction, DubbingProduction, NovelTreatment, ClippingConfiguration } from './components';

function Home() {
    const items = [
        {
            key: '1',
            label: `小说处理`,
            children: <NovelTreatment />,
        },
        {
            key: '2',
            label: `绘画制作`,
            children: <DrawingProduction />,
        },
        {
            key: '3',
            label: `配音制作`,
            children: <DubbingProduction />,
        },
        {
            key: '4',
            label: `剪映配置`,
            children: <ClippingConfiguration />,
        },
    ];
    const expirationDate = new Date('2023-09-1T23:59:59');
    function checkExpiration() {
        const currentDate = new Date();
        console.log(currentDate, expirationDate);
        if (currentDate > expirationDate) {
            alert('应用程序已过期，请联系供应商。');
            // 在此处添加任何其他必要的逻辑，例如重定向到另一个页面
            window.location.href = '/expired';
        }
    }
    useEffect(() => {
        checkExpiration();
    }, []);
    return (
        <div className="home">
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}

export default Home;
