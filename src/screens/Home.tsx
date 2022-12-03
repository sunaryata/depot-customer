/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useIsFocused} from '@react-navigation/native';
import {faCheck, faDroplet, faMinus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import StepIndicator from 'react-native-step-indicator';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenOne from './HomeHeader';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../config';
import {fullDate} from '../helper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const HomeView = ({}) => {
  const isFocused = useIsFocused();

  const token = useSelector(state => state.Reducers.authToken);
  const [userInfo, setUserInfo] = useState({});
  const [statusDeliver, setStatusDeliver] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const onRefresh = () => {
    //Clear old data of the list
    setUserInfo({});
    //Call the Service to get the latest data
    getData();
    setStatusDeliver('');
  };

  const getData = () => {
    setIsLoading(true);
    authAxios
      .get('/v1/transactions', {})
      .then(res => {
        setUserInfo(res.data.data);
        setStatusDeliver(
          res.data.data.case_has_transactionstatus?.transaction_status_id,
        );
        console.log(res.data.data);
        setRefreshing(false);
      })
      .catch(e => {
        console.log(`register error ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  const labels = ['Menunggu', 'Diantar', 'Sampai'];

  var dict = {
    waiting: 0,
    delivering: 1,
    delivered: 2,
  };
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 100,
              }}>
              <Text
                style={{
                  fontFamily: 'PoppinsRegular',
                  color: 'white',
                  fontSize: 15,
                }}>
                Status Pengiriman
              </Text>
            </View>

            <View
              style={{
                position: 'relative',
                flexDirection: 'column',
                height: hp('8%'),
                width: wp('90%'),
                borderColor: '#ddd',
                borderRadius: 10,
                marginTop: 10,
                padding: 10,
                backgroundColor: '#D6E4E5',
                elevation: 5,
                alignContent: 'center',
              }}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={dict[statusDeliver]}
                labels={labels}
                stepCount={3}
              />
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'PoppinsRegular',
                  color: 'white',
                  fontSize: 15,
                }}>
                Detail Pemesanan
              </Text>
            </View>
            <View
              style={{
                position: 'relative',
                flexDirection: 'column',

                width: wp('90%'),
                borderColor: '#ddd',
                borderRadius: 15,
                marginTop: 10,
                padding: 10,
                backgroundColor: '#fff',
                elevation: 5,
              }}>
              {/* Coin and symbol */}
              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('30%'),
                    height: 20,
                    marginTop: 5,
                    marginBottom: 10,
                    marginRight: 1,
                    marginLeft: 3,
                    justifyContent: 'center',
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                    alignItems: 'center',
                    marginHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsBold',
                      color: '#333',
                      fontSize: 15,
                    }}>
                    Rincian Pemesan
                  </Text>
                </View>
              </SkeletonContent>

              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('83%'),
                    height: 20,
                    marginRight: 1,
                    marginLeft: 3,
                    justifyContent: 'center',
                  },
                ]}>
                <View style={styles.TextViewDetail}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#333',
                      fontSize: 18,
                    }}>
                    No HP
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#65647C',
                      fontSize: 15,
                    }}>
                    {userInfo.customer?.user?.phone}
                  </Text>
                </View>
              </SkeletonContent>
              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('83%'),
                    height: 20,
                    marginTop: 5,
                    marginRight: 1,
                    marginLeft: 3,
                    justifyContent: 'center',
                  },
                ]}>
                <View style={styles.TextViewDetail}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#333',
                      fontSize: 18,
                    }}>
                    Desa
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#65647C',
                      fontSize: 15,
                    }}>
                    {userInfo.customer?.villages?.village_name}
                  </Text>
                </View>
              </SkeletonContent>
              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('83%'),
                    height: 20,
                    marginTop: 5,
                    marginRight: 1,
                    marginLeft: 3,
                    justifyContent: 'center',
                  },
                ]}>
                <View style={styles.TextViewDetail}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#333',
                      fontSize: 18,
                    }}>
                    Nama
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#65647C',
                      fontSize: 15,
                    }}>
                    {userInfo.customer?.nama_customer}
                  </Text>
                </View>
              </SkeletonContent>
              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('30%'),
                    height: 20,
                    marginTop: 5,
                    marginRight: 1,
                    marginLeft: 3,
                    marginBottom: 10,
                    justifyContent: 'center',
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                    marginHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsBold',
                      color: '#333',
                      fontSize: 15,
                    }}>
                    Rincian Pesanan
                  </Text>
                </View>
              </SkeletonContent>
              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('83%'),
                    height: 20,
                    marginTop: 5,
                    marginRight: 1,
                    marginLeft: 3,
                    justifyContent: 'center',
                  },
                ]}>
                <View style={styles.TextViewDetail}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#333',
                      fontSize: 18,
                    }}>
                    Tanggal
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: 'PoppinsRegular',
                        color: '#65647C',
                        fontSize: 15,
                      }}>
                      {fullDate(
                        userInfo?.case_has_transactionsdetail?.created_at,
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </SkeletonContent>
              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('83%'),
                    height: 20,
                    marginTop: 5,
                    marginRight: 1,
                    marginLeft: 3,
                    justifyContent: 'center',
                  },
                ]}>
                <View style={styles.TextViewDetail}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#333',
                      fontSize: 18,
                    }}>
                    No. Nota
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: 'PoppinsRegular',
                        color: '#65647C',
                        fontSize: 15,
                      }}>
                      00XX12442022
                    </Text>
                  </TouchableOpacity>
                </View>
              </SkeletonContent>
              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('83%'),
                    height: 20,
                    marginTop: 5,
                    marginRight: 1,
                    marginLeft: 3,
                    justifyContent: 'center',
                  },
                ]}>
                <View style={styles.TextViewDetail}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#333',
                      fontSize: 18,
                    }}>
                    Keterangan
                  </Text>

                  <Text
                    style={{
                      padding: 1,
                      fontFamily: 'PoppinsRegular',
                      color: '#65647C',
                      fontSize: 15,
                    }}>
                    {userInfo.customer_desc}
                  </Text>
                </View>
              </SkeletonContent>
              <SkeletonContent
                containerStyle={{}}
                isLoading={isLoading}
                animationType="pulse"
                layout={[
                  {
                    key: 'someId',
                    width: wp('83%'),
                    height: 20,
                    marginTop: 5,
                    marginRight: 1,
                    marginLeft: 3,
                    justifyContent: 'center',
                  },
                ]}>
                <View style={styles.TextViewDetail}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: '#333',
                      fontSize: 18,
                    }}>
                    Jumlah Beli
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'PoppinsRegular',
                      color: 'green',
                      fontSize: 20,
                    }}>
                    {userInfo?.case_has_transactionsdetail?.qty}
                  </Text>
                </View>
              </SkeletonContent>
              {/* <View style={styles.TextViewDetail}>
                <Text
                  style={{
                    fontFamily: 'PoppinsRegular',
                    color: '#333',
                    fontSize: 18,
                  }}>
                  Desa
                </Text>

                <Text
                  style={{
                    fontFamily: 'PoppinsRegular',
                    color: '#65647C',
                    fontSize: 15,
                  }}>
                  adad
                </Text>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
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
  body: {},
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  info: {
    fontSize: 40,
    color: '#00BFFF',
    marginTop: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainerDanger: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
    marginHorizontal: 20,

    backgroundColor: '#282A3A',
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

  buttonContainerDisable: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    width: 100,
    borderRadius: 30,
    backgroundColor: 'grey',
  },
  inputView: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    height: 60,

    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'black',
    // alignItems: 'center',
  },

  inputViewDisabled: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    height: 50,

    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    borderWidth: 1,
    borderColor: 'black',

    elevation: 1,
    // alignItems: 'center',
  },

  TextInput: {
    height: 80,
    flex: 1,
    color: '#003f5c',
    fontSize: 40,
    marginStart: 2,
    marginEnd: 5,
  },
  TextInputDisabled: {
    height: 80,
    flex: 1,
    color: '#979797',
    fontSize: 30,
    marginStart: 2,
    marginEnd: 5,
  },
  TextViewDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    alignItems: 'center',
    marginHorizontal: 4,
  },
});
