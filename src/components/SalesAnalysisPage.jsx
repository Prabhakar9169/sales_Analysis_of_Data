import React, { useState, useEffect } from 'react';
import { fetchSalesData } from '../data/dataService'; // Import the data service

const SalesAnalysisPage = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const data = fetchSalesData();
    setSalesData(data);
  }, []);

  const calculateTotalSales = () => {
    return salesData.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const calculateMonthSales = () => {
    const monthSales = {};
    salesData.forEach(item => {
      const month = item.date.slice(0, 7);
      monthSales[month] = (monthSales[month] || 0) + item.totalPrice;
    });
    return monthSales;
  };

  const findMostPopularItems = () => {
    const monthItems = {};
    salesData.forEach(item => {
      const month = item.date.slice(0, 7);
      if (!monthItems[month]) monthItems[month] = {};
      monthItems[month][item.sku] = (monthItems[month][item.sku] || 0) + item.quantity;
    });

    const popularItems = {};
    Object.keys(monthItems).forEach(month => {
      const items = monthItems[month];
      const popularItem = Object.keys(items).reduce((a, b) => (items[a] > items[b] ? a : b));
      popularItems[month] = {
        item: popularItem,
        quantity: items[popularItem]
      };
    });

    return popularItems;
  };

  const findMostRevenueItems = () => {
    const monthRevenue = {};

    salesData.forEach(item => {
      const month = item.date.slice(0, 7);
      if (!monthRevenue[month]) monthRevenue[month] = {};
      monthRevenue[month][item.sku] = (monthRevenue[month][item.sku] || 0) + item.totalPrice;
    });

    const revenueItems = {};

    Object.keys(monthRevenue).forEach(month => {
      const items = monthRevenue[month];
      const revenueItem = Object.keys(items).reduce((a, b) => (items[a] > items[b] ? a : b));
      revenueItems[month] = {
        item: revenueItem,
        totalRevenue: items[revenueItem]
      };
    });

    return revenueItems;
  };

  const findPopularItemStats = () => {
    const stats = {};
    salesData.forEach(item => {
      const month = item.date.slice(0, 7);
      if (!stats[month]) stats[month] = {};
      if (!stats[month][item.sku]) stats[month][item.sku] = { totalOrders: 0, orders: [] };
      stats[month][item.sku].totalOrders += 1;
      stats[month][item.sku].orders.push(item.quantity);
    });

    const popularItemStats = {};
    Object.keys(stats).forEach(month => {
      const items = stats[month];
      const popularItem = Object.keys(items).reduce((a, b) => (items[a].totalOrders > items[b].totalOrders ? a : b));
      const orders = items[popularItem].orders;
      const minOrders = Math.min(...orders);
      const maxOrders = Math.max(...orders);
      const avgOrders = orders.reduce((a, b) => a + b, 0) / orders.length;
      popularItemStats[month] = { item: popularItem, minOrders, maxOrders, avgOrders };
    });

    return popularItemStats;
  };

  return (
    <div className="bg-gradient-to-r from-pink-300 to-pink-400 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-blue-950 mb-8">Sales Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Total Sales</h2>
          <p className="text-xl text-gray-800 font-bold" >Rs.{calculateTotalSales()}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Month-wise Sales</h2>
          <ul className="list-disc pl-6 text-gray-800">
            {Object.entries(calculateMonthSales()).map(([month, sales]) => (
              <li key={month} className="mb-2">
                <span className="font-semibold text-blue-600">{month}:</span> <span className='font-bold'> Rs.{sales}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Most Popular Items Each Month</h2>
          <ul className="list-disc pl-6 text-gray-800">
            {Object.entries(findMostPopularItems()).map(([month, { item, quantity }]) => (
              <li key={month} className="mb-2">
                <span className="font-semibold text-blue-600">{month}:</span> <span className='font-bold'>{item}</span> <br/>(Quantity Sold: <span className='font-bold'>{quantity}</span>)
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Items Generating Most Revenue Each Month</h2>
          <ul className="list-disc pl-6 text-gray-800">
            {Object.entries(findMostRevenueItems()).map(([month, { item, totalRevenue }]) => (
              <li key={month} className="mb-2">
                <span className="font-semibold text-blue-600">{month}:</span> <span className='font-bold'>{item}</span><br/> (Total Revenue: <span className='font-bold'>Rs.{totalRevenue}</span>)
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Popular Item Statistics</h2>
          <ul className="list-disc pl-6 text-gray-800">
            {Object.entries(findPopularItemStats()).map(([month, { item, minOrders, maxOrders, avgOrders }]) => (
              <li key={month} className="mb-2">
                <span className="font-semibold text-blue-600">{month}:</span> <span className='font-bold'>{item}</span> <br/>(Min Orders: <span className='font-bold'>{minOrders}</span>, Max Orders: <span className='font-bold'>{maxOrders}</span>, Avg Orders: <span className='font-bold'>{avgOrders.toFixed(2)}</span>)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalysisPage;
