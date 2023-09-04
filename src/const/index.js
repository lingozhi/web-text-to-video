/**
 * 全局常量
 */

// 级别
export const importanceMap = {
    1: 'I 级',
    2: 'II 级',
    3: 'III 级',
};

export const levelMap = {
    all: '全部',
    1: '一级',
    2: '二级',
    3: '三级',
};

// 文件类型
export const fileTypeList = ['jpg', 'jpeg', 'png', 'mp4', 'xls', 'xlsx', 'doc', 'docx'];

// 创建类型
export const createTypeMap = {
    all: '全部',
    1: '手动',
    0: '报警派单',
};

// 工单状态
export const statusCodeMap = {
    all: '全部',
    1: '待处理',
    2: '处理中',
    3: '已处理',
};

// 紧急程度
export const level2Map = {
    all: '全部',
    1: '紧急',
    2: '高',
    3: '中',
    4: '低',
};

// 紧急程度列表
export const urgencyList = [
    { label: '紧急', value: 1 },
    { label: '高', value: 2 },
    { label: '中', value: 3 },
    { label: '低', value: 4 },
];

// execl 表头映射表
export const execlTitleMap = {
    p: {
        name: '有功功率P（kW）',
    },
    q: {
        name: '无功功率Q（kVar）',
    },
    ua: {
        name: 'Ua（V）',
    },
    ub: {
        name: 'Ub（V）',
    },
    uc: {
        name: 'Uc（V）',
    },
    uab: {
        name: 'Uab（V）',
    },
    ucb: {
        name: 'Ucb（V）',
    },
    ia: {
        name: 'Ia（A）',
    },
    ib: {
        name: 'Ib（A）',
    },
    ic: {
        name: 'Ic（A）',
    },
    vdua_dev: {
        name: 'A相（%）',
    },
    vdub_dev: {
        name: 'B相（%）',
    },
    vduc_dev: {
        name: 'C相（%）',
    },
    vduab_dev: {
        name: 'AB线（%）',
    },
    vducb_dev: {
        name: 'CB线（%）',
    },
    vdia: {
        name: 'A相（%）',
    },
    vdib: {
        name: 'B相（%）',
    },
    vdic: {
        name: 'C相（%）',
    },
    current: {
        name: '三相电流不平衡（%）',
    },
    voltage: {
        name: '三相电压不平衡（%）',
    },
};

// 工单类别
export const orderTypeMap = {
    temperature: '温度',
    residual_current: '漏电流',
    electric: '电参数',
    power_environment: '动环',
    examine: '检修维护',
    other: '其他',
};

// 工单类型
export const alarmTypeMap = {
    overTemp: '温度越限',
    overTempRange1min: '温升1分越限',
    overTempRange15min: '温升15分越限',
    overTempTrendDaily: '温度日前预警',
    overTempTrendQuarterly: '温度实时预警',
    overPT: '电容温度越限',

    overResidualCurrent: '漏电流',

    overPR: '负载率越限',
    overI: '过流',
    overU: '过压',
    underU: '欠压',
    unbalanceU: '三相电压不平衡',
    unbalanceI: '三相电流不平衡',
    overTHDU: '电压谐波越限',
    overTHDI: '电流谐波越限',
    underPhasePF: '单相功率因数越下限',
    underTotalPF: '总功率因数越下限',

    over_env_temp: '环境温度越限',
    high_env_humidity: '环境湿度过高',
    over_env_humidity: '环境湿度越限',
    smoke_detector: '烟感',
    water_logging: '水浸',
    entrance_guard_s_timeout: '门禁打开严重超时',
    entrance_guard_timeout: '门禁打开超时',
    entrance_guard: '门禁打开',

    power_cut: '停电',
    examine: '设备检修',
    maintenance: '设备保养',

    other: '其他',
};

// 工单类别 关联 工单类型
export const orderTypeOption = [
    {
        label: '温度',
        value: 'temperature',
        children: [
            { label: '温度越限', value: 'overTemp' },
            { label: '温升1分越限', value: 'overTempRange1min' },
            { label: '温升15分越限', value: 'overTempRange15min' },
            { label: '温度日前预警', value: 'overTempTrendDaily' },
            { label: '温度实时预警', value: 'overTempTrendQuarterly' },
            { label: '电容温度越限', value: 'overPT' },
        ],
    },
    { label: '漏电流', value: 'residual_current', children: [{ label: '漏电流', value: 'overResidualCurrent' }] },
    {
        label: '电参数',
        value: 'electric',
        children: [
            { label: '负载率越限', value: 'overPR' },
            { label: '过流', value: 'overI' },
            { label: '过压', value: 'overU' },
            { label: '欠压', value: 'underU' },
            { label: '三相电压不平衡', value: 'unbalanceU' },
            { label: '三相电流不平衡', value: 'unbalanceI' },
            { label: '电压谐波越限', value: 'overTHDU' },
            { label: '电流谐波越限', value: 'overTHDI' },
            { label: '单相功率因数越下限', value: 'underPhasePF' },
            { label: '总功率因数越下限', value: 'underTotalPF' },
        ],
    },
    {
        label: '动环',
        value: 'power_environment',
        children: [
            { label: '环境温度越限', value: 'over_env_temp' },
            { label: '环境湿度过高', value: 'high_env_humidity' },
            { label: '环境湿度越限', value: 'over_env_humidity' },
            { label: '烟感', value: 'smoke_detector' },
            { label: '水浸', value: 'water_logging' },
            { label: '门禁打开严重超时', value: 'entrance_guard_s_timeout' },
            { label: '门禁打开超时', value: 'entrance_guard_timeout' },
            { label: '门禁打开', value: 'entrance_guard' },
        ],
    },
    {
        label: '检修维护',
        value: 'examine',
        children: [
            { label: '停电', value: 'power_cut' },
            { label: '设备检修', value: 'examine' },
            { label: '设备保养', value: 'maintenance' },
        ],
    },
    { label: '其他', value: 'other', children: [{ label: '其他', value: 'other' }] },
];

// 工单类别 及 类型
export const orderTypeList = [
    {
        name: '全部',
        field: 'all',
        value: undefined,
    },
    {
        name: '温度',
        field: 'temperature',
        value: ['temperature'],
        children: [
            { name: '全部', field: 'all', value: undefined },
            { name: '温度越限', field: 'overTemp', value: ['overTemp'] },
            { name: '温升1分越限', field: 'overTempRange1min', value: ['overTempRange1min'] },
            { name: '温升15分越限', field: 'overTempRange15min', value: ['overTempRange15min'] },
            { name: '温度日前预警', field: 'overTempTrendDaily', value: ['overTempTrendDaily'] },
            { name: '温度实时预警', field: 'overTempTrendQuarterly', value: ['overTempTrendQuarterly'] },
            { name: '电容温度越限', field: 'overPT', value: ['overPT'] },
        ],
    },
    {
        name: '漏电流',
        field: 'residual_current',
        value: ['residual_current'],
        children: [{ name: '全部', field: 'all', value: undefined }],
    },
    {
        name: '电参数',
        field: 'electric',
        value: ['electric'],
        children: [
            { name: '全部', field: 'all', value: undefined },
            { name: '负载率越限', field: 'overPR', value: ['overPR'] },
            { name: '过流', field: 'overI', value: ['overI'] },
            { name: '过压', field: 'overU', value: ['overU'] },
            { name: '欠压', field: 'underU', value: ['underU'] },
            { name: '三相电压不平衡', field: 'unbalanceU', value: ['unbalanceU'] },
            { name: '三相电流不平衡', field: 'unbalanceI', value: ['unbalanceI'] },
            { name: '电压谐波越限', field: 'overTHDU', value: ['overTHDU'] },
            { name: '电流谐波越限', field: 'overTHDI', value: ['overTHDI'] },
            { name: '单相功率因数越下限', field: 'underPhasePF', value: ['underPhasePF'] },
            { name: '总功率因数越下限', field: 'underTotalPF', value: ['underTotalPF'] },
        ],
    },
    {
        name: '动环',
        field: 'power_environment',
        value: ['power_environment'],
        children: [
            { name: '全部', field: 'all', value: undefined },
            { name: '环境温度越限', field: 'over_env_temp', value: ['over_env_temp'] },
            { name: '环境湿度过高', field: 'high_env_humidity', value: ['high_env_humidity'] },
            { name: '环境湿度越限', field: 'over_env_humidity', value: ['over_env_humidity'] },
            { name: '烟感', field: 'smoke_detector', value: ['smoke_detector'] },
            { name: '水浸', field: 'water_logging', value: ['water_logging'] },
            { name: '门禁打开严重超时', field: 'entrance_guard_s_timeout', value: ['entrance_guard_s_timeout'] },
            { name: '门禁打开超时', field: 'entrance_guard_timeout', value: ['entrance_guard_timeout'] },
            { name: '门禁打开', field: 'entrance_guard', value: ['entrance_guard'] },
        ],
        // type: {
        //     // 报警的
        //     alarm: [
        //         { name: '全部', field: 'all', value: undefined },
        //         { name: '环境温度越限', field: 'over_env_temp', value: ['over_env_temp'] },
        //         { name: '环境湿度过高', field: 'high_env_humidity', value: ['high_env_humidity'] },
        //         { name: '环境湿度越限', field: 'over_env_humidity', value: ['over_env_humidity'] },
        //         { name: '烟感', field: 'smoke_detector', value: ['smoke_detector'] },
        //         { name: '水浸', field: 'water_logging', value: ['water_logging'] },
        //         { name: '门禁打开严重超时', field: 'entrance_guard_s_timeout', value: ['entrance_guard_s_timeout'] },
        //         { name: '门禁打开超时', field: 'entrance_guard_timeout', value: ['entrance_guard_timeout'] },
        //         { name: '门禁打开', field: 'entrance_guard', value: ['entrance_guard'] },
        //     ],
        //     // 工单的
        //     order: [
        //         { name: '全部', field: 'all', value: undefined },
        //         { name: '环境温度越限', field: 'over_env_temp', value: ['over_env_temp'] },
        //         { name: '环境湿度过高', field: 'high_env_humidity', value: ['high_env_humidity'] },
        //         { name: '环境湿度越限', field: 'over_env_humidity', value: ['over_env_humidity'] },
        //         { name: '烟感', field: 'smoke_detector', value: ['smoke_detector'] },
        //         { name: '水浸', field: 'water_logging', value: ['water_logging'] },
        //         { name: '门禁打开严重超时', field: 'entrance_guard_s_timeout', value: ['entrance_guard_s_timeout'] },
        //         { name: '门禁打开超时', field: 'entrance_guard_timeout', value: ['entrance_guard_timeout'] },
        //         { name: '门禁打开', field: 'entrance_guard', value: ['entrance_guard'] },
        //     ],
        // },
    },
    {
        name: '检修维护',
        field: 'examine',
        value: ['examine'],
        children: [
            { name: '全部', field: 'all', value: undefined },
            { name: '停电', field: 'power_cut', value: ['power_cut'] },
            { name: '设备检修', field: 'examine', value: ['examine'] },
            { name: '设备保养', field: 'maintenance', value: ['maintenance'] },
        ],
    },
    {
        name: '其他',
        field: 'other',
        value: ['other'],
        children: [{ name: '全部', field: 'all', value: undefined }],
    },
];
// 个人设置校验
export const phoneNumberReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; // 手机号校验
export const verificationCodeReg = /^\d{6}$/; // 验证码校验
export const verificationCodeNullTip = '验证码不能为空！';
export const verificationCodeErrorTip = '验证码格式不正确！';
export const verificationCodeMismatch = '验证码不匹配！';
export const phoneNumberNullTip = '手机号码不能为空！';
export const phoneNumberErrorTip = '手机号码格式不正确！';
