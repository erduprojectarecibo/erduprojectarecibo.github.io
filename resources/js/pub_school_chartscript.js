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

// Total de Matrículas Realizadas en Escuelas Públicas de Puerto Rico (1965-2019)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    Highcharts.chart('chart05', {

        chart: {
            type: 'area',
            zoomType: 'x',
        },

        title: {
            text: 'Total de Matrículas Realizadas en Escuelas Públicas de Puerto Rico (1965-2019)',
        },

        xAxis: {
            categories: ['1965', '1966','1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977',
                '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988',
                '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
                '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017','2018','2019',
            ],
        },

        yAxis: {
            title: {
                text: 'Total de Matrículas',
                style: {
                }
            },
            min: 200000,
            max: 800000,
        },

        plotOptions: {
            series: {
                label: {
                    enabled:false,
                    connectorAllowed: false,
                },
                pointStart: 1965
            }
        },

        tooltip: {
            shared: true
        },

        series: [{
            name: 'Total de Matrículas',
            data: [631358,
651030,
654762,
668520,
672249,
686777,
697410,
711238,
712588,
704873.5,
697159,
688596,
705007.5,
721419,
717149.5,
712880,
721419,
708794,
701925,
692923,
686914,
679489,
672837,
661693,
651225,
644734,
642392,
637034,
631460,
621895,
627620,
618861,
617157,
613862,
613019,
612725,
604177,
596502,
584916,
575648,
563490,
544138,
526565,
503635,
493393,
473735,
452740,
434609,
423934,
410950,
379818,
365181,
346096,
319422,
295851,
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