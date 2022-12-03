/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, Component, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {dummyData} from '../constants';
import HistoryHeader from './HistoryHeader';

const HistoryView = params => {
  useEffect(() => {}, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <HistoryHeader />
        <View
          style={{
            flex: 2.5,
            backgroundColor: '#344D67',
            paddingHorizontal: wp('5%'),
            paddingTop: 2,
          }}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 2,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#fff',
                  fontSize: 22,
                }}>
                Daftar Riwayat Pembelian
              </Text>
            </View>
            <FlatList
              style={{height: '72%'}}
              data={dummyData.coins}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.9}>
                  <View
                    style={{
                      position: 'relative',
                      flexDirection: 'row',
                      height: hp('9%'),
                      width: wp('90%'),
                      // borderWidth: 1,
                      borderColor: '#ddd',
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      marginTop: 10,
                    }}>
                    {/* Coin and symbol */}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        width: wp('50%'),
                      }}>
                      <Image
                        style={{height: 35, width: 35}}
                        source={item.image}
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: 'Roboto-Bold',
                          color: '#333',
                          fontSize: 18,
                        }}>
                        {' '}
                        00XX12442022
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        backgroundColor: '#fff',
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* price */}

                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 20,
                          }}>
                          {item.desa}
                        </Text>
                        <Text
                          style={{
                            color: 'green',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 20,
                          }}>
                          x{item.jumlah}
                        </Text>
                      </View>

                      {/* indicator */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: 14,
                            color: '#333',
                          }}>
                          ad
                        </Text>
                      </View>
                    </View>
                    {/* <View
                      style={{
                        flexDirection: 'column',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                      }}>

                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 14,
                          }}>
                          13.20
                        </Text>
                      </View>

                    </View> */}
                    <View
                      style={{
                        // flexDirection: 'row',
                        alignItems: 'flex-end',
                        paddingHorizontal: 10,
                        flex: 1,
                        alignContent: 'center',
                        flexDirection: 'column',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: 'Roboto-Bold',
                          color: '#333',
                          fontSize: 14,
                        }}>
                        {' '}
                        13.20
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              horizontal={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HistoryView;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  box: {
    width: '100%',
    height: 120,
  },
  base_text: {
    color: '#FFADBC',
  },
  button: {
    marginTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  buttonFilter: {
    // alignSelf: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  modalView: {
    margin: 2,
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: wp('100%'),
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#D6E4E5',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    alignSelf: 'center',
    color: 'black',
  },
  modalTextCaption: {
    marginVertical: 20,
    alignSelf: 'center',
    color: 'black',
    fontSize: 32,
    fontFamily: 'PoppinsBold',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: hp('20%'),
  },
  textcenter: {
    fontSize: 20,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: wp('50%'),
  },
  buttonContainerSuccess: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    width: 100,
    borderRadius: 30,
    backgroundColor: '#42ba96',
  },
  buttonContainerDanger: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
    marginHorizontal: 20,
    backgroundColor: '#282A3A',
  },
});
