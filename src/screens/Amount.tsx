import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';

export default function AmoutHeader({amount}) {
  return (
    <Text
      style={{
        display: 'flex',
        alignSelf: 'center',
        marginRight: 20,
        fontSize: 40,
        color: '#22A39F',
        fontWeight: '600',
      }}>
      {amount ?? 0}
    </Text>
  );
}
