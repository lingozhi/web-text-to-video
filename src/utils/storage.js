/** ********************************************** 存储类操作方法 ***************************************************** */
/**
 * cookie 操作
 * @param { desc: 获取  } get
 * @param { desc: 设置  } set
 * @param { desc: 删除  } remove
 * @param { desc: 清除所有 } clear
 */
export const cookies = {
    get(name) {
        const cookieArr = document.cookie.split('; ');
        for (let i = 0, len = cookieArr.length; i < len; i++) {
            const item = cookieArr[i].split('=');
            if (item[0] === name) {
                return item[1];
            }
        }
        return null;
    },
    set(name, value, expires, path, domain, secure) {
        // name和value是必须，其他参数可以不设
        let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        if (expires instanceof Date) {
            cookieText += `; expires=${expires.toGMTString()}`;
        }
        if (path) {
            cookieText += `; path=${path}`;
        }
        if (domain) {
            cookieText += `; domain=${domain}`;
        }
        if (secure) {
            cookieText += '; secure';
        }
        document.cookie = cookieText;
    },
    remove(name, path, domain, secure) {
        // 删除，name必须
        this.set(name, '', new Date(0), path, domain, secure);
    },
    // 清除所有
    clear() {
        // eslint-disable-next-line no-useless-escape
        const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = keys.length; i--; )
                document.cookie = `${keys[i]}=0;path=/;expires=${new Date(0).toUTCString()}`;
        }
    },
};

/**
 * storage 存储
 */
export const storage = {
    // 设置
    set(name, value) {
        localStorage.setItem(name, value);
    },
    setObj(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    },
    // 获取
    get(name) {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name);
        }
        return null;
    },
    getObj(name) {
        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return null;
    },
    // 删除
    remove(name) {
        localStorage.removeItem(name);
    },
    // 清除
    clear() {
        localStorage.clear();
    },
};

/**
 * 清除storage信息
 * @param {type: Array | string | undefined, desc: 需要清除的字段，不传的话清除所有 } obj
 */
export const clearStorage = (obj) => {
    if (obj === undefined) {
        localStorage.clear();
    } else {
        let storageList = [];
        if (typeof obj === 'string') {
            storageList = [obj];
        } else if (Object.prototype.toString.call(obj) === '[object Array]') {
            storageList = obj;
        }
        storageList.forEach((item) => localStorage.removeItem(item));
    }
};
