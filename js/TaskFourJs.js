/**
 * Created by Administrator on 2017/6/24.
 */
window.onload = function () {
    var toolFun = (function () {
        //小方块的属性
        var squareInfo = {
            x: 5,
            y: 2,
            dir: 1
        };

        //设置动画时间
        var animTime = 200;
        //初始动画效果
        var initTransition = `all ${animTime}ms ease-in`;

        //设置方块位置
        function setSquare(square) {
            square.style.left = 50 * (squareInfo.x - 1) + 'px';
            square.style.top = 50 * (squareInfo.y - 1) + 'px';
            square.style.transform = `rotate3d(0,0,1,${squareInfo.dir * 90}deg)`;
        }

        //设置方块运动
        function goSquare(square) {
            square.style.transition = initTransition;
            var isChange = false;
            if (squareInfo.dir % 4 === 0 && squareInfo.y > 1) {
                squareInfo.y--;
                isChange = true;
            } else if (squareInfo.dir % 4 === 1 && squareInfo.x < 10) {
                squareInfo.x++;
                isChange = true;
            } else if (squareInfo.dir % 4 === 2 && squareInfo.y < 10) {
                squareInfo.y++;
                isChange = true;
            } else if (squareInfo.dir % 4 === 3 && squareInfo.x > 1) {
                squareInfo.x--;
                isChange = true;
            }
            if (isChange) {
                setSquare(square);
            }
        };

        //设置方块旋转
        function rotateSquare(square, side) {
            square.style.transition = initTransition;
            var isChange = false;
            if (side === 'left') {
                --squareInfo.dir;
                isChange = true;
            } else if (side === 'right') {
                ++squareInfo.dir;
                isChange = true;
            } else if (side === 'half') {
                squareInfo.dir += 2;
                isChange = true;
            }
            if (isChange) {
                setSquare(square);
                setTimeout(function () {
                    if (squareInfo.dir >= 4 || squareInfo.dir < 0) {
                        square.style.transition = '';
                        squareInfo.dir = (squareInfo.dir + 4) % 4;
                        setSquare(square);
                    }
                }, animTime);
            }
        };

        /**
         * 绘制小方块
         */
        function createSquare(board, square) {
            square.id = 'square';
            squareInfo.x = randomInt(1, 10);
            squareInfo.y = randomInt(1, 10);
            squareInfo.dir = randomInt(0, 3);
            setSquare(square);
            board.appendChild(square);
        };

        /**
         * 绘制棋盘
         */
        function createBoard(board) {
            var ndCells = document.createDocumentFragment();
            for (var i = 0; i < 100; i++) {
                var ndCell = document.createElement('div');
                ndCell.className = 'cell';
                ndCells.appendChild(ndCell);
            }
            board.appendChild(ndCells);
        };

        //初始绘制
        function init(board, square) {
            createSquare(board, square);
            createBoard(board);
        }

        return {
            //setSquare: setSquare,
            goSquare: goSquare,
            rotateSquare: rotateSquare,
            init: init
        }
    })();

    function randomInt(min, max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    }

    //获取小方块和棋盘
    var ndSquare = document.createElement('div');
    var ndBoard = document.getElementById('board');

    //初始化绘制
    toolFun.init(ndBoard, ndSquare);

    var ndInswin = document.getElementById('inswin');

    var ndRun = document.getElementById('run');
    ndRun.onclick = function () {
        var inswin = ndInswin.value.trim().toUpperCase();
        switch (inswin) {
            case 'GO':
                toolFun.goSquare(ndSquare);
                break;
            case 'TUN LEF':
                toolFun.rotateSquare(ndSquare, 'left');
                break;
            case 'TUN RIG':
                toolFun.rotateSquare(ndSquare, 'right');
                break;
            case 'TUN BAC':
                toolFun.rotateSquare(ndSquare, 'half');
                break;
        }
    }

};