function initSequence() {

	/*--------- 数据计算 ---------*/
	//固定排放计算
	var dataFix = [400, 150, 100, 500, 100, 200, 300];
	var dataFixSum = 0;
	for (var i = 0; i < dataFix.length; i++) {
		dataFixSum += dataFix[i];
	}
	dataFix.unshift(dataFixSum);

	//减排潜力计算
	var dataPot = [300, 200, 150, 150, 400, 200, 300];
	var dataPotSum = 0;
	for (var i = 0; i < dataPot.length; i++) {
		dataPotSum += dataPot[i];
	}
	dataPot.unshift(dataPotSum);

	//辅助条带计算
	var dataAssi = [0];
	for (var i = 1; i < dataPot.length; i++) {
		if (i === 1) {
			dataAssi.push(dataFix[i - 1] + dataPot[i - 1] - dataFix[i] - dataPot[i]);
		} else {
			dataAssi.push(dataAssi[i - 1] - dataFix[i] - dataPot[i]);
		}
	}

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
			tooltip : {
				trigger : 'axis',
				axisPointer : {// 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter : function(params) {
					var tar = params[0];
					var tar2 = params[1];
					return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + '<br/>' + tar2.seriesName + ' : ' + tar2.value;
				}
			},
			legend : {
				data : [ '减排潜力']
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
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			xAxis : [{
				type : 'category',
				splitLine : {
					show : false
				},
				data : ['总量', '溶剂使用源', '移动源', '废弃物处理源', '工艺过程源', '固定燃烧源', '农业源', '油气储运']
			}],
			yAxis : [{
				type : 'value'
			}],
			series : [{
				name : '辅助',
				type : 'bar',
				stack : '总量',
				itemStyle : {
					normal : {
						barBorderRadius : 0,
						barBorderColor : 'rgba(0,0,0,0)',
						color : 'rgba(0,0,0,0)'
					},
					emphasis : {
						barBorderRadius : 0,
						barBorderColor : 'rgba(0,0,0,0)',
						color : 'rgba(0,0,0,0)'
					}
				},
				data : dataAssi
			}, {
				name : '固定排放',
				type : 'bar',
				stack : '总量',
				itemStyle : {
					normal : {
						barBorderRadius : 0,
						label : {
							show : false,
							position : 'inside'
						}
					}
				},
				data : dataFix
			}, {
				name : '减排潜力',
				type : 'bar',
				stack : '总量',
				itemStyle : {
					normal : {
						color : '#fff',
						barBorderRadius : 0,
						barBorderColor : '#b6a2de',
						barBorderWidth : 3,
						barBorderRadius : 0
					}
				},
				data : dataPot
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

