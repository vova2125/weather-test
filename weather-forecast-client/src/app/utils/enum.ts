export enum STREAM_FORECAST_STATUS {
  INACTIVE,
  ACTIVE
}

export enum WEBSOCKET_EVENTS_NAMES {
  CONNECT = 'startStreamWeatherForecast',
  DISCONNECT = 'stopStreamWeatherForecast',
  UPDATE = 'weatherUpdate'
}
