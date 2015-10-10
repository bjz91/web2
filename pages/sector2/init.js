function initComponent() {

	var barName = 'data/bar.json';
	var pieName1 = 'data/pie.json';
	var pieName2 = 'data/subpie.json';

	/*--------- 加载ECharts ---------*/
	$.getJSON(barName, function(bardata) {
		$.getJSON(pieName1, function(piedata) {
			$.getJSON(pieName2, function(piedata2) {
				loadComponent(bardata, piedata, piedata2);
			});
		});
	});
}

