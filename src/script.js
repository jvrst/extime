var currentTime = (new Date()).getTime() - 10800; // Current UTC time in milliseconds
let currentDay = new Date().getUTCDay();

// Current date at 00:00:00 UTC
var startOfDay = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());

// Current date at 23:59:59 UTC
var endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1; // Minus 1 millisecond to get to 23:59:59

const stockExchanges = [
  { name: 'New York Stock Exchange', short_name: "NYSE", openHour: 13, openMinute: 30, closeHour: 20, closeMinute: 0 },
  { name: 'NASDAQ', short_name: "NDQ", openHour: 13, openMinute: 30, closeHour: 20, closeMinute: 0 },
  { name: 'London Stock Exchange', short_name: "LSE", openHour: 8, openMinute: 0, closeHour: 16, closeMinute: 30 },
  { name: 'Tokyo Stock Exchange', short_name: "TSE", openHour: 0, openMinute: 0, closeHour: 6, closeMinute: 0 },
  { name: 'Hong Kong Stock Exchange', short_name: "HKEX", openHour: 1, openMinute: 15, closeHour: 8, closeMinute: 0 },
  { name: 'Euronext', short_name: "EN", openHour: 8, openMinute: 0, closeHour: 16, closeMinute: 40 },
  { name: 'Toronto Stock Exchange', short_name: "TSX", openHour: 13, openMinute: 30, closeHour: 21, closeMinute: 0 },
  { name: 'Shanghai Stock Exchange', short_name: "SSE", openHour: 1, openMinute: 30, closeHour: 7, closeMinute: 0 }
];

let state = 'Open'
if (currentDay === 6 || currentDay === 0) {
  state = 'Closed'
}

// Map stock exchanges to series data
let seriesData = stockExchanges.map((exchange, index) => ({
  x: new Date().setUTCHours(exchange.openHour, exchange.openMinute, 0, 0),
  x2: new Date().setUTCHours(exchange.closeHour, exchange.closeMinute, 0, 0),
  y: index,
  name: state
}));

Highcharts.chart('container', {
  chart: {
    type: 'xrange',
  },
  title: {
    text: 'Global Stock Exchange Opening Hours'
  },
  xAxis: {
    type: 'datetime',
    min: startOfDay,
    max: endOfDay,
    plotLines: [{
      color: 'red', // Color of the line
      width: 2, // Width of the line
      value: Date.now(), // Current time in UTC
      label: {
        useHTML: true,
        formatter: function() {
          var labelDate = new Date();
          // Formats the date to HH:mm (hours and minutes)
          var formattedTime = Highcharts.dateFormat('%H:%M', labelDate.getTime());
          console.log(formattedTime);
          return `<span>${formattedTime}</span>`; // Returns the formatted time
        },
        rotation: 0, // Keeps the label horizontal
        y: 170, // Adjusts the vertical position of the label to be below the line
        x: -20,
        align: 'center', // Centers the label under the line
        style: {
          color: 'black', // Sets the text color
          fontWeight: "bold"
        }
      },
      zIndex: 5 // Ensures the line is above the plot lines
    }]
  },
  yAxis: [{
    title: {
      text: 'Stock Exchanges'
    },
    // Replace these with the names of the stock exchanges you want to include
    categories: stockExchanges.map(exchange => exchange.name),
    reversed: true
  }],
  plotOptions: {
    xrange: {
      borderRadius: 5,
      borderWidth: 1,
      grouping: false,
      dataLabels: {
        align: 'center',
        enabled: true,
        format: '{point.name}'
      },
      colorByPoint: true
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size: 10px">{point.x:%e-%b-%Y %H:%M} - {point.x2:%e-%b-%Y %H:%M}</span><br/>',
    pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.yCategory}</b><br/>'
  },
  series: [{
    name: 'Opening Hours',
    animation: false,
    pointWidth: 20,
    data: seriesData
  }],
  exporting: {
    enabled: true,
    sourceWidth: 1200
  }

});
