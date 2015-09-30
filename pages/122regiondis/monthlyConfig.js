function initBar() {

	/*--------- 选择文件 ---------*/
	var objYear = document.getElementById('year');
	var yearIndex = objYear.selectedIndex;
	var year = objYear.options[yearIndex].text;
	var fileName = 'data/' + year + '.json';

	/*--------- 判断复选框是否选中 ---------*/
	var plotBool = [];
	//OC
	if (document.getElementById("OC").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}
	//EC
	if (document.getElementById("EC").checked) {
		plotBool.push(new Boolean(1));
	} else {
		plotBool.push(new Boolean(0));
	}

	/*--------- 加载ECharts ---------*/
	//getJSON异常处理
	$.ajaxSetup({
		error : function(x, e) {
			alert("暂无" + year + "年" + "数据");
			return false;
		}
	});

	$.getJSON(fileName, function(data) {
		loadBar(data, plotBool);
	});
}

