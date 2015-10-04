function initComponent() {

	var barName = 'data/newdata/bar.json';
	var pieName1 = 'data/newdata/pie.json';
	var pieName2 = 'data/newdata/subpie.json';
	/*
	 var state = document.getElementById('sel').value;
	 var pieName2;
	 if (state == 0) {
	 pieName2 = 'data/newdata/subpie.json';
	 } else {
	 pieName2 = 'data/newdata/subpie.json';
	 }*/

	/*--------- 加载ECharts ---------*/
	$.getJSON(barName, function(bardata) {
		$.getJSON(pieName1, function(piedata) {
			$.getJSON(pieName2, function(piedata2) {
				loadComponent(bardata, piedata, piedata2);
			});
		});
	});
}

function loadComponent(bardata, piedata, piedata2) {

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
				//text : bardata.bar.title,
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
				orient : 'vertical',
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
						fontSize : 10
					}
				},
				data : function() {
					var list = [];
					for (var i = 0; i < bardata.bar.data.name.length; i++) {
						list.push(bardata.bar.data.name[i]);
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

		// 基于准备好的dom，初始化echarts图表
		var myChartPie = ec.init(document.getElementById('container1'), 'macarons');

		var optionPie = {
			title : {
				text : piedata.pie.subspecies[0].data[0].title,
				//subtext : '数据来源：毕鉴昭',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'horizontal',
				x : 'center',
				y : 'bottom',
				data : function() {
					var list = [];
					for (var i = 0; i < piedata.pie.subspecies[0].data[0].name.length; i++) {
						if (piedata.pie.subspecies[0].data[0].value[i] != '-') {
							list.push(piedata.pie.subspecies[0].data[0].name[i])
						}
					}
					return list;
				}
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
				radius : [0, 70],
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
						},
						color : function(params) {
							// build a color map as your need.
							// macarons主题颜色列表
							var colorList = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050'];
							return colorList[params.dataIndex]
						}
					}
				},
				data : function() {
					var list = [];
					for (var i = 0; i < piedata.pie.subspecies[0].data[0].value.length; i++) {
						var obj = {
							value : piedata.pie.subspecies[0].data[0].value[i],
							name : piedata.pie.subspecies[0].data[0].name[i]
						};
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		myChartPie.setOption(optionPie);

		var myChartPie2 = ec.init(document.getElementById('container2'), 'macarons');
		var optionPie2 = {
			title : {
				text : piedata2.pie.subspecies[0].data[0][0].title,
				//subtext : '数据来源：毕鉴昭',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'horizontal',
				x : 'center',
				y : 'bottom',
				data : function() {
					var list = [];
					for (var i = 0; i < piedata2.pie.subspecies[0].data[0][0].name.length; i++) {
						if (piedata2.pie.subspecies[0].data[0][0].value[i] != '-') {
							list.push(piedata2.pie.subspecies[0].data[0][0].name[i])
						}
					}
					return list;
				}
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
				radius : [0, 70],
				//radius : '55%',
				center : ['50%', '50%'],
				itemStyle : {
					normal : {
						label : {
							formatter : function(param) {
								return param.name + '\n' + ' (' + (param.percent - 0).toFixed(2) + '%' + ')';
							}
						},
						color : function(params) {
							// build a color map as your need.
							// macarons主题颜色列表
							var colorList = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050'];
							return colorList[params.dataIndex]
						}
					}
				},
				data : function() {
					var list = [];
					for (var i = 0; i < piedata2.pie.subspecies[0].data[0][0].value.length; i++) {
						var obj = {
							value : piedata2.pie.subspecies[0].data[0][0].value[i],
							name : piedata2.pie.subspecies[0].data[0][0].name[i],
						};
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		myChartPie2.setOption(optionPie2);

		//param.seriesIndex是控制选择的种类，dataIndex是控制第几根bar

		/*---------- bar和pie联动 ----------*/

		var barParamDataIdx = 0;
		//全局变量
		var barParamSeriesIdx = 0;
		//全局变量

		var ecConfig = require('echarts/config');
		function eConsole(param) {
			//画物种
			var newOptionPie = myChartPie.getOption();
			newOptionPie.series[0].data = [];
			for (var i = 0; i < piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].value.length; i++) {
				var obj = {
					value : piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].value[i],
					name : piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].name[i],
				};
				newOptionPie.series[0].data.push(obj);
			}

			//画图例
			newOptionPie.legend.data = [];
			for (var i = 0; i < piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].name.length; i++) {
				if (piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].value[i] != '-') {
					newOptionPie.legend.data.push(piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].name[i])
				}
			}

			//画title
			newOptionPie.title.text = piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].title;
			myChartPie.setOption(newOptionPie, true);

			barParamDataIdx = param.dataIndex;
			barParamSeriesIdx = param.seriesIndex;

			console.log(param);
		}


		myChartBar.on(ecConfig.EVENT.HOVER, eConsole);

		/*---------- pie和pie2联动 ----------*/

		function eConsole2(param) {
			//画物种
			var newOptionPie2 = myChartPie2.getOption();
			newOptionPie2.series[0].data = [];
			for (var i = 0; i < piedata2.pie.subspecies[barParamDataIdx].data[barParamSeriesIdx][param.dataIndex].value.length; i++) {
				var obj = {
					value : piedata2.pie.subspecies[barParamDataIdx].data[barParamSeriesIdx][param.dataIndex].value[i],
					name : piedata2.pie.subspecies[barParamDataIdx].data[barParamSeriesIdx][param.dataIndex].name[i],
				};
				newOptionPie2.series[0].data.push(obj);
			}

			//画图例
			newOptionPie2.legend.data = [];
			for (var i = 0; i < piedata2.pie.subspecies[barParamDataIdx].data[barParamSeriesIdx][param.dataIndex].name.length; i++) {
				if (piedata2.pie.subspecies[barParamDataIdx].data[barParamSeriesIdx][param.dataIndex].value[i] != '-') {
					newOptionPie2.legend.data.push(piedata2.pie.subspecies[barParamDataIdx].data[barParamSeriesIdx][param.dataIndex].name[i])
				}
			}

			//画title
			newOptionPie2.title.text = piedata2.pie.subspecies[barParamDataIdx].data[barParamSeriesIdx][param.dataIndex].title;
			myChartPie2.setOption(newOptionPie2, true);

			console.log(param);
		}


		myChartPie.on(ecConfig.EVENT.HOVER, eConsole2);

	});

}
