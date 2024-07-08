import { React, useEffect, useContext } from 'react'
import { useQuery } from 'react-query'
import { TokenContext } from '../../App';
import { macroRequest } from '../../api/graphing'
import ReactApexChart from 'react-apexcharts'
import moment from 'moment';
import { useCookies } from 'react-cookie'


export default function Macros(){

  const [cookies, setCookie] = useCookies(['dark'])
  const [token] = useContext(TokenContext)

  const { isLoading, data: macroQuery, remove, refetch } = useQuery(
      'macro',
      () => macroRequest(moment().format('YYYY-MM-DD'), token),
      {
        enabled: false, // Disable initial query execution
    }
  );

  useEffect(() => {
    remove()
    refetch()
}, []);

let percentages
let goals
let progress
if(macroQuery && macroQuery.goals != null){
  goals = [macroQuery?.goals.cal || 0, macroQuery?.goals.c || 0, macroQuery?.goals.f || 0, macroQuery?.goals.p || 0]
  progress = [macroQuery?.progress.cal,macroQuery?.progress.c,macroQuery?.progress.f,macroQuery?.progress.p]
  //const percentages = series.map(value => Math.round((value / series.reduce((a, b) => a + b, 0)) * 100)); //Array of series' respective percentages
  percentages = [
    Math.min(progress[0] / goals[0] * 100, 100), 
    Math.min(progress[1] / goals[1] * 100, 100), 
    Math.min(progress[2] / goals[2] * 100, 100), 
    Math.min(progress[3] / goals[3] * 100, 100)
  ]
}
    

    let colors = cookies.dark ? ['#1ab7ea', '#0084ff', '#39539E', '#1488c4'] : ['#641110', '#e06c5a', '#d6841f', '#f0cc60']
    let track = cookies.dark ? '#e0e0f0' : '#ecece7'
    //const percentages = [100, 80, 70, 90]
    const options = {
        chart: {
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetX: 15,
            offsetY: -10,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: false,//true to show percentage
              },
              style: {
                fontSize:'24px'
              },
            },
            track:{
              background:track,
            },
            barLabels: {
              enabled: true,
              useSeriesColors: true,
              margin: 8,
              fontSize: '16px',
              formatter: function(seriesName, opts) {
                return seriesName + ":  " + progress[opts.seriesIndex] + " / " + goals[opts.seriesIndex]
              },
            },
          }
        },
        colors: colors,
        labels: ['Calories', 'Carbs', 'Fats', 'Protein'],
        responsive: [{
          breakpoint: undefined,
          options: {
            legend: {
                show: false
            }
          }
        }]
      }
    


    return(
      <>
      {macroQuery?.goals != null ? (
        <ReactApexChart options={options} series={percentages} type="radialBar" className="max-w-full lg:px-8" />
      ): <div className="font-thin m-4">Set up your macro goals in your Account page to view daily macro progress!</div>}
        
      </>

    )
}