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
        },
        symbolRadius: 0
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

    exporting: {
        buttons: {
            contextButton: {
                x: -60,
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

$(document).ready(function () {
    Highcharts.chart('ceebchart01', {

        chart: {
            type: 'line',
            zoomType: 'x',
        },

        title: {
            text: 'Puntuaciones en el College Board en Aprovechamiento en Matemáticas de Estudiantes de Puerto Rico (1967-2019)',
        },

        xAxis: {
            categories: ['1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
            ],
        },

        yAxis: {
            title: {
                text: 'Puntuaciones de College Board',
            },
            min: 400,
            max: 525,
            plotLines: [{
                value: 501,
                color: '#2a8e40',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: "Valor Máximo",
                }
            }, {
                value: 457,
                color: '#2a8e40',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: "Valor Mínimo",
                    y: 15,
                }
            }]
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1967
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Aprovechamiento en Matemáticas',
            data: [495, 500, 485, 490, 498, 476, 496, 487, 501, 497, 479, 501, 494, 488, 484, 481, 477, 478, 487, 484, 485, 493, 486, 486, 491, 493, 499, 494, 494, 483, 487, 481, 481, 484, 483, 478, 478, 478, 476, 476, 474, 474, 469, 482, 482, 483, 486, 471, 465, 458, 457, 469, 476],
            color: '#2a8e40'
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

$(document).ready(function () {
    Highcharts.chart('ceebchart02', {

        chart: {
            type: 'line',
            zoomType: 'xy',
        },

        title: {
            text: 'Puntuaciones en el College Board en Aprovechamiento en Español de Estudiantes de Puerto Rico (1967-2019)',
        },

        xAxis: {
            categories: ['1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
            ],
        },

        yAxis: {
            title: {
                text: 'Puntuaciones de College Board',
            },
            gridLineWidth: 0,
            min: 400,
            max: 525,
            plotLines: [{
                value: 493,
                color: '#FEDA35',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: "Valor Máximo",
                }
            }, {
                value: 436,
                color: '#FEDA35',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: "Valor Mínimo",
                    y: 15,
                }
            }]
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1967
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Aprovechamiento en Español',
            data: [493, 493, 486, 480, 481, 481, 477, 477, 472, 467, 481, 462, 471, 456, 467, 470, 471, 471, 478, 475, 477, 482, 484, 476, 481, 483, 484, 476, 469, 467, 462, 453, 453, 453, 449, 447, 445, 442, 442, 442, 442, 445, 436, 451, 453, 458, 463, 448, 454, 450, 451, 451, 459],
            color: '#FEDA35'
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

$(document).ready(function () {
    Highcharts.chart('ceebchart03', {

        chart: {
            type: 'line',
            zoomType: 'xy',
        },

        title: {
            text: 'Puntuaciones en el College Board en Aprovechamiento en Inglés de Estudiantes de Puerto Rico (1967-2019)',
        },

        xAxis: {
            categories: ['1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
            ],
        },

        yAxis: {
            title: {
                text: 'Puntuaciones de College Board',
            },
            min: 400,
            max: 525,
            plotLines: [{
                value: 495,
                color: '#2a8e40',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: "Valor Máximo",
                }
            }, {
                value: 427,
                color: '#2a8e40',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: "Valor Mínimo",
                    y: 15,
                }
            }]
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1967
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Aprovechamiento en Inglés',
            data: [495, 490, 479, 485, 471, 456, 462, 460, 441, 445, 440, 433, 437, 427, 435, 432, 430, 431, 439, 441, 440, 443, 442, 443, 446, 449, 451, 449, 454, 438, 442, 437, 436, 440, 439, 440, 441, 443, 443, 448, 449, 456, 447, 463, 471, 475, 485, 472, 470, 467, 467, 476, 489],
            color: '#2a8e40'
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

$(document).ready(function () {
    Highcharts.chart('ceebchart04', {

        chart: {
            type: 'line',
            zoomType: 'xy',
        },

        title: {
            text: 'Total de Estudiantes que tomaron el College Board en Puerto Rico (1967-2019)',
        },

        xAxis: {
            categories: ['1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
            ],
        },

        yAxis: {
            title: {
                text: 'Total de Estudiantes',
            },
            gridLineWidth: 0,
            min: 0,
            max: 40000,
            plotLines: [{
                value: 37104,
                color: '#2a8e40',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: "Valor Máximo",
                }
            }, {
                value: 14912,
                color: '#2a8e40',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: "Valor Mínimo",
                    y: 15,
                }
            }]
        },

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1967
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Total de Estudiantes',
            data: [
                14912, 15846, 16200, 17850, 18690, 19591, 24639, 24125, 26859, 28901, 31973, 33340, 32783, 33478, 32864, 34282, 33206, 32435, 31795, 30685, 31264,
            30919, 29096, 28394, 28349, 31677, 33724, 31877, 32490, 29640, 29797, 33657, 32813, 31186, 30131, 29886, 30319, 30376, 31015, 31060, 31628, 30190, 37104,
            27993, 28138, 27680, 26709, 34936, 35538, 33789, 33892, 30549, 33566
            ],
            color: '#2a8e40'
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
