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
                duration: 8000
            }
        },
    },
});

/* ********************************************************************************************************************************************** */

// Total de Matrículas Realizadas en Escuelas Públicas de Puerto Rico (1965-2020)

/* ********************************************************************************************************************************************** */

$(document).ready(function () {
    Highcharts.chart('chart05', {

        chart: {
            type: 'area',
            zoomType: 'x',
        },

        title: {
            text: 'Cronología de la matrícula total en agosto del Departamento de Educación',
        },

        xAxis: {
            categories: ['1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'
            ],
        },

        yAxis: {
            title: {
                text: 'Total de Estudiantes Matriculados',
                style: {}
            },
            min: 0,
            max: 800000,
            tickInterval: 100000
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1965
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Matrícula Total Agosto',
            data: [631358, 651030, 654762, 668520, 672249, 686777, 697410, 711238, 712588, 704873.5, 697159, 688596, 705007.5, 721419, 717149.5,
                712880, 721419, 708794, 701925, 692923, 686914, 679489, 672837, 661693, 651225, 644734, 642392, 637034, 631460, 621895, 627620, 618861, 617157,
                613862, 613019, 612725, 604177, 596502, 584916, 575648, 563490, 544138, 526565, 503635, 493393, 473735, 452740, 434609, 423934, 410950, 379818,
                365181, 346096, 307282, 292518, 276413
            ],
            color: '#2a8e40',
            animation: {
                enabled: true,
                duration: 10000,
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

// Cambio en Matrículas Realizadas en Escuelas Públicas de Puerto Rico (1965-2020)

/* ********************************************************************************************************************************************** */

$(document).ready(function () {
    Highcharts.chart('epchart02', {

        chart: {
            type: 'column',
            zoomType: 'x',
        },

        title: {
            text: 'Cambio en la matrícula total anual (1966-2020)',
        },

        xAxis: {
            categories: ['1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'
            ],
        },

        yAxis: {
            title: {
                text: 'Valor del Cambio Total',
                style: {
                    // color: '#FFFFFF'
                }
            },
            min: -40000,
            max: 40000,
        },

        legend: {
            symbolRadius: 0
        },

        plotOptions: {
            column: {
                negativeColor: 'red'
            },
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1965,
                column: {
                    negativeColor: 'red'
                },
            }
        },

        tooltip: {
            shared: true,
            formatter: function () {
                if (this.y < 0) {
                    return 'Cambio Total Negativo en la Matrícula: ' + this.y
                } else if (this.x == '1965' || this.x == '2021') {
                    return 'N/A'
                } else {
                    return 'Cambio Total Positivo en la Matrícula: ' + this.y
                }
            },
        },

        series: [{
            name: 'Cambio Total Positivo en la Matrícula',
            data: [null, 19672, 3732, 13758, 3729, 14528, 10633, 13828, 1350, -7714, -7714, -8563, 16411, 16411, -4269, -4269,
                8539, -12625, -6869, -9002, -6009, -7425, -6652, -11144, -10468, -6491, -2342, -5358, -5574, -9565, 5725, -8759,
                -1704, -3295, -843, -294, -8548, -7675, -11586, -9268, -12158, -19352, -17573, -22930, -10242, -19658, -20995,
                -18131, -10675, -12984, -31132, -14637, -19085, -38814, -23571, -19438, null
            ],
            color: 'black',
            animation: {
                enabled: true,
                duration: 8000,
                easing: 'linear'
            },
        }, {
            name: 'Cambio Total Negativo en la Matrícula',
            color: 'red',
            type: 'area',
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
        },

    });

})

/* ********************************************************************************************************************************************** */

// Cambio de Porcentual en Matrículas Realizadas en Escuelas Públicas de Puerto Rico (1965-2020)

/* ********************************************************************************************************************************************** */


$(document).ready(function () {
    Highcharts.chart('epchart03', {

        chart: {
            type: 'column',
            zoomType: 'x',
        },

        title: {
            text: 'Cambio porcentual en la matrícula total anual (1966-2020)',
        },

        xAxis: {
            categories: ['1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'
            ],
        },

        yAxis: {
            title: {
                text: 'Valor del Cambio Porcentual',
            },

            labels: {
                formatter: function () {
                    return this.value + "%";
                },
            },
            min: -8,
            max: 8,
        },

        legend: {
            symbolRadius: 0
        },

        plotOptions: {
            column: {
                negativeColor: 'red'
            },
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1965
            }
        },

        tooltip: {
            shared: true,
            formatter: function () {
                if (this.y < 0) {
                    return 'Cambio Porcentual Negativo en la Matrícula: ' + this.y + ' %'
                } else if (this.x == '1965' || this.x == '2021') {
                    return 'N/A'
                } else {
                    return 'Cambio Porcentual Positivo en la Matrícula: ' + this.y + ' %'
                }
            },
        },

        series: [{
            name: 'Cambio Porcentual Positivo en la Matrícula',
            data: [0, 3.12, 0.57, 2.10, 0.56, 2.16, 1.55, 1.98, 0.19, -1.08, -1.09, -1.23, 2.38, 2.33, -0.59, -0.60, 1.20,
                -1.75, -0.97, -1.28, -0.87, -1.08, -0.98, -1.66, -1.58, -1.00, -0.36, -0.83, -0.87, -1.51, 0.92, -1.40,
                -0.28, -0.53, -0.14, -0.05, -1.40, -1.27, -1.94, -1.58, -2.11, -3.43, -3.23, -4.35, -2.03, -3.98, -4.43,
                -4.00, -2.46, -3.06, -7.58, -3.85, -5.23, -11.2, -7.38, -6.60, 0
            ],
            color: 'black',
            animation: {
                enabled: true,
                duration: 8000,
                easing: 'linear'
            },
        }, {
            name: 'Cambio Porcentual Negativo en la Matrícula',
            color: 'red',
            type: 'area',
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
        },
    });
})