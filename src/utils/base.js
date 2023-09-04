/** ********************************************** 其它类操作方法 ***************************************************** */
/**
 * 根据传入的参数，返回数据类型
 * @param { type: any, desc: 传入的单个参数 } obj
 * @return { type: string, desc: 各种类型字符 }
 * */
export const getArgsType = (obj) => {
    const typeArr = [
        'String',
        'Number',
        'Boolean',
        'Object',
        'Array',
        'Undefined',
        'Null',
        'Date',
        'HTMLDocument',
        'HTMLCanvasElement',
        'Window',
    ];
    let type = '';
    typeArr.forEach((item) => {
        if (Object.prototype.toString.call(obj) === `[object ${item}]`) {
            type = item.toLocaleLowerCase();
        }
    });
    return type;
};

/** ********************************************** 优化类操作方法 ***************************************************** */
/**
 * 节流
 * @param {type:function, desc: 要被执行的函数（必填）} fn
 * @param {type:number, desc: 延迟时间} delay
 * @return {type:function}
 */
export const throttle = (fn, delay = 500) => {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last > delay) {
            last = now;
            fn.apply(this, args);
        }
    };
};

/**
 * 防抖
 * @param {type:function, desc: 要被执行的函数（必填）} fn
 * @param {type:number, desc: 延迟时间}
 * @return {type:function}
 */
export const debounce = (fn, delay = 500) => {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

/**
 * 动态加载script
 * @param {type: string, desc: script地址} url
 * @param {type: boolean, desc: true->插入到body最后, false->插入到head} injectBody
 * @param {type: object, desc: 其它参数设置} other
 */
export function loadScript(url, injectBody = true, other = {}) {
    const { id } = other;
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.onload = resolve;
        if (id) {
            script.setAttribute('id', id);
        }
        script.src = url;
        if (injectBody) {
            document.body.appendChild(script);
        } else {
            document.head.appendChild(script);
        }
    });
}

/**
 * 动态加载script
 * @param {type: string, desc: script地址} url
 * @param {type: boolean, desc: true->插入到body最后, false->插入到head} injectBody
 */
export const dynamicScript = (() => {
    const scriptMap = {};
    return (url, injectBody = true) => {
        if (scriptMap[url]) {
            return Promise.resolve(scriptMap[url]);
        }
        return new Promise((resolve, reject) => {
            scriptMap[url] = 'loading';
            const script = document.createElement('script');
            script.onload = () => {
                scriptMap[url] = 'loaded';
                resolve(scriptMap[url]);
            };
            script.onerror = () => {
                scriptMap[url] = null;
                script.remove();
                reject(scriptMap[url]);
            };
            script.src = url;
            if (injectBody) {
                document.body.appendChild(script);
            } else {
                document.head.appendChild(script);
            }
        });
    };
})();

/**
 * 动态加载script--防止多次加载
 * @param {type: string, desc: script地址} url
 * @param {type: boolean, desc: true->插入到body最后, false->插入到head} injectBody
 */
export const downloadLoadScript = (() => {
    const scriptMap = {};
    return (url, injectBody = true) => {
        if (scriptMap[url]) {
            return Promise.resolve(scriptMap[url]);
        }
        return new Promise((resolve, reject) => {
            scriptMap[url] = 'loading';
            const script = document.createElement('script');
            script.onload = () => {
                scriptMap[url] = 'loaded';
                resolve(scriptMap[url]);
            };
            script.onerror = () => {
                scriptMap[url] = null;
                script.remove();
                reject(scriptMap[url]);
            };
            script.src = url;
            if (injectBody) {
                document.body.appendChild(script);
            } else {
                document.head.appendChild(script);
            }
        });
    };
})();

/**
 * 动态加载xlsx
 */
export const xlsxLoad = () => {
    return Promise.all([
        downloadLoadScript('https://cdn.ucyber.cn/common/xlsx.full@0.18.5.min.js'),
        downloadLoadScript('https://cdn.ucyber.cn/common/xlsx-style@0.8.13.jszip.js'),
        downloadLoadScript('https://cdn.ucyber.cn/common/xlsx-style@0.8.13.js'),
    ]);
};

/** ********************************************** 网络类操作方法 ***************************************************** */

/**
 * 获取location链接上的query参数
 * @param {type: string, desc: search字段} name
 */
export function getQueryString(name) {
    const reg = new RegExp(`(^|&)${decodeURIComponent(name)}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substring(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * async 方法错误捕获
 * @param {type: Function, desc: 异步方法（必填） } asyncFunc
 * @param  {type: } data
 */
export const errorCapture = async (asyncFunc, ...data) => {
    try {
        const res = await asyncFunc(...data);
        return [null, res];
    } catch (e) {
        return [e, null];
    }
};

/**
 * async 方法错误捕获
 * @param {type: Function, desc: 异步方法（必填） } asyncFunc
 * @param  {type: } data
 */
export const errorCaptureRes = async (asyncFunc, ...data) => {
    try {
        const res = await asyncFunc(...data);
        if (res.code !== 200) {
            return [res.message || '未获取到信息', null];
        }
        return [null, res];
    } catch (e) {
        return [e, null];
    }
};

// url地址转成对象参数
export const urlParse = (str) => {
    const s = str.split('?');
    const params = {};
    if (s[1]) {
        s[1].split('&').forEach((query) => {
            const q = query.split('=');
            [, params[q[0]]] = q;
        });
    }
    return {
        url: s[0],
        params,
    };
};

/** ********************************************** 图片类操作方法 ***************************************************** */

/**
 * 图片转成base64
 * @param { type: string, desc: 图片地址 } imgSrc
 * @return {type: string, desc: base64图片}
 */
export const getBase64Image = (imgSrc) => {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = imgSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = (e) => {
            reject(e);
        };
    });
};

/** ********************************************** 时间类操作方法 ***************************************************** */
/**
 * 给日期格式带上单位
 * @param {type: string, desc:日期} curDate
 * @param {type: 'day'|'month'|'year', desc: 类型} curPicker
 */
export const datetimeUnit = (curDate, curPicker) => {
    switch (curPicker) {
        case 'day':
            return `${curDate.replace('-', '年').replace('-', '月')}日`;
        case 'month':
            return `${curDate.replace('-', '年')}月`;
        case 'year':
            return `${curDate}年`;
        default:
            return curDate;
    }
};

/**
 * 根据传入的整数，返回对应的日期
 * @param {type: number, desc: 整数（必填）} num
 * @return {type: string, desc: 日期 yyyy-MM-dd}
 */
export const getYTTdate = (num) => {
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * num);
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    const res = `${date.getFullYear()}-${month}-${day}`;
    return res;
};

/** ********************************************** 对象类操作方法 ***************************************************** */

/**
 * 对象深拷贝
 * @param {type:object, desc: 被拷贝对象（必填）} obj
 * @param {type:object, desc: 缓存对象} cache
 * @return {type:object, desc: 新对象}
 */
export const deepClone = (obj, cache = new WeakMap()) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);

    if (cache.has(obj)) return cache.get(obj); // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
    const cloneObj = new obj.constructor(); // 使用对象所属的构造函数创建一个新对象
    cache.set(obj, cloneObj); // 缓存对象，用于循环引用的情况

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloneObj[key] = deepClone(obj[key], cache); // 递归拷贝
        }
    }
    return cloneObj;
};

/** ********************************************** 数字类操作方法 ***************************************************** */

/**
 * 获取随机范围数
 * @param {type:number, desc:最小值} min
 * @param {type:number, desc:最大值} max
 * @return {type:number, desc: 范围数}
 */
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 数字转化为大写金额
 * @param {type: n, desc: 数值} val
 */
export const digitUppercase = (n) => {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟'],
    ];
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s
        .replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};

/**
 * 数字转化为中文数字
 * @param {type: n, desc: 数值} value
 */
export const intToChinese = (value) => {
    const str = String(value);
    const len = str.length - 1;
    const idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
    const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    return str.replace(/([1-9]|0+)/g, ($, $1, idx) => {
        let pos = 0;
        if ($1[0] !== '0') {
            pos = len - idx;
            if (idx === 0 && $1[0] === 1 && idxs[len - idx] === '十') {
                return idxs[len - idx];
            }
            return num[$1[0]] + idxs[len - idx];
        }
        const left = len - idx;
        const right = len - idx + $1.length;
        if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
            pos = left - (left % 4);
        }
        if (pos) {
            return idxs[pos] + num[$1[0]];
        }
        if (idx + $1.length >= len) {
            return '';
        }
        return num[$1[0]];
    });
};

/**
 * 对于10000以上的数据做转换（配合单位转换）
 * @param { type: number, desc: 需要转换的数值 } val
 */
export const dataTransform = (val, precision = 2) => {
    if (!val) {
        return val;
    }
    const max = val / 10000;
    if (max > 1 || max < -1) {
        return parseFloat(max.toFixed(precision));
    }
    return parseFloat((val - 0).toFixed(precision));
};

// 数据转换
export const calcData = (data, defaultRes = '--') => {
    if (data === '' || data === null || isNaN(data)) {
        return defaultRes;
    }
    const transFormedData = dataTransform(data);
    return transFormedData;
};

/**
 * 对于10000以上的数据，进行单位转换
 * @param {type: number, desc: 需要进行单位转换的数值} val
 * @param {type: string, desc: 基本单位} baseUnit
 */
export const unitTransform = (val, baseUnit) => {
    if (!val && val !== 0) {
        return baseUnit;
    }
    const max = val / 10000;
    if (max > 1 || max < -1) {
        return `万${baseUnit}`;
    }
    return baseUnit;
};

/**
 * 数字格式化
 * @param {type: number | string, desc: 数值（必填）} num
 * @param {type: number, desc: 保留位数} digit
 * @param {type: boolean, desc: 是否要进行千分位处理 } toThousand
 * @return {type: string, desc: 数字字符串}
 * @param {type: string, desc: 没数据时候的符号} nodataSymbol
 */
export const numFormat = (num, digit = 2, toThousand = true, nodataSymbol = '--') => {
    if (!num && num !== 0) return nodataSymbol;
    let r = num;
    if (typeof num === 'string') {
        r = Number(num);
    }
    r = r.toFixed(digit);
    const str = r.toString();
    if (toThousand) {
        const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
        return str.replace(reg, '$1,');
    }
    return str;
};

export const numFloorFormat = (num, digit = 2, nodataSymbol = '--') => {
    if (num === '' || num === null) {
        return nodataSymbol;
    }

    if (isNaN(num)) {
        return nodataSymbol;
    }
    const n = Number(num);
    return (Math.floor(n * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit);
};

/**
 * 验证数字是否在min-max范围内，
 * @param {type: number | string, desc: 数值（必填）} value
 * @param {type: boolean | string, desc: value是否要是整数} isInteger
 * @param {type: number, desc: 最小} min
 * @param {type: boolean, desc: 是否包括最小值} minEqualInclude
 * @param {type: number, desc: 最大 } max
 * @param {type: boolean, desc: 是否包括最大值} maxEqualInclude
 * @return {type: boolean, desc: 数字是否在整数min-max范围内}
 */
export function validateInteger(value, min, max, isInteger = true, maxEqualInclude = true, minEqualInclude = true) {
    if (value === '' || value === null) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }

    const num = Number(value);

    // 如果value必须是整数，那么判断
    if (isInteger && !Number.isInteger(num)) {
        return false;
    }
    // 大于max
    if (num > max || (!maxEqualInclude && num === max)) {
        return false;
    }
    // 小于min
    if (num < min || (!minEqualInclude && num === min)) {
        return false;
    }

    return true;
}

/** ********************************************** 字符串类操作方法 ***************************************************** */
/**
 * 空值处理
 * @param {type: null | undefined | '', desc: 空值（必填） } data
 * @return {type: any}
 */
export const emptyFormat = (data) => {
    if (!data && data !== 0) return '--';
    return data;
};

/**
 * 计算字符串长度(英文占1个字符，中文汉字占2个字符)
 * @param {type: string, desc: 转换字符串 } str
 * @return {type:number, desc: 字符长度}
 */
export const strlen = (str) => {
    if (typeof str !== 'string') {
        str = String(str);
    }
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
};

/**
 * 手机号中间六位变成*
 * @param {type: number | string, desc: 手机号（必填）} phoneNum
 */
export const phoneMosaic = (phoneNum) => {
    if (phoneNum) {
        let num = phoneNum;
        num = `${num.substr(0, 3)}******${num.substr(9)}`;
        return num;
    }
    return '';
};

/**
 * 生成随机字符串
 * @param {type: number, desc: 字符串长度 } len
 * @return {type: string, desc: 随机字符串 }
 */
export const randomString = (len) => {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
    const strLen = chars.length;
    let randomStr = '';
    for (let i = 0; i < len; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * strLen));
    }
    return randomStr;
};

/**
 * 字符串首字母大写
 * @param {type: string, desc: 需要转换的字符串 } str
 * @return {type: string, desc: 字符串 }
 */
export const firstLetterUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 驼峰命名转换成短横线命名
 * @param {type: string, desc: 需要转换的字符串 } str
 * @return {type: string, desc: 字符串 }
 */
export const getKebabCase = (str) => {
    return str.replace(/[A-Z]/g, (item) => `-${item.toLowerCase()}`);
};

/**
 * 短横线命名转换成驼峰命名
 * @param {type: string, desc: 需要转换的字符串 } str
 * @return {type: string, desc: 字符串 }
 */
export const getCamelCase = (str) => {
    return str.replace(/-([a-z])/g, (_, item) => item.toUpperCase());
};

/** ********************************************** 数组类操作方法 ***************************************************** */
/**
 * 柯里化方法，解决百分比精度及相加不等于100%的问题（此方法来自echarts）
 * @param {type: number[], desc: 值为数字的数组} list
 * @param {type: number, desc: 保留小数位数} precision
 * @return {type: func}
 * @example
 * const list = [1,2,3];
 * percentPrecision(list)(0)
 * percentPrecision(list)(1)
 * percentPrecision(list)(2)
 */
export const percentPrecision = (list, precision = 2) => {
    const sum = list.reduce((acc, val) => {
        return acc + (isNaN(val) ? 0 : val);
    }, 0);

    const digits = Math.pow(10, precision);
    // 扩大比例
    const votesPerQuota = list.map((val) => {
        return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
    });
    const targetSeats = digits * 100;

    const seats = votesPerQuota.map((votes) => {
        return Math.floor(votes);
    });

    let currentSum = seats.reduce((acc, val) => {
        return acc + val;
    }, 0);

    const remainder = votesPerQuota.map((votes, idx) => {
        return votes - seats[idx];
    });

    while (currentSum < targetSeats) {
        let max = Number.NEGATIVE_INFINITY;
        let maxId = null;
        for (let i = 0, len = remainder.length; i < len; ++i) {
            if (remainder[i] > max) {
                max = remainder[i];
                maxId = i;
            }
        }
        ++seats[maxId];
        remainder[maxId] = 0;
        ++currentSum;
    }

    return function calcPercent(idx) {
        if (!list[idx]) {
            return 0;
        }
        if (sum === 0) {
            return 0;
        }
        return seats[idx] / digits;
    };
};

/**
 * 数组乱序
 * @param { type: any[], desc: 任意类型数组 } arr
 * @return { type: any[], desc: 已打乱的数组 } arr
 */
export const arrScrambling = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
};

/**
 * 数组去重
 * @param {type: any[], desc: 数组} arr
 * @return {type: any[], desc: 已去重的数组} arr
 */
export const arrUnique = (arr) => {
    if (Array.isArray(arr)) {
        return [...new Set(arr)];
    }
    return [];
};

/**
 * 获取一个数组中的随机值
 * @param { type: any[], desc: 任意类型数组 } arr
 * @return { type: any, desc: 数组中的其中一个数值 } any
 */
export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * 计算两数百分比
 * @param { type: number, desc: 任意整型数 } num
 * @param { type: number, desc: 任意整型数 } total
 * @return { type: string, desc: 一个百分比 } string
 */

export const calculatingProportion = (num, total) => {
    if (!num || !total) {
        return `${0}%`;
    }
    return `${((num / total) * 100).toFixed(2)}%`;
};
