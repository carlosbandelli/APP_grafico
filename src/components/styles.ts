import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Pokemon } from '../utils';

interface ToggleButtonProps {
  item?: Pokemon;
  showFront?: boolean;
  onPress?: () => void;
}

// Estilo para o SafeAreaView
export const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

// Estilo para a View principal
export const MainView = styled(View)`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
`;

export const MainContainer = styled(View)`
  flex: 1; 
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
`;

export const ChartContainer = styled(View)`
  flex: 0.5;
  padding: 20px;
  background-color: #f0f0f0;
`;

// Estilo para o texto principal
export const MainText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

// Estilo para o botão
export const Button = styled(TouchableOpacity)`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-top: 20px;
`;

// Estilo para o texto do botão
export const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;

export const Card = styled(View)`
  background-color: "transparent";
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  elevation: 3;
  height: 100%;
`;

// Estilo para a imagem do Pokémon
export const PokemonImage = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

// Estilo para a informação do Pokémon
export const InfoContainer = styled(View)`
  flex: 1;
  margin-left: 10px;
`;

// Estilo para o nome do Pokémon
export const PokemonName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

// Estilo para o ID do Pokémon
export const PokemonId = styled(Text)`
  font-size: 14px;
  color: #555;
`;

// Estilo para o tipo do Pokémon
export const PokemonType = styled(Text)`
  font-size: 14px;
  color: #777;
`;
export const ToggleButton = styled(TouchableOpacity) <ToggleButtonProps>`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

// Texto dentro do botão de alternância
export const ToggleButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  text-align: center;
`;