/* eslint-disable jsx-a11y/media-has-caption */
import './index.less';
import React, { useEffect, useState, useRef } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Space, Button, Form, InputNumber, Tooltip, Input, Modal, message, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoFreeVideo, fetchRedrawParagraph } from '@/api';
import CardDisplay from '../card-display';
import EditCard from '../edit-card';
import { setCards } from '@/store/modules/global';

const { TextArea } = Input;

function NovelTreatment() {
    const dispatch = useDispatch();
    const initialData = JSON.parse(localStorage.getItem('novelData')) || [];
    const [data, setData] = useState(initialData);
    dispatch(setCards(initialData));
    useEffect(() => {
        localStorage.setItem('novelData', JSON.stringify(data));
    }, [data]);
    const [editingCardIndex, setEditingCardIndex] = useState(null);
    const scrollRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleEdit = (index) => {
        setScrollPosition(scrollRef.current.scrollLeft);
        setEditingCardIndex(index);
    };
    const [laro, setLaro] = useState('');
    const handleSave = (updatedCard) => {
        // 这里你可以添加将更新后的卡片保存到服务器的逻辑
        setData(data.map((card, index) => (index === editingCardIndex ? updatedCard : card)));
        setEditingCardIndex(null);
        dispatch(setCards(data.map((card, index) => (index === editingCardIndex ? updatedCard : card))));
    };
    // 当完成编辑后，重新设置滚动位置
    useEffect(() => {
        if (editingCardIndex === null) {
            scrollRef.current.scrollLeft = scrollPosition;
        }
    }, [editingCardIndex, scrollPosition]);

    const handleReset = async (card) => {
        try {
            const response = await fetchRedrawParagraph({ part: card.part });
            const updatedTranslate = response.data;

            // 找到对应的卡片并更新 translate 值
            const updatedCards = data.map((c) => {
                if (c.index === card.index) {
                    return { ...c, translate: updatedTranslate };
                }
                return c;
            });

            setData(updatedCards); // 更新卡片数组
            dispatch(setCards(updatedCards));
        } catch (error) {
            console.error('重置失败', error);
        }
    };
    const [inputs, setInputs] = useState([
        { id: Math.random(), value: '', placeholder: '请输入角色和角色特征如：张山=一位中年男子' },
    ]);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState('');
    const [num, setNum] = useState(0);
    const resetInputs = () => {
        const id = Math.random();
        setTagName('');
        setNum('');
        const newTag = {
            id, // 新标签的 id
            text: '', // 新标签的名字
            values: [''], // 新标签的值
        };
        setTags([...tags, newTag]);
        setSelectedTag(id);
        setInputs([
            {
                id, // 新输入的 id
                value: '', // 新输入的值
                placeholder: '请输入角色和角色特征如：张山=一位中年男子',
            },
        ]);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLaro, setIsOpenLaro] = useState(false);
    const addInput = () => {
        setInputs(
            inputs.concat({ id: Math.random(), value: '', placeholder: '请输入角色和角色特征如：张山=一位中年男子' })
        );
    };

    const removeInput = (id) => {
        setInputs(inputs.filter((input) => input.id !== id));
    };

    const handleInputChange = (id, newValue) => {
        setInputs(inputs.map((input) => (input.id === id ? { ...input, value: newValue } : input)));
    };

    const saveRoles = () => {
        const updatedTags = tags.map((tag) =>
            tag.id === selectedTag ? { ...tag, values: inputs.map((input) => input.value), text: tagName, num } : tag
        );
        setTags(updatedTags);
        localStorage.setItem('tags', JSON.stringify(updatedTags));
    };

    // 在 removeTag 函数中，删除标签并更新localStorage
    const removeTag = (id) => {
        const remainingTags = tags.filter((tag) => tag.id !== id);
        setTags(remainingTags);

        // 更新localStorage
        localStorage.setItem('tags', JSON.stringify(remainingTags));

        if (id === selectedTag) {
            // 如果删除的是当前选中的标签，将选中的标签设置为剩余标签的第一个，如果没有剩余的标签，设置为null
            const newSelectedTag = remainingTags.length > 0 ? remainingTags[0] : null;
            setSelectedTag(newSelectedTag ? newSelectedTag.id : null);

            // 更新 inputs 的状态来反映新选中的标签的值
            if (newSelectedTag) {
                setTagName(newSelectedTag.text);
                setNum(newSelectedTag.num);
                setInputs(
                    newSelectedTag.values.map((value, index) => ({
                        id: index, // 重新分配ID以匹配新的输入数组
                        value,
                        placeholder: '请输入角色和角色特征如：张山=一位中年男子',
                    }))
                );
            } else {
                setTagName('');
                setNum();
                setInputs([
                    {
                        id: inputs.length, // use current length as id
                        value: '', // empty string as initial value
                        placeholder: '请输入角色和角色特征如：张山=一位中年男子',
                    },
                ]);
            }
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handle = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCan = () => {
        setIsOpen(false);
    };
    const handleTagClick = ({ id, text, values, num }) => {
        setSelectedTag(id);
        setTagName(text);
        setNum(num);
        setInputs(
            values.map((value, index) => ({
                id: index, // 重新分配ID以匹配新的输入数组
                value,
                placeholder: '请输入角色和角色特征如：张山=一位中年男子',
            }))
        );
    };
    useEffect(() => {
        let savedTags = localStorage.getItem('tags');
        savedTags = savedTags ? JSON.parse(savedTags) : []; // if savedTags is null, set it to an empty array

        if (savedTags.length) {
            setTags(savedTags);
            handleTagClick(savedTags[0]);
        } else {
            resetInputs();
        }
    }, []);
    const [siteValue, setSiteValue] = useState(localStorage.getItem('site') || '');
    const [keyValue, setKeyValue] = useState(localStorage.getItem('key') || '');

    const [loading, setLoading] = useState(false);
    const [siteLoad, setSiteLoad] = useState();
    const [keyLoad, setKeyLoad] = useState();
    const [open, setOpen] = useState(false);

    // 第一次加载页面时，从localStorage获取keyValue
    useEffect(() => {
        const savedKeyValue = localStorage.getItem('key_api');
        if (savedKeyValue) {
            setKeyValue(savedKeyValue);
        }
    }, []);

    // keyValue改变时，保存至localStorage
    useEffect(() => {
        localStorage.setItem('key_api', keyValue);
    }, [keyValue]);
    const getData = async () => {
        setData([]);
        dispatch(setCards([]));
        const tagToSend = tags.find((tag) => tag.id === selectedTag);

        const { values, num } = tagToSend;
        const obj = values
            .map(function (item) {
                const splitItem = item.split('=');
                const key = splitItem[0];
                const value = splitItem[1];
                return { [key]: value };
            })
            .reduce(function (acc, curr) {
                return { ...acc, ...curr };
            });
        try {
            const res = await fetchDoFreeVideo({
                replace_dict: obj,
                text_num: parseInt(num, 10),
                api_key: keyValue,
                textAreaValue,
            });
            const { data } = res;
            setData(data);
            dispatch(setCards(data));
        } catch (error) {
            message.error('分镜制作失败，请重试！');
        }
        setLoading(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const show = () => {
        setIsOpen(true);
    };
    const handleOkLora = () => {
        const laroArr = laro.split('=');
        setIsOpenLaro(false);
        const updatedCards = data.map((card) => {
            if (card.part.includes(laroArr[0])) {
                return {
                    ...card,
                    translate: `${card.translate}${laroArr[1]}`,
                };
            }
            return card;
        });

        setData(updatedCards);
        dispatch(setCards(updatedCards));
        message.success('已将lora添加到文本翻译最后');
    };
    const handleCanLora = () => {
        setIsOpenLaro(false);
    };
    const showLora = () => {
        setIsOpenLaro(true);
    };
    const addLora = () => {};
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    // 创建一个防抖的getData函数
    const debounceGetData = debounce(getData, 2000);
    return (
        <div className="novel-treatment">
            <div className="novel-treatment-btn">
                <div className="list">
                    <div className="ipt">
                        <Input
                            placeholder="请输入key_api"
                            value={keyValue}
                            onChange={(e) => {
                                setKeyValue(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <Space wrap>
                    <Button onClick={show}>输入文章</Button>
                    <Button onClick={showModal}>小说处理设置</Button>
                    <Button
                        onClick={() => {
                            if (!keyValue || textAreaValue.length === 0) {
                                message.warning('请检查文章地址或者chatKey是否没有输入！');
                                setLoading(false);
                                return;
                            }

                            setLoading(true);
                            // 成功消息立即显示
                            message.success('开始制作,请查看终端!');
                            // 调用防抖的getData函数
                            debounceGetData();
                        }}
                    >
                        制作分镜
                    </Button>
                    <Button onClick={showLora}>添加人物LORA</Button>
                </Space>
            </div>
            <div className="novel-treatment-form" ref={scrollRef}>
                {editingCardIndex !== null ? (
                    <EditCard card={data[editingCardIndex]} onSave={handleSave} />
                ) : (
                    data.map((card, index) => (
                        <CardDisplay
                            key={card.index}
                            card={card}
                            onEdit={() => handleEdit(index)}
                            onReset={handleReset}
                        />
                    ))
                )}
            </div>
            <Modal title="小说处理设置" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className="novel">
                <div className="treatment-modal">
                    <div className="input-set">
                        <div className="lable">小说名字：</div>
                        <Input
                            placeholder="请输入小说名字"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                        />
                    </div>
                    <div className="input-set no-show">
                        <div className="lable">语句合并字数：</div>
                        <Input placeholder="请输入数字" value={num} onChange={(e) => setNum(e.target.value)} />
                    </div>
                    {inputs.map((input) => (
                        <Space key={input.id} style={{ display: 'flex' }} align="center" size={25}>
                            <div className="input-set">
                                <div className="lable">角色特征：</div>
                                <Input
                                    placeholder={input.placeholder}
                                    value={input.value}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                />
                            </div>
                            <Tooltip title="删除">
                                <MinusCircleOutlined
                                    onClick={() => removeInput(input.id)}
                                    style={{ fontSize: '16px', color: '#999' }}
                                />
                            </Tooltip>
                        </Space>
                    ))}
                    <Space style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                        <Button onClick={addInput}>添加角色特征</Button>
                        <Button
                            onClick={() => {
                                saveRoles();
                                handleOk();
                            }}
                        >
                            保存设置
                        </Button>
                        <Button onClick={resetInputs}>添加新小说</Button>
                    </Space>
                    <div style={{ marginTop: 16 }}>
                        <Space wrap>
                            {tags.map((tag) => (
                                <div key={tag.id}>
                                    <Tag
                                        closable
                                        onClose={() => removeTag(tag.id)}
                                        style={{ marginRight: 8 }}
                                        onClick={() => handleTagClick(tag)}
                                        color={tag.id === selectedTag ? 'success' : ''}
                                    >
                                        {tag.text}
                                    </Tag>
                                </div>
                            ))}
                        </Space>
                    </div>
                </div>
            </Modal>
            <Modal title="输入文章" open={isOpen} onOk={handle} onCancel={handleCan} width={600}>
                <TextArea
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                    placeholder="输入小说"
                    autoSize={{
                        minRows: 30,
                        // maxRows: 15,
                    }}
                />
            </Modal>
            <Modal title="添加人物Lora" open={isOpenLaro} onOk={handleOkLora} onCancel={handleCanLora} width={600}>
                <Input placeholder="张三=<asasfasdf>" onChange={(e) => setLaro(e.target.value)} />
            </Modal>
        </div>
    );
}

export default NovelTreatment;
