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

		var option = {
			title : {
				text : '某地区蒸发量和降水量'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : ['蒸发量', '降水量']
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
				data : ['1', '2', '3', '4', '5', '6', '半透', '透明', '渐变2']
			}],
			yAxis : [{
				type : 'value'
			}],
			series : [{
				name : '蒸发量',
				type : 'bar',
				barCategoryGap : '50%',
				data : [20.0, 40.9, 27.0, 23.2, 25.6, 36.7, 35.6, 42.2, 32.6]
			}, {
				name : '降水量',
				type : 'bar',
				data : [22.6, 35.9, 29.0, 26.4, 28.7, 40.7, {
					value : 28.8,
					itemStyle : {
						normal : {
							color : 'rgba(182,162,222,0.3)',
						}
					}
				}, {
					value : 26.0,
					itemStyle : {
						normal : {
							color : 'rgba(255,255,255,0)',
							barBorderColor : 'rgba(182,162,222,0.5)',
							barBorderWidth : 2,
						}
					}
				}, {
					value : 32.3,
					itemStyle : {
						normal : {
							barBorderColor : 'rgba(182,162,222,0.5)',
							barBorderWidth : 2,
							color : (function() {
								var zrColor = require('zrender/tool/color');
								return zrColor.getLinearGradient(0, 400, 0, 200, [[0, 'rgba(182,162,222,1)'], [1, 'rgba(255,255,255,0.3)']])
							})(),
						}
					}
				}]
			}]
		};

		myChart = echarts.init(document.getElementById('main1'), 'macarons');
		myChart.setOption(option);

		setTimeout(function() {
			window.onresize = function() {
				myChart.resize();
			}
		}, 200)

	});

}

