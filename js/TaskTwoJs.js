/**
 * Created by Administrator on 2017/4/25.
 */
var ndChecking = document.getElementById("checking");

var ndTips = document.getElementsByClassName("tips");
window.onload = function () {
    for (var i = 0; i < ndTips.length; i++) {
        ndTips[i].innerHTML = '';
    }
};

var isPassFlag = {
    "name": false,
    "pwd": false,
    "pwdconf": false,
    "email": false,
    "phone": false
};

//名称
var ndCkname = document.getElementById("ckname");
ndCkname.onfocus = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    initHint(ckObj, '必填,长度为4~16个字符');
};

ndCkname.onblur = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    var ck = e.target.value.trim();
    var len = checkStringLength(ck);

    if (!ck) {
        isPassFlag.name = checkHint(ckObj, '名称不能为空', false);
    } else if (!len) {
        isPassFlag.name = checkHint(ckObj, '名称中不能有异常符号', false);
    } else if (len < 4 || len > 16) {
        isPassFlag.name = checkHint(ckObj, '长度须为4~16个字符', false);
    } else {
        isPassFlag.name = checkHint(ckObj, '名称格式正确', true);
    }
};

//密码和密码确认
var ndCkpwd = document.getElementById("ckpwd");
var ndCkpwdconf = document.getElementById("ckpwdconf");
ndCkpwd.onfocus = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    initHint(ckObj, '必填,长度为8~16个字符');
};

ndCkpwd.onblur = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    var ck = e.target.value.trim();

    if (!ck) {
        isPassFlag.pwd = checkHint(ckObj, '密码不能为空', false);
    } else if (ck.length < 8 || ck.length > 16) {
        isPassFlag.pwd = checkHint(ckObj, '密码须为8~16个字符', false);
    } else {
        isPassFlag.pwd = checkHint(ckObj, '密码格式正确', true);
    }
    if (ndCkpwdconf.value.trim()) {
        ndCkpwdconf.focus();
        ndCkpwdconf.blur();
    }

};

ndCkpwdconf.onfocus = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    initHint(ckObj, '再次输入相同密码');
};

ndCkpwdconf.onblur = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    var ck = e.target.value.trim();

    var pwd = ndCkpwd.value.trim();

    if (!pwd) {
        isPassFlag.pwdconf = checkHint(ckObj, '密码不能为空', false);
    } else if (!isPassFlag.pwd) {
        isPassFlag.pwdconf = checkHint(ckObj, '密码格式有误', false);
    } else if (ck !== pwd) {
        isPassFlag.pwdconf = checkHint(ckObj, '再次输入相同密码', false);
    } else {
        isPassFlag.pwdconf = checkHint(ckObj, '密码确认正确', true);
        ndCkpwd.blur();
    }
};

//邮箱
var ndCkemail = document.getElementById("ckemail");
ndCkemail.onfocus = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    initHint(ckObj, '必填，输入你的邮箱地址');
};

ndCkemail.onblur = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    var ck = e.target.value.trim();

    var emailRegex = /^\w[\w-]*@[\w-][\.\w-]*\.[\w-]+$/;

    if (!ck) {
        isPassFlag.email = checkHint(ckObj, '邮箱不能为空', false);
    } else if (!ck.match(emailRegex)) {
        isPassFlag.email = checkHint(ckObj, '邮箱格式有误', false);
    } else {
        isPassFlag.email = checkHint(ckObj, '邮箱格式正确', true);
    }
};

//手机
var ndCkphone = document.getElementById("ckphone");
ndCkphone.onfocus = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    initHint(ckObj, '必填，输入你的手机号');
};

ndCkphone.onblur = function (e) {
    var e = e || window.event;
    var ckObj = e.target;
    var ck = e.target.value.trim();

    var phoneRegex = /^1[34578]\d{9}$/;

    if (!ck) {
        isPassFlag.phone = checkHint(ckObj, '手机号码不能为空', false);
    } else if (!ck.match(phoneRegex)) {
        isPassFlag.phone = checkHint(ckObj, '手机号码格式有误', false);
    } else {
        isPassFlag.phone = checkHint(ckObj, '手机号码格式正确', true);
    }
};


//提交按钮
ndChecking.onclick = function () {
    var flag = true;
    for (var i in isPassFlag) {
        if (!isPassFlag[i]) {
            flag = false;
            break;
        }
    }

    if (flag) {
        alert("输入正确");
    } else {
        alert("输入有误");
    }
};

//显示表单填写规则
function initHint(ckobj, content) {
    var ck = ckobj.value.trim();
    if (!ck) {
        ckobj.classList.remove('passed', 'failed');
        ckobj.parentNode.lastChild.style.color = 'grey';
        ckobj.parentNode.lastChild.textContent = content;
    }
};

//校验表单内容
function checkHint(ckobj, content, isPass) {
    var ck = ckobj.value.trim();
    if (isPass) {
        ckobj.classList.remove('failed');
        ckobj.classList.add('passed');
        ckobj.parentNode.lastChild.style.color = 'green';
    } else {
        ckobj.classList.remove('passed');
        ckobj.classList.add('failed');
        ckobj.parentNode.lastChild.style.color = 'red';
    }
    ckobj.parentNode.lastChild.textContent = content;
    return isPass;
};

function checkStringLength(str) {
    var len = 0;

    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) >= 33 && str.charCodeAt(i) <= 126) {
            ++len;
        } else if (str.charCodeAt(i) >= 0x4E00 && str.charCodeAt(i) <= 0x9FCB) {
            len += 2;
        } else {
            len = false;
        }
    }
    return len;
};