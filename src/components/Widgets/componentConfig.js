export default [
  {
    name: 'Time',
    path: './Time',
    schema: [
      {
        id: 'is24Hour',
        label: 'Is 24 hour clock?',
        type: 'checkbox',
      },
      {
        id: 'showSeconds',
        label: 'Show seconds?',
        type: 'checkbox',
      },
    ],
  },
  {
    name: 'Date',
    path: './Date',
  },
  {
    name: 'WeatherForcast',
    path: './WeatherForcast',
  },
  {
    name: 'Weather',
    path: './Weather',
  },
];
