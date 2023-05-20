import React from 'react';
import wineData from './wineData2.json';
import './WineStats.css';

const WineStats2 = () => {
  const calculateGamma = (data) => {
    return data.map(item => ({
      ...item,
      Gamma: (item.Ash * item.Hue) / item.Magnesium
    }));
  };

  const calculateMean = (data, className) => {
    const classData = data.filter(item => item.Alcohol === className);
    const total = classData.reduce((sum, item) => sum + item.Gamma, 0);
    return total / classData.length;
  };

  const calculateMedian = (data, className) => {
    const classData = data.filter(item => item.Alcohol === className);
    const sortedData = classData.map(item => item.Gamma).sort((a, b) => a - b);
    const mid = Math.floor(sortedData.length / 2);
    return sortedData.length % 2 === 0 ? (sortedData[mid - 1] + sortedData[mid]) / 2 : sortedData[mid];
  };

  const calculateMode = (data, className) => {
    const classData = data.filter(item => item.Alcohol === className);
    const counts = {};
    let mode = [];
    let maxCount = 0;

    classData.forEach(item => {
      counts[item.Gamma] = (counts[item.Gamma] || 0) + 1;
      if (counts[item.Gamma] > maxCount) {
        maxCount = counts[item.Gamma];
        mode = [item.Gamma];
      } else if (counts[item.Gamma] === maxCount) {
        mode.push(item.Gamma);
      }
    });

    return mode;
  };

  const classNames = Array.from(new Set(wineData.map(item => item.Alcohol)));
  const dataWithGamma = calculateGamma(wineData);

  return (
    <div className="wine-stats-container">
      <table className="wine-stats-table">
        <thead>
          <tr>
            <th>Measure</th>
            {classNames.map(className => <th key={className}>Class {className}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            {classNames.map(className => (
              <td key={className}>{calculateMean(dataWithGamma, className).toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {classNames.map(className => (
              <td key={className}>{calculateMedian(dataWithGamma, className).toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {classNames.map(className => (
              <td key={className}>{calculateMode(dataWithGamma, className).join(', ')}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WineStats2;
