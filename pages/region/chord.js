$.getJSON('PM25_RegContrib_Conc_HB_2013_annual.json', function(chorddata) {
	$.getJSON('PM25_3CatContrib_Conc_HB_2013_annual.json', function(piedata) {
		// 路径配置
		require.config({
			paths : {
				echarts : '../../src/echarts-2.2.4/build/dist'
			}
		});

		// 使用
		require(['echarts', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/force', 'echarts/chart/chord', 'echarts/chart/pie', 'echarts/chart/funnel'], function(ec) {

			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('container'), 'macarons');

			var option = {
				title : {
					text : '区域贡献',
					x : 'center'
				},
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						var index = chorddata.chord.name.indexOf(params.indicator);
						var index2 = chorddata.chord.name.indexOf(params.indicator2);
						if (params.indicator2) {// is edge
							return params.indicator + ' 传至 ' + params.indicator2 + ' : ' + chorddata.chord.matrix[index2][index].toFixed(3) + '<br />' + params.indicator2 + ' 传至 ' + params.indicator + ' : ' + chorddata.chord.matrix[index][index2].toFixed(3);
						} else {// is node
							//inValue是传出，outValue是传入？
							return params.name + '<br />' + '传出： ' + params.data.inValue.toFixed(3) + '<br />' + '传入： ' + params.data.outValue.toFixed(3);
						}
					}
				},
				toolbox : {
					show : true,
					feature : {
						restore : {
							show : true
						},
						magicType : {
							show : true,
							type : ['force', 'chord']
						},
						saveAsImage : {
							show : true
						}
					}
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : chorddata.chord.name
				},
				series : [{
					type : 'chord',
					sort : 'ascending',
					sortSub : 'descending',
					showScale : false,
					showScaleText : false,
					data : function() {
						var list = [];
						for (var i = 0; i < chorddata.chord.name.length; i++) {
							var obj = {
								'name' : chorddata.chord.name[i]
							}
							list.push(obj);
						}
						return list;
					}(),
					itemStyle : {
						normal : {
							label : {
								show : true
							}
						}
					},
					matrix : chorddata.chord.matrix
				}]
			};

			// 为echarts对象加载数据
			myChart.setOption(option);

			// 基于准备好的dom，初始化echarts图表
			var myChartPie = ec.init(document.getElementById('container1'), 'macarons');

			var optionPie = {
				title : {
					text : piedata.pie.subspecies[0].title,
					//subtext : '数据来源：毕鉴昭',
					x : 'center'
				},
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {d}%"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : piedata.pie.subspecies[0].name
				},
				calculable : true,
				series : [{
					name : '排放源贡献',
					type : 'pie',
					radius : '55%',
					center : ['50%', '50%'],
					itemStyle : {
						normal : {
							label : {
								formatter : function(params) {
									return params.name + ' (' + (params.percent - 0).toFixed(2) + '%' + ')';
								}
							}
						}
					},
					data : function() {
						var list = [];
						for (var i = 0; i < piedata.pie.subspecies[0].value.length; i++) {
							var obj = {
								value : piedata.pie.subspecies[0].value[i],
								name : piedata.pie.subspecies[0].name[i]
							};
							list.push(obj);
						}
						return list;
					}()
				}]
			};

			myChartPie.setOption(optionPie);

			var ecConfig = require('echarts/config');

			function eConsole(param) {

				//画物种
				var newOptionPie = myChartPie.getOption();
				newOptionPie.series[0].data = [];
				for (var i = 0; i < piedata.pie.subspecies[param.dataIndex].value.length; i++) {
					var obj = {
						value : piedata.pie.subspecies[param.dataIndex].value[i],
						name : piedata.pie.subspecies[param.dataIndex].name[i],
					};
					newOptionPie.series[0].data.push(obj);
				}

				//画图例
				var list = [];
				for (var i = 0; i < piedata.pie.subspecies[0].name.length; i++) {
					list.push(piedata.pie.subspecies[0].name[i]);
				}
				newOptionPie.legend.data = list;

				//画title
				newOptionPie.title.text = piedata.pie.subspecies[param.dataIndex].title;
				myChartPie.setOption(newOptionPie, true);

				console.log(param);

			}

			myChart.on(ecConfig.EVENT.CLICK, eConsole);

		});
	});
});

