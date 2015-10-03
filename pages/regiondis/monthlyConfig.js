function initComponent() {

	var fileName = 'data/bar.json';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileName, function(bardata) {
		loadComponent(bardata);
	});

}

function initPie1() {

	var fileName = 'data/bar.json';
	var cityIdx = document.getElementById('sel1').value;
	var divName = 'container1';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileName, function(bardata) {
		loadPie(bardata, cityIdx, divName);
	});

}

function initPie2() {

	var fileName = 'data/bar.json';
	var cityIdx = document.getElementById('sel2').value;
	var divName = 'container2';

	/*--------- 加载ECharts ---------*/
	$.getJSON(fileName, function(bardata) {
		loadPie(bardata, cityIdx, divName);
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
			data : bardata.bar.data.value[i]
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

function loadPie(bardata, cityIdx, divName) {

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
				orient : 'vertical',
				x : 'left',
				data : bardata.bar.data.sector
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
			calculable : true,
			series : [{
				name : '排放贡献',
				type : 'pie',
				radius : [0, 120],
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
					for (var i = 0; i < bardata.bar.data.sector.length; i++) {
						var obj = {
							value : bardata.bar.data.value[cityIdx][i],
							name : bardata.bar.data.sector[i]
						};
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		myChartPie.setOption(optionPie);

	});

}

