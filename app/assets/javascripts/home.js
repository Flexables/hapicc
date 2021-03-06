function chartBuilder(sysArray, diaArray, dateArray, boArray, hrArray) {
    $('#container').highcharts({
        title: {
            text: 'Patient Data for the week',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: iHealth, Fitbit',
            x: -20
        },
        xAxis: {
            categories: dateArray
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Systolic',
            data: sysArray
        }, {
            name: 'Diastolic',
            data: diaArray
        }, {
            name: 'Blood Oxygen',
            data: boArray
        }, {
            name: 'Heart Rate',
            data: hrArray
        }]
    });
};

function dataParse(data) {
  var bpRecord = data.bp_data_list;
  var boRecord = data.bo_data_list;
  var hrRecord = data.hr_data_list;
  console.log(data);
  var sysArray = [];
  var diaArray = [];
  var dateArray = [];
  var boArray = [];
  var hrArray = [];
  for (var i = 0; i < bpRecord.length; i += 1) {
    sysArray.push(parseInt(bpRecord[i].sys));
    diaArray.push(parseInt(bpRecord[i].dia));
    dateArray.push(bpRecord[i].date);
  }

  for (var i = 0; i < boRecord.length; i += 1) {
    boArray.push(parseInt(boRecord[i].oxy));
  }

  for (var i = 0; i < hrRecord.length; i += 1) {
    hrArray.push(parseInt(hrRecord[i].heart_rate));
  }

  // console.log(sysArray);
  // console.log(diaArray);
  // console.log(dateArray);
  // console.log(boArray);
  console.log(hrArray);
  // var dia = data.bp_data_list[0].dia;
  chartBuilder(sysArray, diaArray, dateArray, boArray, hrArray);
}

$(document).ready(function() {
  var data;
 $.ajax({
    url: '/patient/temp_patient',
    type: 'GET',
    async: true,
    dataType: "json",
    success: function (data) {


        dataParse(data);
    }
  });
 });



 // : [20.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
 // [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]

// patientData (data)
