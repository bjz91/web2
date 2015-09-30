function initComponent() {

	var barName = 'data/bar.json';
	var pieName1 = 'data/pie.json';
	var state = document.getElementById('sel').value;
	var pieName2;
	if (state == 0) {
		pieName2 = 'data/pie2.json';
	} else {
		pieName2 = 'data/pie3.json';
	}

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
				text : piedata2.pie.subspecies[0].title,
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
				data : function() {
					var list = [];
					for (var i = 0; i < piedata.pie.subspecies[0].data[0].name.length; i++) {
						list.push(piedata.pie.subspecies[0].data[0].name[i]);
					}
					for (var i = 0; i < piedata2.pie.subspecies[0].data[0].name.length; i++) {
						list.push(piedata2.pie.subspecies[0].data[0].name[i]);
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
				//selectedMode : 'single',
				radius : [0, 70],
				itemStyle : {
					normal : {
						label : {
							position : 'inner',
							formatter : function(param) {
								return param.name + '\n' + ' (' + (param.percent - 0).toFixed(2) + '%' + ')';
							}
						},
						labelLine : {
							show : false
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
			}, {
				name : '排放贡献',
				type : 'pie',
				radius : [100, 140],
				//radius : '55%',
				center : ['50%', '50%'],
				itemStyle : {
					normal : {
						label : {
							formatter : function(param) {
								return param.name + '\n' + ' (' + (param.percent - 0).toFixed(2) + '%' + ')';
							}
						}
					}
				},
				data : function() {
					var list = [];
					for (var i = 0; i < piedata2.pie.subspecies[0].data[0].value.length; i++) {
						var obj = {
							value : piedata2.pie.subspecies[0].data[0].value[i],
							name : piedata2.pie.subspecies[0].data[0].name[i],
						};
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		myChartPie.setOption(optionPie);

		//param.seriesIndex是控制选择的种类，dataIndex是控制第几根bar
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
			newOptionPie.series[1].data = [];
			for (var i = 0; i < piedata2.pie.subspecies[param.dataIndex].data[param.seriesIndex].value.length; i++) {
				var obj = {
					value : piedata2.pie.subspecies[param.dataIndex].data[param.seriesIndex].value[i],
					name : piedata2.pie.subspecies[param.dataIndex].data[param.seriesIndex].name[i],
				};
				newOptionPie.series[1].data.push(obj);
			}

			//画图例
			var list = [];
			for (var i = 0; i < piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].name.length; i++) {
				list.push(piedata.pie.subspecies[param.dataIndex].data[param.seriesIndex].name[i]);
			}
			for (var i = 0; i < piedata2.pie.subspecies[param.dataIndex].data[param.seriesIndex].name.length; i++) {
				list.push(piedata2.pie.subspecies[param.dataIndex].data[param.seriesIndex].name[i]);
			}
			newOptionPie.legend.data = list;

			//画title
			newOptionPie.title.text = piedata2.pie.subspecies[param.dataIndex].title;
			myChartPie.setOption(newOptionPie, true);

			console.log(param);
		}


		myChartBar.on(ecConfig.EVENT.HOVER, eConsole);

	});

}
