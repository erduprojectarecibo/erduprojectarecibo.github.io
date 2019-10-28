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
                // x: -60,
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

// CEEB Aprovechamiento en Matemáticas (1967-2019)

/* ********************************************************************************************************************************************** */


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
            gridLineWidth: 0,
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

/* ********************************************************************************************************************************************** */

// CEEB Aprovechamiento en Español (1967-2019)

/* ********************************************************************************************************************************************** */

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

/* ********************************************************************************************************************************************** */

// CEEB Aprovechamiento en Inglés (1967-2019)

/* ********************************************************************************************************************************************** */

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
            gridLineWidth: 0,
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

/* ********************************************************************************************************************************************** */

// CEEB Total de Estudiantes (1967-2019)

/* ********************************************************************************************************************************************** */

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

/* ********************************************************************************************************************************************** */

// CEEB Aprovechamiento en Matemáticas Pública vs Privada (1987-2019)

/* ********************************************************************************************************************************************** */

$(document).ready(function () {
    Highcharts.chart('ceebchart05', {

        chart: {
            type: 'line',
            zoomType: 'x',
        },

        title: {
            text: 'Puntuaciones en el College Board en Aprovechamiento en Matemáticas entre Estudiantes de Escuela Pública y Privada de Puerto Rico (1987-2019)',
        },

        xAxis: {
            categories: ['1987', '1988','1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
            ],
        },

        yAxis: [{
            title: {
                text: 'Puntuaciones de College Board',
            },
            min: 400,
            max: 600,
            gridLineWidth: 0,
        }, {
            title: {
                text:'Diferencia en Puntuaciones',
            },
            opposite:true,
            min:50, 
            max:130,
            gridLineWidth: 0,
        }],

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1987
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Pública',
            data: [466, 474, 467, 466, 472, 471, 477, 474, 474, 467, 469, 465, 463, 465, 463, 461, 460, 457, 457, 456, 455, 456, 452, 463, 463, 464, 467, 455, 446, 439, 439, 445, 458],
            color: '#2a8e40'
        }, {
            name: 'Privada',
            data: [586, 586, 582, 572, 568, 565, 563, 558, 563, 547, 548, 541, 550, 552, 555, 547, 546, 556, 547, 546, 539, 535, 540, 534, 527, 532, 530, 528, 531, 526, 519, 540, 532],
            color: '#FEDA35'
        }, {
            name: 'Diferencia',
            data: [120, 112, 115, 106, 96, 94, 86, 84, 89, 80, 79, 76, 87, 87, 92, 86, 86, 99, 90, 90, 84, 79, 88, 71, 64, 68, 63, 73, 85, 87, 80],
            color: '#FF0000',
            yAxis:1
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

// CEEB Aprovechamiento en Español Pública vs Privada (1987-2019)

/* ********************************************************************************************************************************************** */

$(document).ready(function () {
    Highcharts.chart('ceebchart06', {

        chart: {
            type: 'line',
            zoomType: 'xy',
        },

        title: {
            text: 'Puntuaciones en el College Board en Aprovechamiento en Español entre Estudiantes de Escuela Pública y Privada de Puerto Rico (1987-2019)',
        },

        xAxis: {
            categories: ['1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
            ],
        },

        yAxis: [{
            title: {
                text: 'Puntuaciones de College Board',
            },
            gridLineWidth: 0,
            min: 400,
            max: 600,
        }, {
            title: {
                text:'Diferencia en Puntuaciones',
            },
            opposite:true,
            min:40, 
            max:100,
            gridLineWidth: 0,
        }],

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1987
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Pública',
            data: [464, 469, 470, 462, 467, 468, 466, 460, 453, 456, 446, 441, 442, 440, 434, 435, 432, 430, 430, 428, 428, 431, 422, 439, 442, 446, 451, 438, 441, 438, 439, 432, 445],
            color: '#2a8e40'
        }, {
            name: 'Privada',
            data: [545, 543, 555, 540, 536, 533, 534, 528, 522, 511, 514, 499, 496, 503, 499, 497, 496, 484, 490, 489, 488, 493, 495, 487, 483, 488, 490, 486, 497, 497, 491, 506, 503],
            color: '#FEDA35'
        }, {
            name: 'Diferencia',
            data: [81, 74, 85, 78, 69, 65, 68, 68, 69, 55, 68, 58, 54, 63, 65, 62, 64, 54, 60, 61, 60, 62, 73, 48, 41, 42, 39, 48, 56, 59, 52],
            color: '#FF0000',
            yAxis:1
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

// CEEB Aprovechamiento en Inglés Pública vs Privada (1987-2019)

/* ********************************************************************************************************************************************** */

$(document).ready(function () {
    Highcharts.chart('ceebchart07', {

        chart: {
            type: 'line',
            zoomType: 'xy',
        },

        title: {
            text: 'Puntuaciones en el College Board en Aprovechamiento en Inglés entre Estudiantes de Escuela Pública y Privada de Puerto Rico (1987-2019)',
        },

        xAxis: {
            categories: ['1987', '1988','1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
            ],
        },

        yAxis: [{
            title: {
                text: 'Puntuaciones de College Board',
            },
            min: 400,
            max: 600,
            gridLineWidth: 0,
        }, {
            title: {
                text:'Diferencia en Puntuaciones',
            },
            opposite:true,
            min:70, 
            max:140,
            gridLineWidth: 0,
        }],

        plotOptions: {
            series: {
                label: {
                    enabled: false,
                    connectorAllowed: false,
                },
                pointStart: 1987
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Pública',
            data: [422, 424, 424, 422, 426, 424, 425, 425, 431, 419, 420, 416, 414, 416, 412, 415, 417, 416, 419, 420, 423, 429, 424, 437, 445, 449, 460, 450, 444, 443, 443, 444, 463], 
            color: '#2a8e40'
        }, {
            name: 'Privada',
            data: [536, 536, 537, 531, 524, 529, 525, 525, 530, 512, 515, 516, 520, 524, 537, 536, 534, 538, 536, 546, 537, 542, 541, 537, 537, 540, 544, 550, 558, 552, 547, 573, 570], 
            color: '#FEDA35'
        }, {
            name: 'Diferencia',
            data: [114, 112, 113, 109, 98, 105, 100, 100, 99, 93, 95, 100, 106, 108, 125, 121, 117, 122, 117, 126, 114, 113, 117, 100, 92, 91, 84, 100, 114, 109, 104],
            color: '#FF0000',
            yAxis:1
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