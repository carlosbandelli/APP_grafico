import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

// Definição do botão com a propriedade 'color'
export const Button = styled(TouchableOpacity) <{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin: 5px 5px;
  width: 100px;
  height:60px;
`;

// Estilo para o texto do botão
export const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;
