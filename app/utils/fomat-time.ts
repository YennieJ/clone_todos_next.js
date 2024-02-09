export function formatTime(time: string) {
  // 시간과 분을 분리
  const [inputHour, inputMinute] = time.split(":").map(Number);

  // 오전/오후 판단
  const period = inputHour < 12 ? "오전" : "오후";

  // 시간을 12시간제로 변환하고, 한 자리수 시간 앞에 0을 붙임
  let hour = inputHour % 12;
  hour = hour ? hour : 12; // 0시는 12시로 표시
  const formattedHour = hour < 10 ? `0${hour}` : hour;

  // 분이 한 자리수면 앞에 0을 붙임
  const formattedMinute = inputMinute < 10 ? `0${inputMinute}` : inputMinute;

  return `${period} ${formattedHour}:${formattedMinute}`;
}

export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getCurrentHourMinuteSecond = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  // 초를 "00"으로 추가
  return `${hours}:${minutes}:00`;
};
