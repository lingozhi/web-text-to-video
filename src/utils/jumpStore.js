// 情况一： /imt/elec-safe
// A页面 -> B页面 -> A页面
// 1、A页面离开，清空store里面A页面参数resetJumpParams
// 2、在B页面点击返回按钮，执行setJumpParams，存储需要带回A页面的参数
// 3、A页面接收参数getJumpParams，执行对应方法

// 情况二： /wom/workorder-pool
// A页面 -> B页面 -> A页面
// 1、A页面点击离开按钮，执行setJumpParams，存储需要再次带回A页面的参数
// 2、在B页面点击返回按钮，如果有参数带回(执行setJumpParams，存储需要带回A页面的参数)
// 3、A页面接收参数getJumpParams，执行对应方法，并清空store里面A页面参数resetJumpParams

import store from '@/store';
import { setJumpParams as setJumpParamsAction, resetJumpParams as resetJumpParamsAction } from '@/store/modules/jump';

export function getJumpParams(pathname) {
    const { jumpParams = {} } = store.getState().jump;
    return pathname ? jumpParams[pathname] : jumpParams;
}

export function setJumpParams({ pathname, data }) {
    store.dispatch(setJumpParamsAction({ pathname, data }));
}

export function resetJumpParams(p = {}) {
    store.dispatch(resetJumpParamsAction(p));
}
