  
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

/* ********************************************************************************************************************************************** */

// Tasa de Delitos Tipo 1 por cada 100,000 Habitantes (1960-2018)

/* ********************************************************************************************************************************************** */

Highcharts.chart('chart3', {

    chart: {
        type: 'area',
        zoomType: 'x',
    },

    title: {
        text: 'Delitos Tipo 1 por cada 100,000 Habitantes, Puerto Rico (1960-2018)',
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
            text: 'Delitos Tipo 1 por cada 100,000 Habitantes',
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

/* ********************************************************************************************************************************************** */

// Tasa Ascendente de Delitos Tipo 1 por cada 100,000 habitantes (1960-1992)

/* ********************************************************************************************************************************************** */



/* ********************************************************************************************************************************************** */

// Tasa Descendente de Delitos Tipo 1 por cada 100,000 habitantes (1992-2018)

/* ********************************************************************************************************************************************** */



/* ********************************************************************************************************************************************** */

//Total de Delitos Tipo 1 en Puerto Rico (1960-2018)

/* ********************************************************************************************************************************************** */



/* ********************************************************************************************************************************************** */

//Tasa de Asesinatos y Homicidios en Puerto Rico (1960-2018)

/* ********************************************************************************************************************************************** */



/* ********************************************************************************************************************************************** */

//Magnitud del Cambio en el Total de Delitos Tipo 1 por Gobernante y Cuatrenio (1961-2018)

/* ********************************************************************************************************************************************** */

