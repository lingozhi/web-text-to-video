/** ********************************************** 业务操作类方法 ***************************************************** */
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { cookies } from './storage';
import { numFormat } from './base';

dayjs.extend(quarterOfYear);

/**
 * 下载execl 数据
 * @param {type: xlsx , desc: xlsx 组件对象} xlsxObj
 * @param {type: json , desc: 写入excel的json数据 } dataJson
 * @param {type: string , desc: excel文件名 } fileName
 * @example
 *      dataJson = [
 *         { 大标题: null },
 *         { null: '大标题' },
 *         { null: '大标题' },
 *         { null: '大标题' },
 *         { Name: 'name_01', Age: 21, Address: 'address_01' },
 *         { Name: 'name_02', Age: 22, Address: 'address_02' },
 *         { Name: 'name_03', Age: 23, Address: 'address_03' },
 *      ];
 * */
export const downLoadXlsxData = (xlsxObj, dataJson, fileName, sheetNames) => {
    const sheetNameList = sheetNames || ['Sheet1'];
    // const jsonToSheet = xlsxObj.utils.json_to_sheet(dataJson); // 通过工具将json转表对象
    // const keys = Object.keys(jsonToSheet).sort(); // 排序 [需要注意，必须从A1开始]
    // const ref = `${keys[1]}:${keys[keys.length - 1]}`; // 这个是定义一个字符串 也就是表的范围[A1:C5]
    const sheets = {};
    if (sheetNameList.length > 1) {
        sheetNameList.forEach((item, index) => {
            const json = xlsxObj.utils.json_to_sheet(dataJson[index]);
            sheets[item] = { ...json };
        });
    } else {
        const json = xlsxObj.utils.json_to_sheet(dataJson);
        sheets[sheetNameList[0]] = { ...json };
    }
    const workbook = {
        SheetNames: sheetNameList,
        Sheets: sheets,
    };
    xlsxObj.writeFile(workbook, `${fileName}.xls`); // 将数据写入文件
};

/**
 * 日期范围处理
 * @param { type: 'day' | 'month' | 'year' | 'range', desc: 日期字段 } picker
 * @param { type: string, desc: 日期字符串 } date
 * @param { type: boolean, desc: 是否包含时间  } hasTime
 * @return {type: object {start_time: 开始日期，end_time: 结束日期}}
 */
export const pickDateRange = (picker, date, hasTime = true) => {
    let start_time = ''; // 开始时间
    let end_time = ''; // 结束时间
    switch (picker) {
        case 'date':
        case 'day': // 日
            start_time = `${date}${hasTime ? ' 00:00:00' : ''}`;
            end_time = `${date}${hasTime ? ' 23:59:59' : ''}`;
            break;
        case 'month': // 月
            start_time = `${date}-01${hasTime ? ' 00:00:00' : ''}`;
            end_time = dayjs(date)
                .endOf('month')
                .format(`YYYY-MM-DD${hasTime ? ' HH:mm:ss' : ''}`);
            break;
        case 'year': // 年
            start_time = `${date}-01-01${hasTime ? ' 00:00:00' : ''}`;
            end_time = dayjs(date)
                .endOf('year')
                .format(`YYYY-MM-DD${hasTime ? ' HH:mm:ss' : ''}`);
            break;
        case 'quarter': {
            // 季度
            const year = date.split('q')[0];
            const quarter = date.split('q')[1];
            const quarterMap = {
                1: ['01', '03'],
                2: ['04', '06'],
                3: ['07', '09'],
                4: ['10', '12'],
            };
            start_time = `${year}-${quarterMap[quarter][0]}-01${hasTime ? ' 00:00:00' : ''}`;
            end_time = `${dayjs(dayjs(`${year}-${quarterMap[quarter][1]}`))
                .endOf('month')
                .format('YYYY-MM-DD')}${hasTime ? ' 23:59:59' : ''}`;
            break;
        }
        case 'range': // 范围
            if (date[0].length === 10) {
                // 日
                start_time = `${date[0]}${hasTime ? ' 00:00:00' : ''}`;
                end_time = `${date[1]}${hasTime ? ' 23:59:59' : ''}`;
            } else {
                // 时
                start_time = `${date[0]}`;
                end_time = `${date[1]}`;
            }
            break;
        default:
    }
    return {
        start_time,
        end_time,
    };
};

/**
 * 根据条件返回颜色
 * @param {type:number, desc:数值} value1
 * @param {type:string, desc:比较符} condition
 * @param {type:number, desc:数值} value2
 * @param {type:string, desc:类名} className
 * */
export const conditionsColor = (value1, condition, value2, className) => {
    switch (condition) {
        case '>':
            if (value1 > value2) {
                return className;
            }
            break;
        case '<':
            if (value1 < value2) {
                return className;
            }
            break;
        case '=':
            if (value1 === value2) {
                return className;
            }
            break;
        default:
    }
    return 'light-blue-color';
};

/**
 * 获取近三天日期
 * @return { type: string[] }
 */
export const getDefault3Day = () => {
    return [
        dayjs().subtract(2, 'days').format('MM-DD'),
        dayjs().subtract(1, 'days').format('MM-DD'),
        dayjs().format('MM-DD'),
    ];
};

/**
 * 退出登录
 */
export const exitLogin = () => {
    localStorage.clear();
    cookies.clear();
    window.location.href = '/login';
};

/**
 * 获取当前tree的id
 */
export const getTreeId = (tree, name) => {
    for (let i = 0, len = tree.length; i < len; i++) {
        if (tree[i].name === name) {
            return tree[i].id;
        }
        if (tree[i]?.children?.length) {
            const res = getTreeId(tree[i].children, name);
            if (res) {
                return res;
            }
        }
    }
    return null;
};

/**
 * 获取当前选中的tree名称
 */
export const getTreeName = (tree, id) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            return tree[i].name;
        }
        if (tree[i].children && tree[i].children.length > 0) {
            const res = getTreeName(tree[i].children, id);
            if (res) {
                return res;
            }
        }
    }
    return '';
};

/**
 * 获取当前选中的tree的 mtid | mtids
 */
export const getTreeMtids = (tree, id, field) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            return tree[i][field];
        }
        if (tree[i].children && tree[i].children.length > 0) {
            const res = getTreeMtids(tree[i].children, id, field);
            if (res) {
                return res;
            }
        }
    }
    return '';
};

/**
 * 本月时间段
 */
export const thisMonthTime = () => {
    const start_time = `${dayjs().startOf('month').format('YYYY-MM-DD')} 00:00:00`;
    const end_time = `${dayjs().endOf('month').format('YYYY-MM-DD')} 23:59:59`;
    return {
        start_time,
        end_time,
    };
};

/**
 * 获取近30天数据（包括今天）
 */
export const nearly30Day = () => {
    const start_time = `${dayjs().subtract(29, 'day').format('YYYY-MM-DD')} 00:00:00`;
    const end_time = `${dayjs().subtract(0, 'day').format('YYYY-MM-DD')} 23:59:59`;
    return {
        start_time,
        end_time,
    };
};

/**
 * 获取本月数据（截止到当前时间段）
 */
export const thisMonthDay = () => {
    const start_time = `${dayjs().startOf('month').format('YYYY-MM-DD')} 00:00:00`;
    const end_time = `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`;
    return {
        start_time,
        end_time,
    };
};

/**
 * 获取近12个月数据（不包括本月）
 */
export const nearly12Month = () => {
    const start_time = `${dayjs().subtract(12, 'month').startOf('month').format('YYYY-MM-DD')} 00:00:00`;
    const end_time = `${dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')} 23:59:59`;
    return {
        start_time,
        end_time,
    };
};

/**
 * 16进制颜色转rgba
 */
export const hexToRgba = (hex, opacity) => {
    if (!hex) return 'rgb(253 88 88 / 80%) 0px 1px 8px 1px';
    return `rgba(${parseInt(`0x${hex.slice(1, 3)}`, 16)},${parseInt(`0x${hex.slice(3, 5)}`, 16)},${parseInt(
        `0x${hex.slice(5, 7)}`,
        16
    )},${opacity})`;
};

export const downloadBlob = (obj, filename) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(obj);
    link.click();
    URL.revokeObjectURL(obj);
};
export const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        // eslint-disable-next-line no-bitwise
        view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
};

/**
 * 数组或对象的值字符串转数值
 * @param {type: array || object , desc: 数组或对象列表} val
 * @example ['11.1','22'] => [11.1, 22]
 * @example {a:'11.1', b:'22'} => [11.1, 22]
 * */
export function valueStringToNumber(val) {
    const toStr = Object.prototype.toString;
    if (toStr.call(val) === '[object Object]') {
        const nVal = {};
        Object.keys(val).forEach((key) => {
            nVal[key] = parseFloat(val[key]);
        });
        return nVal;
    }
    if (toStr.call(val) === '[object Array]') {
        const nVal = [];
        val.forEach((item) => {
            nVal.push(parseFloat(item));
        });
        return nVal;
    }
    return val;
}

// 当前时间垂直标准线位置判断
export const verticalMarkNowLineTime = (data = [], time) => {
    let rTime = '';
    let searchSwitch = true;
    const dataArr = [...data];
    const dataTime = [...time];
    dataArr.reverse();
    dataTime.reverse();
    dataArr.forEach((val, index) => {
        if (val !== '' && searchSwitch) {
            rTime = dataTime[index];
            searchSwitch = false;
        }
    });
    return rTime;
};

/**
 * 图片预加载
 * @param {type: array, desc: 需要预加载的图片列表 } images
 * @param {type: func, desc: 加载完成后的回调} cb
 */
export const loadimages = (images, cb) => {
    const promiseAll = [];
    const imgs = [];
    for (let i = 0, len = images.length; i < len; i++) {
        promiseAll[i] = new Promise((resolve, reject) => {
            imgs[i] = new Image();
            imgs[i].src = images[i];
            imgs[i].onload = () => {
                resolve(imgs[i]);
            };
            imgs[i].onerror = () => {
                reject();
            };
        });
    }
    Promise.all(promiseAll).then((imgs) => {
        cb(imgs);
    });
};

// 判断播放列表是否有播放的元素，有则暂停
export const stopAllVideo = () => {
    if (window._ezuikit_list && window._ezuikit_list.length) {
        window._ezuikit_list.forEach((item) => {
            if (item.isPlay) {
                item.el.stop();
            }
        });
        window._ezuikit_list = [];
        return false;
    }
    return true;
};

/**
 * 数值相乘
 * @param {type:number, desc: 数值} num
 * @param {type:number, desc: 倍数} multiple
 * @param {type: number, desc: 保留位数} digit
 */
export const numFormatMultiple = (num, multiple, digit) => {
    if (!num && num !== 0) return '--';
    return numFormat(num * multiple, digit || digit === 0 ? digit : 2);
};

/**
 * 超过60分钟转小时
 */
export const minuteToHour = (num) => {
    if (!num && num !== 0) return '--分';
    return num >= 60 ? `${Math.floor(num / 60)}小时${Math.floor(num % 60)}分` : `${num}分`;
};
