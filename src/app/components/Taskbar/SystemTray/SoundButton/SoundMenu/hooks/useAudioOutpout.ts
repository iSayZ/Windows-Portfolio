import { useState, useEffect } from "react";

const useAudioOutput = () => {
  const [audioOutput, setAudioOutput] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudioOutput = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.error("Media Devices API not supported");
        return;
      }

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioOutputDevices = devices.filter(device => device.kind === "audiooutput");

        if (audioOutputDevices.length > 0) {
          setAudioOutput(audioOutputDevices[0].label || "Default Audio Output");
        } else {
          setAudioOutput("No audio output devices found");
        }
      } catch (err) {
        console.error("Error fetching audio output devices:", err);
        setAudioOutput("Error fetching audio output");
      }
    };

    fetchAudioOutput();
  }, []);

  return audioOutput;
};

export default useAudioOutput;
