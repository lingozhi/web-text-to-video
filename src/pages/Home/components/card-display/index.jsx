/* eslint-disable react/prop-types */
import { Card, Button } from 'antd';

const CardDisplay = ({ card, onEdit, onReset }) => {
    return (
        <Card title={`索引: ${card.index}`} style={{ width: 300 }}>
            <p>部分：{card.part}</p>
            <p>文本：{card.text}</p>
            <p>翻译：{card.translate}</p>
            <Button onClick={() => onEdit(card)}>编辑</Button>
            <Button onClick={() => onReset(card)}>重置</Button> {/* 添加重置按钮 */}
        </Card>
    );
};

export default CardDisplay;
