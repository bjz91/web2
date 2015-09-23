function initSequence() {

	/*--------- 配置ECharts属性 ---------*/
	// 路径配置
	require.config({
		paths : {
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/k'], function(echarts) {

		// 基于准备好的dom，初始化echarts图表

		var axisData = ["2013/1/24", "2013/1/25", "2013/1/28", "2013/1/29", "2013/1/30", "2013/1/31", "2013/2/1", "2013/2/4", "2013/2/5", "2013/2/6", "2013/2/7", "2013/2/8", "2013/2/18", "2013/2/19", "2013/2/20", "2013/2/21", "2013/2/22", "2013/2/25", "2013/2/26", "2013/2/27", "2013/2/28", "2013/3/1", "2013/3/4", "2013/3/5", "2013/3/6", "2013/3/7", "2013/3/8", "2013/3/11", "2013/3/12", "2013/3/13", "2013/3/14", "2013/3/15", "2013/3/18", "2013/3/19", "2013/3/20", "2013/3/21", "2013/3/22", "2013/3/25", "2013/3/26", "2013/3/27", "2013/3/28", "2013/3/29", "2013/4/1", "2013/4/2", "2013/4/3", "2013/4/8", "2013/4/9", "2013/4/10", "2013/4/11", "2013/4/12", "2013/4/15", "2013/4/16", "2013/4/17", "2013/4/18", "2013/4/19", "2013/4/22", "2013/4/23", "2013/4/24", "2013/4/25", "2013/4/26", "2013/5/2", "2013/5/3", "2013/5/6", "2013/5/7", "2013/5/8", "2013/5/9", "2013/5/10", "2013/5/13", "2013/5/14", "2013/5/15", "2013/5/16", "2013/5/17", "2013/5/20", "2013/5/21", "2013/5/22", "2013/5/23", "2013/5/24", "2013/5/27", "2013/5/28", "2013/5/29", "2013/5/30", "2013/5/31", "2013/6/3", "2013/6/4", "2013/6/5", "2013/6/6", "2013/6/7", "2013/6/13"];

		var option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {// 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter : function(params) {
					var res = params[0].name;
					res += '<br/>' + params[0].seriesName + ' : ' + params[0].value;
					return res;
				}
			},
			legend : {
				data : ['AQI', 'O3(1h)', 'O3(8h)', 'CO', 'SO2', 'NO2', 'PM2.5', 'PM10']
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
				boundaryGap : false,
				data : axisData
			}],
			yAxis : [{
				type : 'value',
				scale : true,
				axisLabel : {
					formatter : '{value}'
				}
			}],
			dataZoom : {
				y : 50,
				show : true,
				realtime : true,
				start : 70,
				end : 100
			},
			grid : {
				x : 80,
				y : 100,
				x2 : 30,
				y2 : 40
			},
			series : [{
				name : 'AQI',
				type : 'line',
				data : [66.63, 53.91, 69.81, 66.65, 17.81, 12.80, 99.91, 17.11, 3.26, 56.12, 88.19, 66.92, 19.04, 36.89, 46.07, 98.16, 15.64, 85.55, 64.48, 37.63, 19.09, 42.83, 48.20, 12.06, 58.95, 22.62, 38.46, 58.30, 25.18, 29.04, 61.71, 26.53, 82.44, 98.27, 73.02, 34.39, 58.41, 10.78, 90.63, 87.97, 81.78, 26.07, 59.44, 2.25, 42.53, 31.27, 16.15, 17.88, 42.29, 9.42, 59.85, 47.09, 69.59, 69.99, 63.85, 3.36, 6.88, 31.96, 53.09, 65.44, 40.76, 82.00, 71.84, 96.86, 53.13, 32.51, 10.56, 61.10, 77.88, 42.35, 9.08, 26.65, 15.37, 28.10, 44.01, 52.71, 45.74, 87.54, 51.81, 94.36, 63.77, 95.77, 24.07, 67.61, 28.91, 67.18, 69.51, 6.80]
			}, {
				name : 'O3(1h)',
				type : 'line',
				symbol : 'none',
				data : []
			}, {
				name : 'O3(8h)',
				type : 'line',
				symbol : 'none',
				data : []
			}, {
				name : 'CO',
				type : 'line',
				symbol : 'none',
				data : []
			}, {
				name : 'SO2',
				type : 'line',
				symbol : 'none',
				data : []
			}, {
				name : 'NO2',
				type : 'line',
				symbol : 'none',
				data : []
			}, {
				name : 'PM2.5',
				type : 'line',
				symbol : 'none',
				data : []
			}, {
				name : 'PM10',
				type : 'line',
				symbol : 'none',
				data : []
			}]
		};

		myChart = echarts.init(document.getElementById('main1'), 'macarons');
		myChart.setOption(option);

		option2 = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {// 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend : {
				y : -30,
				data : ['AQI', 'O3(1h)', 'O3(8h)', 'CO', 'SO2', 'NO2', 'PM2.5', 'PM10']
			},
			toolbox : {
				y : -30,
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
				boundaryGap : false,
				data : axisData
			}],
			yAxis : [{
				type : 'value',
				name : 'O3',
				scale : true,
				axisLabel : {
					formatter : '{value}'
				}
			}, {
				type : 'value',
				name : 'CO',
				scale : true,
				axisLabel : {
					formatter : '{value}'
				}
			}],
			dataZoom : {
				y : 250,
				show : true,
				realtime : true,
				start : 50,
				end : 100
			},
			grid : {
				x : 80,
				y : 20,
				x2 : 30,
				y2 : 40
			},
			series : [{
				name : 'O3(1h)',
				type : 'line',
				data : [1.92, 1.39, 6.96, 0.94, 5.25, 5.30, 8.61, 4.85, 3.93, 6.71, 7.41, 5.20, 3.48, 1.50, 5.86, 2.62, 0.44, 7.55, 2.43, 4.42, 6.88, 3.59, 7.36, 3.95, 6.83, 7.04, 4.42, 0.20, 3.31, 4.24, 2.70, 1.97, 8.22, 4.30, 8.88, 3.91, 7.69, 3.97, 8.09, 7.55, 3.77, 2.16, 7.90, 9.49, 3.28, 6.71, 4.39, 8.34, 7.69, 1.67, 8.62, 9.90, 5.14, 8.84, 5.88, 1.55, 2.00, 4.07, 7.49, 8.26, 7.90, 3.19, 5.34, 0.90, 1.12, 1.36, 6.79, 4.95, 1.90, 4.95, 1.48, 0.55, 8.51, 5.61, 9.30, 6.97, 5.83, 8.15, 8.79, 9.89, 0.01, 8.65, 6.13, 9.90, 5.28, 4.80, 8.01, 2.28]
			}, {
				name : 'O3(8h)',
				type : 'line',
				data : [0.99, 2.62, 3.35, 6.80, 1.37, 7.21, 1.07, 6.54, 4.94, 7.79, 7.15, 9.04, 8.91, 3.34, 6.99, 1.98, 0.31, 7.44, 5.00, 4.80, 9.05, 6.10, 6.18, 8.59, 8.05, 5.77, 1.83, 2.40, 8.87, 0.29, 4.90, 1.68, 9.79, 7.13, 5.00, 4.71, 0.60, 6.82, 0.42, 0.71, 5.22, 0.97, 8.18, 8.18, 7.22, 1.50, 6.60, 5.19, 9.73, 6.49, 8.00, 4.54, 4.32, 8.25, 0.83, 1.33, 1.73, 3.91, 8.31, 8.03, 0.60, 3.99, 5.27, 4.17, 6.57, 6.28, 2.92, 4.32, 0.15, 9.84, 1.67, 1.06, 3.72, 1.98, 4.90, 3.39, 9.52, 9.20, 0.53, 7.38, 2.69, 4.23, 5.48, 9.43, 4.18, 9.83, 3.01, 7.01]
			}, {
				name : 'CO',
				type : 'line',
				yAxisIndex : 1,
				data : [6.66, 5.39, 6.98, 6.67, 1.78, 1.28, 9.99, 1.71, 0.33, 5.61, 8.82, 6.69, 1.90, 3.69, 4.61, 9.82, 1.56, 8.56, 6.45, 3.76, 1.91, 4.28, 4.82, 1.21, 5.90, 2.26, 3.85, 5.83, 2.52, 2.90, 6.17, 2.65, 8.24, 9.83, 7.30, 3.44, 5.84, 1.08, 9.06, 8.80, 8.18, 2.61, 5.94, 0.23, 4.25, 3.13, 1.61, 1.79, 4.23, 0.94, 5.99, 4.71, 6.96, 7.00, 6.39, 0.34, 0.69, 3.20, 5.31, 6.54, 4.08, 8.20, 7.18, 9.69, 5.31, 3.25, 1.06, 6.11, 7.79, 4.23, 0.91, 2.66, 1.54, 2.81, 4.40, 5.27, 4.57, 8.75, 5.18, 9.44, 6.38, 9.58, 2.41, 6.76, 2.89, 6.72, 6.95, 0.68]
			}]
		};

		myChart2 = echarts.init(document.getElementById('main2'), 'macarons');
		myChart2.setOption(option2);

		var option3 = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {// 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend : {
				y : -30,
				data : ['AQI', 'O3(1h)', 'O3(8h)', 'CO', 'SO2', 'NO2', 'PM2.5', 'PM10']
			},
			toolbox : {
				y : -30,
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
			dataZoom : {
				y : 250,
				show : true,
				realtime : true,
				start : 50,
				end : 100
			},
			xAxis : [{
				type : 'category',
				boundaryGap : false,
				data : axisData
			}],
			yAxis : [{
				type : 'value',
				scale : true,
				axisLabel : {
					formatter : '{value}'
				}
			}],
			grid : {
				x : 80,
				y : 10,
				x2 : 30,
				y2 : 30
			},
			series : [{
				name : 'SO2',
				type : 'line',
				data : [0.01, 0.02, 0.07, 0.03, 0.09, 0.01, 0.10, 0.05, 0.07, 0.10, 0.03, 0.04, 0.05, 0.08, 0.08, 0.01, 0.02, 0.04, 0.01, 0.05, 0.03, 0.02, 0.02, 0.09, 0.07, 0.05, 0.09, 0.01, 0.07, 0.07, 0.06, 0.02, 0.06, 0.03, 0.01, 0.02, 0.09, 0.01, 0.02, 0.01, 0.04, 0.00, 0.09, 0.02, 0.01, 0.03, 0.05, 0.01, 0.10, 0.03, 0.03, 0.01, 0.03, 0.00, 0.05, 0.08, 0.06, 0.01, 0.01, 0.08, 0.09, 0.05, 0.01, 0.08, 0.03, 0.03, 0.07, 0.00, 0.00, 0.07, 0.06, 0.05, 0.07, 0.07, 0.08, 0.03, 0.07, 0.06, 0.04, 0.01, 0.08, 0.03, 0.06, 0.07, 0.01, 0.01, 0.05, 0.05]
			}, {
				name : 'NO2',
				type : 'line',
				data : [0.06, 0.07, 0.06, 0.05, 0.05, 0.03, 0.07, 0.02, 0.07, 0.02, 0.04, 0.06, 0.08, 0.01, 0.09, 0.08, 0.05, 0.04, 0.04, 0.03, 0.05, 0.05, 0.08, 0.08, 0.06, 0.04, 0.08, 0.05, 0.04, 0.09, 0.09, 0.06, 0.06, 0.06, 0.02, 0.03, 0.05, 0.02, 0.08, 0.02, 0.02, 0.02, 0.02, 0.04, 0.03, 0.09, 0.04, 0.02, 0.09, 0.10, 0.04, 0.01, 0.03, 0.04, 0.06, 0.03, 0.06, 0.07, 0.02, 0.01, 0.03, 0.03, 0.04, 0.05, 0.01, 0.03, 0.08, 0.00, 0.09, 0.07, 0.05, 0.06, 0.02, 0.05, 0.10, 0.05, 0.05, 0.02, 0.05, 0.06, 0.07, 0.04, 0.04, 0.10, 0.00, 0.09, 0.09, 0.08]
			}]
		};

		myChart3 = echarts.init(document.getElementById('main3'), 'macarons');
		myChart3.setOption(option3);

		var option4 = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {// 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend : {
				y : -30,
				data : ['AQI', 'O3(1h)', 'O3(8h)', 'CO', 'SO2', 'NO2', 'PM2.5', 'PM10']
			},
			toolbox : {
				y : -30,
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
			dataZoom : {
				y : 250,
				show : true,
				realtime : true,
				start : 50,
				end : 100
			},
			xAxis : [{
				type : 'category',
				boundaryGap : false,
				data : axisData
			}],
			yAxis : [{
				type : 'value',
				scale : true,
				axisLabel : {
					formatter : '{value}'
				}
			}],
			grid : {
				x : 80,
				y : 10,
				x2 : 30,
				y2 : 30
			},
			series : [{
				name : 'PM2.5',
				type : 'line',
				data : [0.01, 0.02, 0.07, 0.03, 0.09, 0.01, 0.10, 0.05, 0.07, 0.10, 0.03, 0.04, 0.05, 0.08, 0.08, 0.01, 0.02, 0.04, 0.01, 0.05, 0.03, 0.02, 0.02, 0.09, 0.07, 0.05, 0.09, 0.01, 0.07, 0.07, 0.06, 0.02, 0.06, 0.03, 0.01, 0.02, 0.09, 0.01, 0.02, 0.01, 0.04, 0.00, 0.09, 0.02, 0.01, 0.03, 0.05, 0.01, 0.10, 0.03, 0.03, 0.01, 0.03, 0.00, 0.05, 0.08, 0.06, 0.01, 0.01, 0.08, 0.09, 0.05, 0.01, 0.08, 0.03, 0.03, 0.07, 0.00, 0.00, 0.07, 0.06, 0.05, 0.07, 0.07, 0.08, 0.03, 0.07, 0.06, 0.04, 0.01, 0.08, 0.03, 0.06, 0.07, 0.01, 0.01, 0.05, 0.05]
			}, {
				name : 'PM10',
				type : 'line',
				data : [0.08, 0.09, 0.01, 0.09, 0.06, 0.01, 0.03, 0.05, 0.10, 0.10, 0.02, 0.10, 0.10, 0.05, 0.08, 0.01, 0.04, 0.09, 0.08, 0.10, 0.07, 0.00, 0.08, 0.09, 0.07, 0.08, 0.07, 0.04, 0.07, 0.02, 0.07, 0.00, 0.03, 0.00, 0.01, 0.08, 0.07, 0.03, 0.10, 0.00, 0.04, 0.04, 0.08, 0.08, 0.02, 0.05, 0.04, 0.06, 0.07, 0.08, 0.03, 0.07, 0.07, 0.02, 0.01, 0.05, 0.10, 0.03, 0.06, 0.02, 0.08, 0.03, 0.05, 0.07, 0.09, 0.10, 0.05, 0.01, 0.01, 0.03, 0.08, 0.03, 0.08, 0.02, 0.09, 0.03, 0.02, 0.03, 0.06, 0.05, 0.04, 0.08, 0.06, 0.05, 0.09, 0.03, 0.08, 0.08]
			}]
		};

		myChart4 = echarts.init(document.getElementById('main4'), 'macarons');
		myChart4.setOption(option4);

		myChart.connect([myChart2, myChart3, myChart4]);
		myChart2.connect([myChart, myChart3, myChart4]);
		myChart3.connect([myChart, myChart2, myChart4]);
		myChart4.connect([myChart, myChart2, myChart3]);

		setTimeout(function() {
			window.onresize = function() {
				myChart.resize();
				myChart2.resize();
				myChart3.resize();
				myChart4.resize();
			}
		}, 200)

	});

}

