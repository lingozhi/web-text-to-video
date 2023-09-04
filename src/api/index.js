/*
 * @Author: chen 13714733197@163.com
 * @Date: 2023-07-07 05:16:58
 * @LastEditors: chen 13714733197@163.com
 * @LastEditTime: 2023-07-22 19:56:44
 * @FilePath: \web-to-video\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from './service';

// 获取用户信息
export const fetchAccountInfo = () => {
    return axios.get('/users/current-user-info/user-info').then((res) => {
        if (res?.code === 200) {
            return res.data;
        }
        return Promise.reject(res);
    });
};

export const fetchTest = (params) => {
    return axios.post('/123', params);
};
// ---------------start文章--------------------------------
// 符号分割语句
export const fetchSymboSplit = (params) => {
    return axios.post('/split', params);
};

// 根据段落重绘
export const fetchRedrawParagraph = (params) => {
    return axios.post('/do_word', params);
};

// 根据分镜重绘
export const fetchRedrawStoryboard = (params) => {
    return axios.post('/redraw_storyboard', params);
};

// 分镜制作
export const fetchDoFreeVideo = (params) => {
    return axios.post('/do_free_video', params);
};
// 读取文章测试
export const fetchTestInputDoc = (params) => {
    return axios.post('/test_input_doc', params);
};
// 分镜制作
export const fetchTestOpenaiConnection = (params) => {
    return axios.post('/test_openai_connection', params);
};
// ---------------end文章--------------------------------

// ---------------start语音--------------------------------
// 语音制作
export const fetchDoVoice = (params) => {
    return axios.post('/do_voice', params);
};
export const fetchOpenVoice = (params) => {
    return axios.get('/open_voice', params);
};
// ---------------end语音--------------------------------

// ---------------start绘图--------------------------------
// 绘图制作
export const fetchDoPlotTest = (params) => {
    return axios.post('/do_plot_test', params);
};
export const fetchDoPlot = (params) => {
    return axios.post('/do_plot', params);
};
export const fetchRedrawPlot = (params) => {
    return axios.post('/redraw_plot', params);
};

export const fetchOpenPictures = (params) => {
    return axios.get('/open_pictures', params);
};
// ---------------end绘图--------------------------------

// ---------------start剪映--------------------------------
// 绘图制作
export const fetchDoDddKeys = (params) => {
    return axios.post('/do_add_keys', params);
};
export const fetchDoDddYKeys = (params) => {
    return axios.post('/do_add_ykeys', params);
};

export const fetchDoDddXKeys = (params) => {
    return axios.post('/do_add_xkeys', params);
};

export const fetchDoEnter = (params) => {
    return axios.post('/do_enter', params);
};

export const fetchDoAlign = (params) => {
    return axios.post('/do_align', params);
};

// ---------------end剪映--------------------------------
