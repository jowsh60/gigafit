import React from 'react'
import Chart from 'react-apexcharts'

export default function Graph(){
    return(
        <Chart
        type="line"
        series={[
            {
                name:"Company",
                data:[100,200,300,400,500,600]
            },
            {
                name:"Company2",
                data:[120,250,120,420,590,600]
            },
            {
                name:"Company3",
                data:[10,109,500,300,545,700]
            }
        ]}
        options={{
            chart:{
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                labels: {
                    style: {
                        colors: "#f3f4f6",
                        fontSize: '12px',
                    }
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#f3f4f6',
                        fontSize: '12px',
                    },
                },
            },
            legend:{
                labels: {
                    colors: '#f3f4f6',
                    //useSeriesColors: true
                }
            },
            tooltip:{
                enabled: false,
            }
        }}
        />
    )
}