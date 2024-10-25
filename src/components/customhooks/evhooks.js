import { useState } from 'react';
import ev_Data from '../staticData/ev_vechicle_data.json';
const useEvData = ()=>{
    const [data,setData] = useState(ev_Data);

    const avgElectricRange = () => {
        if (data.length === 0) return 0;
        const totalRange = data.reduce((acc, item) => acc + item["Electric Range"], 0);
        return (totalRange / data.length).toFixed(2);
    };

    const getMostCommonMake = () => {
        const makeCount = data.reduce((acc, item) => {
            acc[item.Make] = (acc[item.Make] || 0) + 1;
            return acc;
        }, {});

        const mostCommon = Object.entries(makeCount).reduce((prev, current) => {
            return (current[1] > prev[1]) ? current : prev;
        });

        return mostCommon ? mostCommon[0] : null; // Return the make name
    };

    const calculatePercentageEligible = () => {
        if (data.length === 0) return 0;
        const eligibleCount = data.filter(item => item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] === "Clean Alternative Fuel Vehicle Eligible").length;
        return ((eligibleCount / data.length) * 100).toFixed(2);
    };

    const getTopCountyByVehicle = () => {
        const countyCount = data.reduce((acc, item) => {
            acc[item.County] = (acc[item.County] || 0) + 1;
            return acc;
        }, {});
        const topCounty = Object.entries(countyCount).sort((a,b)=>b[1]-b[1]).slice(0,10);
        return topCounty.map(([county, count]) => ({ county, count }));
    };

    const vehicleType = () => {
        const vehType = data.reduce((acc, item) => {
            acc[item['Electric Vehicle Type']] = (acc[item['Electric Vehicle Type']] || 0) + 1;
            return acc;
        }, {});
        const finalData = Object.entries(vehType).map(([type, count]) => ({
            type,
            count
        }));

        return finalData;
    };

    const topVehicleTypeByCity = () => {
        const vehType = data.reduce((acc, item) => {
            acc[item['City']] = (acc[item['City']] || 0) + 1;
            return acc;
        }, {});
        const finalData = Object.entries(vehType).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([city, count]) => ({
            city,
            count
        }));

        return finalData;
    };

    const vechicleRangeDistibution = ()=>{
        const vehicleData = data.reduce((acc, item) => {
            // Use a numeric value for the range
            const range = parseInt(item['Electric Range'], 20);
            // Determine the interval based on the range value
            const rangeInterval = Math.floor(range / 20) * 5; // Group in intervals of 5
    
            acc[rangeInterval] = (acc[rangeInterval] || 0) + 1; // Count occurrences
            return acc;
        }, {});
        const finalData = Object.entries(vehicleData).map(([range, count]) => ({
            range,
            count
        }));
        return finalData
    }

    const topElectricVechicleByManufacturer=()=>{
        const vehicleData = data.reduce((acc,item)=>{
            acc[item['Make']] =  (acc[item['Make']] || 0) + 1;
            return acc;
        },{});
        const finalData = Object.entries(vehicleData).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([type, count]) => ({
            type,
            count
        }));
        return finalData;
        
    }

    const numberOfVehicleModelsByYear=()=>{
        const vehicleData = data.reduce((acc,item)=>{
            acc[item['Model Year']] =  (acc[item['Model Year']] || 0) + 1;
            return acc;
        },{});
        const finalData = Object.entries(vehicleData).map(([year, count]) => ({
            year,
            count
        }));
        return finalData;
        
    }

    const getVehicleGeoLocation = ()=>{
        const vehicleLocations = data.reduce((acc, item) => {
            // Extract the latitude and longitude from the "Vehicle Location" field
            const coordinates = item["Vehicle Location"].match(/POINT \((-?\d+\.\d+) (-?\d+\.\d+)\)/);
            if (coordinates) {
                const lng = parseFloat(coordinates[1]);
                const lat = parseFloat(coordinates[2]); 
                acc.push({ lat, lng, VIN: item["VIN (1-10)"], make: item.Make, model: item.Model });
            }
    
            return acc;
        }, []);
        const finalData = vehicleLocations.slice(0,100)
        return finalData;
    }

    const getVehiclePercnetage = ()=>{
        const vehicle = data.reduce((acc,item)=>{
            acc[item['Make']] =  (acc[item['Make']] || 0) + 1;
            return acc;
        },{});
        const finalData = Object.entries(vehicle).slice(0,10).map(([make, count]) => ({
            make,
            count:((count/data.length)*100)
        }));
        return finalData;
    }

    const getVehicleDataByRange = ()=>{
        const filteredData = data.filter(vehicle => vehicle['Electric Range'] <= 20);
        const citiesData = filteredData.reduce((acc, vehicle) => {
            const city = vehicle.City;
            if (!acc[city]) {
                acc[city] = 0;
            }
            acc[city] += 1; 
            return acc;
        }, {});
        const finalData = Object.entries(citiesData).map(([city,count])=>({
            city,
            count
        }))
        return finalData;
    }
    const getTopTeslaCities = (order='') => {
        const teslaCityCount = {};
        data.forEach(vehicle => {
            if (vehicle.Make === 'TESLA') {
                const city = vehicle.City;
                teslaCityCount[city] = (teslaCityCount[city] || 0) + 1;
            }
        });
        if(order){
            const sortedCities = Object.entries(teslaCityCount)
            .sort(([, countA], [, countB]) => countA - countB) 
            .slice(0, 10) // Get top 10 cities
            .map(([city, count]) => ({ city, count }));
    
            return sortedCities;

        }else{
            const sortedCities = Object.entries(teslaCityCount)
            .sort(([, countA], [, countB]) => countB - countA) 
            .slice(0, 10) // Get top 10 cities
            .map(([city, count]) => ({ city, count }));
             return sortedCities;
        }
    };

    const getTopElectricUtilty = ()=>{
        const vehicle = data.reduce((acc,item)=>{
            acc[item['Electric Utility']] =  (acc[item['Electric Utility']] || 0) + 1;
            return acc;
        },{})
        const finalData = Object.entries(vehicle).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([util,count])=>({
            util,
            count
        }))
        return finalData;
    }
    const getHighestAndLowestMSRP = () => {
        let highestMSRP = -Infinity;
        let lowestMSRP = Infinity;
        let highestCount = 0;
        let lowestCount = 0;
    
        data.forEach(vehicle => {
            const msrp = vehicle['Base MSRP'];
    
            if (msrp > highestMSRP) {
                highestMSRP = msrp;
                highestCount = 1;
            } else if (msrp === highestMSRP) {
                highestCount++;
            }
    
            if (msrp < lowestMSRP) {
                lowestMSRP = msrp;
                lowestCount = 1;
            } else if (msrp === lowestMSRP) {
                lowestCount++;
            }
        });
    
        return [
            { price: highestMSRP, count: highestCount },
            { price: lowestMSRP, count: lowestCount }
        ];
    };
    
    
    
    
        return {getHighestAndLowestMSRP:getHighestAndLowestMSRP(),getTopElectricUtilty:getTopElectricUtilty(),getMinModelByCity:getTopTeslaCities('min'),getTopModelsByCity:getTopTeslaCities(),vechileByRange:getVehicleDataByRange(),vehiclePercentage:getVehiclePercnetage(),vehicleLocationsData:getVehicleGeoLocation(),topVehicleTypeByCity:topVehicleTypeByCity(),numberOfVehicleModelsByYear:numberOfVehicleModelsByYear(),vehicleByManufacturer:topElectricVechicleByManufacturer(),vechicleRange:vechicleRangeDistibution(),vehicleType:vehicleType(),topCounty:getTopCountyByVehicle(),percentageEligible:calculatePercentageEligible(),mostCommonMake:getMostCommonMake(),avgElectricRange:avgElectricRange(),data}

};

export default useEvData;