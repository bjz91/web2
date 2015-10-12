function initComponent() {

	var fileNameBar = 'data/SO2-bar.json';

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

	var fileNameBar = 'data/SO2-bar.json';
	var fileNamePie = 'data/SO2-pie.json';
	var cityIdx = document.getElementById('sel1').value;
	var divName = 'container1';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileNameBar, function(bardata) {
		$.getJSON(fileNamePie, function(piedata) {
			//合并到其他
			var comObj = combine(bardata, piedata, 80, cityIdx);
			var barDataObj = comObj.barDataObj;
			var pieDataObj = comObj.pieDataObj;
			var map = comObj.map;
			loadPie(bardata, piedata, cityIdx, divName, barDataObj, pieDataObj, map);
		});
	});

}

function initPie2() {

	var fileNameBar = 'data/SO2-bar.json';
	var fileNamePie = 'data/SO2-pie.json';
	var cityIdx = document.getElementById('sel2').value;
	var divName = 'container2';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileNameBar, function(bardata) {
		$.getJSON(fileNamePie, function(piedata) {
			//合并到其他
			var comObj = combine(bardata, piedata, 80, cityIdx);
			var barDataObj = comObj.barDataObj;
			var pieDataObj = comObj.pieDataObj;
			var map = comObj.map;
			loadPie(bardata, piedata, cityIdx, divName, barDataObj, pieDataObj, map);
		});
	});

}

function combine(bardata, piedata, percent, cityIdx) {
	//从第几个开始合并
	var accIdx;
	for (var i = 0; i < bardata.bar.data.accumulative[cityIdx].length; i++) {
		if (bardata.bar.data.accumulative[cityIdx][i] > percent) {
			accIdx = i + 1;
			break;
		}
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
			value : bardata.bar.data.value[i][cityIdx].toFixed(3),
			name : bardata.bar.data.sector[i]
		};
		barDataObj.push(obj);
	}
	obj = {
		value : otherVaue.toFixed(3),
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
				fixedValue = piedata.pie.data[cityIdx].value[i].toFixed(3);
			}
			obj = {
				value : fixedValue,
				name : piedata.pie.data[cityIdx].name[i]
			}
			pieDataObj.push(obj);
		} else {
			obj = {
				value : otherVaue.toFixed(3),
				name : "其他"
			}
			pieDataObj.push(obj);
			break;
		}
	}

	//计算map
	var map = [];
	console.log(piedata.pie.data[cityIdx].mapping.length);
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

function loadComponent(bardata) {

	//准备Bar数据
	var barSeries = [];
	for (var i = 0; i < bardata.bar.data.sector.length; i++) {
		var obj = {
			name : bardata.bar.data.sector[i],
			type : 'bar',
			stack : '总量', //默认堆积方式
			barCategoryGap : '60%',
			itemStyle : {
				normal : {
					barBorderRadius : 0
				}
			},
			data : function() {
				var list = [];
				for (var j = 0; j < bardata.bar.data.value[i].length; j++) {
					if (bardata.bar.data.value[i][j] >= 10) {
						list.push(bardata.bar.data.value[i][j].toFixed(0));
					} else {
						list.push(bardata.bar.data.value[i][j].toFixed(2));
					}
				}
				return list;
			}()
		};
		barSeries.push(obj);
	}

	// 路径配置
	require.config({
		paths : {
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/pie', 'echarts/chart/funnel'], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChartBar = ec.init(document.getElementById('container'), 'macarons');

		var optionBar = {
			title : {
				text : bardata.bar.title,
				//subtext : '数据来源：毕鉴昭'
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : {// 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend : {
				data : bardata.bar.data.sector
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : ['line', 'bar']
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			xAxis : [{
				type : 'category',
				axisLabel : {
					interval : 0,
					textStyle : {
						//fontSize : 10 //如果x轴label有重叠，需要调小字号
					}
				},
				data : function() {
					var list = [];
					for (var i = 0; i < bardata.bar.data.name.length; i++) {
						list.push(bardata.bar.data.name[i] + '\n' + bardata.bar.data.percentage[i]);
					}
					return list;
				}()
			}],
			yAxis : [{
				type : 'value',
				name : bardata.bar.unit
			}],
			series : barSeries
		};

		// 为echarts对象加载数据
		myChartBar.setOption(optionBar);

	});

}

function loadPie(bardata, piedata, cityIdx, divName, barDataObj, pieDataObj, map) {

	// 路径配置
	require.config({
		paths : {
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/pie', 'echarts/chart/funnel'], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChartPie = ec.init(document.getElementById(divName), 'macarons');

		var optionPie = {
			title : {
				text : bardata.bar.data.name[cityIdx],
				//subtext : '数据来源：毕鉴昭',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				show : true,
				orient : 'vertical',
				x : 'left',
				y : 'top',
				data : function() {
					var list = [];
					for (var i = 0; i < barDataObj.length; i++) {
						list.push(barDataObj[i].name);
					}
					return list;
				}()
			},

			toolbox : {
				show : true,
				feature : {
					dataView : {
						show : true,
						readOnly : false
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : false,
			series : [{
				name : '排放贡献',
				type : 'pie',
				radius : [0, 70],
				itemStyle : {
					normal : {
						label : {
							show : true,
							position : 'inner',
							formatter : function(param) {
								if (param.percent > 10) {
									return param.name + '\n' + ' (' + (param.percent - 0).toFixed(2) + '%' + ')';
								} else {
									return;
								}
							}
						},
						labelLine : {
							show : false
						}
					}
				},
				data : barDataObj
			}, {
				name : '排放贡献',
				type : 'pie',
				radius : [100, 140],
				itemStyle : {
					normal : {
						label : {
							//position : 'inner',
							formatter : function(param) {
								return param.name + '\n' + ' (' + (param.percent - 0).toFixed(2) + '%' + ')';
							}
						},
						labelLine : {
							show : true
						}
					}
				},
				data : pieDataObj
			}]
		};

		myChartPie.setOption(optionPie);

		var ecConfig = require('echarts/config');
		myChartPie.on(ecConfig.EVENT.LEGEND_SELECTED, function(param) {

			//获取legend选项状态
			var selected = param.selected;
			var keys = Object.keys(selected);

			//新的option
			var newOptionPie = myChartPie.getOption();

			//新的data
			var newBarDataObj = [];
			var newPieDataObj = [];

			//刷新data
			for (var i = 0; i < keys.length; i++) {
				if (selected[keys[i]] == true) {
					newBarDataObj.push(barDataObj[i]);
					for (var j = 0; j < map.length; j++) {
						if (map[j] === i) {
							newPieDataObj.push(pieDataObj[j]);
						}
					}
				}
			}
			newOptionPie.series[0].data = newBarDataObj;
			newOptionPie.series[1].data = newPieDataObj;

			myChartPie.setOption(newOptionPie, true);

		});

	});

}

