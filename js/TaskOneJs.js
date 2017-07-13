/**
 * Created by Administrator on 2017/4/25.
 */
var ndChecked =document.getElementById("checked");
var ndChecking = document.getElementById("checking");
var ndTips = document.getElementById("tips");

ndChecking.onclick = function () {
    var checked = ndChecked.value.trim();
    var len = 0;
    var isNormal = true;
    if(checked){
        for(let i = 0; i<checked.length; i++){
            if(checked.charCodeAt(i) >= 33 && checked.charCodeAt(i) <= 126){
                ++len;
            }else if(checked.charCodeAt(i) >= 0x4E00 && checked.charCodeAt(i) <= 0x9FCB) {
                len += 2;
            }else {
                isNormal = false
            }
        }
        if(isNormal){
            //判断字符长度
            if(len >= 4 && len <= 16){
                ndChecked.style.border = "2px solid forestgreen";
                ndTips.style.color = "forestgreen";
                ndTips.textContent = "名称格式正确";
            }else {
                ndChecked.style.border = "2px solid red";
                ndTips.style.color = "gray";
                ndTips.textContent = "名称长度只能为4~16个字符";
            }
        }else {
            ndChecked.style.border = "2px solid red";
            ndTips.style.color = "red";
            ndTips.textContent = "名称中不能有异常符号";
        }
    }else{
        ndChecked.style.border = "2px solid red";
        ndTips.style.color = "red";
        ndTips.textContent = "名称不能为空";
    }
}