/**
 * Created by Administrator on 2017/6/23.
 */

var ndType = document.getElementById('type');

var ndStudent = document.getElementById('student');
var ndSocial = document.getElementById('social');

var ndCity = document.getElementById('city');
var ndSchool = document.getElementById('school');

var selectedCity;
var schoolHtml;

var schoolList = {
    "Beijing": [{"name": "北京大学", "abbreviate": "PKU"}, {"name": "清华大学", "abbreviate": "THU"}],
    "Shanghai": [{"name": "复旦大学", "abbreviate": "Fudan"}, {"name": "上海交通大学", "abbreviate": "SJTU"}, {
        "name": "同济大学",
        "abbreviate": "Tongji"
    }],
    "Nanjing": [{"name": "南京大学", "abbreviate": "NJU"}, {"name": "东南大学", "abbreviate": "SEU"}]
};

window.onload = function () {
    ndStudent.style.display = 'none';
    ndSchool.style.display = 'none';
    ndSocial.style.display = 'none';
};

var ndRadioschool = document.getElementById('radioschool');
var ndRadiosocial = document.getElementById('radiosocial');

ndType.onclick = function () {
    if (ndRadioschool.checked) {
        ndStudent.style.display = 'inline-block';
        ndSchool.style.display = 'inline-block';
        ndSocial.style.display = 'none';

        updateSchool();

    } else if (ndRadiosocial.checked) {
        ndStudent.style.display = 'none';
        ndSchool.style.display = 'none';
        ndSocial.style.display = 'inline-block';

        ndSchool.innerHTML = '';
    }
};

ndCity.onchange = function () {
    //alert(ndCity.value);
    updateSchool();
}

function updateSchool() {
    selectedCity = ndCity.value;
    ndSchool.innerHTML = '';

    schoolHtml = '';
    for (var i = 0; i < schoolList[ndCity.value].length; i++) {
        schoolHtml += '<option value="' + schoolList[selectedCity][i].abbreviate + '">' + schoolList[selectedCity][i].name + '</option>';
    }
    ndSchool.innerHTML = schoolHtml;
}