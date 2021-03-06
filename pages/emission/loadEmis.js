function loadEmis(bardata, piedata, cityValue) {

	//自定义颜色列表
	var colorList = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050'];

	// 路径配置
	require.config({
		paths : {
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/pie', 'echarts/chart/funnel'], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChartBar = ec.init(document.getElementById('container1'), 'macarons');

		var optionBar = {
			title : {
				text : bardata.bar.data[4].title, //默认显示农业
				x : 'center',
				//subtext : '数据来源：毕鉴昭'
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : {// 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter : "{a} <br/>{b} : {c} %"
			},
			legend : {
				show : false,
				data : bardata.bar.feature
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
			//animation : false,
			xAxis : [{
				type : 'category',
				axisLabel : {
					interval : 0,
					rotate : -30,
					textStyle : {
						//fontSize : 9.5 //如果x轴label有重叠，需要调小字号
					}
				},
				data : function() {
					var list = [];
					for (var i = 0; i < bardata.bar.name.length; i++) {
						list.push(bardata.bar.name[i]);
					}
					return list;
				}()
			}],
			yAxis : [{
				type : 'value',
				name : bardata.bar.unit
			}],
			series : [{
				name : bardata.bar.feature[0],
				type : 'bar',
				barCategoryGap : '60%',
				itemStyle : {
					normal : {
						barBorderRadius : 0,
						color : colorList[4] //工业

					}
				},
				data : function() {//工业
					var list = [];
					for (var i = 0; i < bardata.bar.data[4].value.length; i++) {
						list.push(bardata.bar.data[4].value[i].toFixed(2));
					}
					return list;
				}()
			}]
		};

		// 为echarts对象加载数据
		myChartBar.setOption(optionBar);

		// 基于准备好的dom，初始化echarts图表
		var myChartPie = ec.init(document.getElementById('container'), 'macarons');

		var optionPie = {
			title : {
				text : piedata.pie[cityValue].title,
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
				data : piedata.pie[cityValue].name
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
				name : '浓度贡献',
				type : 'pie',
				radius : '55%',
				center : ['50%', '50%'],
				itemStyle : {
					normal : {
						color : function(params) {
							// build a color map as your need.
							return colorList[params.dataIndex]
						},
						label : {
							formatter : function(params) {
								return params.name + '\n' + ' (' + (params.percent - 0).toFixed(2) + '%' + ')';
							}
						}
					}
				},
				data : function() {
					var list = [];
					for (var i = 0; i < piedata.pie[cityValue].name.length; i++) {
						var obj = {
							'value' : piedata.pie[cityValue].value[i].toFixed(3),
							'name' : piedata.pie[cityValue].name[i]
						}
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		myChartPie.setOption(optionPie);

		var ecConfig = require('echarts/config');
		function eConsole(param) {
			var last = piedata.pie[cityValue].name.length - 1;
			//排除外省
			if (param.dataIndex != last) {
				//画物种
				var newOptionBar = myChartBar.getOption();
				newOptionBar.series[0].data = [];
				for (var i = 0; i < bardata.bar.data[param.dataIndex].value.length; i++) {
					newOptionBar.series[0].data.push(bardata.bar.data[param.dataIndex].value[i].toFixed(2));
				}
				newOptionBar.title.text = bardata.bar.data[param.dataIndex].title;
				//改变bar颜色
				newOptionBar.series[0].itemStyle.normal.color = colorList[param.dataIndex];
				myChartBar.setOption(newOptionBar, true);
				console.log(param);
			}
		}


		myChartPie.on(ecConfig.EVENT.HOVER, eConsole);

	});

}
