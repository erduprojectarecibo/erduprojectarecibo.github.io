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
                duration: 5000
            }
        },
    },

});

var categories = ['0-4', '5-9', '10-14', '15-19',
    '20-24', '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64', '65-69',
    '70-74', '75 +'
];

var categories2 = ['0-4', '5-9', '10-14', '15-19',
    '20-24', '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64', '65-69',
    '70-74', '75-79', '80-84', '85 +'
];

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico (1899-1940)

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
            labels: [1899, 1910, 1920, 1930, 1940, 1950],
            series: [0, 1],
            updateInterval: 30,
            loop: false,
        },

        series: [{
            name: 'Masculino',
            color: '#008445',
            borderColor: '#008445',
            //             1899     1910    1920     1930     1940     1950   
            data: [{
                sequence: [-76774, -94213, -100898, -114045, -142289, -185014]
            }, {
                sequence: [-72920, -76572, -99150, -113532, -127791, -161446]
            }, {
                sequence: [-65112, -74280, -85702, -101375, -114496, -138696]
            }, {
                sequence: [-42919, -53388, -60183, -87907, -99460, -108984]
            }, {
                sequence: [-41664, -53492, -62114, -74461, -102464, -91269]
            }, {
                sequence: [-39469, -45836, -44138, -47519, -72263, -76528]
            }, {
                sequence: [-31365, -35331, -37540, -46720, -52012, -66769]
            }, {
                sequence: [-24251, -32283, -38438, -45554, -50529, -67324]
            }, {
                sequence: [-22179, -26539, -31174, -37666, -43739, -47745]
            }, {
                sequence: [-13454, -18977, -28368, -29935, -36186, -39893]
            }, {
                sequence: [-16124, -16867, -21878, -24552, -30639, -36548]
            }, {
                sequence: [-8287, -9241, -11610, -14177, -18931, -24692]
            }, {
                sequence: [-8471, -8996, -12374, -15616, -17877, -25636]
            }, {
                sequence: [-3551, -4612, -5415, -6960, -12345, -16270]
            }, {
                sequence: [-2713, -3156, -4138, -5680, -7943, -10679]
            }, {
                sequence: [-2945, -3497, -4551, -5962, -8957, -13453]
            }]
        }, {
            name: 'Femenino',
            color: '#FFD13F',
            borderColor: '#FFD13F',
            //             1899   1910   1920   1930    1940    1950
            data: [{
                sequence: [73629, 90976, 99357, 112423, 138151, 181263]
            }, {
                sequence: [70626, 74651, 95981, 110490, 123861, 156922]
            }, {
                sequence: [59241, 69471, 82352, 97962, 112601, 132034]
            }, {
                sequence: [50229, 60401, 66065, 98243, 106689, 111468]
            }, {
                sequence: [46811, 55016, 66417, 74875, 103862, 101844]
            }, {
                sequence: [44796, 48377, 51915, 52261, 75745, 81608]
            }, {
                sequence: [32952, 35091, 40465, 47989, 50584, 65123]
            }, {
                sequence: [23305, 32005, 38651, 46802, 50609, 65918]
            }, {
                sequence: [22067, 25805, 30276, 34882, 42293, 43480]
            }, {
                sequence: [12943, 18186, 21905, 26009, 32816, 35835]
            }, {
                sequence: [16747, 16484, 19746, 22667, 26352, 34675]
            }, {
                sequence: [7043, 9552, 9976, 11841, 15513, 21726]
            }, {
                sequence: [9915, 10137, 12013, 14784, 17510, 23269]
            }, {
                sequence: [3128, 5211, 5547, 7146, 12983, 16493]
            }, {
                sequence: [3533, 4250, 5018, 6042, 8634, 10745]
            }, {
                sequence: [3973, 5065, 6157, 7614, 12244, 17354]
            }]
        }],
    });
});

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico (1950-2016)

/* ********************************************************************************************************************************************** */


$(document).ready(function () {
    Highcharts.chart('pchart02', {
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
            categories: categories2,
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
            categories: categories2,
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
            labels: [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
            series: [0, 1],
            updateInterval: 30,
            loop: false,
        },

        series: [{
            name: 'Masculino',
            color: '#008445',
            borderColor: '#008445',
            //            1950      1960     1970     1980      1990     2000     2010     2011     2012     2013     2014    2015    2016      
            data: [{
                sequence: [-185014, -179619, -161296, -173228, -153759, -151287, -115173, -109274, -105154, -101293, -95367, -89507, -82859]
            }, {
                sequence: [-161446, -165930, -171035, -168162, -161328, -156253, -123228, -117830, -114514, -111406, -107325, -102622, -95805]
            }, {
                sequence: [-138696, -162244, -169789, -172494, -172707, -155984, -137289, -133296, -128247, -123386, -118226, -112350, -106372]
            }, {
                sequence: [-108984, -122602, -143806, -168399, -165632, -159309, -144853, -140690, -136873, -133136, -128109, -124179, -119826]
            }, {
                sequence: [-91269, -79792, -108077, -129243, -140998, -149426, -130577, -132906, -132908, -132865, -130133, -125971, -121579]
            }, {
                sequence: [-76528, -61971, -84729, -110820, -129010, -133018, -118578, -114401, -111201, -110342, -110101, -111167, -111318]
            }, {
                sequence: [-66769, -58723, -73492, -107419, -119225, -126164, -119708, -117297, -113364, -110163, -105508, -99855, -94823]
            }, {
                sequence: [-67324, -61592, -68187, -91456, -110440, -124421, -115981, -112635, -110288, -108926, -106632, -104890, -101801]
            }, {
                sequence: [-47745, -53087, -61530, -78063, -105352, -116278, -114941, -113429, -111925, -110432, -107690, -104593, -101315]
            }, {
                sequence: [-39893, -53781, -59437, -68328, -91398, -107736, -115470, -114769, -113396, -111394, -108553, -106235, -104318]
            }, {
                sequence: [-36548, -39832, -53032, -61175, -75988, -106091, -110600, -110268, -109277, -109245, -108642, -107561, -105712]
            }, {
                sequence: [-24692, -34404, -49156, -57158, -65701, -87131, -102262, -102603, -102880, -102986, -102652, -102377, -102248]
            }, {
                sequence: [-25636, -29095, -40673, -50641, -57878, -74276, -100090, -98590, -96264, -94764, -94038, -93510, -95407]
            }, {
                sequence: [-16270, -24525, -32914, -45989, -52353, -60982, -80178, -84113, -86904, -88998, -89784, -89880, -89977]
            }, {
                sequence: [-10679, -16370, -21845, -31795, -40323, -47461, -61731, -63207, -64783, -66798, -68402, -70294, -74072]
            }, {
                sequence: [-5671, -10275, -13854, -21669, -31519, -35996, -43625, -45248, -46569, -47978, -49660, -50879, -52531]
            }, {
                sequence: [-4172, -4636, -7784, -11138, -18376, -22697, -27582, -28640, -29296, -29942, -30879, -32160, -33887]
            }, {
                sequence: [-3610, -4286, -9313, -9550, -13655, -19067, -23305, -24249, -25232, -26234, -27202, -28118, -29822]
            }, ]

        }, {
            name: 'Femenino',
            color: '#FFD13F',
            borderColor: '#FFD13F',
            //             1950    1960    1970    1980    1990    2000    2010    2011    2012    2013   2014   2015   2016 
            data: [{
                sequence: [181263, 174783, 156810, 167424, 148414, 144119, 109583, 104188, 100124, 95880, 90534, 85368, 78655]
            }, {
                sequence: [156922, 161599, 167219, 162169, 155145, 148909, 116776, 111079, 107807, 104830, 101589, 97790, 92358]
            }, {
                sequence: [132034, 158963, 164771, 165797, 166866, 149816, 131282, 126549, 121522, 115798, 110918, 105397, 100232]
            }, {
                sequence: [111468, 124258, 147520, 168735, 161085, 154127, 139406, 134268, 131006, 126984, 121857, 118389, 114472]
            }, {
                sequence: [101844, 91873, 125799, 143187, 146229, 151765, 130273, 131188, 130631, 129555, 127367, 122821, 119042]
            }, {
                sequence: [81608, 74219, 97909, 125316, 141552, 138489, 125581, 119589, 115922, 113680, 112621, 113504, 114402]
            }, {
                sequence: [65123, 68006, 83160, 122343, 135062, 136661, 128465, 126267, 123689, 119630, 115121, 109102, 104011]
            }, {
                sequence: [65918, 69072, 76936, 102828, 126069, 140428, 125289, 121968, 120441, 119554, 117547, 116325, 113771]
            }, {
                sequence: [43480, 54266, 67317, 87589, 120618, 134536, 127317, 124337, 122370, 120217, 118107, 115224, 111873]
            }, {
                sequence: [35835, 51807, 62529, 76692, 102586, 125384, 132516, 131004, 128923, 125518, 121517, 118525, 115383]
            }, {
                sequence: [34675, 35376, 52539, 68611, 85886, 123825, 129221, 127952, 126840, 126767, 126454, 124980, 123199]
            }, {
                sequence: [21726, 31488, 47297, 62380, 75251, 101752, 121345, 122116, 122708, 122538, 121918, 121569, 120225]
            }, {
                sequence: [23269, 28976, 40911, 54294, 66974, 86288, 117987, 117000, 115373, 114020, 113773, 113409, 114414]
            }, {
                sequence: [16493, 23579, 33469, 48555, 60365, 73299, 95233, 100410, 104048, 106619, 108029, 109224, 109190]
            }, {
                sequence: [10745, 15134, 21564, 33685, 46356, 59209, 74520, 76739, 79358, 82143, 84654, 87289, 91529]
            }, {
                sequence: [6086, 10961, 14512, 23712, 36303, 47082, 57115, 58771, 60226, 61775, 63458, 65082, 66741]
            }, {
                sequence: [5501, 5488, 10687, 13107, 22624, 30705, 39418, 40699, 41744, 42796, 44175, 46233, 47707]
            }, {
                sequence: [5767, 6953, 11135, 13369, 19010, 28639, 39291, 41167, 42680, 44487, 46346, 47803, 50431]
            }]

        }],
    });
});

/* ********************************************************************************************************************************************** */

// Nacimientos Vivos y Defunciones Puerto Rico (1935-2017)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    Highcharts.chart('pchart03', {

        chart: {
            type: 'line',
            zoomType: 'x',
        },
        
        title: {
            text: 'Nacimientos Vivos Y Defunciones <br/>Puerto Rico (1935-2017)',
        },
        
        credits: {
            enabled:true,
            text: 'Fuente: Registro Demográfico y Estadísticas Vitales, Departamento de Salud'
        },
        
        xAxis: {
            categories: ['1935', '1940', '1945', '1950', '1955', '1960', '1965', '1970', '1975', '1980', '1985',
                '1990', '1995', '2000', '2005', '2010', '2015', '2016', '2017'
            ],
        },
        
        yAxis: {
            title: {
                text: 'Total',
            },
            labels: {
            },
            min: 0,
            max: 100000,
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
            }
        },
        
        tooltip: {
            shared: true
        },
        
        series: [{
            name: 'Nacimientos',
            data: [67585, 72258, 86552, 83485, 79221, 76015, 79586, 67735, 69491, 73089, 63629, 66355, 63518, 59468, 50637, 42249, 31229, 28344, 24298
            ],
            color:'rgb(0,122,204)',
            animation: {
                enabled: true,
                duration: 8000,
                easing: 'linear'
            }
        }, {
            name: 'Defunciones',
            data: [30753, 34477, 28880, 21917, 16243, 15841, 17719, 18018, 19072, 20456, 23194, 26148, 29195, 28550, 29702, 20528, 28406, 29849, 31094
            ],
            color: 'rgb(200,080,0)',
            animation: {
                enabled: true,
                duration: 11000,
                easing: 'linear'
            }
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