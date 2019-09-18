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

var categories = ['0-4', '5-9', '10-14', '15-19',
    '20-24', '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64', '65-69',
    '70-74', '75-79', '80-84', '85 + '
];

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico

/* ********************************************************************************************************************************************** */

$(document).ready(function () {
    Highcharts.chart('pchart01', {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Pirámide Poblacional de Puerto Rico',

        },
        subtitle: {
            text: '',

        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                style: {
                    color: '#606F7B',
                    step: 1
                }
            }
        }, { // Mirror axis in the right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                style: {
                    color: '#606F7B',
                    step: 1
                }
            }
        }],
        yAxis: {
            max: 200000, // This prevents the data to shift right while in motion
            min: -200000,
            title: {
                text: null
            },
            labels: {
                style: {
                    color: '#606F7B'
                },
                formatter: function () {
                    return Math.abs(this.value / 10000) + '%';
                }
            }
        },

        plotOptions: {
            // Spacing between data bars
            series: {
                stacking: 'normal',

            }
        },

        tooltip: {
            // This controls the hovering box when mouse is over data
            formatter: function () {
                return '<b>' + this.series.name + ', Edades ' + this.point.category + '</b><br/>' +
                    'Población: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
            }
        },


        motion: {
            // Enables the motion aspect of the graph
            enabled: true,
            labels: [1899, 1910, 1920, 1930, 1940],
            series: [0, 1],
            updateInterval: 30,
            loop: true,
        },

        series: [{
            name: 'Masculino',
            color: '#008445',
            borderColor: '#008445',
            //             1899     1910    1920     1930     1940     
            data: [{
                sequence: [-76774, -94213, -100898, -114045, -142289]
            }, {
                sequence: [-72920, -76572, -99150, -113532, -127791]
            }, {
                sequence: [-65112, -74280, -85702, -101375, -114496]
            }, {
                sequence: [-42919, -53388, -60183, -87907, -99460]
            }, {
                sequence: [-41664, -53492, -62114, -74461, -102464]
            }, {
                sequence: [-39469, -45836, -44138, -47519, -72263]
            }, {
                sequence: [-31365, -35331, -37540, -46720, -52012]
            }, {
                sequence: [-24251, -32283, -38438, -45554, -50529]
            }, {
                sequence: [-22179, -26539, -31174, -37666, -43739]
            }, {
                sequence: [-13454, -18977, -28368, -29935, -36186]
            }, {
                sequence: [-16124, -16867, -21878, -24552, -30639]
            }, {
                sequence: [-8287, -9241, -11610, -14177, -18931]
            }, {
                sequence: [-8471, -8996, -12374, -15616, -17877]
            }, {
                sequence: [-3551, -4612, -5415, -6960, -12345]
            }, {
                sequence: [-2713, -3156, -4138, -5680, -7943]
            }, {
                sequence: [-2945, -3497, -4551, -5962, -8957]
            }, {
                sequence: [-63, -21, -154, -100, -359]
            }, {
                sequence: [0, 0, 0, 0, 0]
            }, ]

        }, {
            name: 'Femenino',
            color: '#FFD13F',
            borderColor: '#FFD13F',
            //             1899   1910   1920   1930    1940 
            data: [{
                sequence: [73629, 90976, 99357, 112423, 138151]
            }, {
                sequence: [70626, 74651, 95981, 110490, 123861]
            }, {
                sequence: [59241, 69471, 82352, 97962, 112601]
            }, {
                sequence: [50229, 60401, 66065, 98243, 106689]
            }, {
                sequence: [46811, 55016, 66417, 74875, 103862]
            }, {
                sequence: [44796, 48377, 51915, 52261, 75745]
            }, {
                sequence: [32952, 35091, 40465, 47989, 50584]
            }, {
                sequence: [23305, 32005, 38651, 46802, 50609]
            }, {
                sequence: [22067, 25805, 30276, 34882, 42293]
            }, {
                sequence: [12943, 18186, 21905, 26009, 32816]
            }, {
                sequence: [16747, 16484, 19746, 22667, 26352]
            }, {
                sequence: [7043, 9552, 9976, 11841, 15513]
            }, {
                sequence: [9915, 10137, 12013, 14784, 17510]
            }, {
                sequence: [3128, 5211, 5547, 7146, 12983]
            }, {
                sequence: [3533, 4250, 5018, 6042, 8634]
            }, {
                sequence: [3973, 5065, 6157, 7614, 12244]
            }, {
                sequence: [44, 33, 143, 122, 588]
            }, {
                sequence: [0, 0, 0, 0, 0]
            }]

        }],
    });
});