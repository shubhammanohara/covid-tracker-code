import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import moment from "moment"



const Graph = (props) => {
    const [data, setData] = useState([]);

    const createGraphData = (data) => {
        const dataArray = [];
        let prevValueCases = 0;
        let prevValueDeaths = 0;
        data.forEach((data) => {
            let newData = {
                date: data.date,
                cases: data.cases,
                newCases: data.cases - prevValueCases,
                deaths: data.deaths,
                newDeaths: data.deaths - prevValueDeaths
            };
            dataArray.push(newData)
            prevValueCases = data.cases;
            prevValueDeaths = data.deaths;
        }

        )
        return dataArray
    }

    useEffect(() => {
        const getGraphdata = async () => {
            await fetch(`https://api.covid19api.com/total/dayone/country/india`)
                .then(response => response.json())
                .then((data) => {

                    const rawData = data.map(data => (
                        {
                            date: moment(data.Date).format("DD-MM-YYYY"),
                            cases: data.Confirmed,
                            deaths: data.Deaths
                        }
                    )

                    )

                    const graphData = createGraphData(rawData)

                    setData(graphData)
                })
        }
        getGraphdata();
    }, [])

    const sampleData = {
        labels: data.map(date => date.date),
        datasets: [
            {
                label: "total cases",
                data: data.map(date => date.newCases),
                borderColor: "rgba(255, 205, 0, 1)",
                radius: 0
            },
            {
                label: "total Deaths",
                data: data.map(date => date.newDeaths),
                borderColor: "red",
                radius: 0
            }
        ]
    }

    var options = {
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                }
            }],
            yAxes: [{
                gridLines: {
                    drawOnChartArea: false
                }
            }]
        }
    }

    return (
        <div className="chart">
            <Line
                options={options}
                data={sampleData}
            />
        </div>
    )
}

export default Graph
