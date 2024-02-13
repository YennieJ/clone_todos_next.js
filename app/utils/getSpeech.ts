import { useEffect, useState } from "react";

export const speakText = (text: string, onEndCallback?: any) => {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = onEndCallback;
    window.speechSynthesis.speak(utterance);
  }
};

export const useCheckTimeAndSpeak = (
  targetTime: string,
  isConsented: boolean,
  description: string
): string => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("it-IT", { hour12: false });
      setCurrentTime(timeString.substring(0, 8));

      if (timeString.substring(0, 8) === targetTime && isConsented) {
        speakText(description);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isConsented, targetTime]);

  return currentTime;
};
