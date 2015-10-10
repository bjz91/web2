function initComponent() {

	var fileNameBar = 'data/bar.json';

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

	var fileNameBar = 'data/bar.json';
	var fileNamePie = 'data/pie.json';
	var cityIdx = document.getElementById('sel1').value;
	var divName = 'container1';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileNameBar, function(bardata) {
		$.getJSON(fileNamePie, function(piedata) {
			loadPie(bardata, piedata, cityIdx, divName);
		});
	});

}

function initPie2() {

	var fileNameBar = 'data/bar.json';
	var fileNamePie = 'data/pie.json';
	var cityIdx = document.getElementById('sel2').value;
	var divName = 'container2';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileNameBar, function(bardata) {
		$.getJSON(fileNamePie, function(piedata) {
			loadPie(bardata, piedata, cityIdx, divName);
		});
	});

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

function loadPie(bardata, piedata, cityIdx, divName) {

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
				show : false,
				orient : 'horizontal',
				x : 'center',
				y : 'top',
				data : function() {
					var list = [];
					for (var i = 0; i < bardata.bar.data.sector.length; i++) {
						list.push(bardata.bar.data.sector[i]);
					}
					/* 暂时不加外圈的legend
					 for (var j = 0; j < piedata.pie.data[cityIdx].name.length; j++) {
					 list.push(piedata.pie.data[cityIdx].name[j]);
					 }*/
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
				data : function() {
					var list = [];
					for (var i = 0; i < bardata.bar.data.sector.length; i++) {
						var obj = {
							value : bardata.bar.data.value[i][cityIdx].toFixed(3),
							name : bardata.bar.data.sector[i]
						};
						list.push(obj);
					}
					return list;
				}()
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
				data : function() {
					var list = [];
					for (var i = 0; i < piedata.pie.data[cityIdx].name.length; i++) {
						var fixedValue;
						if (piedata.pie.data[cityIdx].value[i] == '-') {
							fixedValue = piedata.pie.data[cityIdx].value[i];
						} else {
							fixedValue = piedata.pie.data[cityIdx].value[i].toFixed(3);
						}
						var obj = {
							value : fixedValue,
							name : piedata.pie.data[cityIdx].name[i]
						}
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		myChartPie.setOption(optionPie);

	});

}

