/* eslint-disable react/prop-types */
import { Form, Input, Button } from 'antd';

const EditCard = ({ card, onSave }) => {
    const onFinish = (values) => {
        onSave({ ...card, ...values });
    };

    return (
        <Form initialValues={{ text: card.text, translate: card.translate }} onFinish={onFinish}>
            <Form.Item name="text" label="文本" style={{ width: '100%' }}>
                <Input.TextArea
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}
                />
            </Form.Item>
            <Form.Item name="translate" label="翻译" style={{ width: '100%' }}>
                <Input.TextArea
                    autoSize={{
                        minRows: 5,
                        maxRows: 8,
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditCard;
