function initEmis() {

	var cityName = '石家庄市';

	$.getJSON('Fig13.json', function(data) {
		$.getJSON('pie.json', function(piedata) {

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
					title : sectorArr[i],
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

			loadEmis(bardata, piedata);
		});
	});
}

