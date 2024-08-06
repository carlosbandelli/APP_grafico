import React from "react";
import { Button, Alert } from "react-native";
import { Audio } from "expo-av";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível reproduzir o áudio.");
    }
  };

  return <Button title="Reproduzir Som" onPress={playSound} />;
};

export default AudioPlayer;
