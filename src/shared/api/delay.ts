/* функция имитации задержки */
export const delay = (time: number = 500) =>
  new Promise((res) => setTimeout(res, time));