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
				x : 'left'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				show : true,
				orient : 'vertical',
				x : 'right',
				y : 'top',
				data : function() {
					var list = [];
					for (var i = 0; i < barDataObj.length; i++) {
						list.push(barDataObj[i].name);
					}
					return list;
				}()
			},
			/*
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
			 },*/
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
								if (param.percent > 15) {
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
								if (param.percent > 3) {
									return param.name + '\n' + ' (' + (param.percent - 0).toFixed(2) + '%' + ')';
								} else {
									return false;
								}
							},
							textStyle : {
								align : 'center',
								baseline : 'top'
							}
						},
						labelLine : {
							show : false,
							length : 20
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

