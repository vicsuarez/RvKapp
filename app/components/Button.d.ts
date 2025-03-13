import { StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  icon?: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

declare const Button: React.FC<ButtonProps>;

export default Button; 