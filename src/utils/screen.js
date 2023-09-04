/** ********************************************** 屏幕类操作方法 ***************************************************** */
/**
 * 判断是否是全屏状态
 * @return { type: boolean, desc: true为全屏，false为非全屏}
 */
export const isFullScreen = () => {
    return (
        (document.body.scrollHeight === window.screen.height ||
            document.body.scrollHeight === window.screen.height - 1) &&
        document.body.scrollWidth === window.screen.width
    );
};

/**
 * 大屏宽度计算方式
 * @param { type：string, desc：外层包含元素，主要是避免缩放的id元素缩放之后还占位的问题 } rootwrap
 * @param { type：string, desc：要缩放的id元素 } root
 */
export const datav = (rootwrap, root) => {
    const oRootwrap = document.getElementById(rootwrap);
    const oRoot = document.getElementById(root);
    const appNode = document.getElementById('app');
    const appWidth = appNode.clientWidth;
    const scaleWidthPercent = appWidth / 1920;
    oRoot.style.cssText = `transform:scale(${scaleWidthPercent}); width:1920px; height:1080px;transform-origin:left top;`;
    oRootwrap.style.cssText = `height:${oRoot.getBoundingClientRect().height}px;overflow:hidden;`;
};

/**
 * 滚动到页面顶部
 */
export const scrollToTop = () => {
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    if (height > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, height - height / 8);
    }
};

/**
 * 滚动到页面底部
 */
export const scrollToBottom = () => {
    window.scrollTo(0, document.documentElement.clientHeight);
};

/**
 * 滚动到指定元素区域
 */
export const smoothScroll = (element) => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth',
    });
};

/**
 * 获取可视窗口高
 */
export const getPageViewHeight = () => {
    return (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientHeight;
};

/**
 * 获取可视窗口宽度
 */
export const getPageViewWidth = () => {
    return (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientWidth;
};

/**
 * 打开浏览器全屏
 */
export const toFullScreen = () => {
    const element = document.body;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    }
};

/**
 * 退出浏览器全屏
 */
export const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};
