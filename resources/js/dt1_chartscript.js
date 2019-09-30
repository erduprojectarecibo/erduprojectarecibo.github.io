/**
 * Highcharts plugin to defer initial series animation until the element has
 * appeared.
 *
 * Updated 2019-09-18
 *
 * @todo
 * - If the element is greater than the viewport (or a certain fraction of it),
 *   show the series when it is partially visible.
 */
(function (H) {

    var pendingRenders = [];

    function isElementInViewport(el) {

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (
                window.innerHeight ||
                document.documentElement.clientHeight
            ) &&
            rect.right <= (
                window.innerWidth ||
                document.documentElement.clientWidth
            )
        );
    }

    H.wrap(H.Series.prototype, 'render', function deferRender(proceed) {
        var series = this,
            renderTo = this.chart.container.parentNode;

        // It is appeared, render it
        if (isElementInViewport(renderTo) || !series.options.animation) {
            proceed.call(series);

            // It is not appeared, halt rendering until appear
        } else {
            pendingRenders.push({
                element: renderTo,
                appear: function () {
                    proceed.call(series);
                }
            });
        }
    });

    function recalculate() {
        pendingRenders.forEach(function (item) {
            if (isElementInViewport(item.element)) {
                item.appear();
                H.erase(pendingRenders, item);
            }
        });
    }

    if (window.addEventListener) {
        ['DOMContentLoaded', 'load', 'scroll', 'resize']
        .forEach(function (eventType) {
            addEventListener(eventType, recalculate, false);
        });
    }

}(Highcharts));


Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    },
    chart: {

        backgroundColor: '#FFF',
    },

    legend: {
        itemStyle: {
            color: '#000'
        },
        itemHiddenStyle: {
            color: '#777'
        },
        itemHoverStyle: {
            color: '#777'
        }
    },

    title: {
        style: {
            color: '#22292F',
            fill: '#22292F',
            fontWeight: 'bold'
        }
    },

    subtitle: {
        style: {
            color: '#8795A1',
            fill: '#8795A1',
            fontWeight: 'bold'
        }
    },

    yAxis: {
        title: {
            style: {
                color: 'black'
            }
        },


        labels: {
            style: {
                color: '#606F7B',
            }
        }
    },

    xAxis: {
        labels: {
            style: {
                color: '#606F7B',
            }
        }
    },

    credits: {
        enabled: false
    },

    tooltip: {
        backgroundColor: "#FFF",
        borderColor: '#000',
        valueDecimals: 1,
        style: {
            opacity: 0.86
        },

        shared: true

    },

    plotOptions: {
        series: {
            lineWidth: 5,
            animation: {
                duration: 6000
            }
        },
    },
});

/* ********************************************************************************************************************************************** */

// Tasa de Delitos Tipo 1 por cada 100,000 Habitantes (1960-2018)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    Highcharts.chart('chart03', {

        chart: {
            type: 'area',
            zoomType: 'x',
        },

        title: {
            text: 'Delitos tipo 1 en Puerto Rico de 1960 a 2018',
        },

        xAxis: {
            categories: ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970',
                '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'
            ],
        },

        yAxis: {
            title: {
                text: 'Delitos tipo 1 por cada 100,000 habitantes',
                style: {
                    color: 'black'
                }
            },
            labels: {
            },
            min: 0,
            max: 4500,
            gridLineWidth:0,
        },
        legend: {
            itemStyle: {
            }
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1960
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Tasa Delitos Tipo 1',
            data: [1416.1, 1598.8, 1964.3, 2195.6, 2256.8, 2233.2, 2314.1, 2316.5, 2480.5, 2304.1, 2450.9, 2582.1, 2545.4,
                2575.0, 2879.9, 3030.6, 2910.3, 2708.9, 2590.1, 2573.9, 2883.8, 3011.6, 2976.7, 2806.6, 3086.9, 3471.6,
                3531.1, 3222.1, 3251.4, 3169.0, 3525.7, 3372.2, 3605.1, 3361.8, 3205.4, 2902.4, 2708.1, 2553.3, 2321.7,
                2149.9, 1993.0, 1836.2, 2385.7, 2137.6, 1832.3, 1702.3, 1632.9, 1662.2, 1827.9, 1796.9, 1673.2, 1692.9,
                1698.5, 1619.2, 1527.8, 1341.3, 1258.0, 1171.8, 976.9
            ],
            color: '#2a8e40',
            animation: {
                enabled: true,
                duration: 6000,
                easing: 'linear'
            },
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
})

/* ********************************************************************************************************************************************** */

// Tasa Ascendente de Delitos Tipo 1 por cada 100,000 habitantes (1960-1992)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    var chart2 = Highcharts.chart('chart016', {

        chart: {
            type: 'line',
            zoomType: 'x',
        },

        title: {
            text: 'Gráfica 1: Tendencia tasa delitos tipo 1 de 1960 a 1992',
        },

        subtitle: {
            text: 'Razón de Cambio Promedio en la tasa fue de 66 delitos por año.',
            style: {
                color: "transparent"
            },
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { 
            year: '%Y'
            },
            tickInterval: Date.UTC(2010, 0) - Date.UTC(2008, 0)

        },

        yAxis: {
            title: {
                text: 'Delitos tipo 1 por cada 100,000 habitantes',
                style: {
                    color:'black'
                }
            },
            labels: {
                formatter: function() {
                    return Highcharts.numberFormat(this.value, 0, ' ', ', ')
                }
            },
            min: 0,
            max: 4500,
            gridLineWidth:0,
        },
        legend: {
        },

        plotOptions: {
            series: {
                animation: {
                    duration:6000
                },
                events: {
                    afterAnimate: function() {
                        update_data();
                    }
                },
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: Date.UTC(1959, 0)
            },
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Tasa Delitos Tipo 1',
            data: [{
                'x': Date.UTC(1959, 0),
// Jan, 1, 1959
'y':null
},
{
'x': Date.UTC(1960, 0),
// Jan, 1, 1960
'y':1416.1
},
{
'x': Date.UTC(1961, 0),
// Jan, 1, 1961
'y':1598.8
},
{
'x': Date.UTC(1962, 0),
// Jan, 1, 1962
'y':1964.3
},
{
'x': Date.UTC(1963, 0),
// Jan, 1, 1963
'y':2195.6
},
{
'x': Date.UTC(1964, 0),
// Jan, 1, 1964
'y':2256.8
},
{
'x': Date.UTC(1965, 0),
// Jan, 1, 1965
'y':2233.2
},
{
'x': Date.UTC(1966, 0),
// Jan, 1, 1966
'y':2314.1
},
{
'x': Date.UTC(1967, 0),
// Jan, 1, 1967
'y':2316.5
},
{
'x': Date.UTC(1968, 0),
// Jan, 1, 1968
'y':2480.5
},
{
'x': Date.UTC(1969, 0),
// Jan, 1, 1969
'y':2304.1
},
{
'x': Date.UTC(1970, 0),
// Jan, 1, 1970
'y':2450.9
},
{
'x': Date.UTC(1971, 0),
// Jan, 1, 1971
'y':2582.1
},
{
'x': Date.UTC(1972, 0),
// Jan, 1, 1972
'y':2545.4
},
{
'x': Date.UTC(1973, 0),
// Jan, 1, 1973
'y':2575
},
{
'x': Date.UTC(1974, 0),
// Jan, 1, 1974
'y':2879.9
},
{
'x': Date.UTC(1975, 0),
// Jan, 1, 1975
'y':3030.6
},
{
'x': Date.UTC(1976, 0),
// Jan, 1, 1976
'y':2910.3
},
{
'x': Date.UTC(1977, 0),
// Jan, 1, 1977
'y':2708.9
},
{
'x': Date.UTC(1978, 0),
// Jan, 1, 1978
'y':2590.1
},
{
'x': Date.UTC(1979, 0),
// Jan, 1, 1979
'y':2573.9
},
{
'x': Date.UTC(1980, 0),
// Jan, 1, 1980
'y':2883.8
},
{
'x': Date.UTC(1981, 0),
// Jan, 1, 1981
'y':3011.6
},
{
'x': Date.UTC(1982, 0),
// Jan, 1, 1982
'y':2976.7
},
{
'x': Date.UTC(1983, 0),
// Jan, 1, 1983
'y':2806.6
},
{
'x': Date.UTC(1984, 0),
// Jan, 1, 1984
'y':3086.9
},
{
'x': Date.UTC(1985, 0),
// Jan, 1, 1985
'y':3471.6
},
{
'x': Date.UTC(1986, 0),
// Jan, 1, 1986
'y':3531.1
},
{
'x': Date.UTC(1987, 0),
// Jan, 1, 1987
'y':3222.1
},
{
'x': Date.UTC(1988, 0),
// Jan, 1, 1988
'y':3251.4
},
{
'x': Date.UTC(1989, 0),
// Jan, 1, 1989
'y':3169.0
},
{
'x': Date.UTC(1990, 0),
// Jan, 1, 1990
'y':3525.7
},
{
'x': Date.UTC(1991, 0),
// Jan, 1, 1991
'y':3372.2
},
{
'x': Date.UTC(1992, 0),
// Jan, 1, 1992
'y':3605.1
},
{
'x': Date.UTC(1993, 0),
// Jan, 1, 1993
'y':null
},
            ],
            color: '#2a8e40',
        },{
            name:' ',
            data: [
                {
                'x': Date.UTC(1959, 0),
                // Enero, 1, 1959
                'y':null
                },
                {
                'x': Date.UTC(1960, 0),
                // Enero, 1, 1985
                'y':0
                },
                {
                'x': Date.UTC(1992, 0),
                // Enero, 1, 1992
                'y':0
                },
                {
                'x': Date.UTC(1993, 0),
                // Enero, 1, 1993
                'y':null
                },
            ],
            color: 'transparent',
        }],

    });

function update_data() {
    chart2.update({

        plotOptions: {
            series: {
                animation: {
                    duration: 6000
                },
                events: {
                    afterAnimate: function() {
                        update_data2();
                    }
                },
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: Date.UTC(1959, 0)
            },
        },

            series: [{
            name: 'Tasa Delitos Tipo 1',
            data: [{
                'x': Date.UTC(1959, 0),
// Jan, 1, 1959
'y':null
},
{
'x': Date.UTC(1960, 0),
// Jan, 1, 1960
'y':1416.1
},
{
'x': Date.UTC(1961, 0),
// Jan, 1, 1961
'y':1598.8
},
{
'x': Date.UTC(1962, 0),
// Jan, 1, 1962
'y':1964.3
},
{
'x': Date.UTC(1963, 0),
// Jan, 1, 1963
'y':2195.6
},
{
'x': Date.UTC(1964, 0),
// Jan, 1, 1964
'y':2256.8
},
{
'x': Date.UTC(1965, 0),
// Jan, 1, 1965
'y':2233.2
},
{
'x': Date.UTC(1966, 0),
// Jan, 1, 1966
'y':2314.1
},
{
'x': Date.UTC(1967, 0),
// Jan, 1, 1967
'y':2316.5
},
{
'x': Date.UTC(1968, 0),
// Jan, 1, 1968
'y':2480.5
},
{
'x': Date.UTC(1969, 0),
// Jan, 1, 1969
'y':2304.1
},
{
'x': Date.UTC(1970, 0),
// Jan, 1, 1970
'y':2450.9
},
{
'x': Date.UTC(1971, 0),
// Jan, 1, 1971
'y':2582.1
},
{
'x': Date.UTC(1972, 0),
// Jan, 1, 1972
'y':2545.4
},
{
'x': Date.UTC(1973, 0),
// Jan, 1, 1973
'y':2575
},
{
'x': Date.UTC(1974, 0),
// Jan, 1, 1974
'y':2879.9
},
{
'x': Date.UTC(1975, 0),
// Jan, 1, 1975
'y':3030.6
},
{
'x': Date.UTC(1976, 0),
// Jan, 1, 1976
'y':2910.3
},
{
'x': Date.UTC(1977, 0),
// Jan, 1, 1977
'y':2708.9
},
{
'x': Date.UTC(1978, 0),
// Jan, 1, 1978
'y':2590.1
},
{
'x': Date.UTC(1979, 0),
// Jan, 1, 1979
'y':2573.9
},
{
'x': Date.UTC(1980, 0),
// Jan, 1, 1980
'y':2883.8
},
{
'x': Date.UTC(1981, 0),
// Jan, 1, 1981
'y':3011.6
},
{
'x': Date.UTC(1982, 0),
// Jan, 1, 1982
'y':2976.7
},
{
'x': Date.UTC(1983, 0),
// Jan, 1, 1983
'y':2806.6
},
{
'x': Date.UTC(1984, 0),
// Jan, 1, 1984
'y':3086.9
},
{
'x': Date.UTC(1985, 0),
// Jan, 1, 1985
'y':3471.6
},
{
'x': Date.UTC(1986, 0),
// Jan, 1, 1986
'y':3501.5
},
{
'x': Date.UTC(1987, 0),
// Jan, 1, 1987
'y':3222.1
},
{
'x': Date.UTC(1988, 0),
// Jan, 1, 1988
'y':3251.4
},
{
'x': Date.UTC(1989, 0),
// Jan, 1, 1989
'y':3163.8
},
{
'x': Date.UTC(1990, 0),
// Jan, 1, 1990
'y':3525.7
},
{
'x': Date.UTC(1991, 0),
// Jan, 1, 1991
'y':3372.2
},
{
'x': Date.UTC(1992, 0),
// Jan, 1, 1992
'y':3605.1
},
{
'x': Date.UTC(1993, 0),
// Jan, 1, 1993
'y':null
},
            ],
            color: '#2a8e40',
        },{
            name:'Razón de Cambio Promedio',
            data: [
            {
                'x': Date.UTC(1959, 0),
                // Enero, 1, 1959
                'y':null
                },
                {
                'x': Date.UTC(1960, 0),
                // Enero, 1, 1985
                'y':1416,
                dataLabels: {
                    y:24
                }
                },
                {
                'x': Date.UTC(1992, 0),
                // Enero, 1, 1992
                'y':3605
                },
                {
                'x': Date.UTC(1993, 0),
                // Enero, 1, 1992
                'y':null
                },
            ],
            color: '#FEDA35',
            dataLabels: {
                enabled: true,
            },
            animation: {
                enabled: true,
                duration: 6000,
                easing: 'linear'
            },
        }]
    })

}

function update_data2() {
    chart2.update({
         subtitle: {
             text: 'Razón de Cambio Promedio: 66 delitos por año.',
             style: {
                 color: "black"
             },
             y:100,
             x:40,
         },
     })
}

});

/* ********************************************************************************************************************************************** */

// Tasa Descendente de Delitos Tipo 1 por cada 100,000 habitantes (1992-2018)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    var chart3 = Highcharts.chart('chart017', {

        chart: {
            type: 'line',
            zoomType: 'x',
        },

        title: {
            text: 'Gráfica 2: Tendencia delitos tipo 1 de 1992 a 2018',
        },

        subtitle: {
            text: 'Razón de Cambio Promedio en la tasa fue de -97 delitos por año.',
            style: {
                color: "transparent"
            },
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { 
            year: '%Y'
            },
            tickInterval: Date.UTC(2010, 0, 1) - Date.UTC(2009, 0, 1)
        },

        yAxis: {
            title: {
                text: 'Delitos tipo 1 por cada 100,000 habitantes',
                style: {
                    color:'black'
                }
            },
            labels: {
                formatter: function() {
                    return Highcharts.numberFormat(this.value, 0, ' ', ', ')
                }
            },
            min: 0,
            max: 4500,
            gridLineWidth:0,
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                animation: {
                    duration: 6000
                },
                events: {
                    afterAnimate: function() {
                        update_data3();
                    }
                },
            },
        },

        tooltip: {
            shared: true,
        },

        series: [{
            name: 'Tasa Delitos Tipo 1',
            data: [{
'x': Date.UTC(1991, 0),
// Jan, 1, 1991
'y':null
},
{
'x': Date.UTC(1992, 0),
// Jan, 1, 1992
'y':3605.1
},
{
'x': Date.UTC(1993, 0),
// Jan, 1, 1993
'y':3361.8
},
{
'x': Date.UTC(1994, 0),
// Jan, 1, 1994
'y':3205.4
},
{
'x': Date.UTC(1995, 0),
// Jan, 1, 1995
'y':2902.4
},
{
'x': Date.UTC(1996, 0),
// Jan, 1, 1996
'y':2708.1
},
{
'x': Date.UTC(1997, 0),
// Jan, 1, 1997
'y':2553.3
},
{
'x': Date.UTC(1998, 0),
// Jan, 1, 1998
'y':2321.7
},
{
'x': Date.UTC(1999, 0),
// Jan, 1, 1999
'y':2149.9
},
{
'x': Date.UTC(2000, 0),
// Jan, 1, 2000
'y':1993
},
{
'x': Date.UTC(2001, 0),
// Jan, 1, 2001
'y':1836.2
},
{
'x': Date.UTC(2002, 0),
// Jan, 1, 2002
'y':2385.7
},
{
'x': Date.UTC(2003, 0),
// Jan, 1, 2003
'y':2137.6
},
{
'x': Date.UTC(2004, 0),
// Jan, 1, 2004
'y':1832.3
},
{
'x': Date.UTC(2005, 0),
// Jan, 1, 2005
'y':1702.3
},
{
'x': Date.UTC(2006, 0),
// Jan, 1, 2006
'y':1632.9
},
{
'x': Date.UTC(2007, 0),
// Jan, 1, 2007
'y':1662.2
},
{
'x': Date.UTC(2008, 0),
// Jan, 1, 2008
'y':1827.9
},
{
'x': Date.UTC(2009, 0),
// Jan, 1, 2009
'y':1796.9
},
{
'x': Date.UTC(2010, 0),
// Jan, 1, 2010
'y':1673.2
},
{
'x': Date.UTC(2011, 0),
// Jan, 1, 2011
'y':1692.9
},
{
'x': Date.UTC(2012, 0),
// Jan, 1, 2012
'y':1698.5
},
{
'x': Date.UTC(2013, 0),
// Jan, 1, 2013
'y':1619.2
},
{
'x': Date.UTC(2014, 0),
// Jan, 1, 2014
'y':1527.8
},
{
'x': Date.UTC(2015, 0),
// Jan, 1, 2015
'y':1341.3
},
{
'x': Date.UTC(2016, 0),
// Jan, 1, 2016
'y':1258
},
{
'x': Date.UTC(2017, 0),
// Jan, 1, 2017
'y':1171.8
},
{
'x': Date.UTC(2018, 0),
// Jan, 1, 2018
'y':976.9
},
{
'x': Date.UTC(2019, 0),
// Jan, 1, 2019
'y':null
},
            ],
            color: '#2a8e40',
        },{
            name:' ',
            data: [
                {
                    'x': Date.UTC(1991, 0),
                    // Enero, 1, 1991
                    'y':null
                    },
                    {
                    'x': Date.UTC(1992, 0),
                    // Enero, 1, 1992
                    'y':0
                    },
                    {
                    'x': Date.UTC(2018, 0),
                    // Enero, 1, 2018
                    'y':0
                    },
                    {
                    'x': Date.UTC(2019, 0),
                    // Enero, 1, 2019
                    'y':null
                    },
            ],
            color:'transparent',
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

function update_data3() {
    chart3.update({

        plotOptions: {
            series: {
                animation: {
                    duration: 6000
                },
                events: {
                    afterAnimate: function() {
                        update_data4();
                    }
                },
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
            },
        },

        series: [{
        name: 'Tasa Delitos Tipo 1',
        data: [{
            'x': Date.UTC(1991, 0),
// Jan, 1, 1991
'y':null
},
{
'x': Date.UTC(1992, 0),
// Jan, 1, 1992
'y':3605.1
},
{
'x': Date.UTC(1993, 0),
// Jan, 1, 1993
'y':3361.8
},
{
'x': Date.UTC(1994, 0),
// Jan, 1, 1994
'y':3205.4
},
{
'x': Date.UTC(1995, 0),
// Jan, 1, 1995
'y':2902.4
},
{
'x': Date.UTC(1996, 0),
// Jan, 1, 1996
'y':2708.1
},
{
'x': Date.UTC(1997, 0),
// Jan, 1, 1997
'y':2553.3
},
{
'x': Date.UTC(1998, 0),
// Jan, 1, 1998
'y':2321.7
},
{
'x': Date.UTC(1999, 0),
// Jan, 1, 1999
'y':2149.9
},
{
'x': Date.UTC(2000, 0),
// Jan, 1, 2000
'y':1993
},
{
'x': Date.UTC(2001, 0),
// Jan, 1, 2001
'y':1836.2
},
{
'x': Date.UTC(2002, 0),
// Jan, 1, 2002
'y':2385.7
},
{
'x': Date.UTC(2003, 0),
// Jan, 1, 2003
'y':2137.6
},
{
'x': Date.UTC(2004, 0),
// Jan, 1, 2004
'y':1832.3
},
{
'x': Date.UTC(2005, 0),
// Jan, 1, 2005
'y':1702.3
},
{
'x': Date.UTC(2006, 0),
// Jan, 1, 2006
'y':1632.9
},
{
'x': Date.UTC(2007, 0),
// Jan, 1, 2007
'y':1662.2
},
{
'x': Date.UTC(2008, 0),
// Jan, 1, 2008
'y':1827.9
},
{
'x': Date.UTC(2009, 0),
// Jan, 1, 2009
'y':1796.9
},
{
'x': Date.UTC(2010, 0),
// Jan, 1, 2010
'y':1673.2
},
{
'x': Date.UTC(2011, 0),
// Jan, 1, 2011
'y':1692.9
},
{
'x': Date.UTC(2012, 0),
// Jan, 1, 2012
'y':1698.5
},
{
'x': Date.UTC(2013, 0),
// Jan, 1, 2013
'y':1619.2
},
{
'x': Date.UTC(2014, 0),
// Jan, 1, 2014
'y':1527.8
},
{
'x': Date.UTC(2015, 0),
// Jan, 1, 2015
'y':1341.3
},
{
'x': Date.UTC(2016, 0),
// Jan, 1, 2016
'y':1258
},
{
'x': Date.UTC(2017, 0),
// Jan, 1, 2017
'y':1171.8
},
{
'x': Date.UTC(2018, 0),
// Jan, 1, 2018
'y':976.9
},
{
'x': Date.UTC(2019, 0),
// Jan, 1, 2019
'y':null
},
        ],
        color: '#2a8e40',
    },{
        name:'Razón de Cambio Promedio',
        data: [
            {
            'x': Date.UTC(1991, 0),
            // Enero, 1, 1991
            'y':null
            },
            {
            'x': Date.UTC(1992, 0),
            // Enero, 1, 1992
            'y':3605
            },
            {
            'x': Date.UTC(2018, 0),
            // Enero, 1, 2018
            'y':977,
            dataLabels: {
                y:24
            }
            },
            {
            'x': Date.UTC(2019, 0),
            // Enero, 1, 2019
            'y':null
            },
        ],
        color: '#FEDA35',
        dataLabels: {
            enabled: true,
        },
        animation: {
            enabled: true,
            duration: 6000,
            easing: 'linear'
        },
    }],
})
}

function update_data4() {
    chart3.update({
        subtitle: {
            text: 'Razón de Cambio Promedio: -97 delitos por año.',
            style: {
                color: "black"
            },
            y:100,
            x:40,
        },
    })
}

})

/* ********************************************************************************************************************************************** */

//Total de Delitos Tipo 1 en Puerto Rico (1960-2018)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    Highcharts.chart('chart012', {

        chart: {
            type: 'area',
            zoomType: 'x',
        },

        title: {
            text: 'Gráfica 3: Total de delitos tipo 1 en Puerto Rico de 1960 a 2018',
        },

        xAxis: {
            categories: ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970',
                '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'
            ],
        },

        yAxis: {
            title: {
                text: 'Cantidad delitos tipo 1',
                style: {
                    color:'black'
                }
            },
            min: 0,
            max: 150000,
            gridLineWidth:0,
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1960
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Total Delitos Tipo 1',
            data: [33272, 37982, 47514, 54159, 56746, 57117, 60013, 60735, 65616, 61480, 66470, 70438, 70423, 72363, 82293, 88095, 86079,
                81544, 79343, 80181, 92180, 96645, 96738, 92252, 102525, 116432, 119522, 110018, 111947, 110027, 124371, 119731, 128874,
                121035, 116263, 106088, 99788, 94875, 87020, 81880, 75379, 70120, 91223, 81788, 70118, 65050, 62135, 62881, 68746, 67211,
                62269, 62279, 61732, 58180, 54006, 46587, 42855, 38964, 31215
            ],
            color: '#2a8e40',
            animation: {
                enabled: true,
                duration: 6000,
                easing: 'linear'
            },
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
})

/* ********************************************************************************************************************************************** */

//Tasa de Asesinatos y Homicidios en Puerto Rico (1960-2018)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    var chart5 = Highcharts.chart('chart018', {

        chart: {
            type: 'line',
            zoomType: 'x',
        },

        title: {
            text: 'Gráfica 4: Tasa anual de asesinatos y homicidios de 1960 a 2018',
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { 
            year: '%Y'
            },
            tickInterval: Date.UTC(2010, 0, 1) - Date.UTC(2009, 0, 1)
        },

        yAxis: {
            title: {
                text: 'Tasa de asesinatos y homicidios',
                style: {
                    color:'black'
                }
            },
            min: 0,
            max: 40,
            gridLineWidth:0,
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                animation: {
                    duration: 6000
                },
                events: {
                    afterAnimate: function() {
                        update_data5();
                    }
                },
            },
        },

        tooltip: {
            shared: true,
        },

        series: [{
            name: 'Tasa Asesinatos y Homicidios',
            data: [{
'x': Date.UTC(1959, 0),
// Jan, 1, 1960
'y':null
},
{
'x': Date.UTC(1960, 0),
// Jan, 1, 1960
'y':7.2
},
{
'x': Date.UTC(1961, 0),
// Jan, 1, 1961
'y':7.2
},
{
'x': Date.UTC(1962, 0),
// Jan, 1, 1962
'y':8.9
},
{
'x': Date.UTC(1963, 0),
// Jan, 1, 1963
'y':8.8
},
{
'x': Date.UTC(1964, 0),
// Jan, 1, 1964
'y':9.4
},
{
'x': Date.UTC(1965, 0),
// Jan, 1, 1965
'y':8.2
},
{
'x': Date.UTC(1966, 0),
// Jan, 1, 1966
'y':7.8
},
{
'x': Date.UTC(1967, 0),
// Jan, 1, 1967
'y':7.1
},
{
'x': Date.UTC(1968, 0),
// Jan, 1, 1968
'y':7.7
},
{
'x': Date.UTC(1969, 0),
// Jan, 1, 1969
'y':6.9
},
{
'x': Date.UTC(1970, 0),
// Jan, 1, 1970
'y':7.1
},
{
'x': Date.UTC(1971, 0),
// Jan, 1, 1971
'y':10.4
},
{
'x': Date.UTC(1972, 0),
// Jan, 1, 1972
'y':11.5
},
{
'x': Date.UTC(1973, 0),
// Jan, 1, 1973
'y':15
},
{
'x': Date.UTC(1974, 0),
// Jan, 1, 1974
'y':18.2
},
{
'x': Date.UTC(1975, 0),
// Jan, 1, 1975
'y':17.2
},
{
'x': Date.UTC(1976, 0),
// Jan, 1, 1976
'y':15
},
{
'x': Date.UTC(1977, 0),
// Jan, 1, 1977
'y':15.5
},
{
'x': Date.UTC(1978, 0),
// Jan, 1, 1978
'y':15.8
},
{
'x': Date.UTC(1979, 0),
// Jan, 1, 1979
'y':15.3
},
{
'x': Date.UTC(1980, 0),
// Jan, 1, 1980
'y':14.8
},
{
'x': Date.UTC(1981, 0),
// Jan, 1, 1981
'y':16.4
},
{
'x': Date.UTC(1982, 0),
// Jan, 1, 1982
'y':14.9
},
{
'x': Date.UTC(1983, 0),
// Jan, 1, 1983
'y':12.8
},
{
'x': Date.UTC(1984, 0),
// Jan, 1, 1984
'y':14.5
},
{
'x': Date.UTC(1985, 0),
// Jan, 1, 1985
'y':17.1
},
{
'x': Date.UTC(1986, 0),
// Jan, 1, 1986
'y':21.2
},
{
'x': Date.UTC(1987, 0),
// Jan, 1, 1987
'y':14.9
},
{
'x': Date.UTC(1988, 0),
// Jan, 1, 1988
'y':17.3
},
{
'x': Date.UTC(1989, 0),
// Jan, 1, 1989
'y':13.5
},
{
'x': Date.UTC(1990, 0),
// Jan, 1, 1990
'y':17
},
{
'x': Date.UTC(1991, 0),
// Jan, 1, 1991
'y':23
},
{
'x': Date.UTC(1992, 0),
// Jan, 1, 1992
'y':24.2
},
{
'x': Date.UTC(1993, 0),
// Jan, 1, 1993
'y':26.5
},
{
'x': Date.UTC(1994, 0),
// Jan, 1, 1994
'y':27.4
},
{
'x': Date.UTC(1995, 0),
// Jan, 1, 1995
'y':23.6
},
{
'x': Date.UTC(1996, 0),
// Jan, 1, 1996
'y':23.6
},
{
'x': Date.UTC(1997, 0),
// Jan, 1, 1997
'y':19.5
},
{
'x': Date.UTC(1998, 0),
// Jan, 1, 1998
'y':17.4
},
{
'x': Date.UTC(1999, 0),
// Jan, 1, 1999
'y':15.6
},
{
'x': Date.UTC(2000, 0),
// Jan, 1, 2000
'y':18.4
},
{
'x': Date.UTC(2001, 0),
// Jan, 1, 2001
'y':19.6
},
{
'x': Date.UTC(2002, 0),
// Jan, 1, 2002
'y':20.2
},
{
'x': Date.UTC(2003, 0),
// Jan, 1, 2003
'y':20.6
},
{
'x': Date.UTC(2004, 0),
// Jan, 1, 2004
'y':20.7
},
{
'x': Date.UTC(2005, 0),
// Jan, 1, 2005
'y':20.2
},
{
'x': Date.UTC(2006, 0),
// Jan, 1, 2006
'y':19.7
},
{
'x': Date.UTC(2007, 0),
// Jan, 1, 2007
'y':19.3
},
{
'x': Date.UTC(2008, 0),
// Jan, 1, 2008
'y':21.7
},
{
'x': Date.UTC(2009, 0),
// Jan, 1, 2009
'y':24.1
},
{
'x': Date.UTC(2010, 0),
// Jan, 1, 2010
'y':27.3
},
{
'x': Date.UTC(2011, 0),
// Jan, 1, 2011
'y':31.6
},
{
'x': Date.UTC(2012, 0),
// Jan, 1, 2012
'y':27.6
},
{
'x': Date.UTC(2013, 0),
// Jan, 1, 2013
'y':25.1
},
{
'x': Date.UTC(2014, 0),
// Jan, 1, 2014
'y':19.8
},
{
'x': Date.UTC(2015, 0),
// Jan, 1, 2015
'y':17.8
},
{
'x': Date.UTC(2016, 0),
// Jan, 1, 2016
'y':20.5
},
{
'x': Date.UTC(2017, 0),
// Jan, 1, 2017
'y':21.4
},
{
'x': Date.UTC(2018, 0),
// Jan, 1, 2018
'y':20.1
},
{
'x': Date.UTC(2019, 0),
// Jan, 1, 2019
'y':null
},
            ],
            color: '#2a8e40',
        },{
            name:' ',
            data: [
            {
                'x': Date.UTC(1960, 0),
                // Enero, 1, 1960
                'y':0
                },
                {
                'x': Date.UTC(2018, 0),
                // Enero, 1, 2018
                'y':0
                },
            ],
            color: 'transparent',
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

    function update_data5() {
        chart5.update({

            plotOptions: {
                series: {
                    animation: {
                        duration: 6000
                    },
                    events: {
                        afterAnimate: function() {
                            update_data6();
                        }
                    },
                    label: {
                        enabled: false,
                        connectorAllowed: false,
                    },
                },
            },

            series: [{
            name: 'Tasa Asesinatos y Homicidios',
            data: [{
'x': Date.UTC(1959, 0),
// Jan, 1, 1960
'y':null
},
{
'x': Date.UTC(1960, 0),
// Jan, 1, 1960
'y':7.2
},
{
'x': Date.UTC(1961, 0),
// Jan, 1, 1961
'y':7.2
},
{
'x': Date.UTC(1962, 0),
// Jan, 1, 1962
'y':8.9
},
{
'x': Date.UTC(1963, 0),
// Jan, 1, 1963
'y':8.8
},
{
'x': Date.UTC(1964, 0),
// Jan, 1, 1964
'y':9.4
},
{
'x': Date.UTC(1965, 0),
// Jan, 1, 1965
'y':8.2
},
{
'x': Date.UTC(1966, 0),
// Jan, 1, 1966
'y':7.8
},
{
'x': Date.UTC(1967, 0),
// Jan, 1, 1967
'y':7.1
},
{
'x': Date.UTC(1968, 0),
// Jan, 1, 1968
'y':7.7
},
{
'x': Date.UTC(1969, 0),
// Jan, 1, 1969
'y':6.9
},
{
'x': Date.UTC(1970, 0),
// Jan, 1, 1970
'y':7.1
},
{
'x': Date.UTC(1971, 0),
// Jan, 1, 1971
'y':10.4
},
{
'x': Date.UTC(1972, 0),
// Jan, 1, 1972
'y':11.5
},
{
'x': Date.UTC(1973, 0),
// Jan, 1, 1973
'y':15
},
{
'x': Date.UTC(1974, 0),
// Jan, 1, 1974
'y':18.2
},
{
'x': Date.UTC(1975, 0),
// Jan, 1, 1975
'y':17.2
},
{
'x': Date.UTC(1976, 0),
// Jan, 1, 1976
'y':15
},
{
'x': Date.UTC(1977, 0),
// Jan, 1, 1977
'y':15.5
},
{
'x': Date.UTC(1978, 0),
// Jan, 1, 1978
'y':15.8
},
{
'x': Date.UTC(1979, 0),
// Jan, 1, 1979
'y':15.3
},
{
'x': Date.UTC(1980, 0),
// Jan, 1, 1980
'y':14.8
},
{
'x': Date.UTC(1981, 0),
// Jan, 1, 1981
'y':16.4
},
{
'x': Date.UTC(1982, 0),
// Jan, 1, 1982
'y':14.9
},
{
'x': Date.UTC(1983, 0),
// Jan, 1, 1983
'y':12.8
},
{
'x': Date.UTC(1984, 0),
// Jan, 1, 1984
'y':14.5
},
{
'x': Date.UTC(1985, 0),
// Jan, 1, 1985
'y':17.1
},
{
'x': Date.UTC(1986, 0),
// Jan, 1, 1986
'y':21.2
},
{
'x': Date.UTC(1987, 0),
// Jan, 1, 1987
'y':14.9
},
{
'x': Date.UTC(1988, 0),
// Jan, 1, 1988
'y':17.3
},
{
'x': Date.UTC(1989, 0),
// Jan, 1, 1989
'y':13.5
},
{
'x': Date.UTC(1990, 0),
// Jan, 1, 1990
'y':17
},
{
'x': Date.UTC(1991, 0),
// Jan, 1, 1991
'y':23
},
{
'x': Date.UTC(1992, 0),
// Jan, 1, 1992
'y':24.2
},
{
'x': Date.UTC(1993, 0),
// Jan, 1, 1993
'y':26.5
},
{
'x': Date.UTC(1994, 0),
// Jan, 1, 1994
'y':27.4
},
{
'x': Date.UTC(1995, 0),
// Jan, 1, 1995
'y':23.6
},
{
'x': Date.UTC(1996, 0),
// Jan, 1, 1996
'y':23.6
},
{
'x': Date.UTC(1997, 0),
// Jan, 1, 1997
'y':19.5
},
{
'x': Date.UTC(1998, 0),
// Jan, 1, 1998
'y':17.4
},
{
'x': Date.UTC(1999, 0),
// Jan, 1, 1999
'y':15.6
},
{
'x': Date.UTC(2000, 0),
// Jan, 1, 2000
'y':18.4
},
{
'x': Date.UTC(2001, 0),
// Jan, 1, 2001
'y':19.6
},
{
'x': Date.UTC(2002, 0),
// Jan, 1, 2002
'y':20.2
},
{
'x': Date.UTC(2003, 0),
// Jan, 1, 2003
'y':20.6
},
{
'x': Date.UTC(2004, 0),
// Jan, 1, 2004
'y':20.7
},
{
'x': Date.UTC(2005, 0),
// Jan, 1, 2005
'y':20.2
},
{
'x': Date.UTC(2006, 0),
// Jan, 1, 2006
'y':19.7
},
{
'x': Date.UTC(2007, 0),
// Jan, 1, 2007
'y':19.3
},
{
'x': Date.UTC(2008, 0),
// Jan, 1, 2008
'y':21.7
},
{
'x': Date.UTC(2009, 0),
// Jan, 1, 2009
'y':24.1
},
{
'x': Date.UTC(2010, 0),
// Jan, 1, 2010
'y':27.3
},
{
'x': Date.UTC(2011, 0),
// Jan, 1, 2011
'y':31.6
},
{
'x': Date.UTC(2012, 0),
// Jan, 1, 2012
'y':27.6
},
{
'x': Date.UTC(2013, 0),
// Jan, 1, 2013
'y':25.1
},
{
'x': Date.UTC(2014, 0),
// Jan, 1, 2014
'y':19.8
},
{
'x': Date.UTC(2015, 0),
// Jan, 1, 2015
'y':17.8
},
{
'x': Date.UTC(2016, 0),
// Jan, 1, 2016
'y':20.5
},
{
'x': Date.UTC(2017, 0),
// Jan, 1, 2017
'y':21.4
},
{
'x': Date.UTC(2018, 0),
// Jan, 1, 2018
'y':20.1
},
{
'x': Date.UTC(2019, 0),
// Jan, 1, 2019
'y':null
},
            ],
            color: '#2a8e40',
        },{
            name:'Tendencia General',
            data: [
            {
                'x': Date.UTC(1960, 0),
                // Enero, 1, 1960
                'y':7.2,
                dataLabels: {
                    y:24
                }
                },
                {
                'x': Date.UTC(2018, 0),
                // Enero, 1, 2018
                'y':20.1
                },
            ],
            color: '#FEDA35',
            animation: {
                enabled: true,
                duration: 6000,
                easing: 'linear'
            },
            dataLabels: {
                enabled: true,
            },
        }],
    })
    }

    function update_data6() {
        chart5.update({
            subtitle: {
                text: 'La Tendencia General de la Tasa de Asesinatos y Homicidios es Ascendente',
                style: {
                    color: "black"
                },
                y:100,
                x:40,
                animation: {
                    enabled: true,
                    duration: 2000,
                },
            },
        })
    }

})

/* ********************************************************************************************************************************************** */

//Magnitud del Cambio en el Total de Delitos Tipo 1 por Gobernante y Cuatrenio (1961-2018)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    Highcharts.chart('chart019', {
        chart: {
            type: 'column',
            zoomType: 'x',
        },

        title: {
            text: 'Gráfica 5: Magnitud del Cambio en el Total de Delitos Tipo 1 por Gobernante y Cuatrenio (1961-2018)',

        },
        subtitle: {
            text: '',
        },

        xAxis: [{

            categories: ['Luis Muñoz Marín', 'Roberto Sánchez Vilella', 'Luis Ferré Aguayo',
                'Rafael Hernández Colón',
                'Carlos Romero Barceló', 'Carlos Romero Barceló', 'Rafael Hernández Colón',
                'Rafael Hernández Colón',
                'Pedro Rosselló González', 'Pedro Rosselló González', 'Sila Calderón Serra',
                'Aníbal Acevedo Vilá',
                'Luís Fortuño Burset', 'Alejandro García Padilla', 'Ricardo Rosselló Nevares'
            ],
            crosshair: true
        }],

        yAxis: {
            min: -20000,
            max: 20000,
            title: {
                text: 'Cambio en el total de delitos tipo 1',
                style: {
                    color:'black'
                }
            }
        },

        plotOptions: {

            series: {
                lineWidth: 5,
                animation: {
                    duration: 6000
                }
            },

        },
        series: [{
            name: 'Magnitud de Cambio',
            data: [{
                name: '1961-1964',
                color: '#eb1b24',
                y: 18764,
                
            }, {
                name: '1965-1968',
                color: '#eb1b24',
                y: 8499,
                
            }, {
                name: '1969-1972',
                color: '#2b378d',
                y: 8943,
                
            }, {
                name: '1973-1976',
                color: '#eb1b24',
                y: 13716,
                
            }, {
                name: '1977-1980',
                color: '#2b378d',
                y: 10636,
                
            }, {
                name: '1981-1984',
                color: '#2b378d',
                y: 5880,
                
            }, {
                name: '1985-1988',
                color: '#eb1b24',
                y: -4485,
                
            }, {
                name: '1989-1992',
                color: '#eb1b24',
                y: 18847,
                
            }, {
                name: '1993-1996',
                color: '#2b378d',
                y: -21247,
                
            }, {
                name: '1997-2000',
                color: '#2b378d',
                y: -19496,
                
            }, {
                name: '2001-2004',
                color: '#eb1b24',
                y: -2,
                
            }, {
                name: '2005-2008',
                color: '#eb1b24',
                y: 3696,
                
            }, {
                name: '2009-2012',
                color: '#2b378d',
                y: -5479,
                
            }, {
                name: '2013-2016',
                color: '#eb1b24',
                y: -15325,
                
            }, {
                name: '2017-2018 *',
                color: '#2b378d',
                y: -7749,
                
            }]
        }],
    });
})

/* ********************************************************************************************************************************************** */

//Comparación cronológica Tasa de Delitos Tipo 1 de Nueva York, Florida y Puerto Rico (1965-2016)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    Highcharts.chart('chart015', {

        chart: {
            type: 'line',
            zoomType: 'x',  
        },

        title: {
            text: 'Gráfica 6: Comparación cronológica Tasa de delitos tipo 1 de Nueva York, Florida y Puerto Rico (1965-2016)',
        },

        xAxis: {
            categories: ['1965', '1966', '1967', '1968', '1969', '1970',
                '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016'
            ],
        },

        yAxis: {
            title: {
                text: 'Tasa delitos tipo 1',
            },
            min: 0,
            max: 10000,
            gridLineWidth:0,
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Tasa Florida',
            data: [
            3320.2, 3716.3, 4103.6, 4498.5, 4742.5, 5317.2, 5673.0, 5376.9, 5960.3, 7387.3, 7721.2, 7016.7, 6738.6, 7069.5,
7688.1, 8402.0, 8032.5, 7465.2, 6781.1, 6821.2, 7574.2, 8228.4, 8503.2, 8937.6, 8804.5, 8810.8, 8547.2, 8358.2, 8351.0,
8250.0, 7701.5, 7497.4, 7271.8, 6886.0, 6205.4, 5694.7, 5577.5, 5427.6, 5188.3, 4894.3, 4721.7, 4702.6, 4811.3, 4829.4,
4453.3, 4092.7, 4032.0, 3763.2, 3567.1, 3955.9, 3279.4, 3117.1
            ],
            color: '#2a8e40',
            animation: {
                enabled: true,
                duration: 6000,
                easing: 'linear'
            },
        },
        {
            name: 'Tasa Nueva York',
            data: [
            3065.6, 3338.1, 3776.9, 4579.3, 4569.7, 4971.3, 5084.1, 4380.9, 4458.5, 5034.0, 5635.7, 6225.1, 6087.6, 5792.2,
6205.1, 6911.6, 6905.4, 6468.1, 5902.6, 5577.3, 5588.5, 5767.7, 5952.4, 6309.3, 6293.2, 6363.8, 6244.6, 5858.4, 5551.3,
5070.6, 4560.1, 4132.3, 3910.9, 3588.5, 3279.4, 3099.6, 2913.5, 2807.1, 2714.7, 2632.9, 2546.3, 2499.7, 2402.3, 2391.7,
2316.3, 2352.1, 2303.9, 2323.3, 2214.5, 2100.0, 1986.8, 1921.8
            ],
            color: 'red',
            animation: {
                enabled: true,
                duration: 10000,
                easing: 'linear'
            },
        },
        {
            name: 'Tasa Puerto Rico',
            data: [
                2233.2, 2314.1, 2316.5, 2480.5, 2304.1, 2450.9, 2582.1, 2545.4, 2575.0, 2879.9, 3030.6, 2910.3, 2708.9,
                2590.1, 2573.9, 2883.8, 3011.6, 2976.7, 2806.6, 3086.9, 3471.6, 3531.1, 3222.1, 3251.4, 3169.0, 3525.7,
                3372.2, 3605.1, 3361.8, 3205.4, 2902.4, 2708.1, 2553.3, 2321.7, 2149.9, 1993.0, 1836.2, 2385.7, 2137.6,
                1832.3, 1702.3, 1632.9, 1662.2, 1827.9, 1796.9, 1673.2, 1692.9, 1698.5, 1619.2, 1527.8, 1341.3, 1258.0
            ],
            color: 'gold',
            animation: {
                enabled: true,
                duration: 12000,
                easing: 'linear'
            },
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
})
