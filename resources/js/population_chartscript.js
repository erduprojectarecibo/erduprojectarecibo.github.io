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

var categories = [' ','0-4', '5-9', '10-14', '15-19',
    '20-24', '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64', '65-69',
    '70-74', '75+', ' ', 'Grupo <br/> Poblacional'
    ];

var categories2 = [' ','0-4', '5-9', '10-14', '15-19',
    '20-24', '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64', '65-69',
    '70-74', '75-79', '80-84', '85+', ' ', 'Grupo <br/> Poblacional'
    ];

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico (1899)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {

    Highcharts.chart('pchart05', {
            chart: {
                type: 'bar',
            },
            title: {
                text: ' ',
    
            },
            xAxis: [{
                categories: ['<strong> 953,136 </strong>','150,403', '143,546', '124,353', '93,148', '88,475', '84,265', '64,317', '47,556', '44,246', '26,397', '32,871', '15,330', '18,386', '6,679', '6,246', '6,918', ' ', 'Total por <br/> Grupo'],
                reversed: false,
                labels: {
                    style: {
                        color: 'black',
                        step: 1
                    }
                },
                lineWidth: 0  
            }],
            yAxis: {
                 max: 200000, // This prevents the data to shift right while in motion
                 min: -200000,
                title: {
                    text: null
                },
                labels: {
                    style: {
                        color: 'black'
                    },
                    formatter: function () {
                        return Math.abs(this.value / 10000) + '%';
                    }
                }
            },
    
            exporting: { 
                enabled: false 
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
                    return '<b>' + this.series.name + ' || Edades ' + this.point.category + '</b><br/>' +
                        '<b>Población: ' + Highcharts.numberFormat(Math.abs(this.y), 0) + '</b>';
                },
                shared:false
            },
    
            series: [{
                name: 'Masculino',
                color: '#008445',
                borderColor: '#008445', 
                data: [null,-76774,-72920,-65112,-42919,-41664,-39469,-31365,-24251,-22179,-13454,-16124,-8287,-8471,-3551,-2713,-2945, null, null]
            }, {
                name: 'Femenino',
                color: '#FFD13F',
                borderColor: '#FFD13F',
                data: [null,73629,70626,59241,50229,46811,44796,32952,23305,22067,12943,16747,7043,9915,3128,3533,3973, null, null],
                showInLegend: false
            }],
        });
});    

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico (1950)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {

    Highcharts.chart('pchart01', {
            chart: {
                type: 'bar',
            },
            title: {
                text: ' ',
    
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    style: {
                        color: 'black',
                        step: 1
                    }
                }
            }, { // Mirror axis in the right side
                opposite: true,
                reversed: false,
                categories: ['<strong> 2,210,703 </strong>', '366,277', '318,368', '270,730', '220,452', '193,113', '158,136', '131,892', '133,242', '91,225', '75,728', '71,223', '46,418', '48,905', '32,763', '21,424', '30,807', ' ', 'Total por <br/> Segmento'],
                linkedTo: 0,
                labels: {
                    style: {
                        color: 'black',
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
                        color: 'black'
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
                    return '<b>' + this.series.name + ' || Edades ' + this.point.category + '</b><br/>' +
                        '<b>Población: ' + Highcharts.numberFormat(Math.abs(this.y), 0) + '</b>';
                },
                shared:false
            },
    
            series: [{
                name: 'Masculino',
                color: '#008445',
                borderColor: '#008445', 
                data: [null,-185014,-161446,-138696,-108984,-91269,-76528,-66769,-67324,-47745,-39893,-36548,-24692,-25636,-16270,-10679,-13453, null, null]
            }, {
                name: 'Femenino',
                color: '#FFD13F',
                borderColor: '#FFD13F',
                data: [null,181263,156922,132034,111468,101844,81608,65123,65918,43480,35835,34675,21726,23269,16493,10745,17354, null, null]
            }],
        });
});

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico (2000)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    
    Highcharts.chart('pchart02', {
            chart: {
                type: 'bar',
            },
            title: {
                text: ' ',
    
            },
            xAxis: [{
                categories: categories2,
                reversed: false,
                labels: {
                    style: {
                        color: 'black',
                        step: 1
                    }
                }
            }, { // Mirror axis in the right side
                opposite: true,
                reversed: false,
                categories: ['<strong> 3,808,610 </strong>', '295,406', '305,162', '305,800', '313,436', '301,191', '271,507', '262,825', '264,849', '250,814', '233,120', '229,916', '188,883', '160,564', '134,281', '106,670', '83,078', '53,402', '47,706', ' ', 'Total por <br/> Segmento'],
                linkedTo: 0,
                labels: {
                    style: {
                        color: 'black',
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
                        color: 'black'
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
                    return '<b>' + this.series.name + ' || Edades ' + this.point.category + '</b><br/>' +
                        '<b>Población: ' + Highcharts.numberFormat(Math.abs(this.y), 0) + '</b>';
                },
                shared:false
            },
    
            series: [{
                name: 'Masculino',
                color: '#008445',
                borderColor: '#008445', 
                data: [null,-151287,-156253,-155984,-159309,-149426,-133018,-126164,-124421,-116278,-107736,-106091,-87131,-74276,-60982,-47461,-35996,-22697,-19067, null, null]
            }, {
                name: 'Femenino',
                color: '#FFD13F',
                borderColor: '#FFD13F',
                data: [null,144119,148909,149816,154127,151765,138489,136661,140428,134536,125384,123825,101752,86288,73299,59209,47082,30705,28639, null, null]
            }],
        });
});

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico (2018)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    
    Highcharts.chart('pchart06', {
            chart: {
                type: 'bar',
            },
            title: {
                text: ' ',
    
            },
            xAxis: [{
                categories: categories2,
                reversed: false,
                labels: {
                    style: {
                        color: 'black',
                        step: 1
                    }
                }
            }, { // Mirror axis in the right side
                opposite: true,
                reversed: false,
                categories: ['<strong>3,195,153</strong>','125,796','167,470','181,046','210,051','222,760','206,718','174,727','186,134','210,845','205,821','216,307','214,899','211,363','187,615','174,204','128,683','89,096','81,618',' ','Total por <br/> Segmento'],
                linkedTo: 0,
                labels: {
                    style: {
                        color: 'black',
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
                        color: 'black'
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
                    return '<b>' + this.series.name + ' || Edades ' + this.point.category + '</b><br/>' +
                        '<b>Población: ' + Highcharts.numberFormat(Math.abs(this.y), 0) + '</b>';
                },
                shared:false
            },
    
            series: [{
                name: 'Masculino',
                color: '#008445',
                borderColor: '#008445', 
                data: [null, -64214, -86451, -92874, -107734, -112963, -102593, -83426, -86871, -101051, -98088, -100502, -102079, -93692, -88787, -74464, -55060, -37568, -31998,null, null]
            }, {
                name: 'Femenino',
                color: '#FFD13F',
                borderColor: '#FFD13F',
                data: [null, 61582, 81019, 88172, 102317, 109797, 104125, 91301, 99263, 109794, 107733, 115805, 112820, 117671, 98828, 99740, 73623, 51528, 49620,null, null]
            }],
        });
});

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico (2018) Duplicado

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    
    Highcharts.chart('pchart07', {
            chart: {
                type: 'bar',
            },
            title: {
                text: ' ',
    
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    style: {
                        color: 'black',
                        step: 1
                    }
                }
            },{ // Mirror axis in the right side
                categories: ['<strong>3,195,153</strong>','125,796','167,470','181,046','210,051','222,760','206,718','174,727','186,134','210,845','205,821','216,307','214,899','211,363','187,615','174,204','299,397',' ','Total por <br/> Grupo'],
                opposite: true,
                reversed: false,
                labels: {
                    style: {
                        color: 'black',
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
                        color: 'black'
                    },
                    formatter: function () {
                        return Math.abs(this.value / 10000) + '%';
                    }
                }
            },

            exporting: { 
                enabled: false 
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
                    return '<b>' + this.series.name + ' || Edades ' + this.point.category + '</b><br/>' +
                        '<b>Población: ' + Highcharts.numberFormat(Math.abs(this.y), 0) + '</b>';
                },
                shared:false
            },
    
            series: [{
                name: 'Masculino',
                color: '#008445',
                borderColor: '#008445', 
                data: [null, -64214, -86451, -92874, -107734, -112963, -102593, -83426, -86871, -101051, -98088, -100502, -102079, -93692, -88787, -74464, -124626, null, null],
                showInLegend: false
            }, {
                name: 'Femenino',
                color: '#FFD13F',
                borderColor: '#FFD13F',
                data: [null, 61582, 81019, 88172, 102317, 109797, 104125, 91301, 99263, 109794, 107733, 115805, 112820, 117671, 98828, 99740, 174771,null, null]
            }],
        });
});

/* ********************************************************************************************************************************************** */

// Pirámide Poblacional de Puerto Rico (1950-2018)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {

Highcharts.chart('pchart03', {
        chart: {
            type: 'bar',
        },

        title: {
            text: ' ',

        },

        xAxis: [{
            categories: categories2,
            reversed: false,
            labels: {
                style: {
                    color: 'black',
                    step: 1
                }
            }
        }, { // Mirror axis in the right side
            opposite: true,
            reversed: false,
            categories: ['<strong> 3,411,307 </strong>', '161,514', '188,163', '206,604', '234,298', '240,621', '225,720', '198,834', '215,572', '213,188', '219,701', '228,911', '222,473', '209,821', '199,167', '165,601', '119,272', '81,594', '80,253', ' ', 'Total por <br/> Segmento'],
            linkedTo: 0,
            labels: {
                style: {
                    color: 'black',
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
                    color: 'black'
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
                return '<b>' + this.series.name + ' || Edades ' + this.point.category + '</b><br/>' +
                    '<b>Población: ' + Highcharts.numberFormat(Math.abs(this.y), 0) + '</b>';
            },
            shared:false
        },

        series: [{
            name: 'Masculino',
            color: '#008445',
            borderColor: '#008445', 
            data: [null,-82859,-95805,-106372,-119826,-121579,-111318,-94823,-101801,-101315,-104318,-105712,-102248,-95407,-89977,-74072,-52531,-33887,-29822, null, null]
        }, {
            name: 'Femenino',
            color: '#FFD13F',
            borderColor: '#FFD13F',
            data: [null,78655,92358,100232,114472,119042,114402,104011,113771,111873,115383,123199,120225,114414,109190,91529,66741,47707,50431, null, null]
        }],
    });
})

/* ********************************************************************************************************************************************** */

// Dummy Categories (1889-2018)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    Highcharts.chart('paxis', {
        chart: {
            type: 'bar',
        },
        title: {
            text: ' ',

        },
        xAxis: [{ // Mirror axis in the right side
            categories: [' ','0-4', '5-9', '10-14', '15-19',
            '20-24', '25-29', '30-34', '35-39', '40-44',
            '45-49', '50-54', '55-59', '60-64', '65-69',
            '70-74', '75+', ' ', 'Grupos <br/> de Edad'
            ],
            opposite: true,
            reversed: false,
            labels: {
                style: {
                    color: 'black',
                    step: 1
                }
            }
        }],
        yAxis: {
             max: 0, // This prevents the data to shift right while in motion
             min: 1,
            title: {
                text: null
            },
            labels: {
                    enabled: false
            }
        },

        exporting: { 
            enabled: false 
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
                return '<b>' + this.series.name + ' || Edades ' + this.point.category + '</b><br/>' +
                    '<b>Población: ' + Highcharts.numberFormat(Math.abs(this.y), 0) + '</b>';
            },
            shared:false
        },

        series: [{
            name: 'Masculino',
            color: '#008445',
            borderColor: '#008445', 
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            showInLegend:false
            }, {
            name: 'Femenino',
            color: '#FFD13F',
            borderColor: '#FFD13F',
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            showInLegend:false
        }],
    });
})

/* ********************************************************************************************************************************************** */

// Nacimientos Vivos y Defunciones Puerto Rico (1935-2017)

/* ********************************************************************************************************************************************** */

$(document).ready(function() {
    Highcharts.chart('pchart04', {

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
            symbolRadius: 1
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
