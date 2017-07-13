/**
 * Created by Administrator on 2017/6/28.
 */
function SortableTable(node, headCont, bodyCont, isFreeze) {
    this.ele = node;
    this.headCont = headCont;
    this.bodyCont = bodyCont;
    this.sortedKey = [];
    this.isFreeze = isFreeze && true;

};

SortableTable.prototype = {
    init: function () {
        this.ele.innerHTML = '';
        this.createHead();
        this.createBody();
        this.addSortClick();
    },
    //绘制表头
    createHead: function () {
        let headHtml = '';
        //上箭头
        let ndUp = createArrow('asc');
        //下箭头
        let ndDown = createArrow('desc');

        headHtml += `<thead><tr>`;
        for (let i = 0; i < this.headCont.length; i++) {
            headHtml += `<th>${this.headCont[i]}</th>`;
        }
        headHtml += `</tr></thead>`;

        this.ele.innerHTML = headHtml;

        //添加表头冻结
        if (this.isFreeze) {
            this.addFreeze();
        }

        for (let i = 1; i < this.headCont.length; i++) {
            let ndTh = this.ele.getElementsByTagName('th')[i];
            var cloneUp = ndUp.cloneNode(false);
            var cloneDown = ndDown.cloneNode(false);
            ndTh.appendChild(cloneUp);
            ndTh.appendChild(cloneDown);
        }

    },
    //绘制表体
    createBody: function (style, num) {
        let This = this;

        this.sortedKey = Object.keys(bodyCont);
        //排序
        if (style === 'asc') {
            this.sortedKey.sort(function (a, b) {
                return parseInt(This.bodyCont[a][num]) > parseInt(This.bodyCont[b][num]);
            });
        } else if (style === 'desc') {
            this.sortedKey.sort(function (a, b) {
                return parseInt(This.bodyCont[a][num]) < parseInt(This.bodyCont[b][num]);
            });
        }

        //绘制表格
        let bodyHtml = '';
        for (let o = 0; o < this.sortedKey.length; o++) {
            bodyHtml += `<tr>`;
            bodyHtml += `<td>${this.sortedKey[o]}</td>`;
            for (let i = 0; i < this.bodyCont[this.sortedKey[o]].length; i++) {
                bodyHtml += `<td>${this.bodyCont[this.sortedKey[o]][i]}</td>`;
            }
            bodyHtml += `</tr>`;
        }
        this.ele.insertAdjacentHTML('beforeend', bodyHtml);
    },
    //添加升序降序功能
    addSortClick: function () {
        let This = this;

        function sortClick(e) {
            let cellIdx = null;
            if (e.target.className.toLowerCase() === 'asc') {

                This.ele.innerHTML = '';
                cellIdx = e.target.parentNode.cellIndex - 1;
                This.createHead();
                This.createBody('asc', cellIdx);
            } else if (e.target.className.toLowerCase() === 'desc') {
                This.ele.innerHTML = '';
                cellIdx = e.target.parentNode.cellIndex - 1;
                This.createHead();
                This.createBody('desc', cellIdx);
            }

        }

        addEvent(this.ele, 'click', sortClick)
    },
    //添加表头冻结功能
    addFreeze: function () {
        let This = this;
        let head = this.ele.childNodes[0];

        //添加隐藏行
        let addTbody = document.createElement('tbody');
        addTbody.style.display = 'none';
        addTbody.style.visibility = 'hidden';

        let addTr = document.createElement('tr');

        let addTd = document.createElement('td');
        addTd.style.borderTopColor = 'transparent';
        addTd.textContent = 'added';

        addTr.appendChild(addTd);
        addTbody.appendChild(addTr);
        this.ele.appendChild(addTbody);

        //减少滚动执行次数
        let isWheel = true;

        function scrollFreeze() {
            if (isWheel) {
                setTimeout(function () {
                    //let top = getscrollTop(This.ele);
                    //let windowScrollTop = document.getElementsByTagName("body")[0].scrollTop;
                    //let realTop = top - windowScrollTop;
                    let realTop = This.ele.getBoundingClientRect().top;
                    console.log(This.ele.getBoundingClientRect().top);
                    if (realTop < 20) {
                        addTbody.style.display = '';
                        head.style.position = 'fixed';
                        head.style.top = '20px';
                    } else {
                        addTbody.style.display = 'none';
                        head.style.position = '';
                        head.style.top = '';
                    }
                    isWheel = true;
                }, 100);
                isWheel = false;
            }

        };

        addEvent(document, 'scroll', scrollFreeze);
    }
};

//获取到顶部的距离
function getscrollTop(ele) {
    let top = 0;
    while (ele) {
        top += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return top;
}

//绘制箭头
function createArrow(direction) {
    let node = document.createElement('span');
    node.style.display = 'inline-block';
    node.style.width = '0';
    node.style.height = '0';
    node.style.borderLeft = '6px transparent solid';
    node.style.borderRight = '6px transparent solid';
    if (direction === 'desc') {
        node.className = 'desc';
        node.style.borderTop = '12px #eee solid';
    } else if (direction === 'asc') {
        node.className = 'asc';
        node.style.marginLeft = '5px';
        node.style.borderBottom = '12px #eee solid';
    }
    return node;
}

function $(object) {
    return document.getElementById(object);
};

// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
};

function removeEvent(ele, event, hanlder) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, hanlder, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = null;
    }
};

//设置初始值
let ndTable = $('sortabletable');
let headCont = ['姓名', '语文', '数学', '英语'];
let bodyCont = {
    '小明': [80, 90, 70],
    '小红': [90, 60, 90],
    '小亮': [60, 100, 70]
};

let sortableTable = new SortableTable(ndTable, headCont, bodyCont, true);
sortableTable.init();