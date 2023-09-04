/* eslint-disable no-eval */
import { fabric } from 'fabric';

// 事件输出
const targetEvent = (target, evName) => {
    if (target?.data && target?.data?.events) {
        return target?.data?.events.forEach((ev) => {
            const { event, code } = ev;
            try {
                if (event === 'click' && evName === 'down') {
                    eval(code);
                }
                if (event === 'mouseover' && evName === 'over') {
                    eval(code);
                }
                if (event === 'mouseout' && evName === 'out') {
                    eval(code);
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
    return null;
};

/**
 * 这个方法配合lime-topo组态软件生成的json进行渲染
 */
export const loadTopo = (data) => {
    if (data === null) return;
    // 绘制元素
    const { width, height } = data;
    const cvs = new fabric.Canvas('cvs', { width, height });

    let panning = false;
    const designWidth = width;
    const designHeight = height;
    const containerWidth = width;
    const containerHeight = height;
    const zoomWidth = containerWidth < designWidth ? containerWidth / designWidth : 1;
    const zoomHeight = containerHeight < designHeight ? containerHeight / designHeight : 1;
    const panX = (designWidth - containerWidth) / 2;
    const panY = (designHeight - containerHeight) / 2;

    cvs.selection = false;

    cvs.absolutePan({
        x: panX,
        y: panY,
    });
    cvs.zoomToPoint(
        {
            x: containerWidth / 2,
            y: containerHeight / 2,
        },
        zoomWidth > zoomHeight ? zoomHeight : zoomWidth
    );

    cvs.on('mouse:down', (e) => {
        panning = true;
        cvs.selection = false;
        targetEvent(e.target, 'down');
    });

    // 双击事件
    // fabric.util.addListener(cvs.upperCanvasEl, 'dblclick', (e) => {
    //      console.log('dblclick');
    // });

    cvs.on('mouse:over', (e) => {
        targetEvent(e.target, 'over');
    });
    cvs.on('mouse:out', (e) => {
        targetEvent(e.target, 'out');
    });

    cvs.on('mouse:up', () => {
        panning = false;
        cvs.selection = true;
    });

    cvs.on('mouse:move', (e) => {
        if (panning && e && e.e) {
            const delta = new fabric.Point(e.e.movementX, e.e.movementY);
            cvs.relativePan(delta);
        }
    });

    cvs.on('mouse:wheel', (opt) => {
        const delta = opt.e.deltaY;
        let zoom = cvs.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        cvs.zoomToPoint(
            {
                x: opt.e.offsetX,
                y: opt.e.offsetY,
            },
            zoom
        );
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });

    // JSON转换成画布元素
    cvs.loadFromJSON(data, () => {
        console.log('topo图json加载成功~');
    });
};
