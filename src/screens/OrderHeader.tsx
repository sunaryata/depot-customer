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
        customHeight={300}
        customTop={200}
        showHeader={false}
        customBgColor="#FED049"
        customWavePattern="M0,32L24,48C48,64,96,96,144,101.3C192,107,240,85,288,69.3C336,53,384,43,432,69.3C480,96,528,160,576,192C624,224,672,224,720,192C768,160,816,96,864,80C912,64,960,96,1008,117.3C1056,139,1104,149,1152,128C1200,107,1248,53,1296,48C1344,43,1392,85,1416,106.7L1440,128L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
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
