/*
 * @Author: chen 13714733197@163.com
 * @Date: 2023-07-05 21:28:21
 * @LastEditors: chen 13714733197@163.com
 * @LastEditTime: 2023-07-23 17:31:12
 * @FilePath: \web-to-video\src\pages\Home\components\drawing-production\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import {
    Space,
    Spin,
    Button,
    Input,
    Modal,
    Col,
    Row,
    Image,
    Card,
    Form,
    InputNumber,
    Checkbox,
    Select,
    message,
    Tooltip,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoPlot, fetchDoPlotTest, fetchRedrawPlot } from '@/api';
import './index.less';

const { TextArea } = Input;
const { Option } = Select;
function DrawingProduction() {
    const [loading, setLoading] = useState(false);
    const cards = useSelector((state) => state.global.cards);
    console.log(cards);
    const [editingItem, setEditingItem] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [data, setData] = useState([]);
    const [redrawKey, setRedrawKey] = useState(0);
    const [isHrEnabled, setIsHrEnabled] = useState(false);
    const handleEdit = (item) => {
        setEditingItem(item);
        setEditingText(item.future);
    };

    const handleSave = (item) => {
        // 保存修改后的文本到你的数据源
        const updatedData = data.map((i) => {
            if (i.img_name === item.img_name) {
                return {
                    ...i,
                    future: editingText,
                };
            }
            return i;
        });
        setData(updatedData);
        // 在这里，你需要保存修改后的文本到你的数据源
        // 保存后，退出编辑模式
        setEditingItem(null);
    };

    const [form] = Form.useForm();
    const [fromValue, setFromValue] = useState({});
    const onFinish = (values) => {
        setFromValue(values);
    };
    const samplerOptions = [
        'Euler',
        'LMS',
        'Heun',
        'DPM2',
        'DPM++2S a',
        'DPM++2M',
        'SuperMerger',
        'Dreambooth',
        'DPM++ SDE',
        'DPM++ 2M SDE',
        'DPM fast',
        'DPM adaptive',
        'LMS Karras',
        'DPM2 Karras',
        'DPM2 a Karras',
        'DPM++ 2S a Karras',
        'DPM++ 2M Karras',
        'DPM++ SDE Karras',
        'DPM++ 2M SDE Karras',
        'DDIM',
        'PLMS',
        'Unipc',
    ];
    const hrOptions = [
        'Latent',
        'Latent (antialiased)',
        'Latent (bicubic)',
        'Latent (bicubic antialiased)',
        'Latent (nearest)',
        'Latent (nearest-exact)',
        'None',
        'Lanczos',
        'Nearest',
        'Dreambooth',
        'ESRGAN_4x',
        'LDSR',
        'R-ESRGAN 4x+',
        'R-ESRGAN 4x+Anime6B',
        'ScuNET GAN',
        'ScuNET PSNR',
        'SwinIR 4x',
        'ControlNet v1.1.206',
    ];
    const [sdValue, setSdValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getData = async () => {
        setData([]);
        if (!sdValue) {
            message.error('请输入SD地址');
            setLoading(false);
            return;
        }
        const res = await fetchDoPlot({
            sd_value: `${sdValue}sdapi/v1/txt2img`,
            paint_set: fromValue,
            fiction: cards,
        });
        setData(res.img_list);
        setLoading(false);
    };

    const redrawPlot = async (item) => {
        const res = await fetchRedrawPlot({
            image: item.img_name,
            paint_set: fromValue,
        });
        setRedrawKey((prevKey) => prevKey + 1);
    };

    const getTest = async () => {
        const res = await fetchDoPlotTest();
        setData(res.img_list);
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
    const handleScaleChange = (enabled) => {
        if (enabled) {
            const width = form.getFieldValue('firstphase_width');
            const height = form.getFieldValue('firstphase_height');
            const scale = form.getFieldValue('hr_scale');
            form.setFieldsValue({
                hr_resize_x: width * scale,
                hr_resize_y: height * scale,
            });
        }
    };

    const handleEnableHrChange = (checked) => {
        setIsHrEnabled(checked);
        handleScaleChange(checked);
    };
    const handleWidthHeightChange = () => {
        if (isHrEnabled) {
            const width = form.getFieldValue('firstphase_width');
            const height = form.getFieldValue('firstphase_height');
            const scale = form.getFieldValue('hr_scale');
            form.setFieldsValue({
                hr_resize_x: width * scale,
                hr_resize_y: height * scale,
            });
        }
    };

    const handleHrResizeChange = () => {
        if (isHrEnabled) {
            const hrWidth = form.getFieldValue('hr_resize_x');
            const hrHeight = form.getFieldValue('hr_resize_y');
            const scale = form.getFieldValue('hr_scale');
            form.setFieldsValue({
                firstphase_width: hrWidth / scale,
                firstphase_height: hrHeight / scale,
            });
        }
    };
    return (
        <Spin spinning={loading}>
            <div className="drawing-production-btn">
                <div className="list">
                    <Input
                        placeholder="请输入stable diffusion地址"
                        value={sdValue}
                        onChange={(e) => {
                            setSdValue(e.target.value);
                        }}
                    />
                </div>
                <Space wrap>
                    <Button onClick={showModal}>绘画设置</Button>
                    <Button
                        onClick={() => {
                            setLoading(true);
                            getData();
                        }}
                    >
                        绘图制作
                    </Button>

                    <Button onClick={getTest}>测试</Button>
                </Space>
            </div>
            <div className="drawing-image">
                <Space wrap>
                    {cards.map((item) => {
                        return (
                            <Col className="gutter-row" span={6} key={item.img_name}>
                                <Card
                                    style={{
                                        width: 350,
                                    }}
                                    cover={
                                        <Image
                                            width={350}
                                            src={`http://localhost:12002/to_video/images/${item.img_name}?redraw=${redrawKey}`}
                                        />
                                    }
                                    actions={[
                                        <div key="edit" onClick={() => handleEdit(item)}>
                                            编辑
                                        </div>,
                                        editingItem === item ? (
                                            <div onClick={() => handleSave(item)}>保存</div>
                                        ) : (
                                            <div key="edit2" onClick={() => redrawPlot(item)}>
                                                重绘
                                            </div>
                                        ),
                                    ]}
                                >
                                    {editingItem === item ? (
                                        <div className="drawing-future">
                                            <TextArea
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                onBlur={() => handleSave(item)}
                                                autoSize={{
                                                    minRows: 10,
                                                    // maxRows: 15,
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="drawing-future">{item.future}</div>
                                    )}
                                </Card>
                            </Col>
                        );
                    })}
                </Space>
            </div>
            <Modal
                title="绘画设置"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="drawing-modal"
            >
                <Form
                    form={form}
                    name="dynamic_form"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{
                        sampler_name: 'Euler',
                        firstphase_width: '768',
                        firstphase_height: '512',
                        restore_faces: false,
                        enable_hr: false,
                        seed: -1,
                        steps: 25,
                        cfg_scale: 7,
                        denoising_strength: 0.7,
                        batch_size: 1,
                        hr_upscaler: 'Latent',
                        hr_second_pass_steps: 0,
                        hr_scale: 2,
                        negative_prompt:
                            'EasyNegative, NSFW:1.5, badhandv4, worst quality, low quality:1.4, greyscale, border, artist name, zombie, EasyNegativeV2, badhandv4:1.2, nipples, face, make up, nsfw, naked, nude, bad fingers, worst quality, low quality:1.3, bad-hands-5, bad-image-v2-39000, bad-picture-chill-75v, bad_prompt_version2, BadDream, badhandv4, By bad artist -neg, EasyNegative, EasyNegativeV2, simple background, logo, watermark, text, fused fingers, too many fingers, crossed fingers, prolapse, low quality, worst quality:1.4, :0.8, monochrome:1.1, extra fingers, blurry, bad anatomy, bad proportions, lineart, monochrome, Bad Artist Anime:1.6, bad-hands-3:2, Bad Artist OG, Bad Image v4, Bad Prompt v2, :1.6, bad_quality, Deep Negative v1.75T, V2:1.6, negprompt5, ng_deepnegative_v1_75t, simple5.6, low quality, worst quality:1.4, bad anatomy, inaccurate limb:1.2, bad composition, inaccurate eyes, extra digit, fewer digits, extra arms:1.2, multiple heads, Extra fingers, High contrast, high saturation, out of frame, duplicate, watermark, signature, text, ugly, morbid, mutated, deformed, blurry, bad anatomy, bad proportions, cloned face, disfigured, fused fingers, fused limbs, too many fingers, long neck, Extra legs, multiple heads, twisted legs, Bad anatomy, bad human structure, Misaligned body structure, The third foot, the twisted face, the twisted foot, twisted toes, blurred face, twisted face, Defective body, incomplete body, Blurred toes, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low',
                    }}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item name="sampler_name" label="采样器名称">
                                <Select placeholder="请选择采样器">
                                    {samplerOptions.map((option, index) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <Option key={index} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="firstphase_width" label="宽度">
                                <InputNumber min={0} onChange={handleWidthHeightChange} />
                            </Form.Item>
                            <Form.Item name="firstphase_height" label="高度">
                                <InputNumber min={0} onChange={handleWidthHeightChange} />
                            </Form.Item>
                            <Form.Item name="denoising_strength" label="重绘幅度(Denoising)">
                                <InputNumber min={0} max={1} step={0.1} />
                            </Form.Item>
                            <Form.Item name="tiling" label="切片处理" valuePropName="checked">
                                <Checkbox />
                            </Form.Item>
                            <Form.Item name="enable_hr" label="高清修复" valuePropName="checked">
                                <Checkbox onChange={(e) => handleEnableHrChange(e.target.checked)} />
                            </Form.Item>

                            <Form.Item name="hr_resize_x" label="高清调整宽度" hidden={!isHrEnabled}>
                                <InputNumber min={0} onChange={handleHrResizeChange} />
                            </Form.Item>
                            <Form.Item name="hr_resize_y" label="高清调整高度" hidden={!isHrEnabled}>
                                <InputNumber min={0} onChange={handleHrResizeChange} />
                            </Form.Item>
                            {/* <Form.Item name="prompt" label="提示">
                                <Input />
                            </Form.Item> */}
                        </Col>
                        <Col span={12}>
                            <Form.Item name="seed" label="种子">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name="steps" label="迭代步骤">
                                <InputNumber min={1} max={150} />
                            </Form.Item>
                            <Form.Item name="cfg_scale" label="提示词相关性">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name="batch_size" label="生成批次">
                                <InputNumber min={1} />
                            </Form.Item>
                            <Form.Item name="restore_faces" label="面部修复" valuePropName="checked">
                                <Checkbox />
                            </Form.Item>
                            <Form.Item name="hr_scale" label="放大倍率" hidden={!isHrEnabled}>
                                <InputNumber min={1} max={4} onChange={handleScaleChange} />
                            </Form.Item>
                            <Form.Item name="hr_upscaler" label="HR放大器" hidden={!isHrEnabled}>
                                <Select placeholder="请选择采样器">
                                    {hrOptions.map((option, index) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <Option key={index} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="hr_second_pass_steps" label="高清修复采样次数" hidden={!isHrEnabled}>
                                <InputNumber min={0} max={150} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="negative_prompt" label="负面提示">
                                <TextArea
                                    autoSize={{
                                        minRows: 8,
                                        // maxRows: 15,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
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

export default DrawingProduction;
