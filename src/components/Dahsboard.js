import React, { Suspense  } from "react";
import { Chart, CategoryScale, LinearScale, BarElement, Title,ArcElement ,PointElement,LineElement,Tooltip} from 'chart.js';
import CustomCard from "./hoc/card";
import useEvData from './customhooks/evhooks'
import { Card, Col, Row } from "reactstrap";
import { Bar,Line,Pie } from "react-chartjs-2";
const GeoDistribution =  React.lazy(() => import('./geographicalDistribution'));
Chart.register(CategoryScale, LinearScale, BarElement, Title,ArcElement,PointElement,LineElement,Tooltip);

const Dashboard = () => {
   const {data,avgElectricRange,mostCommonMake,percentageEligible,topCounty,vehicleType,vechicleRange,vehicleByManufacturer,numberOfVehicleModelsByYear,topVehicleTypeByCity,vehiclePercentage,vechileByRange,getTopModelsByCity,getMinModelByCity,getTopElectricUtilty,getHighestAndLowestMSRP} = useEvData();
   console.log('data',getHighestAndLowestMSRP);

    //function to genrate random color
    const generateRandomColor = () => {
        const randomColor = () => Math.floor(Math.random() * 256);
        return `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.5)`;
    };

    const createChartOptions = (xLabel, yLabel) => ({
        scales: {
            x: {
                title: {
                    display: true,
                    text: xLabel,
                    font: { size: 16, weight: 'bold' },
                },
            },
            y: {
                title: {
                    display: true,
                    text: yLabel,
                    font: { size: 16, weight: 'bold' },
                },
            },
        },
    });

   //Top 10 county
   const barChartDataForTopCounty = {
        labels: topCounty.map(item => item.county),
        datasets: [{
            label: 'No. of Vehicle',
            minBarLength: 10,
            data: topCounty.map(item => item.count),
            backgroundColor: topCounty.map(()=>generateRandomColor()),
        }],
    };
   //Ev Count by BASE msrp
   const barChartDataForBaseMsrp = {
    labels: getHighestAndLowestMSRP.map(item => item.price),
    datasets: [{
        label: 'Count',
        minBarLength: 10,
        data: getHighestAndLowestMSRP.map(item => item.count),
        backgroundColor: getHighestAndLowestMSRP.map(()=>generateRandomColor()),
    }],
};
  
    //Top 10 city by vehicle count
    const barChartDataForTopCity = {
        labels: topVehicleTypeByCity.map(item => item.city),
        datasets: [{
            label: 'No. of Vehicle',
            minBarLength: 10,
            data: topVehicleTypeByCity.map(item => item.count),
            backgroundColor: topVehicleTypeByCity.map(()=>generateRandomColor()),
        }],
    };

       //Top 10 city by vehicle model by city
       const barChartDataForTopModel = {
        labels: getTopModelsByCity.map(item => item.city),
        datasets: [{
            label: 'No. of Vehicle',
            minBarLength: 10,
            data: getTopModelsByCity.map(item => item.count),
            backgroundColor: getTopModelsByCity.map(()=>generateRandomColor()),
        }],
    };

       //Top 10 lowest vehicle model by city 
       const barChartDataForMinModel = {
        labels: getTopElectricUtilty.map(item => item.util),
        datasets: [{
            label: 'Count',
            // minBarLength: 10,
            data: getTopElectricUtilty.map(item => item.count),
            backgroundColor: getMinModelByCity.map(()=>generateRandomColor()),
        }]
    };
    //Vechicle Type
    const barChartDataForVechicleType = {
        labels: vehicleType.map(item => item.type),
        datasets: [{
            label: 'No. of Vehicle',
            data: vehicleType.map(item => item.count),
            backgroundColor: vehicleType.map(()=>generateRandomColor()),
        }],
    };
    

    //Electric Range
    const vechilceElectricRange = {
        labels: vechicleRange.map(val=>val.range),
        datasets: [{
            type: 'line',
            label: 'No. of Vehicle',
            data: vechicleRange.map(item=>item.count),
            borderColor: 'rgb(54, 162, 235)'
          }],
          
    }
   

    //Top 10 Vechile by Manufacturer
    const topVechileByManufacturer = {
        labels: vehicleByManufacturer.map(item => item.type),
        datasets: [{
            label: 'No. of Vehicle',
            data: vehicleByManufacturer.map(item => item.count),
            backgroundColor: vehicleByManufacturer.map(()=>generateRandomColor())
        }],
    };
    
    //Vehicle Manufactured by years
    const vehicleManufaturedByears = {
        labels: numberOfVehicleModelsByYear.map(item => item.year),
        datasets: [{
            label: 'No. of Vehicle',
            data: numberOfVehicleModelsByYear.map(item=>item.count),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
    };
    //Top 10 vehicle data
    const vehicleDataPie = {
        labels: vehiclePercentage.map(item => item.make),
        datasets: [{
            label: 'Percentage of Vehicle',
            data: vehiclePercentage.map(item=>item.count),
            hoverOffset: 4,
            backgroundColor: vehiclePercentage.map(()=>generateRandomColor())
          }]
    };

       //Top 10 vehicle model by data
       const vehicleRangeDataPie = {
        labels: vechileByRange.map(item => item.city),
        datasets: [{
            label: 'No. of Vehicle',
            data: vechileByRange.map(item=>item.count),
            hoverOffset: 4,
            backgroundColor: vechileByRange.map(()=>generateRandomColor())
          }]
    };
   



    return (
        <div>
            <h1>Electric Vehicle Dashboard</h1>
            <hr/>
            <Row className="card_row">
                <CustomCard title={'Total Vehicle'} data={data.length}/>
                <CustomCard title={'Average Electric Range'} data = {`${avgElectricRange} miles`}/>
                <CustomCard title={'Most Common Make'} data={mostCommonMake}/>
                <CustomCard title ={'CAFV Eligible'} data={`${percentageEligible} %`}/>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <Card>
                        <h4 className="mt-3">Top 10 Counties by Number of Electric Vehicle</h4>
                         <Bar data={barChartDataForTopCounty} options={createChartOptions('county','No. of Vehicles')} />
                    </Card>
                </Col>
                
                <Col>
                    <Card>
                        <h4 className="mt-3">Top 10 Manufacturer by Number of Electric Vehicle</h4>
                        <Bar data={topVechileByManufacturer} options={createChartOptions('Manufacturer','No. of Vehicles')} /> 
                    </Card>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <Card>
                        <h4 className="mt-3">Top 10 City by Number of Electric Vehicle</h4>
                        <Bar data={barChartDataForTopCity} options={createChartOptions('City','No. of Vehicles')} />
                    </Card>
                </Col>
               
                <Col>
                    <Card>
                        <h4 className="mt-3">Vehicle Type Distribution</h4>
                         <Bar data={barChartDataForVechicleType} options={createChartOptions('Vehicle Type','No. of Vehicles')} />
                    </Card>
                </Col>
            </Row>
            <hr/>
            <Row>
                 <Col>
                    <Card>
                        <h4 className="mt-3">Electric Vehicle Range Distribution</h4>
                        <Bar data={vechilceElectricRange} options={createChartOptions('Frequency','Electric Range (Miles)')} />
                    </Card>
                </Col>
                <Col>
                    <Card>
                         <h4 className="mt-3">Vehicle Manufatured In Year's</h4>
                         <Line data={vehicleManufaturedByears} options={createChartOptions('Years','No. of Vehicles')} />    
                    </Card>
                </Col>

            </Row>
            <hr/>
            <Row>
                <Col>
                    <Card>
                        <h4 className="mt-3">Top 10 Electric Vehicle by Percentage </h4>
                        <div className="chart-container">
                        <Pie data={vehicleDataPie} options={createChartOptions('Vehicle','Percentage of Vehicle')}/>
                        </div>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <h4 className="mt-3">Cities by Electric Range upto range 20 </h4>
                        <div className="chart-container">
                            <Pie data={vehicleRangeDataPie} options={createChartOptions('Vehicle', 'Percentage of Vehicle')} />
                        </div>
                    </Card>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <Card>
                        <h4 className="mt-3">Top 10 Highest Maximum Tesla City</h4>
                        <div>
                            <Bar data={barChartDataForTopModel} options={createChartOptions('Model','No. of Vehicle')}/>
                        </div>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <h4 className="mt-3">Top 10 Electric Utility Distribution</h4>
                        <div className="chart-container">
                            <Pie data={barChartDataForMinModel} options={createChartOptions('Count','No. of Vehicle')}/>
                        </div>
                    </Card>
                </Col>
            </Row>
            <hr/>
            <Row>
            <Col>
                     <Card>
                        <h4 className="mt-3">Base MSRP Maximum and Minimum Distribution</h4>
                        <Bar data={barChartDataForBaseMsrp} options={createChartOptions('Base MSRP','Count')}/>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <h4 className="mt-3">Electric Vehicle Location</h4>
                        <Suspense fallback={<div>Loading map...</div>}>
                            <GeoDistribution />
                        </Suspense>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
