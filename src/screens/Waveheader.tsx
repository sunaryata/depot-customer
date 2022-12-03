/* eslint-disable react/react-in-jsx-scope */
import {Svg, Path} from 'react-native-svg';
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

export default function WavyHeader({
  customStyles,
  customWavePattern,
  customBgColor,
  showHeader,
  amount
}) {
  return (
    <View style={customStyles}>
      <View style={{backgroundColor: customBgColor, height: 100}}>
        <Svg
          height="90%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{position: 'absolute', top: 94}}>
          <Path fill={customBgColor} d={customWavePattern} />
        </Svg>
        {showHeader ? (
          // <View style={styles.body}>
          //   <View style={styles.bodyContent}>
          //     <Text style={styles.name}>Total Bayar</Text>
          //     <Text style={styles.info}>Rp.5,000.00</Text>
          //   </View>
          // </View>
          <View style={styles.body}>
            <Text
              style={{
                alignSelf: 'center',
                marginRight: 20,
                fontSize: 18,
                color: '#393E46',
                fontWeight: '400',
              }}>
              {' '}
              Total Bayar
            </Text>
            <Text
              style={{
                display: 'flex',
                alignSelf: 'center',
                marginRight: 20,
                fontSize: 40,
                color: '#22A39F',
                fontWeight: '600',
              }}>
              {' '}
              {`Rp.${amount}`}
            </Text>
            {/* <Text
              style={{
                color: 'black',
                position: 'absolute',
                fontSize: 14,
                right: 10,
                width: 10,
                display: 'flex',
                marginRight: 10,
              }}>
              ?
            </Text> */}
            <View
              style={{
                position: 'absolute',
                right: 10,
                display: 'flex',
                marginRight: 10,
                marginTop: 20,
                elevation: 5,
              }}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/icons/person.png')}
                  resizeMode="cover"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#344D67',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.inforiwayat}>Riwayat Pembelian</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
  },
  bodyContent: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 18,
    color: '#393E46',
    fontWeight: '400',
  },
  info: {
    fontSize: 40,
    color: '#22A39F',
    marginTop: 1,
    fontWeight: '600',
  },
  inforiwayat: {
    fontSize: 35,
    color: '#FCFDF2',
    marginTop: 10,
    fontWeight: '500',
  },
});