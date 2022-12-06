/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Svg, Path} from 'react-native-svg';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {numberWithCommas} from '../helper';

export default function WavyHeader({
  customStyles,
  customHeight,
  customTop,
  customWavePattern,
  customBgColor,
  showHeader,
  amount,
}) {
  return (
    <View style={customStyles}>
      <View style={{backgroundColor: customBgColor, height: customHeight}}>
        <Svg
          height="90%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{position: 'absolute', top: customTop}}>
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
                // marginRight: 20,
                fontSize: 18,
                color: '#393E46',
                fontWeight: '400',
                fontFamily: 'PoppinsRegular',
              }}>
              {' '}
              TOTAL BAYAR
            </Text>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignSelf: 'center',
                // marginRight: 20,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  alignSelf: 'center',
                  color: '#3D5656',
                  fontWeight: '600',
                }}>
                {' '}
                Rp.
              </Text>
              <Text
                style={{
                  fontSize: 40,
                  color: '#22A39F',
                  fontWeight: '600',
                }}>
                {' '}
                {`${numberWithCommas(amount)}`}
              </Text>
            </View>

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
    fontFamily: 'PoppinsRegular',
    color: '#495579',
    marginTop: 1,
    fontWeight: '500',
  },
});
