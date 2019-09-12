/**
 * Highcharts plugin to defer initial series animation until the element has
 * appeared.
 *
 * Updated 2019-04-10
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
                color: '#B8C2CC'
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
                duration: 5000
            }
        },
    },
});

// Tasa de Delitos Tipo 1 por cada 100,000 Habitantes (1960-2018)

$(document).ready(function() {
    Highcharts.chart('chart3', {

        chart: {
            type: 'area',
            zoomType: 'x',
            backgroundColor: '#101010',
            borderColor: '#202020',
            borderWidth: 3,
        },

        title: {
            text: 'Delitos Tipo 1 por cada 100,000 Habitantes, Puerto Rico (1960-2018)',
            style: {
                color: '#FFFFFF'
            }
        },

        xAxis: {
            categories: ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970',
                '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'
            ],
            labels: {
                style: {
                    color: '#FFFFFF'
                }
            }
        },

        yAxis: {
            title: {
                text: 'Delitos Tipo 1 por cada 100,000 Habitantes',
                style: {
                    color: '#FFFFFF'
                }
            },
            labels: {
                style: {
                    color:"#ffffff"
                }
            },
            min: 0,
            max: 4500,
            gridLineWidth:0,
        },
        legend: {
            itemStyle: {
                color: '#FFFFFF'
            }
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                    style: {
                        color: '#FFFFFF'
                    }
                },
                style: {
                    color: '#FFFFFF'
                },
                pointStart: 1960
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Delitos Tipo 1',
            data: [1416.1, 1598.8, 1964.3, 2195.6, 2256.8, 2233.2, 2314.1, 2316.5, 2480.5, 2304.1, 2450.9, 2582.1, 2545.4, 2575.0,
2879.9, 3030.6, 2910.3, 2708.9, 2590.1, 2573.9, 2883.8, 3011.6, 2976.7, 2806.6, 3086.9, 3471.6, 3501.5, 3222.1, 3251.4, 3163.8,
3525.7, 3372.2, 3605.1, 3361.8, 3205.4, 2902.4, 2708.1, 2553.3, 2321.7, 2149.9, 1993.0, 1836.2, 2385.7, 2137.6, 1832.3, 1702.3,
1632.9, 1662.2, 1827.9, 1796.9, 1673.2, 1692.9, 1698.5, 1619.2, 1527.8, 1341.3, 1258.0, 1171.8, 976.9
            ],
            color: '#2a8e40',
            animation: {
                enabled: true,
                duration: 15000,
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

// Tasa Ascendente de Delitos Tipo 1 por cada 100,000 habitantes (1960-1992)

$(document.ready(function() {
    var chart2 = Highcharts.chart('chart16', {

        chart: {
            type: 'line',
            zoomType: 'x',
            backgroundColor: '#101010',
            borderColor: '#202020',
            borderWidth: 3,
        },

        title: {
            text: 'Gráfica 1: Delitos Tipo 1 por cada 100,000 Habitantes (1960-1992)',
            style: {
                color: '#FFFFFF'
            }
        },

        subtitle: {
            text: 'Razón de Cambio Promedio en la tasa fue de 66 delitos por año.',
            style: {
                color: "transparent"
            },
            y:500
        },

        xAxis: {
            labels: {
                style: {
                    color: '#FFFFFF'
                }
            },
            type: 'datetime',
            dateTimeLabelFormats: { 
            year: '%Y'
            },
            tickInterval: Date.UTC(2010, 0, 1) - Date.UTC(2009, 0, 1)

        },

        yAxis: {
            title: {
                text: 'Delitos Tipo 1 por cada 100,000 Habitantes',
                style: {
                    color: '#FFFFFF'
                }
            },
            labels: {
                style: {
                    color:"#ffffff"
                },
                formatter: function() {
                    return Highcharts.numberFormat(this.value, 0, ' ', ', ')
                }
            },
            min: 0,
            max: 4500,
            gridLineWidth:0,
        },
        legend: {
            itemStyle: {
                color: '#FFFFFF'
            }
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                    style: {
                        color: '#FFFFFF'
                    }
                },
                style: {
                    color: '#FFFFFF'
                },
            },
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Delitos Tipo 1',
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
            animation: {
                enabled: true,
                duration: 15000,
                easing: 'linear'
            },
        },{
            name:' ',
            data: [
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
            ],
            color: 'transparent',
            
            animation: {
                enabled: true,
                duration: 15000,
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

    setTimeout(function() { chart2.update({
            series: [{
            name: 'Delitos Tipo 1',
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
            animation: {
                enabled: true,
                duration: 15000,
                easing: 'linear'
            },
        },{
            name:'Razón de Cambio Promedio',
            data: [
            {
                'x': Date.UTC(1960, 0),
                // Enero, 1, 1985
                'y':1416
                },
                {
                'x': Date.UTC(1992, 0),
                // Enero, 1, 1992
                'y':3605
                },
            ],
            color: 'lightblue',
            dataLabels: {
                enabled: true,
                style: {
                    color:'white'
                },
                animation: {
                    enabled: true,
                    duration: 6000,
                    easing: 'linear'
                },
            },
            animation: {
                enabled: true,
                duration: 6000,
                easing: 'linear'
            },
        }],
    })
}, 13000)

setTimeout(function() {
    chart2.update({
        subtitle: {
            text: 'Razón de Cambio Promedio en la tasa fue de 66 delitos por año.',
            style: {
                color: "white"
            },
            y:120,
            x:300,
            animation: {
                enabled: true,
                duration: 2000,
            },
        },
    })
}, 19500)
}))

// Tasa Descendente de Delitos Tipo 1 por cada 100,000 habitantes (1992-2018)

$(document).ready(function() {
    var chart3 = Highcharts.chart('chart17', {

        chart: {
            type: 'line',
            zoomType: 'x',
            backgroundColor: '#101010',
            borderColor: '#202020',
            borderWidth: 3,
        },

        title: {
            text: 'Gráfica 2: Delitos Tipo 1 por cada 100,000 Habitantes (1992-2018)',
            style: {
                color: '#FFFFFF'
            }
        },

        subtitle: {
            text: 'Razón de Cambio Promedio en la tasa fue de -97 delitos por año.',
            style: {
                color: "transparent"
            },
            y:500
        },

        xAxis: {
            labels: {
                style: {
                    color: '#FFFFFF'
                }
            },
            type: 'datetime',
            dateTimeLabelFormats: { 
            year: '%Y'
            },
            tickInterval: Date.UTC(2010, 0, 1) - Date.UTC(2009, 0, 1)
        },

        yAxis: {
            title: {
                text: 'Delitos Tipo 1 por cada 100,000 Habitantes',
                style: {
                    color: '#FFFFFF'
                }
            },
            labels: {
                style: {
                    color:"#ffffff"
                },
                formatter: function() {
                    return Highcharts.numberFormat(this.value, 0, ' ', ', ')
                }
            },
            min: 0,
            max: 4500,
            gridLineWidth:0,
        },
        legend: {
            itemStyle: {
                color: '#FFFFFF'
            }
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                    style: {
                        color: '#FFFFFF'
                    }
                },
                style: {
                    color: '#FFFFFF'
                },
            },
        },

        tooltip: {
            shared: true,
        },

        series: [{
            name: 'Delitos Tipo 1',
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
            animation: {
                enabled: true,
                duration: 15000,
                easing: 'linear'
            },
        },{
            name:' ',
            data: [
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

    setTimeout(function() { chart3.update({

            series: [{
            name: 'Delitos Tipo 1',
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
            animation: {
                enabled: true,
                duration: 15000,
                easing: 'linear'
            },
        },{
            name:'Razón de Cambio Promedio',
            data: [
            {
                'x': Date.UTC(1992, 0),
                // Enero, 1, 1992
                'y':3605
                },
                {
                'x': Date.UTC(2018, 0),
                // Enero, 1, 2018
                'y':976.9
                },
            ],
            color: 'lightblue',
            dataLabels: {
                enabled: true,
                style: {
                    color: 'white'
                }
            },
            animation: {
                enabled: true,
                duration: 6000,
                easing: 'linear'
            },
        }],
    })
}, 13000);

setTimeout(function() {
    chart3.update({
        subtitle: {
            text: 'Razón de Cambio Promedio en la tasa fue de -97 delitos por año.',
            style: {
                color: "white"
            },
            y:400,
            x:300,
            animation: {
                enabled: true,
                duration: 2000,
            },
        },
    })
}, 19500)

})
