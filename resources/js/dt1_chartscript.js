/**
 * Highcharts plugin to defer initial series animation until the element has
 * appeared.
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
        valueDecimals: 0,
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
    
    // Tasa de Delitos Tipo 1 por cada 100,000 Habitantes (1960-2020)
    
    /* ********************************************************************************************************************************************** */
    
    $(document).ready(function () {
        Highcharts.chart('chart03', {
    
            chart: {
                type: 'area',
                zoomType: 'x',
            },
    
            title: {
                text: 'Tasa de delitos tipo 1 en Puerto Rico de 1960 a 2020',
            },
    
            xAxis: {
                categories: ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970',
                    '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                    '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                    '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                    '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                    '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2019', '2020'
                ],
            },
    
            yAxis: {
                title: {
                    text: 'Delitos tipo 1 por cada 100,000 habitantes',
                    style: {
                        color: 'black'
                    }
                },
                labels: {},
                min: 0,
                max: 4500,
                gridLineWidth: 0,
            },
            legend: {
                itemStyle: {}
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
                data: [1416, 1599, 1964, 2196, 2257, 2233, 2314, 2317, 2481, 2304, 2451, 2582, 2545,
                    2575, 2880, 3031, 2910, 2709, 2590, 2574, 2884, 3012, 2977, 2807, 3087, 3472,
                    3531, 3222, 3251, 3169, 3526, 3372, 3605, 3362, 3205, 2902, 2708, 2553, 2322,
                    2150, 1993, 1836, 2386, 2138, 1832, 1702, 1633, 1662, 1828, 1797, 1673, 1693,
                    1699, 1619, 1528, 1341, 1258, 1172, 976, 892, 554
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
    
    $(document).ready(function () {
        var chart2 = Highcharts.chart('chart016', {
    
            chart: {
                type: 'line',
                zoomType: 'x',
            },
    
            title: {
                text: 'Gráfica 1: Tendencia tasa delitos tipo 1 de 1960 a 1992',
            },
    
            subtitle: {
                text: 'Acenso a razón de 66 delitos tipo 1 por año.',
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
                        color: 'black'
                    }
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0, ' ', ', ')
                    }
                },
                min: 0,
                max: 4500,
                gridLineWidth: 0,
            },
            legend: {},
    
            plotOptions: {
                series: {
                    animation: {
                        duration: 5000
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
                        'y': null
                    },
                    {
                        'x': Date.UTC(1960, 0),
                        // Jan, 1, 1960
                        'y': 1416
                    },
                    {
                        'x': Date.UTC(1961, 0),
                        // Jan, 1, 1961
                        'y': 1599
                    },
                    {
                        'x': Date.UTC(1962, 0),
                        // Jan, 1, 1962
                        'y': 1964
                    },
                    {
                        'x': Date.UTC(1963, 0),
                        // Jan, 1, 1963
                        'y': 2196
                    },
                    {
                        'x': Date.UTC(1964, 0),
                        // Jan, 1, 1964
                        'y': 2257
                    },
                    {
                        'x': Date.UTC(1965, 0),
                        // Jan, 1, 1965
                        'y': 2233
                    },
                    {
                        'x': Date.UTC(1966, 0),
                        // Jan, 1, 1966
                        'y': 2314
                    },
                    {
                        'x': Date.UTC(1967, 0),
                        // Jan, 1, 1967
                        'y': 2317
                    },
                    {
                        'x': Date.UTC(1968, 0),
                        // Jan, 1, 1968
                        'y': 2481
                    },
                    {
                        'x': Date.UTC(1969, 0),
                        // Jan, 1, 1969
                        'y': 2304
                    },
                    {
                        'x': Date.UTC(1970, 0),
                        // Jan, 1, 1970
                        'y': 2451
                    },
                    {
                        'x': Date.UTC(1971, 0),
                        // Jan, 1, 1971
                        'y': 2582
                    },
                    {
                        'x': Date.UTC(1972, 0),
                        // Jan, 1, 1972
                        'y': 2545
                    },
                    {
                        'x': Date.UTC(1973, 0),
                        // Jan, 1, 1973
                        'y': 2575
                    },
                    {
                        'x': Date.UTC(1974, 0),
                        // Jan, 1, 1974
                        'y': 2880
                    },
                    {
                        'x': Date.UTC(1975, 0),
                        // Jan, 1, 1975
                        'y': 3031
                    },
                    {
                        'x': Date.UTC(1976, 0),
                        // Jan, 1, 1976
                        'y': 2910
                    },
                    {
                        'x': Date.UTC(1977, 0),
                        // Jan, 1, 1977
                        'y': 2709
                    },
                    {
                        'x': Date.UTC(1978, 0),
                        // Jan, 1, 1978
                        'y': 2590
                    },
                    {
                        'x': Date.UTC(1979, 0),
                        // Jan, 1, 1979
                        'y': 2574
                    },
                    {
                        'x': Date.UTC(1980, 0),
                        // Jan, 1, 1980
                        'y': 2884
                    },
                    {
                        'x': Date.UTC(1981, 0),
                        // Jan, 1, 1981
                        'y': 3012
                    },
                    {
                        'x': Date.UTC(1982, 0),
                        // Jan, 1, 1982
                        'y': 2977
                    },
                    {
                        'x': Date.UTC(1983, 0),
                        // Jan, 1, 1983
                        'y': 2807
                    },
                    {
                        'x': Date.UTC(1984, 0),
                        // Jan, 1, 1984
                        'y': 3087
                    },
                    {
                        'x': Date.UTC(1985, 0),
                        // Jan, 1, 1985
                        'y': 3472
                    },
                    {
                        'x': Date.UTC(1986, 0),
                        // Jan, 1, 1986
                        'y': 3531
                    },
                    {
                        'x': Date.UTC(1987, 0),
                        // Jan, 1, 1987
                        'y': 3222
                    },
                    {
                        'x': Date.UTC(1988, 0),
                        // Jan, 1, 1988
                        'y': 3251
                    },
                    {
                        'x': Date.UTC(1989, 0),
                        // Jan, 1, 1989
                        'y': 3169
                    },
                    {
                        'x': Date.UTC(1990, 0),
                        // Jan, 1, 1990
                        'y': 3526
                    },
                    {
                        'x': Date.UTC(1991, 0),
                        // Jan, 1, 1991
                        'y': 3372
                    },
                    {
                        'x': Date.UTC(1992, 0),
                        // Jan, 1, 1992
                        'y': 3605
                    },
                    {
                        'x': Date.UTC(1993, 0),
                        // Jan, 1, 1993
                        'y': null
                    },
                ],
                color: '#2a8e40',
            }, {
                name: 'Tendencia de la Razón de Cambio',
                data: [{
                        'x': Date.UTC(1959, 0),
                        // Enero, 1, 1959
                        'y': null
                    },
                    {
                        'x': Date.UTC(1960, 0),
                        // Enero, 1, 1985
                        'y': 1416
                    },
                    {
                        'x': Date.UTC(1992, 0),
                        // Enero, 1, 1992
                        'y': 3605
                    },
                    {
                        'x': Date.UTC(1993, 0),
                        // Enero, 1, 1993
                        'y': null
                    },
                ],
                color: '#FEDA35',
                animation: {
                        duration: 10000
                    },
                    events: {
                        afterAnimate: function () {
                            update_data2();
                        }
                    },
            }],
    
        });
    
        function update_data2() {
            chart2.update({
                subtitle: {
                    text: 'Acenso a razón de 66 delitos tipo 1 por año.',
                    style: {
                        color: "black"
                    },
                    y: 100,
                    x: 40,
                },
            })
        }
    
    });
    
    
    /* ********************************************************************************************************************************************** */
    
    // Tasa Descendente de Delitos Tipo 1 por cada 100,000 habitantes (1992-2020)
    
    /* ********************************************************************************************************************************************** */
    
    $(document).ready(function () {
        var chart3 = Highcharts.chart({
    
            chart: {
                type: 'line',
                zoomType: 'x',
                renderTo: document.getElementById("chart017")
            },
    
            title: {
                text: 'Gráfica 2: Tendencia tasa de delitos tipo 1 de 1992 a 2020',
            },
    
            subtitle: {
                text: 'Decenso a razón de 97 delitos tipo 1 por año.',
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
                        color: 'black'
                    }
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0, ' ', ', ')
                    }
                },
                min: 0,
                max: 4500,
                gridLineWidth: 0,
            },
    
            plotOptions: {
                series: {
                    label: {
                        enabled: false,
                        connectorAllowed: false,
                    },
                    animation: {
                        duration: 5000
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
                        'y': null
                    },
                    {
                        'x': Date.UTC(1992, 0),
                        // Jan, 1, 1992
                        'y': 3605
                    },
                    {
                        'x': Date.UTC(1993, 0),
                        // Jan, 1, 1993
                        'y': 3362
                    },
                    {
                        'x': Date.UTC(1994, 0),
                        // Jan, 1, 1994
                        'y': 3205
                    },
                    {
                        'x': Date.UTC(1995, 0),
                        // Jan, 1, 1995
                        'y': 2902
                    },
                    {
                        'x': Date.UTC(1996, 0),
                        // Jan, 1, 1996
                        'y': 2708
                    },
                    {
                        'x': Date.UTC(1997, 0),
                        // Jan, 1, 1997
                        'y': 2553
                    },
                    {
                        'x': Date.UTC(1998, 0),
                        // Jan, 1, 1998
                        'y': 2322
                    },
                    {
                        'x': Date.UTC(1999, 0),
                        // Jan, 1, 1999
                        'y': 2150
                    },
                    {
                        'x': Date.UTC(2000, 0),
                        // Jan, 1, 2000
                        'y': 1993
                    },
                    {
                        'x': Date.UTC(2001, 0),
                        // Jan, 1, 2001
                        'y': 1836
                    },
                    {
                        'x': Date.UTC(2002, 0),
                        // Jan, 1, 2002
                        'y': 2386
                    },
                    {
                        'x': Date.UTC(2003, 0),
                        // Jan, 1, 2003
                        'y': 2138
                    },
                    {
                        'x': Date.UTC(2004, 0),
                        // Jan, 1, 2004
                        'y': 1832
                    },
                    {
                        'x': Date.UTC(2005, 0),
                        // Jan, 1, 2005
                        'y': 1702
                    },
                    {
                        'x': Date.UTC(2006, 0),
                        // Jan, 1, 2006
                        'y': 1633
                    },
                    {
                        'x': Date.UTC(2007, 0),
                        // Jan, 1, 2007
                        'y': 1662
                    },
                    {
                        'x': Date.UTC(2008, 0),
                        // Jan, 1, 2008
                        'y': 1828
                    },
                    {
                        'x': Date.UTC(2009, 0),
                        // Jan, 1, 2009
                        'y': 1797
                    },
                    {
                        'x': Date.UTC(2010, 0),
                        // Jan, 1, 2010
                        'y': 1673
                    },
                    {
                        'x': Date.UTC(2011, 0),
                        // Jan, 1, 2011
                        'y': 1693
                    },
                    {
                        'x': Date.UTC(2012, 0),
                        // Jan, 1, 2012
                        'y': 1699
                    },
                    {
                        'x': Date.UTC(2013, 0),
                        // Jan, 1, 2013
                        'y': 1619
                    },
                    {
                        'x': Date.UTC(2014, 0),
                        // Jan, 1, 2014
                        'y': 1528
                    },
                    {
                        'x': Date.UTC(2015, 0),
                        // Jan, 1, 2015
                        'y': 1341
                    },
                    {
                        'x': Date.UTC(2016, 0),
                        // Jan, 1, 2016
                        'y': 1258
                    },
                    {
                        'x': Date.UTC(2017, 0),
                        // Jan, 1, 2017
                        'y': 1172
                    },
                    {
                        'x': Date.UTC(2018, 0),
                        // Jan, 1, 2018
                        'y': 976
                    },
                    {
                        'x': Date.UTC(2019, 0),
                        // Jan, 1, 2019
                        'y': 892
                    },
                    {
                        'x': Date.UTC(2020, 0),
                        // Jan, 1, 2020
                        'y': 554
                    },
                    {
                        'x': Date.UTC(2021, 0),
                        // Enero, 1, 2021
                        'y': null
                    },
                ],
                color: '#2a8e40',
            }, {
                    name: 'Tendencia de la Razón de Cambio',
                    data: [{
                            'x': Date.UTC(1991, 0),
                            // Enero, 1, 1991
                            'y': null
                        },
                        {
                            'x': Date.UTC(1992, 0),
                            // Enero, 1, 1992
                            'y': 3605
                        },
                        {
                            'x': Date.UTC(2020, 0),
                            // Enero, 1, 2020
                            'y': 554
                        },
                        {
                            'x': Date.UTC(2021, 0),
                            // Enero, 1, 2021
                            'y': null
                        },
                    ],
                    color: '#FEDA35',
                    dataLabels: {
                        enabled: true,
                    },
                    animation: {
                        enabled: true,
                        duration: 10000,
                        easing: 'linear'
                    },
                    events: {
                        afterAnimate: function () {
                            update_data4();
                        }
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
    
        function update_data4() {
            chart3.update({
                subtitle: {
                    text: 'Decenso a razón de 97 delitos tipo 1 por año.',
                    style: {
                        color: "black"
                    },
                    y: 100,
                    x: 40,
                },
            })
        }
    })
    
    /* ********************************************************************************************************************************************** */
    
    //Total de Delitos Tipo 1 en Puerto Rico (1960-2020)
    
    /* ********************************************************************************************************************************************** */
    
    $(document).ready(function () {
        Highcharts.chart('chart012', {
    
            chart: {
                type: 'area',
                zoomType: 'x',
            },
    
            title: {
                text: 'Gráfica 3: Total de delitos tipo 1 en Puerto Rico de 1960 a 2020',
            },
    
            xAxis: {
                categories: ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970',
                    '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                    '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                    '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                    '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                    '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'
                ],
            },
    
            yAxis: {
                title: {
                    text: 'Cantidad delitos tipo 1',
                    style: {
                        color: 'black'
                    }
                },
                min: 0,
                max: 150000,
                gridLineWidth: 0,
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
                    62269, 62279, 61732, 58180, 54006, 46587, 42855, 38964, 31233, 28517, 18206
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
    
    //Tasa de Asesinatos y Homicidios en Puerto Rico (1960-2020)
    
    /* ********************************************************************************************************************************************** */
    
    $(document).ready(function () {
        var chart5 = Highcharts.chart('chart018', {
    
            chart: {
                type: 'line',
                zoomType: 'x',
            },
    
            title: {
                text: 'Gráfica 4: Tasa anual de asesinatos y homicidios de 1960 a 2020',
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
                    text: 'Tasa de asesinatos por cada 100,000 habitantes',
                    style: {
                        color: 'black'
                    }
                },
                min: 0,
                max: 40,
                gridLineWidth: 0,
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
                        afterAnimate: function () {
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
                        'y': null
                    },
                    {
                        'x': Date.UTC(1960, 0),
                        // Jan, 1, 1960
                        'y': 7.2
                    },
                    {
                        'x': Date.UTC(1961, 0),
                        // Jan, 1, 1961
                        'y': 7.2
                    },
                    {
                        'x': Date.UTC(1962, 0),
                        // Jan, 1, 1962
                        'y': 8.9
                    },
                    {
                        'x': Date.UTC(1963, 0),
                        // Jan, 1, 1963
                        'y': 8.8
                    },
                    {
                        'x': Date.UTC(1964, 0),
                        // Jan, 1, 1964
                        'y': 9.4
                    },
                    {
                        'x': Date.UTC(1965, 0),
                        // Jan, 1, 1965
                        'y': 8.2
                    },
                    {
                        'x': Date.UTC(1966, 0),
                        // Jan, 1, 1966
                        'y': 7.8
                    },
                    {
                        'x': Date.UTC(1967, 0),
                        // Jan, 1, 1967
                        'y': 7.1
                    },
                    {
                        'x': Date.UTC(1968, 0),
                        // Jan, 1, 1968
                        'y': 7.7
                    },
                    {
                        'x': Date.UTC(1969, 0),
                        // Jan, 1, 1969
                        'y': 6.9
                    },
                    {
                        'x': Date.UTC(1970, 0),
                        // Jan, 1, 1970
                        'y': 7.1
                    },
                    {
                        'x': Date.UTC(1971, 0),
                        // Jan, 1, 1971
                        'y': 10.4
                    },
                    {
                        'x': Date.UTC(1972, 0),
                        // Jan, 1, 1972
                        'y': 11.5
                    },
                    {
                        'x': Date.UTC(1973, 0),
                        // Jan, 1, 1973
                        'y': 15
                    },
                    {
                        'x': Date.UTC(1974, 0),
                        // Jan, 1, 1974
                        'y': 18.2
                    },
                    {
                        'x': Date.UTC(1975, 0),
                        // Jan, 1, 1975
                        'y': 17.2
                    },
                    {
                        'x': Date.UTC(1976, 0),
                        // Jan, 1, 1976
                        'y': 15
                    },
                    {
                        'x': Date.UTC(1977, 0),
                        // Jan, 1, 1977
                        'y': 15.5
                    },
                    {
                        'x': Date.UTC(1978, 0),
                        // Jan, 1, 1978
                        'y': 15.8
                    },
                    {
                        'x': Date.UTC(1979, 0),
                        // Jan, 1, 1979
                        'y': 15.3
                    },
                    {
                        'x': Date.UTC(1980, 0),
                        // Jan, 1, 1980
                        'y': 14.8
                    },
                    {
                        'x': Date.UTC(1981, 0),
                        // Jan, 1, 1981
                        'y': 16.4
                    },
                    {
                        'x': Date.UTC(1982, 0),
                        // Jan, 1, 1982
                        'y': 14.9
                    },
                    {
                        'x': Date.UTC(1983, 0),
                        // Jan, 1, 1983
                        'y': 12.8
                    },
                    {
                        'x': Date.UTC(1984, 0),
                        // Jan, 1, 1984
                        'y': 14.5
                    },
                    {
                        'x': Date.UTC(1985, 0),
                        // Jan, 1, 1985
                        'y': 17.1
                    },
                    {
                        'x': Date.UTC(1986, 0),
                        // Jan, 1, 1986
                        'y': 21.2
                    },
                    {
                        'x': Date.UTC(1987, 0),
                        // Jan, 1, 1987
                        'y': 14.9
                    },
                    {
                        'x': Date.UTC(1988, 0),
                        // Jan, 1, 1988
                        'y': 17.3
                    },
                    {
                        'x': Date.UTC(1989, 0),
                        // Jan, 1, 1989
                        'y': 13.5
                    },
                    {
                        'x': Date.UTC(1990, 0),
                        // Jan, 1, 1990
                        'y': 17
                    },
                    {
                        'x': Date.UTC(1991, 0),
                        // Jan, 1, 1991
                        'y': 23
                    },
                    {
                        'x': Date.UTC(1992, 0),
                        // Jan, 1, 1992
                        'y': 24.2
                    },
                    {
                        'x': Date.UTC(1993, 0),
                        // Jan, 1, 1993
                        'y': 26.5
                    },
                    {
                        'x': Date.UTC(1994, 0),
                        // Jan, 1, 1994
                        'y': 27.4
                    },
                    {
                        'x': Date.UTC(1995, 0),
                        // Jan, 1, 1995
                        'y': 23.6
                    },
                    {
                        'x': Date.UTC(1996, 0),
                        // Jan, 1, 1996
                        'y': 23.6
                    },
                    {
                        'x': Date.UTC(1997, 0),
                        // Jan, 1, 1997
                        'y': 19.5
                    },
                    {
                        'x': Date.UTC(1998, 0),
                        // Jan, 1, 1998
                        'y': 17.4
                    },
                    {
                        'x': Date.UTC(1999, 0),
                        // Jan, 1, 1999
                        'y': 15.6
                    },
                    {
                        'x': Date.UTC(2000, 0),
                        // Jan, 1, 2000
                        'y': 18.4
                    },
                    {
                        'x': Date.UTC(2001, 0),
                        // Jan, 1, 2001
                        'y': 19.6
                    },
                    {
                        'x': Date.UTC(2002, 0),
                        // Jan, 1, 2002
                        'y': 20.2
                    },
                    {
                        'x': Date.UTC(2003, 0),
                        // Jan, 1, 2003
                        'y': 20.6
                    },
                    {
                        'x': Date.UTC(2004, 0),
                        // Jan, 1, 2004
                        'y': 20.7
                    },
                    {
                        'x': Date.UTC(2005, 0),
                        // Jan, 1, 2005
                        'y': 20.2
                    },
                    {
                        'x': Date.UTC(2006, 0),
                        // Jan, 1, 2006
                        'y': 19.7
                    },
                    {
                        'x': Date.UTC(2007, 0),
                        // Jan, 1, 2007
                        'y': 19.3
                    },
                    {
                        'x': Date.UTC(2008, 0),
                        // Jan, 1, 2008
                        'y': 21.7
                    },
                    {
                        'x': Date.UTC(2009, 0),
                        // Jan, 1, 2009
                        'y': 24.1
                    },
                    {
                        'x': Date.UTC(2010, 0),
                        // Jan, 1, 2010
                        'y': 27.3
                    },
                    {
                        'x': Date.UTC(2011, 0),
                        // Jan, 1, 2011
                        'y': 31.6
                    },
                    {
                        'x': Date.UTC(2012, 0),
                        // Jan, 1, 2012
                        'y': 27.6
                    },
                    {
                        'x': Date.UTC(2013, 0),
                        // Jan, 1, 2013
                        'y': 25.1
                    },
                    {
                        'x': Date.UTC(2014, 0),
                        // Jan, 1, 2014
                        'y': 19.8
                    },
                    {
                        'x': Date.UTC(2015, 0),
                        // Jan, 1, 2015
                        'y': 17.8
                    },
                    {
                        'x': Date.UTC(2016, 0),
                        // Jan, 1, 2016
                        'y': 20.5
                    },
                    {
                        'x': Date.UTC(2017, 0),
                        // Jan, 1, 2017
                        'y': 21.4
                    },
                    {
                        'x': Date.UTC(2018, 0),
                        // Jan, 1, 2018
                        'y': 20.7
                    },
                    {
                        'x': Date.UTC(2019, 0),
                        // Jan, 1, 2019
                        'y': 19.0
                    },
                    {
                        'x': Date.UTC(2020, 0),
                        // Jan, 1, 2020
                        'y': 16.1
                    },
                    {
                        'x': Date.UTC(2021, 0),
                        // Jan, 1, 2020
                        'y': null
                    },
                ],
                color: '#2a8e40',
            }, {
                name: ' ',
                data: [{
                        'x': Date.UTC(1960, 0),
                        // Enero, 1, 1960
                        'y': 0
                    },
                    {
                        'x': Date.UTC(2020, 0),
                        // Enero, 1, 2020
                        'y': 0
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
                            afterAnimate: function () {
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
                            'y': null
                        },
                        {
                            'x': Date.UTC(1960, 0),
                            // Jan, 1, 1960
                            'y': 7.2
                        },
                        {
                            'x': Date.UTC(1961, 0),
                            // Jan, 1, 1961
                            'y': 7.2
                        },
                        {
                            'x': Date.UTC(1962, 0),
                            // Jan, 1, 1962
                            'y': 8.9
                        },
                        {
                            'x': Date.UTC(1963, 0),
                            // Jan, 1, 1963
                            'y': 8.8
                        },
                        {
                            'x': Date.UTC(1964, 0),
                            // Jan, 1, 1964
                            'y': 9.4
                        },
                        {
                            'x': Date.UTC(1965, 0),
                            // Jan, 1, 1965
                            'y': 8.2
                        },
                        {
                            'x': Date.UTC(1966, 0),
                            // Jan, 1, 1966
                            'y': 7.8
                        },
                        {
                            'x': Date.UTC(1967, 0),
                            // Jan, 1, 1967
                            'y': 7.1
                        },
                        {
                            'x': Date.UTC(1968, 0),
                            // Jan, 1, 1968
                            'y': 7.7
                        },
                        {
                            'x': Date.UTC(1969, 0),
                            // Jan, 1, 1969
                            'y': 6.9
                        },
                        {
                            'x': Date.UTC(1970, 0),
                            // Jan, 1, 1970
                            'y': 7.1
                        },
                        {
                            'x': Date.UTC(1971, 0),
                            // Jan, 1, 1971
                            'y': 10.4
                        },
                        {
                            'x': Date.UTC(1972, 0),
                            // Jan, 1, 1972
                            'y': 11.5
                        },
                        {
                            'x': Date.UTC(1973, 0),
                            // Jan, 1, 1973
                            'y': 15
                        },
                        {
                            'x': Date.UTC(1974, 0),
                            // Jan, 1, 1974
                            'y': 18.2
                        },
                        {
                            'x': Date.UTC(1975, 0),
                            // Jan, 1, 1975
                            'y': 17.2
                        },
                        {
                            'x': Date.UTC(1976, 0),
                            // Jan, 1, 1976
                            'y': 15
                        },
                        {
                            'x': Date.UTC(1977, 0),
                            // Jan, 1, 1977
                            'y': 15.5
                        },
                        {
                            'x': Date.UTC(1978, 0),
                            // Jan, 1, 1978
                            'y': 15.8
                        },
                        {
                            'x': Date.UTC(1979, 0),
                            // Jan, 1, 1979
                            'y': 15.3
                        },
                        {
                            'x': Date.UTC(1980, 0),
                            // Jan, 1, 1980
                            'y': 14.8
                        },
                        {
                            'x': Date.UTC(1981, 0),
                            // Jan, 1, 1981
                            'y': 16.4
                        },
                        {
                            'x': Date.UTC(1982, 0),
                            // Jan, 1, 1982
                            'y': 14.9
                        },
                        {
                            'x': Date.UTC(1983, 0),
                            // Jan, 1, 1983
                            'y': 12.8
                        },
                        {
                            'x': Date.UTC(1984, 0),
                            // Jan, 1, 1984
                            'y': 14.5
                        },
                        {
                            'x': Date.UTC(1985, 0),
                            // Jan, 1, 1985
                            'y': 17.1
                        },
                        {
                            'x': Date.UTC(1986, 0),
                            // Jan, 1, 1986
                            'y': 21.2
                        },
                        {
                            'x': Date.UTC(1987, 0),
                            // Jan, 1, 1987
                            'y': 14.9
                        },
                        {
                            'x': Date.UTC(1988, 0),
                            // Jan, 1, 1988
                            'y': 17.3
                        },
                        {
                            'x': Date.UTC(1989, 0),
                            // Jan, 1, 1989
                            'y': 13.5
                        },
                        {
                            'x': Date.UTC(1990, 0),
                            // Jan, 1, 1990
                            'y': 17
                        },
                        {
                            'x': Date.UTC(1991, 0),
                            // Jan, 1, 1991
                            'y': 23
                        },
                        {
                            'x': Date.UTC(1992, 0),
                            // Jan, 1, 1992
                            'y': 24.2
                        },
                        {
                            'x': Date.UTC(1993, 0),
                            // Jan, 1, 1993
                            'y': 26.5
                        },
                        {
                            'x': Date.UTC(1994, 0),
                            // Jan, 1, 1994
                            'y': 27.4
                        },
                        {
                            'x': Date.UTC(1995, 0),
                            // Jan, 1, 1995
                            'y': 23.6
                        },
                        {
                            'x': Date.UTC(1996, 0),
                            // Jan, 1, 1996
                            'y': 23.6
                        },
                        {
                            'x': Date.UTC(1997, 0),
                            // Jan, 1, 1997
                            'y': 19.5
                        },
                        {
                            'x': Date.UTC(1998, 0),
                            // Jan, 1, 1998
                            'y': 17.4
                        },
                        {
                            'x': Date.UTC(1999, 0),
                            // Jan, 1, 1999
                            'y': 15.6
                        },
                        {
                            'x': Date.UTC(2000, 0),
                            // Jan, 1, 2000
                            'y': 18.4
                        },
                        {
                            'x': Date.UTC(2001, 0),
                            // Jan, 1, 2001
                            'y': 19.6
                        },
                        {
                            'x': Date.UTC(2002, 0),
                            // Jan, 1, 2002
                            'y': 20.2
                        },
                        {
                            'x': Date.UTC(2003, 0),
                            // Jan, 1, 2003
                            'y': 20.6
                        },
                        {
                            'x': Date.UTC(2004, 0),
                            // Jan, 1, 2004
                            'y': 20.7
                        },
                        {
                            'x': Date.UTC(2005, 0),
                            // Jan, 1, 2005
                            'y': 20.2
                        },
                        {
                            'x': Date.UTC(2006, 0),
                            // Jan, 1, 2006
                            'y': 19.7
                        },
                        {
                            'x': Date.UTC(2007, 0),
                            // Jan, 1, 2007
                            'y': 19.3
                        },
                        {
                            'x': Date.UTC(2008, 0),
                            // Jan, 1, 2008
                            'y': 21.7
                        },
                        {
                            'x': Date.UTC(2009, 0),
                            // Jan, 1, 2009
                            'y': 24.1
                        },
                        {
                            'x': Date.UTC(2010, 0),
                            // Jan, 1, 2010
                            'y': 27.3
                        },
                        {
                            'x': Date.UTC(2011, 0),
                            // Jan, 1, 2011
                            'y': 31.6
                        },
                        {
                            'x': Date.UTC(2012, 0),
                            // Jan, 1, 2012
                            'y': 27.6
                        },
                        {
                            'x': Date.UTC(2013, 0),
                            // Jan, 1, 2013
                            'y': 25.1
                        },
                        {
                            'x': Date.UTC(2014, 0),
                            // Jan, 1, 2014
                            'y': 19.8
                        },
                        {
                            'x': Date.UTC(2015, 0),
                            // Jan, 1, 2015
                            'y': 17.8
                        },
                        {
                            'x': Date.UTC(2016, 0),
                            // Jan, 1, 2016
                            'y': 20.5
                        },
                        {
                            'x': Date.UTC(2017, 0),
                            // Jan, 1, 2017
                            'y': 21.4
                        },
                        {
                            'x': Date.UTC(2018, 0),
                            // Jan, 1, 2018
                            'y': 20.7
                        },
                        {
                            'x': Date.UTC(2019, 0),
                            // Jan, 1, 2019
                            'y': 19.0
                        },
                        {
                            'x': Date.UTC(2020, 0),
                            // Jan, 1, 2020
                            'y': 16.1
                        },
                        {
                            'x': Date.UTC(2021, 0),
                            // Jan, 1, 2020
                            'y': null
                        },
                    ],
                    color: '#2a8e40',
                }, {
                    name: 'Tendencia General',
                    data: [{
                            'x': Date.UTC(1960, 0),
                            // Enero, 1, 1960
                            'y': 7.2,
                            dataLabels: {
                                y: 24
                            }
                        },
                        {
                            'x': Date.UTC(2020, 0),
                            // Enero, 1, 2020
                            'y': 16.1
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
                    y: 100,
                    x: 0,
                    animation: {
                        enabled: true,
                        duration: 2000,
                    },
                },
            })
        }
    })
    
    /* ********************************************************************************************************************************************** */
    
    //Total de Asesinatos y Homicidios en Puerto Rico (1960-2020)
    
    /* ********************************************************************************************************************************************** */
    
    $(document).ready(function () {
        var chart6 = Highcharts.chart('chart020', {
    
            chart: {
                type: 'line',
                zoomType: 'x',
            },
    
            title: {
                text: 'Gráfica 4: Total anual de asesinatos y homicidios de 1960 a 2020',
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
                    text: 'Cantidad de asesinatos y homicidios',
                    style: {
                        color: 'black'
                    }
                },
                min: 0,
                max: 1200,
                gridLineWidth: 0,
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
                        afterAnimate: function () {
                            update_data7();
                        }
                    },
                },
            },
    
            tooltip: {
                shared: true,
            },
    
            series: [{
                name: 'Total Asesinatos y Homicidios',
                data: [{
                        'x': Date.UTC(1959, 0),
                        // Jan, 1, 1960
                        'y': null
                    },
                    {
                        'x': Date.UTC(1960, 0),
                        // Jan, 1, 1960
                        'y': 168
                    },
                    {
                        'x': Date.UTC(1961, 0),
                        // Jan, 1, 1961
                        'y': 171
                    },
                    {
                        'x': Date.UTC(1962, 0),
                        // Jan, 1, 1962
                        'y': 215
                    },
                    {
                        'x': Date.UTC(1963, 0),
                        // Jan, 1, 1963
                        'y': 216
                    },
                    {
                        'x': Date.UTC(1964, 0),
                        // Jan, 1, 1964
                        'y': 237
                    },
                    {
                        'x': Date.UTC(1965, 0),
                        // Jan, 1, 1965
                        'y': 209
                    },
                    {
                        'x': Date.UTC(1966, 0),
                        // Jan, 1, 1966
                        'y': 202
                    },
                    {
                        'x': Date.UTC(1967, 0),
                        // Jan, 1, 1967
                        'y': 185
                    },
                    {
                        'x': Date.UTC(1968, 0),
                        // Jan, 1, 1968
                        'y': 205
                    },
                    {
                        'x': Date.UTC(1969, 0),
                        // Jan, 1, 1969
                        'y': 183
                    },
                    {
                        'x': Date.UTC(1970, 0),
                        // Jan, 1, 1970
                        'y': 192
                    },
                    {
                        'x': Date.UTC(1971, 0),
                        // Jan, 1, 1971
                        'y': 283
                    },
                    {
                        'x': Date.UTC(1972, 0),
                        // Jan, 1, 1972
                        'y': 319
                    },
                    {
                        'x': Date.UTC(1973, 0),
                        // Jan, 1, 1973
                        'y': 421
                    },
                    {
                        'x': Date.UTC(1974, 0),
                        // Jan, 1, 1974
                        'y': 519
                    },
                    {
                        'x': Date.UTC(1975, 0),
                        // Jan, 1, 1975
                        'y': 499
                    },
                    {
                        'x': Date.UTC(1976, 0),
                        // Jan, 1, 1976
                        'y': 444
                    },
                    {
                        'x': Date.UTC(1977, 0),
                        // Jan, 1, 1977
                        'y': 467
                    },
                    {
                        'x': Date.UTC(1978, 0),
                        // Jan, 1, 1978
                        'y': 485
                    },
                    {
                        'x': Date.UTC(1979, 0),
                        // Jan, 1, 1979
                        'y': 476
                    },
                    {
                        'x': Date.UTC(1980, 0),
                        // Jan, 1, 1980
                        'y': 472
                    },
                    {
                        'x': Date.UTC(1981, 0),
                        // Jan, 1, 1981
                        'y': 527
                    },
                    {
                        'x': Date.UTC(1982, 0),
                        // Jan, 1, 1982
                        'y': 485
                    },
                    {
                        'x': Date.UTC(1983, 0),
                        // Jan, 1, 1983
                        'y': 421
                    },
                    {
                        'x': Date.UTC(1984, 0),
                        // Jan, 1, 1984
                        'y': 483
                    },
                    {
                        'x': Date.UTC(1985, 0),
                        // Jan, 1, 1985
                        'y': 572
                    },
                    {
                        'x': Date.UTC(1986, 0),
                        // Jan, 1, 1986
                        'y': 719
                    },
                    {
                        'x': Date.UTC(1987, 0),
                        // Jan, 1, 1987
                        'y': 508
                    },
                    {
                        'x': Date.UTC(1988, 0),
                        // Jan, 1, 1988
                        'y': 596
                    },
                    {
                        'x': Date.UTC(1989, 0),
                        // Jan, 1, 1989
                        'y': 467
                    },
                    {
                        'x': Date.UTC(1990, 0),
                        // Jan, 1, 1990
                        'y': 600
                    },
                    {
                        'x': Date.UTC(1991, 0),
                        // Jan, 1, 1991
                        'y': 817
                    },
                    {
                        'x': Date.UTC(1992, 0),
                        // Jan, 1, 1992
                        'y': 864
                    },
                    {
                        'x': Date.UTC(1993, 0),
                        // Jan, 1, 1993
                        'y': 954
                    },
                    {
                        'x': Date.UTC(1994, 0),
                        // Jan, 1, 1994
                        'y': 995
                    },
                    {
                        'x': Date.UTC(1995, 0),
                        // Jan, 1, 1995
                        'y': 864
                    },
                    {
                        'x': Date.UTC(1996, 0),
                        // Jan, 1, 1996
                        'y': 868
                    },
                    {
                        'x': Date.UTC(1997, 0),
                        // Jan, 1, 1997
                        'y': 723
                    },
                    {
                        'x': Date.UTC(1998, 0),
                        // Jan, 1, 1998
                        'y': 652
                    },
                    {
                        'x': Date.UTC(1999, 0),
                        // Jan, 1, 1999
                        'y': 593
                    },
                    {
                        'x': Date.UTC(2000, 0),
                        // Jan, 1, 2000
                        'y': 695
                    },
                    {
                        'x': Date.UTC(2001, 0),
                        // Jan, 1, 2001
                        'y': 747
                    },
                    {
                        'x': Date.UTC(2002, 0),
                        // Jan, 1, 2002
                        'y': 774
                    },
                    {
                        'x': Date.UTC(2003, 0),
                        // Jan, 1, 2003
                        'y': 787
                    },
                    {
                        'x': Date.UTC(2004, 0),
                        // Jan, 1, 2004
                        'y': 793
                    },
                    {
                        'x': Date.UTC(2005, 0),
                        // Jan, 1, 2005
                        'y': 771
                    },
                    {
                        'x': Date.UTC(2006, 0),
                        // Jan, 1, 2006
                        'y': 748
                    },
                    {
                        'x': Date.UTC(2007, 0),
                        // Jan, 1, 2007
                        'y': 730
                    },
                    {
                        'x': Date.UTC(2008, 0),
                        // Jan, 1, 2008
                        'y': 815
                    },
                    {
                        'x': Date.UTC(2009, 0),
                        // Jan, 1, 2009
                        'y': 901
                    },
                    {
                        'x': Date.UTC(2010, 0),
                        // Jan, 1, 2010
                        'y': 1017
                    },
                    {
                        'x': Date.UTC(2011, 0),
                        // Jan, 1, 2011
                        'y': 1164
                    },
                    {
                        'x': Date.UTC(2012, 0),
                        // Jan, 1, 2012
                        'y': 1004
                    },
                    {
                        'x': Date.UTC(2013, 0),
                        // Jan, 1, 2013
                        'y': 902
                    },
                    {
                        'x': Date.UTC(2014, 0),
                        // Jan, 1, 2014
                        'y': 700
                    },
                    {
                        'x': Date.UTC(2015, 0),
                        // Jan, 1, 2015
                        'y': 619
                    },
                    {
                        'x': Date.UTC(2016, 0),
                        // Jan, 1, 2016
                        'y': 700
                    },
                    {
                        'x': Date.UTC(2017, 0),
                        // Jan, 1, 2017
                        'y': 710
                    },
                    {
                        'x': Date.UTC(2018, 0),
                        // Jan, 1, 2018
                        'y': 661
                    },
                    {
                        'x': Date.UTC(2019, 0),
                        // Jan, 1, 2019
                        'y': 606
                    },
                    {
                        'x': Date.UTC(2020, 0),
                        // Jan, 1, 2020
                        'y': 529
                    },
                    {
                        'x': Date.UTC(2021, 0),
                        // Jan, 1, 2021
                        'y': null
                    },
                ],
                color: '#2a8e40',
            }, {
                name: ' ',
                data: [{
                        'x': Date.UTC(1960, 0),
                        // Enero, 1, 1960
                        'y': 0
                    },
                    {
                        'x': Date.UTC(2020, 0),
                        // Enero, 1, 2020
                        'y': 0
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
    
        function update_data7() {
            chart6.update({
    
                plotOptions: {
                    series: {
                        animation: {
                            duration: 6000
                        },
                        events: {
                            afterAnimate: function () {
                                update_data8();
                            }
                        },
                        label: {
                            enabled: false,
                            connectorAllowed: false,
                        },
                    },
                },
    
                series: [{
                    name: 'Total Asesinatos y Homicidios',
                    data: [{
                            'x': Date.UTC(1959, 0),
                            // Jan, 1, 1960
                            'y': null
                        },
                        {
                            'x': Date.UTC(1960, 0),
                            // Jan, 1, 1960
                            'y': 168
                        },
                        {
                            'x': Date.UTC(1961, 0),
                            // Jan, 1, 1961
                            'y': 171
                        },
                        {
                            'x': Date.UTC(1962, 0),
                            // Jan, 1, 1962
                            'y': 215
                        },
                        {
                            'x': Date.UTC(1963, 0),
                            // Jan, 1, 1963
                            'y': 216
                        },
                        {
                            'x': Date.UTC(1964, 0),
                            // Jan, 1, 1964
                            'y': 237
                        },
                        {
                            'x': Date.UTC(1965, 0),
                            // Jan, 1, 1965
                            'y': 209
                        },
                        {
                            'x': Date.UTC(1966, 0),
                            // Jan, 1, 1966
                            'y': 202
                        },
                        {
                            'x': Date.UTC(1967, 0),
                            // Jan, 1, 1967
                            'y': 185
                        },
                        {
                            'x': Date.UTC(1968, 0),
                            // Jan, 1, 1968
                            'y': 205
                        },
                        {
                            'x': Date.UTC(1969, 0),
                            // Jan, 1, 1969
                            'y': 183
                        },
                        {
                            'x': Date.UTC(1970, 0),
                            // Jan, 1, 1970
                            'y': 192
                        },
                        {
                            'x': Date.UTC(1971, 0),
                            // Jan, 1, 1971
                            'y': 283
                        },
                        {
                            'x': Date.UTC(1972, 0),
                            // Jan, 1, 1972
                            'y': 319
                        },
                        {
                            'x': Date.UTC(1973, 0),
                            // Jan, 1, 1973
                            'y': 421
                        },
                        {
                            'x': Date.UTC(1974, 0),
                            // Jan, 1, 1974
                            'y': 519
                        },
                        {
                            'x': Date.UTC(1975, 0),
                            // Jan, 1, 1975
                            'y': 499
                        },
                        {
                            'x': Date.UTC(1976, 0),
                            // Jan, 1, 1976
                            'y': 444
                        },
                        {
                            'x': Date.UTC(1977, 0),
                            // Jan, 1, 1977
                            'y': 467
                        },
                        {
                            'x': Date.UTC(1978, 0),
                            // Jan, 1, 1978
                            'y': 485
                        },
                        {
                            'x': Date.UTC(1979, 0),
                            // Jan, 1, 1979
                            'y': 476
                        },
                        {
                            'x': Date.UTC(1980, 0),
                            // Jan, 1, 1980
                            'y': 472
                        },
                        {
                            'x': Date.UTC(1981, 0),
                            // Jan, 1, 1981
                            'y': 527
                        },
                        {
                            'x': Date.UTC(1982, 0),
                            // Jan, 1, 1982
                            'y': 485
                        },
                        {
                            'x': Date.UTC(1983, 0),
                            // Jan, 1, 1983
                            'y': 421
                        },
                        {
                            'x': Date.UTC(1984, 0),
                            // Jan, 1, 1984
                            'y': 483
                        },
                        {
                            'x': Date.UTC(1985, 0),
                            // Jan, 1, 1985
                            'y': 572
                        },
                        {
                            'x': Date.UTC(1986, 0),
                            // Jan, 1, 1986
                            'y': 719
                        },
                        {
                            'x': Date.UTC(1987, 0),
                            // Jan, 1, 1987
                            'y': 508
                        },
                        {
                            'x': Date.UTC(1988, 0),
                            // Jan, 1, 1988
                            'y': 596
                        },
                        {
                            'x': Date.UTC(1989, 0),
                            // Jan, 1, 1989
                            'y': 467
                        },
                        {
                            'x': Date.UTC(1990, 0),
                            // Jan, 1, 1990
                            'y': 600
                        },
                        {
                            'x': Date.UTC(1991, 0),
                            // Jan, 1, 1991
                            'y': 817
                        },
                        {
                            'x': Date.UTC(1992, 0),
                            // Jan, 1, 1992
                            'y': 864
                        },
                        {
                            'x': Date.UTC(1993, 0),
                            // Jan, 1, 1993
                            'y': 954
                        },
                        {
                            'x': Date.UTC(1994, 0),
                            // Jan, 1, 1994
                            'y': 995
                        },
                        {
                            'x': Date.UTC(1995, 0),
                            // Jan, 1, 1995
                            'y': 864
                        },
                        {
                            'x': Date.UTC(1996, 0),
                            // Jan, 1, 1996
                            'y': 868
                        },
                        {
                            'x': Date.UTC(1997, 0),
                            // Jan, 1, 1997
                            'y': 723
                        },
                        {
                            'x': Date.UTC(1998, 0),
                            // Jan, 1, 1998
                            'y': 652
                        },
                        {
                            'x': Date.UTC(1999, 0),
                            // Jan, 1, 1999
                            'y': 593
                        },
                        {
                            'x': Date.UTC(2000, 0),
                            // Jan, 1, 2000
                            'y': 695
                        },
                        {
                            'x': Date.UTC(2001, 0),
                            // Jan, 1, 2001
                            'y': 747
                        },
                        {
                            'x': Date.UTC(2002, 0),
                            // Jan, 1, 2002
                            'y': 774
                        },
                        {
                            'x': Date.UTC(2003, 0),
                            // Jan, 1, 2003
                            'y': 787
                        },
                        {
                            'x': Date.UTC(2004, 0),
                            // Jan, 1, 2004
                            'y': 793
                        },
                        {
                            'x': Date.UTC(2005, 0),
                            // Jan, 1, 2005
                            'y': 771
                        },
                        {
                            'x': Date.UTC(2006, 0),
                            // Jan, 1, 2006
                            'y': 748
                        },
                        {
                            'x': Date.UTC(2007, 0),
                            // Jan, 1, 2007
                            'y': 730
                        },
                        {
                            'x': Date.UTC(2008, 0),
                            // Jan, 1, 2008
                            'y': 815
                        },
                        {
                            'x': Date.UTC(2009, 0),
                            // Jan, 1, 2009
                            'y': 901
                        },
                        {
                            'x': Date.UTC(2010, 0),
                            // Jan, 1, 2010
                            'y': 1017
                        },
                        {
                            'x': Date.UTC(2011, 0),
                            // Jan, 1, 2011
                            'y': 1164
                        },
                        {
                            'x': Date.UTC(2012, 0),
                            // Jan, 1, 2012
                            'y': 1004
                        },
                        {
                            'x': Date.UTC(2013, 0),
                            // Jan, 1, 2013
                            'y': 902
                        },
                        {
                            'x': Date.UTC(2014, 0),
                            // Jan, 1, 2014
                            'y': 700
                        },
                        {
                            'x': Date.UTC(2015, 0),
                            // Jan, 1, 2015
                            'y': 619
                        },
                        {
                            'x': Date.UTC(2016, 0),
                            // Jan, 1, 2016
                            'y': 700
                        },
                        {
                            'x': Date.UTC(2017, 0),
                            // Jan, 1, 2017
                            'y': 710
                        },
                        {
                            'x': Date.UTC(2018, 0),
                            // Jan, 1, 2018
                            'y': 661
                        },
                        {
                            'x': Date.UTC(2019, 0),
                            // Jan, 1, 2019
                            'y': 606
                        },
                        {
                            'x': Date.UTC(2020, 0),
                            // Jan, 1, 2020
                            'y': 529
                        },
                        {
                            'x': Date.UTC(2021, 0),
                            // Jan, 1, 2021
                            'y': null
                        },
                    ],
                    color: '#2a8e40',
                }, {
                    name: 'Tendencia General',
                    data: [{
                            'x': Date.UTC(1960, 0),
                            // Enero, 1, 1960
                            'y': 168,
                            dataLabels: {
                                y: 24
                            }
                        },
                        {
                            'x': Date.UTC(2020, 0),
                            // Enero, 1, 2020
                            'y': 529
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
    
        function update_data8() {
            chart6.update({
                subtitle: {
                    text: 'La Tendencia General de la Cantidad de Asesinatos y Homicidios es Ascendente',
                    style: {
                        color: "black"
                    },
                    y: 80,
                    x: 0,
                    animation: {
                        enabled: true,
                        duration: 2000,
                    },
                },
            })
        }
    })
    
    /* ********************************************************************************************************************************************** */
    
    //Magnitud del Cambio en el Total de Delitos Tipo 1 por Gobernante y Cuatrenio (1961-2020)
    
    /* ********************************************************************************************************************************************** */
    
    $(document).ready(function () {
        Highcharts.chart('chart019', {
            chart: {
                type: 'column',
                zoomType: 'x',
            },
    
            title: {
                text: 'Gráfica 5: Cambio en el total de delitos tipo 1 por gobernante y cuatrenio (1961-2020)',
    
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
                    'Luís Fortuño Burset', 'Alejandro García Padilla', 'Ricardo Rosselló / Wanda Vázquez'
                ],
                crosshair: true
            }],
    
            yAxis: {
                min: -20000,
                max: 20000,
                title: {
                    text: 'Cambio en el total de delitos tipo 1',
                    style: {
                        color: 'black'
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
    
            tooltip: {
                shared: true,
                formatter: function () {
                    return this.y;
                }
            },
    
            legend: {
                symbolRadius: 0
            },
    
            series: [{
                name: 'PNP',
                color: '#2b378d',
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
                    name: '2017-2020 *',
                    color: '#2b378d',
                    y: -18206,
    
                }]
            }, {
                name: 'PPD',
                color: '#eb1b24',
                type: 'area'
            }],
        });
    })
    
    /* ********************************************************************************************************************************************** */
    
    //Comparación cronológica Tasa de Delitos Tipo 1 de Nueva York, Florida y Puerto Rico (1965-2020)
    
    /* ********************************************************************************************************************************************** */
    
    $(document).ready(function () {
        Highcharts.chart('chart015', {
    
            chart: {
                type: 'line',
                zoomType: 'x',
            },
    
            title: {
                text: 'Gráfica 6: Comparación cronológica tasa de delitos tipo 1 de Nueva York, Florida y Puerto Rico (1965-2020)',
            },
    
            xAxis: {
                categories: ['1965', '1966', '1967', '1968', '1969', '1970',
                    '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                    '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                    '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                    '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                    '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'
                ],
            },
    
            yAxis: {
                title: {
                    text: 'Tasa delitos tipo 1',
                },
                min: 0,
                max: 10000,
                gridLineWidth: 0,
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
                        3320, 3716, 4104, 4499, 4743, 5317, 5673, 5377, 5960, 7387, 7721, 7017, 6739, 7070,
                        7688, 8402, 8033, 7465, 6781, 6821, 7574, 8228, 8503, 8938, 8805, 8811, 8547, 8358, 8351,
                        8250, 7702, 7497, 7272, 6886, 6205, 5695, 5578, 5428, 5188, 4894, 4722, 4703, 4811, 4829,
                        4453, 4093, 4032, 3763, 3567, 3956, 3279, 3117, 2989.8, 2721.4, 2552.4, 2152.3,
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
                        3066, 3338, 3777, 4579, 4570, 4971, 5084, 4381, 4459, 5034, 5636, 6225, 6088, 5792,
                        6205, 6912, 6905, 6468, 5903, 5577, 5589, 5768, 5952, 6309, 6293, 6364, 6245, 5858, 5551,
                        5071, 4560, 4132, 3911, 3589, 3279, 3100, 2914, 2807, 2715, 2633, 2546, 2500, 2402, 2392,
                        2316, 2352, 2304, 2323, 2215, 2100, 1987, 1922, 1853, 1786, 1731, 1771,
                    ],
                    color: 'gold',
                    animation: {
                        enabled: true,
                        duration: 10000,
                        easing: 'linear'
                    },
                },
                {
                    name: 'Tasa Puerto Rico',
                    data: [
                        2233, 2314, 2317, 2481, 2304, 2451, 2582, 2545,
                        2575, 2880, 3031, 2910, 2709, 2590, 2574, 2884, 3012, 2977, 2807, 3087, 3472,
                        3531, 3222, 3251, 3169, 3526, 3372, 3605, 3362, 3205, 2902, 2708, 2553, 2322,
                        2150, 1993, 1836, 2386, 2138, 1832, 1702, 1633, 1662, 1828, 1797, 1673, 1693,
                        1699, 1619, 1528, 1341, 1258, 1172, 977, 893, 554,
                    ],
                    color: 'red',
                    animation: {
                        enabled: true,
                        duration: 12000,
                        easing: 'linear'
                    },
                }
            ],
    
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
    
    //Comparación cronológica Tasa de Asesinatos y Homicidios de Nueva York, Florida y Puerto Rico (1965-2020)
    
    /* ********************************************************************************************************************************************** */
    
    $(document).ready(function () {
        Highcharts.chart('charta015', {
    
            chart: {
                type: 'line',
                zoomType: 'x',
            },
    
            title: {
                text: 'Gráfica 7: Comparación cronológica tasa de asesinatos y homicidios de Nueva York, Florida y Puerto Rico (1965-2020)',
            },
    
            xAxis: {
                categories: ['1965', '1966', '1967', '1968', '1969', '1970',
                    '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                    '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                    '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                    '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                    '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'
                ],
            },
    
            yAxis: {
                title: {
                    text: 'Tasa asesinatos por cada 100,000 habitantes',
                },
                min: 0,
                max: 35,
                gridLineWidth: 0,
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
                shared: true,
                valueDecimals: 1,
            },
    
            series: [{
                    name: 'Tasa Florida',
                    data: [
                        8.92, 10.30, 10.51, 11.87, 11.33, 12.67, 13.25, 12.73, 15.37, 14.72, 13.52, 10.72, 10.16, 11.04, 12.23, 14.50, 14.97,
                        13.53, 11.23, 11.52, 11.40, 11.74, 11.40, 11.44, 11.09, 10.66, 9.40, 8.96, 8.95, 8.35, 7.32, 7.48, 6.91, 6.48, 5.68,
                        5.65, 5.34, 5.46, 5.44, 5.44, 4.97, 6.24, 6.59, 6.37, 5.49, 5.24, 5.16, 5.22, 4.96, 5.78, 5.10, 5.40, 5.16, 5.30, 5.28, 
                        5.95,
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
                        4.63, 4.83, 5.43, 6.54, 7.23, 7.94, 9.91, 11.03, 11.17, 10.60, 11.02, 10.89, 10.71, 10.25, 11.85, 12.73,
                        12.31, 11.40, 11.08, 10.07, 9.46, 10.73, 11.31, 12.54, 12.51, 14.48, 14.24, 13.23, 13.30, 11.10, 8.55, 7.44,
                        6.03, 5.08, 4.96, 5.02, 5.03, 4.75, 4.86, 4.61, 4.52, 4.78, 4.17, 4.29, 4.00, 4.48, 3.94, 3.49, 3.27, 3.12, 3.10,
                        3.20, 2.81, 2.90, 2.93, 4.32
                    ],
                    color: 'gold',
                    animation: {
                        enabled: true,
                        duration: 10000,
                        easing: 'linear'
                    },
                },
                {
                    name: 'Tasa Puerto Rico',
                    data: [
                        8.17, 7.79, 7.06, 7.75, 6.86, 7.08, 10.37, 11.53, 14.98, 18.16, 17.17, 15.01, 15.51, 15.83, 15.28, 14.77, 16.42,
                        14.92, 12.81, 14.54, 17.06, 21.24, 14.88, 17.31, 13.45, 17.01, 23.01, 24.17, 26.50, 27.43, 23.64, 23.56, 19.46, 17.40,
                        15.57, 18.38, 19.56, 20.24, 20.57, 20.72, 20.18, 19.66, 19.30, 21.67, 24.09, 27.33, 31.64, 27.62, 25.10, 19.80, 17.82,
                        20.55, 21.4, 20.7, 19.0, 16.1,
                    ],
                    color: 'red',
                    animation: {
                        enabled: true,
                        duration: 12000,
                        easing: 'linear'
                    },
                }
            ],
    
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