/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space, Table, Button, Select, Modal, Form, Input, Spin, Tooltip } from 'antd';
import { fetchDoVoice, fetchOpenVoice } from '@/api';
import './index.less';

const { Option } = Select;

function DubbingProduction() {
    const [loading, setLoading] = useState(false);
    const [formValue, setFormValue] = useState({ voice: 'zh-CN-XiaoxiaoNeural', rate: '+30%', volume: '+0%' });
    const [form] = Form.useForm();
    const onFinish = (values) => {
        setFormValue(values);
    };
    const [redrawKey, setRedrawKey] = useState(0);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateCounter, setUpdateCounter] = useState(0);
    const getData = async () => {
        setData([]);
        const txtPath = localStorage.getItem('txt_path');
        const res = await fetchDoVoice({
            file_path: txtPath,
            language: formValue,
        });
        setData(res.audio_list);
        setRedrawKey((prevKey) => prevKey + 1);
        setLoading(false);
    };
    const openVoice = async () => {
        const res = await fetchOpenVoice();
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: '段落',
            dataIndex: 'text',
            key: 'text',
        },
        {
            title: '语音',
            dataIndex: 'voice_name',
            key: 'voice_name',
            width: '20%',
            render: (item) => (
                <>
                    <audio controls style={{ width: '250px', height: '54px' }}>
                        <source
                            src={`http://localhost:12002/to_video/audio/${item}?redraw=${redrawKey}`}
                            type="audio/wav"
                        />
                    </audio>
                </>
            ),
        },
        {
            title: '操作',
            dataIndex: 'handle',
            // key: 'handle',
            render: (_, record) => {
                const { storyboard, part, image_path } = record;
                console.log(record);
                return (
                    <div className="handle">
                        <a>语音重制</a>
                    </div>
                );
            },
        },
    ];

    return (
        <Spin spinning={loading}>
            <div className="dubbing-production-btn">
                <Space wrap>
                    <Button onClick={showModal}>配音设置</Button>

                    <Button
                        onClick={() => {
                            setLoading(true);
                            getData();
                        }}
                    >
                        配音制作
                    </Button>

                    <Button onClick={openVoice}>打开语音文件夹</Button>
                </Space>
            </div>
            <div className="dubbing-production-table">
                <Table
                    columns={columns}
                    dataSource={data}
                    // loading={loading}
                    bordered
                    rowClassName="editable-row"
                    rowKey={(record) => record.voice_name}
                />
            </div>
            <Modal
                title="配音设置"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="dubbing-modal"
            >
                <Form
                    form={form}
                    name="dynamic_form"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{ voice: 'zh-CN-XiaoxiaoNeural', rate: '+30%', volume: '+0%' }}
                >
                    <Form.Item label="配音角色" name="voice" rules={[{ required: true, message: '选中声音' }]}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'zh-CN-XiaoxiaoNeural',
                                    label: 'zh-CN-XiaoxiaoNeural',
                                },
                                {
                                    value: 'zh-CN-XiaoyiNeural',
                                    label: 'zh-CN-XiaoyiNeural',
                                },
                                {
                                    value: 'zh-CN-YunjianNeural',
                                    label: 'zh-CN-YunjianNeural',
                                },
                                {
                                    value: 'zh-CN-YunxiNeural',
                                    label: 'zh-CN-YunxiNeural',
                                },
                                {
                                    value: 'zh-CN-YunxiaNeural',
                                    label: 'zh-CN-YunxiaNeural',
                                },
                                {
                                    value: 'zh-CN-YunyangNeural',
                                    label: 'zh-CN-YunyangNeural',
                                },
                                {
                                    value: 'zh-HK-HiuGaaiNeural',
                                    label: 'zh-HK-HiuGaaiNeural',
                                },
                                {
                                    value: 'zh-HK-HiuMaanNeural',
                                    label: 'zh-HK-HiuMaanNeural',
                                },
                                {
                                    value: 'zh-HK-WanLungNeural',
                                    label: 'zh-HK-WanLungNeural',
                                },
                                {
                                    value: 'zh-TW-HsiaoChenNeural',
                                    label: 'zh-TW-HsiaoChenNeural',
                                },
                                {
                                    value: 'zh-TW-YunJheNeural',
                                    label: 'zh-TW-YunJheNeural',
                                },
                                {
                                    value: 'zh-TW-HsiaoYuNeural',
                                    label: 'zh-TW-HsiaoYuNeural',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="语音速率"
                        name="rate"
                        rules={[{ required: true, message: 'Please input the rate!' }]}
                    >
                        <Input placeholder="+30%" />
                    </Form.Item>
                    <Form.Item
                        label="正常音量"
                        name="volume"
                        rules={[{ required: true, message: 'Please input the volume!' }]}
                    >
                        <Input placeholder="+0%" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button onClick={handleCancel} className="btn">
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit" onClick={handleOk} className="btn">
                            确认
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
}

export default DubbingProduction;
