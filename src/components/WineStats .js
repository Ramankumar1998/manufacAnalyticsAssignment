import React from 'react';
import wineData from './wineData.json';
import './WineStats.css';



const WineStats = () => {
  const calculateMean = (data, className) => {
    const classData = data.filter(item => item.Alcohol === className);
    const total = classData.reduce((sum, item) => sum + item.Flavanoids, 0);
    return total / classData.length;
  };

  const calculateMedian = (data, className) => {
    const classData = data.filter(item => item.Alcohol === className);
    const sortedData = classData.map(item => item.Flavanoids).sort((a, b) => a - b);
    const mid = Math.floor(sortedData.length / 2);
    return sortedData.length % 2 === 0 ? (sortedData[mid - 1] + sortedData[mid]) / 2 : sortedData[mid];
  };

  const calculateMode = (data, className) => {
    const classData = data.filter(item => item.Alcohol === className);
    const counts = {};
    let mode = [];
    let maxCount = 0;

    classData.forEach(item => {
      counts[item.Flavanoids] = (counts[item.Flavanoids] || 0) + 1;
      if (counts[item.Flavanoids] > maxCount) {
        maxCount = counts[item.Flavanoids];
        mode = [item.Flavanoids];
      } else if (counts[item.Flavanoids] === maxCount) {
        mode.push(item.Flavanoids);
      }
    });

    return mode;
  };

  const classNames = Array.from(new Set(wineData.map(item => item.Alcohol)));

  return (
    <table className="wine-stats-table">
      <thead>
        <tr>
          <th>Measure</th>
          {classNames.map(className => <th key={className}> Class {className}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flavanoids Mean</td>
          {classNames.map(className => (
            <td key={className}>{calculateMean(wineData, className).toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {classNames.map(className => (
            <td key={className}>{calculateMedian(wineData, className).toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {classNames.map(className => (
            <td key={className}>{calculateMode(wineData, className).join(', ')}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default WineStats;
