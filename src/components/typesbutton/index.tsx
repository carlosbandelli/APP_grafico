import React from "react";
import { Button, ButtonText } from "./style";
import { TypeButtonProps } from "./typebutton";

const TypeButton: React.FC<TypeButtonProps> = ({
  color,
  typeName,
  count,
  onPress,
}) => {
  return (
    <Button color={color} onPress={onPress}>
      <ButtonText>{`${typeName} (${count})`}</ButtonText>
    </Button>
  );
};

export default TypeButton;
