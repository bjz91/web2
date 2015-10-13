function initComponent() {

	var species = document.getElementById('sel').value;
	var fileNameBar = 'data/' + species + '-bar.json';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileNameBar, function(bardata) {

		//动态生成下拉采菜单
		var option1 = document.getElementById('sel1');
		var option2 = document.getElementById('sel2');
		for (var i = 0; i < bardata.bar.data.name.length; i++) {
			if (i === 0) {
				option1.options[i].value = i;
				option1.options[i].text = bardata.bar.data.name[i];
				option2.options[i].value = i;
				option2.options[i].text = bardata.bar.data.name[i];
			} else {
				var objOption1 = document.createElement("OPTION");
				objOption1.value = i;
				objOption1.text = bardata.bar.data.name[i];
				option1.options.add(objOption1);
				var objOption2 = document.createElement("OPTION");
				objOption2.value = i;
				objOption2.text = bardata.bar.data.name[i];
				option2.options.add(objOption2);
			}
		}
		option1.options[0].selected = true;
		//默认选中第0个，与html文件里的默认选项对应
		option2.options[1].selected = true;
		//默认选中第1个，与html文件里的默认选项对应

		loadComponent(bardata);
	});

}

function initPie1() {

	var species = document.getElementById('sel').value;

	var fileNameBar = 'data/' + species + '-bar.json';
	var fileNamePie = 'data/' + species + '-pie.json';
	var fileNameTh = 'data/Threshold.json';
	var cityIdx = document.getElementById('sel1').value;
	var divName = 'container1';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileNameTh, function(th) {
		$.getJSON(fileNameBar, function(bardata) {
			$.getJSON(fileNamePie, function(piedata) {
				//合并到其他
				var comObj = combine(bardata, piedata, th.threshold[species], cityIdx, true);
				global_cityIdx = cityIdx;
				var barDataObj = comObj.barDataObj;
				var pieDataObj = comObj.pieDataObj;
				var map = comObj.map;
				loadPie(bardata, piedata, cityIdx, divName, barDataObj, pieDataObj, map);
			});
		});
	});

}

function initPie2() {

	var species = document.getElementById('sel').value;

	var fileNameBar = 'data/' + species + '-bar.json';
	var fileNamePie = 'data/' + species + '-pie.json';
	var fileNameTh = 'data/Threshold.json';
	var cityIdx = document.getElementById('sel2').value;
	var divName = 'container2';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileNameTh, function(th) {
		$.getJSON(fileNameBar, function(bardata) {
			$.getJSON(fileNamePie, function(piedata) {
				//合并到其他
				var comObj = combine(bardata, piedata, th.threshold[species], cityIdx, false);
				var barDataObj = comObj.barDataObj;
				var pieDataObj = comObj.pieDataObj;
				var map = comObj.map;
				loadPie(bardata, piedata, cityIdx, divName, barDataObj, pieDataObj, map);
			});
		});
	});

}

//无奈的全局变量
var glb_accIdx;

function combine(bardata, piedata, percent, cityIdx, isLeft) {
	//从第几个开始合并
	var accIdx;
	if (isLeft) {
		for (var i = 0; i < bardata.bar.data.accumulative[cityIdx].length; i++) {
			if (bardata.bar.data.accumulative[cityIdx][i] > percent) {
				accIdx = i + 1;
				break;
			}
		}
		glb_accIdx = accIdx;
	} else {
		accIdx = glb_accIdx;
	}

	//计算bar其他类别的值
	var otherVaue = 0;
	for (var i = accIdx; i < bardata.bar.data.accumulative[cityIdx].length; i++) {
		otherVaue += bardata.bar.data.value[i][cityIdx];
	}

	//生成bar的data对象
	var barDataObj = [];
	var obj;
	for (var i = 0; i < accIdx; i++) {
		obj = {
			value : bardata.bar.data.value[i][cityIdx].toFixed(2),
			name : bardata.bar.data.sector[i]
		};
		barDataObj.push(obj);
	}
	obj = {
		value : otherVaue.toFixed(2),
		name : "其他"
	};
	barDataObj.push(obj);

	////计算pie其他类别的值
	otherVaue = 0;
	for (var i = 0; i < piedata.pie.data[cityIdx].name.length; i++) {
		if (piedata.pie.data[cityIdx].mapping[i] >= accIdx && piedata.pie.data[cityIdx].value[i] != '-') {
			otherVaue += piedata.pie.data[cityIdx].value[i];
		}
	}

	//生成pie的data对象
	var pieDataObj = [];
	for (var i = 0; i < piedata.pie.data[cityIdx].name.length; i++) {
		if (piedata.pie.data[cityIdx].mapping[i] < accIdx) {
			var fixedValue;
			if (piedata.pie.data[cityIdx].value[i] == '-') {
				fixedValue = piedata.pie.data[cityIdx].value[i];
			} else {
				fixedValue = piedata.pie.data[cityIdx].value[i].toFixed(2);
			}
			obj = {
				value : fixedValue,
				name : piedata.pie.data[cityIdx].name[i]
			}
			pieDataObj.push(obj);
		} else {
			obj = {
				value : otherVaue.toFixed(2),
				name : "其他"
			}
			pieDataObj.push(obj);
			break;
		}
	}

	//计算map
	var map = [];
	for (var i = 0; i < piedata.pie.data[cityIdx].mapping.length; i++) {
		if (piedata.pie.data[cityIdx].mapping[i] < accIdx) {
			map.push(piedata.pie.data[cityIdx].mapping[i]);
		} else {
			map.push(accIdx);
			break;
		}
	}

	var comObj = {
		barDataObj : barDataObj,
		pieDataObj : pieDataObj,
		map : map
	}

	return comObj;
}

