function initEmis() {

	//确定所选城市
	var selObj = document.getElementById('sel');
	var cityValue = selObj.value;
	var cityName = selObj.options[cityValue].text;
	console.log(cityName);

	//bar图的json
	var barName = 'data/Fig13.json';
	//pie图的json
	var pieName;
	if (document.getElementById('sel2').value == 0) {//年均
		pieName = 'data/PM25_Sectoral_Contrib_HB_2013_annual.json';
	} else if (document.getElementById('sel2').value == 1) {//春
		pieName = 'data/PM25_Sectoral_Contrib_HB_2013_spring.json';
	} else if (document.getElementById('sel2').value == 2) {//夏
		pieName = 'data/PM25_Sectoral_Contrib_HB_2013_summer.json';
	} else if (document.getElementById('sel2').value == 3) {//秋
		pieName = 'data/PM25_Sectoral_Contrib_HB_2013_autumn.json';
	} else {//冬
		pieName = 'data/PM25_Sectoral_Contrib_HB_2013_winter.json';
	}

	$.getJSON(barName, function(data) {
		$.getJSON(pieName, function(piedata) {

			//制作data对象
			var sectorArr = Object.keys(data);
			var sectorLen = sectorArr.length;
			var datalist = [];
			for (var i = 0; i < sectorLen; i++) {
				var citysArr = data[sectorArr[i]];
				for (var j = 0; j < citysArr.length; j++) {
					if (citysArr[j].districtName == cityName) {
						var speciesArr = Object.keys(citysArr[j].emission);
						var emisValue = [];
						for (var k = 0; k < speciesArr.length; k++) {
							emisValue.push(citysArr[j].emission[speciesArr[k]]);
						}
						datalist.push(emisValue);
					}
				}
			}

			//计算排放占比
			var totalData = [];
			for (var j = 0; j < datalist[0].length; j++) {
				var temp = 0;
				for (var i = 0; i < datalist.length; i++) {
					temp += datalist[i][j];
				}
				totalData.push(temp);
			}

			for (var i = 0; i < datalist.length; i++) {
				for (var j = 0; j < datalist[i].length; j++) {
					datalist[i][j] = datalist[i][j] / totalData[j] * 100;
				}
			}

			//建立数据对象
			var finalData = [];
			for (var i = 0; i < sectorLen; i++) {
				var list = {
					title : "2013年" + cityName + sectorArr[i] + "部门排放占比",
					value : datalist[i]
				}
				finalData.push(list);
			}

			//拼接bar对象
			var bardata = {
				bar : {
					feature : ["部门排放占比"],
					unit : "百分比",
					name : Object.keys(data[sectorArr[0]][0].emission), //物种列表应该从配置文件里读
					data : finalData
				}
			}

			loadEmis(bardata, piedata, cityValue);
		});
	});
}

