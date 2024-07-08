import { React, useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-query'
import { TokenContext } from '../../App';
import ReactApexChart from 'react-apexcharts'
import { historyRequest } from '../../api/graphing'
import moment from 'moment';
import { useCookies } from 'react-cookie'

function separateByKeys(arr) {
    let result = {};
    arr.forEach(obj => {
        Object.keys(obj).forEach(key => {
            if (!result[key]) {
                result[key] = [];
            }
            // Check if the value is an object and has a 'cal' key
            if (typeof obj[key] === 'object' && obj[key] !== null && 'cal' in obj[key]) {
                result[key].push(obj[key]['cal']);
            } else {
                result[key].push(obj[key]);
            }
        });
    });
    for (let i = 0; i < result.date.length; i++) {
        result.date[i] = moment(result.date[i]).utc().format('MM/DD/YY')
    }
    return result;
}

export default function Graph() {

    const [cookies, setCookie] = useCookies(['dark'])
    const [token] = useContext(TokenContext)
    const [result, setResult] = useState(null)

    const { isLoading, data: historyQuery } = useQuery(
        'history',
        () => historyRequest(moment().format('YYYY-MM-DD'), token)
    );


    useEffect(() => {
        if (historyQuery != null && historyQuery.length > 0) {
            setResult(separateByKeys(historyQuery))
        }
    }, [historyQuery])

    let series, options

    if (result != null) {
        //Bounds for normalising weight - needs more fine tuning
        //Also weight line tweaks out every reload.
        let avg = result.morning_weight.filter(num => num !== null).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / result.morning_weight.filter(num => num !== null).length
        let labelColor = cookies.dark ? '#f3f4f6' : '#88827e'
        series = [

            {
                name: "Calorie Goal",
                data: result?.calorie_goal
            },
            {
                name: "Calories Consumed",
                data: result?.totals
            },
            {
                name: "Morning Weight",
                data: result?.morning_weight
            }
        ]

        options = {
            chart: {
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            stroke: {
                curve: 'straight',
            },
            xaxis: {
                categories: result?.date,
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '12px',
                    }
                },
            },
            yaxis: [
                {
                    min: 0,
                    max: 4400,
                    seriesName: 'Calorie Goal',
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#00E396'
                    },
                    labels: {
                        style: {
                            colors: '#00E396',
                        }
                    },
                    title: {
                        text: "Calories Consumed",
                        style: {
                            color: '#00E396',
                        }
                    },
                },
                {
                    min: 0,
                    max: 4400,
                    seriesName: 'Calorie Goal', // Follow the scale of Calories Consumed

                    labels: {
                        show: false,
                    },
                    title: {
                        text: "Calorie Goal",
                        style: {
                            color: '#008FFB',
                        }
                    },
                },
                {
                    //min: Math.min(...result?.morning_weight.filter(item => item !== null)) - 5,
                    //max: Math.max(...result?.morning_weight) + 5,
                    min:avg-5,
                    max:avg+5,
                    seriesName: 'Weight',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#FEB019'
                    },
                    labels: {
                        style: {
                            colors: '#FEB019',
                        },
                    },
                    title: {
                        text: "Weight",
                        style: {
                            color: '#FEB019',
                        }
                    }
                },
            ],
            legend: {
                labels: {
                    colors: labelColor,
                    //useSeriesColors: true
                }
            },
            tooltip: {
                enabled: false,
            }
        }
    }

    return (
<>
       {result ? (<ReactApexChart options={options} series={series} type="line" className="max-w-full lg:px-2" />): 'Start logging to see more graphs!'}
</>
    )
}