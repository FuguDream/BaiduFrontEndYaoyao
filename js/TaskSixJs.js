/**
 * Created by Administrator on 2017/6/28.
 */
function Modal(node, options) {
    const DEFAULTOPTS = {
        hasMask: false,
        hasDrag: true,
        hasZoom: true,
        isTitleDrag: true,
        closeList: [/cancel/, /ok/, /mask/]
    };

    this.ele = node;
    this.opts = Object.assign({}, DEFAULTOPTS, options);

    this.init();
};

Modal.prototype = {
    //添加遮罩
    addMask: function () {
        var ndMask = document.createElement('div');
        ndMask.className = 'mask';
        insertBefore(this.ele, ndMask);
        document.body.style.overflowY = 'hidden';
        //阻止键盘上方向键引起的滚动
        document.onkeydown = function (e) {
            if (e.keyCode >= 37 && e.keyCode <= 40) {
                e.preventDefault();
            }
        };
    },
    //移除遮罩
    removeMask: function () {
        var ndMask = document.getElementsByClassName('mask')[0];
        removeNode(ndMask);
        document.body.style.overflowY = 'auto';
        document.onkeydown = null;
    },
    //关闭浮出层
    close: function () {
        this.ele.style.display = 'none';
        if (this.opts.hasMask) {
            this.removeMask();
        }
        this.ele.onclick = null;
    },
    clickClose: function (e) {
        for (var i = 0; i < this.opts.closeList.length; i++) {
            if (this.opts.closeList[i].test(e.target.className.toLowerCase())) {
                this.close();
                break;
            }
        }
    },
    //拖拽
    drag: function (node) {
        var This = this;

        var dragNode = this.opts.isTitleDrag ? node : this.ele;
        dragNode.style.cursor = 'move';

        function dragDown(e) {
            var x = e.clientX;
            var y = e.clientY;

            var oldX = This.ele.offsetLeft;
            var oldY = This.ele.offsetTop;

            //鼠标移动函数
            function dragMove(e) {
                var moveX = e.clientX - x;
                var moveY = e.clientY - y;
                This.ele.style.left = (oldX + moveX) + 'px';
                This.ele.style.top = (oldY + moveY) + 'px';
                e.preventDefault();
            };

            addEvent(document, 'mousemove', dragMove);
            addEvent(document, 'mouseup', function () {
                removeEvent(document, 'mousemove', dragMove);
            });
        }

        addEvent(dragNode, 'mousedown', dragDown);
    },
    //缩放
    zoom: function () {
        addEvent(this.ele, 'mousemove', function (e) {
                var offsetRight = this.offsetWidth / 2 + this.offsetLeft;
                console.log(e.clientX + ";" + offsetRight)
                if (e.clientX > offsetRight - 5) {
                    this.style.cursor = 'e-resize';
                    var oldX = this.offsetLeft;
                    var oldY = this.offsetTop;

                    addEvent(this, 'mousedown', function () {

                    });
                } else {
                    this.style.cursor = '';
                }
            }
        );
    },
//初始化
    init: function () {
        this.ele.style.display = 'block';

        var This = this;

        //是否显示遮罩层
        if (this.opts.hasMask) {
            this.addMask();
        }

        //是否拖拽
        if (this.opts.hasDrag) {
            var ndTitle = this.ele.getElementsByClassName('title')[0];
            this.drag(ndTitle);
        }

        //是否可缩放
        /*
         if (this.opts.hasZoom) {
         this.zoom();
         }
         */

        //添加关闭
        this.ele.parentNode.onclick = function (e) {
            This.clickClose(e);
        }
    }
}
;

//删除节点
function removeNode(ele) {
    if (ele) {
        ele.parentNode.removeChild(ele);
    }
}

//添加兄节点
function insertBefore(ele, newEle) {
    ele.parentNode.insertBefore(newEle, ele);
}

// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
}

function removeEvent(ele, event, hanlder) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, hanlder, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = null;
    }
}

var ndModal = document.getElementById('modal');

//点击按钮弹出浮出层
var ndBtn = document.getElementById('btn');
ndBtn.onclick = function () {
    var modal = new Modal(ndModal, {hasMask: true});
};