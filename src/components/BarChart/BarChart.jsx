import {Chart} from 'react-google-charts';

const BarChart = ({beerList, details}) => {

  const newData = () => {
    const newArr = [];
    beerList.map(item => (newArr.push([item.name, item.abv])));
    return newArr.sort((a, b) => {
      if (a[1] > b[1]) return 1;
      if (a[1] < b[1]) return -1;
      return 0;
    });
  };

  const data = [
    ['Name', 'ABV'],
    ...newData()
  ];

  const options = {
    title: 'ABV bar chart',
    hAxis: {title: 'Name', viewWindow: {}},
    vAxis: {title: 'ABV', viewWindow: {min: 0, max: Math.max(...data.map(i => (i[1])).splice(1))}},
    legend: 'none'
  };

  const chartEvents = [
    {
      eventName: 'select',
      callback({chartWrapper}) {
        const dataItem = data[chartWrapper.getChart().getSelection()[0].row + 1];
        const myItem = beerList.filter(a => (a.name === dataItem[0]))[0];
        details(myItem);
      }
    }
  ];

  return (
    <Chart
      chartType='ColumnChart'
      data={data}
      options={options}
      width='100%'
      height='300px'
      legendToggle
      chartEvents={chartEvents}
    />
  );
}

export default BarChart;
