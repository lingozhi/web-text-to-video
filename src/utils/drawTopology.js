// 拓扑图绘制
import { fabric } from 'fabric';

let canvas; // fabric canvas 元素
let panning;

/**
 * 绘制线条
 * @params {type: canvasElement, desc: fabric canvas 元素} canvas
 * @params {type: string, desc: 线条颜色} lineColor
 * @params {type array, desc: 点对点数组} pointsArr
 * @params {type:boolean, desc: 是否更新} flag: true为更新，false为不更新
 */
const drawLine = (canvas, flag, pointsArr, lineColor) => {
    if (!flag) return;
    const line = new fabric.Line(pointsArr, {
        stroke: lineColor,
        evented: false,
    });
    canvas.add(line);
};

/**
 * 绘制图片
 * @params {type: canvasElement, desc: fabric canvas 元素 } canvas
 * @params {type: string, desc: 图片地址  } url
 * @params {type: number, desc: x轴坐标} x
 * @params {type: number, desc: y轴坐标} y
 * @params {type: object, desc: 其它属性} nodeData
 * @params {type:boolean, desc: 是否更新} flag: true为更新，false为不更新
 */
const drawImg = (canvas, flag, url, x, y, nodeData) => {
    if (!flag) return;
    if (x === undefined || y === undefined) return;
    fabric.Image.fromURL(url, (img) => {
        img.set({
            left: x,
            top: y,
            scaleX: 0.5,
            scaleY: 0.5,
            ...(nodeData
                ? {
                      hasControls: false,
                      hasBorders: false,
                      lockMovementX: true,
                      lockMovementY: true,
                      hoverCursor: 'pointer',
                      nodeData,
                  }
                : {
                      evented: false,
                  }),
        });
        canvas.add(img);
        // 图片置于最底层
        img.sendToBack();
    });
};

/**
 * 绘制名称
 * @params {type: canvasElement, desc: fabric canvas 元素 } canvas
 * @params {type: string | string[], desc: 文本} name
 * @params {type: number, desc: x轴坐标} x
 * @params {type: number, desc: y轴坐标} y
 * @params {type: number, desc: 字体大小} fontSize
 * @params {type: string, desc: 字体颜色} color
 * @params {type: string, desc: 文本对齐方式} textAlign
 * @params {type: number, desc: 文本宽度} width
 * @params {type:boolean, desc: 是否更新} flag: true为更新，false为不更新
 */
const drawName = (canvas, flag, name, x, y, fontSize, color, textAlign = 'left', width = 100) => {
    if (!flag) return;
    let nameList = '';
    if (typeof name === 'object') {
        name.forEach((str) => {
            nameList += `${str}\n`;
        });
    } else {
        nameList += name || '';
    }
    const text = new fabric.Textbox(nameList, {
        left: x,
        top: y,
        fontSize,
        textAlign,
        width,
        fill: color,
        lineHeight: 1,
        evented: false,
    });
    canvas.add(text);
};

/**
 * 绘制topo图
 * @params {type:object, desc: 元素对象 } data
 * @params {type:boolean, desc: 是否更新} flag: true为更新，false为不更新
 */
const drawTopo = (data, flag) => {
    // 类型判断进行绘制 1：背景 2：图标 3：文字 4：图标+文字
    switch (data.type) {
        case 1:
            // 背景
            {
                const { icon, x, y } = data;
                drawImg(canvas, flag, icon, x, y);
            }
            break;
        case 2:
            // 图标
            break;
        case 3:
            // 文字
            {
                const { name, x, y, fontSize, color, textAlign } = data;
                drawName(canvas, flag, name, x, y, fontSize, color, textAlign);
            }
            break;
        case 4:
            // 图标+文字
            {
                const { icon, name, fontSize, color, iconX, iconY, textX, textY, textAlign, nodeData } = data;
                drawImg(canvas, flag, icon, iconX, iconY, nodeData);
                drawName(canvas, flag, name, textX, textY, fontSize, color, textAlign);
            }
            break;
        default:
    }

    // 判断是否有线条，如果有线条则渲染
    if (data.lines && data.lines.length) {
        data.lines.forEach((item) => {
            const { start, end, lineColor } = item;
            drawLine(canvas, flag, [start.x, start.y, end.x, end.y], lineColor);
        });
    }

    // 递归所有元素
    if (data.children && data.children.length) {
        data.children.forEach((el) => {
            drawTopo(el, flag);
        });
    }
};

/**
 * 重置画布
 * @params {type:object, desc:树数据} treeData
 * @params {type:string,  desc:canvas对象} canvasmap
 * @params {type:number, desc:容器宽度 } containerWidth
 * @params {type:number, desc:容器高度} containerHeight
 * @params {type:boolean, desc: 是否更新} flag: true为更新，false为不更新
 * @params {type:func, desc:点击回调} clickCb
 */
export const initializeFabric = (canvasmap, flag, treeData, containerWidth, containerHeight, clickCb) => {
    if (flag) {
        panning = false;
        canvas = new fabric.Canvas(canvasmap);
        const designWidth = 1760;
        const designHeight = 670;
        const zoomWidth = containerWidth < designWidth ? containerWidth / designWidth : 1;
        const zoomHeight = containerHeight < designHeight ? containerHeight / designHeight : 1;
        const panX = (designWidth - containerWidth) / 2;
        const panY = (designHeight - containerHeight) / 2;

        canvas.absolutePan({
            x: panX,
            y: panY,
        });
        canvas.zoomToPoint(
            {
                x: containerWidth / 2,
                y: containerHeight / 2,
            },
            zoomWidth > zoomHeight ? zoomHeight : zoomWidth
        );

        canvas.on('mouse:down', (e) => {
            // 判断如果有跳转则跳转
            if (e.target?.nodeData?.href) {
                clickCb(e.target?.nodeData?.href);
            }
            panning = true;
            canvas.selection = false;
        });

        canvas.on('mouse:up', () => {
            panning = false;
            canvas.selection = true;
        });

        canvas.on('mouse:move', (e) => {
            if (panning && e && e.e) {
                const delta = new fabric.Point(e.e.movementX, e.e.movementY);
                canvas.relativePan(delta);
            }
        });

        canvas.on('mouse:wheel', (opt) => {
            const delta = opt.e.deltaY;
            let zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            canvas.zoomToPoint(
                {
                    x: opt.e.offsetX,
                    y: opt.e.offsetY,
                },
                zoom
            );
            opt.e.preventDefault();
            opt.e.stopPropagation();
        });
    }

    drawTopo(treeData, flag);
    if (canvas) {
        canvas.renderAll();
    }
};

export const clearFabric = () => {
    if (canvas) {
        canvas.clear();
        panning = false;
    }
};
