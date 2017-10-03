import fetch from 'isomorphic-fetch';

const getNewChartSeries = (
    seriesName,
    newPrice,
    series,
    maxData = 10,
) => {
    let price;

    return [...series].map((serie) => {
        if (serie.name === seriesName) {
            price = newPrice;
        } else{
            price = serie.data.length ?
                serie.data[serie.data.length - 1][1] : 0;
        }

        const today = new Date();
        const utc = Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds(),
            today.getMilliseconds(),
        );

        serie.data.push([utc, price]);
        serie.data = serie.data.slice(-maxData);

        return serie;
    });
};

const getNewChartConfig = () => {
    return {
        chart: {
            type: 'spline',
        },
        title: {
            text: '',
        },
        xAxis: {
            type: 'datetime',
            labels: {
                rotation: 270,
            },
        },
        tooltip: {
            valuePrefix: '$',
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5,
                    },
                },
                marker: {
                    enabled: false,
                },
            },
            series: {
                animation: false,
            },
        },
        yAxis: {
            tickInterval: 1000,
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
        },
        series: [
            {
                name: 'BTC to USD',
                data: [],
            }, {
                name: 'BTC to EUR',
                data: [],
            }, {
                name: 'ETH to USD',
                data: [],
            }, {
                name: 'ETH to EUR',
                data: [],
            }, {
                name: 'ETH to BTC',
                data: [],
            },
        ],
        credits: {
            enabled: false,
        },
    };
};

const fetchCryptoCurrencies = (from, to) => {
    return fetch(`/api/cryptocurrencies?from=${from.join(',')}&to=${to.join(',')}`)
        .then((response) => response.json());
};

export {
    getNewChartSeries,
    getNewChartConfig,
    fetchCryptoCurrencies,
};
