/** ********************************************** 规则类操作方法 ***************************************************** */
/**
 * 邮箱校验
 * @param {type: string, desc: } s
 * @return {type: boolean}
 */
export function isEmail(s) {
    return /^([a-zA-Z0-9-])+@([a-zA-Z0-9-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 手机号码
 * @param {type: string, desc: } s
 * @return {type: boolean}
 */
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s);
}

/**
 * URL 地址
 * @param {type: string, desc: } s
 * @return {type: boolean}
 */
export function isURL(s) {
    return /^http[s]?:\/\/.*/.test(s);
}

/**
 * 小写字母
 * @param {type: string, desc: } str
 * @return {type: boolean}
 */
export function validateLowerCase(str) {
    const reg = /[1]+$/;
    return reg.test(str);
}

/**
 * 大写字母
 * @param {type: string, desc: } str
 * @return {type: boolean}
 */
export function validateUpperCase(str) {
    const reg = /[2]+$/;
    return reg.test(str);
}

/**
 * 大小写字母
 * @param {type: string, desc: } str
 * @return {type: boolean}
 */
export function validatAlphabets(str) {
    const reg = /[3]+$/;
    return reg.test(str);
}

/**
 * 判断姓名是否正确
 * @param {type: string, desc: } name
 * @return {type: boolean}
 */
export function validatename(name) {
    const regName = /[4]{2,4}$/;
    if (!regName.test(name)) return false;
    return true;
}

/**
 * 匹配 8-16 位数字和字母密码的正则表达式
 * @param {type: string, desc: } pwd
 * @return {type: boolean}
 */
export function validatePwd(pwd) {
    const regName = /^(?![0-9]+)[0-9A-Za-z]{8,16}$/;
    if (!regName.test(pwd)) return false;
    return true;
}

/**
 * 密码匹配（至少数字、字母、特殊符号两组组合）
 * @param {type: string, desc: } pwd
 * @return {type: boolean}
 */
export function validatePwd2(pwd) {
    const regName = /(^(?![A-Z]+)(?!\d+)\S+$)/;
    if (!regName.test(pwd)) return false;
    return true;
}

/**
 * 判断是否为整数
 * @param {type: string, desc: } num
 * @param {type: number, desc: } type
 * @return {type: boolean}
 */
export function validatenum(num, type) {
    let regName = /[^\d.]/g;
    if (type === 1) {
        if (!regName.test(num)) return false;
    } else if (type === 2) {
        regName = /[^\d]/g;
        if (!regName.test(num)) return false;
    }
    return true;
}

/**
 * 判断是否为小数
 * @param {type: string, desc: } num
 * @param {type: number, desc: } type
 * @return {type: boolean}
 */
export function validatenumord(num, type) {
    let regName = /[^\d.]/g;
    if (type === 1) {
        if (!regName.test(num)) return false;
    } else if (type === 2) {
        regName = /[^\d.]/g;
        if (!regName.test(num)) return false;
    }
    return true;
}

/**
 * 判断两个参数是否相等
 * @param {type: any, desc: 参数一 } param1
 * @param {type: any, desc: 参数二 } param2
 * @return {type: boolean}
 */
export function isEqual(param1, param2) {
    if (typeof param1 === 'object' || typeof param2 === 'object') {
        return param1 === param2;
    }
    return param1 === param2 || `${param1}` === `${param2}`;
}
