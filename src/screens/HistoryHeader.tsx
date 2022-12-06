import React, {View, StyleSheet, Dimensions} from 'react-native';
import WavyHeader from './Waveheader';

export default function HistoryHeader() {
  return (
    <View style={styles.container}>
      <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={100}
        customTop={94}
        showHeader={false}
        customBgColor="#FED049"
        customWavePattern="M0,96L48,112C96,128,192,160,288,149.3C384,139,480,85,576,90.7C672,96,768,160,864,197.3C960,235,1056,245,1152,213.3C1248,181,1344,107,1392,69.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
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
