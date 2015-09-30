function initChord() {

	var chordName;
	var pieName;

	if (document.getElementById('sel2').value == 0) {//年均
		pieName = 'data/PM25_3CatContrib_Conc_HB_2013_annual.json';
		if (document.getElementById('sel').value == 0) {
			chordName = 'data/PM25_RegContrib_Conc_HB_2013_annual.json';
		} else {
			chordName = 'data/PM25_RegContrib_Ratio_HB_2013_annual.json';
		}
	} else if (document.getElementById('sel2').value == 1) {//春
		pieName = 'data/PM25_3CatContrib_Conc_HB_2013_spring.json';
		if (document.getElementById('sel').value == 0) {
			chordName = 'data/PM25_RegContrib_Conc_HB_2013_spring.json';
		} else {
			chordName = 'data/PM25_RegContrib_Ratio_HB_2013_spring.json';
		}

	} else if (document.getElementById('sel2').value == 2) {//夏
		pieName = 'data/PM25_3CatContrib_Conc_HB_2013_summer.json';
		if (document.getElementById('sel').value == 0) {
			chordName = 'data/PM25_RegContrib_Conc_HB_2013_summer.json';
		} else {
			chordName = 'data/PM25_RegContrib_Ratio_HB_2013_summer.json';
		}

	} else if (document.getElementById('sel2').value == 3) {//秋
		pieName = 'data/PM25_3CatContrib_Conc_HB_2013_autumn.json';
		if (document.getElementById('sel').value == 0) {
			chordName = 'data/PM25_RegContrib_Conc_HB_2013_autumn.json';
		} else {
			chordName = 'data/PM25_RegContrib_Ratio_HB_2013_autumn.json';
		}

	} else {//冬
		pieName = 'data/PM25_3CatContrib_Conc_HB_2013_winter.json';
		if (document.getElementById('sel').value == 0) {
			chordName = 'data/PM25_RegContrib_Conc_HB_2013_winter.json';
		} else {
			chordName = 'data/PM25_RegContrib_Ratio_HB_2013_winter.json';
		}
	}

	$.getJSON(chordName, function(chorddata) {
		$.getJSON(pieName, function(piedata) {
			loadChord(chorddata, piedata);
		});
	});
}

