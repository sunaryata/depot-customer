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
import WavyHeader from './Waveheader';

export default function OrderHeader() {
  return (
    <View style={styles.container}>
      <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={160}
        customTop={130}
        showHeader={false}
        customBgColor="#FED049"
        customWavePattern="M0,128L34.3,154.7C68.6,181,137,235,206,261.3C274.3,288,343,288,411,272C480,256,549,224,617,208C685.7,192,754,192,823,208C891.4,224,960,256,1029,266.7C1097.1,277,1166,267,1234,256C1302.9,245,1371,235,1406,229.3L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10,
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 35,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50,
  },
});
