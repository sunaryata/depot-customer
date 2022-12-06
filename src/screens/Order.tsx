/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  faCheck,
  faDroplet,
  faMinus,
  faPlus,
  faTruckLoading,
} from '@fortawesome/free-solid-svg-icons';
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
  TextInput,
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
import HomeHeader from './HomeHeader';
import AwesomeAlert from 'react-native-awesome-alerts';
import OrderHeader from './OrderHeader';

const OrderView = ({}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const token = useSelector(state => state.Reducers.authToken);
  const [userInfo, setUserInfo] = useState({});
  const [statusDeliver, setStatusDeliver] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [amount, setAmount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const onRefresh = () => {
    //Clear old data of the list
    setUserInfo({});
    setAmount(0);
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
        setAmount(
          res.data.data.case_has_transactionsdetail.qty *
            res.data.data.case_has_transactionsdetail.products.price,
        );
      })
      .catch(e => {
        console.log(`register error ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setShowAlert(false);
    getData();
    setAmount(0);
  }, [isFocused]);

  const tampilModal = () => {
    setShowAlert(true);
  };
  const sembunyiModal = () => {
    setShowAlert(false);
  };
  const cancelOrder = () => {
    authAxios
      .put(`${BASE_URL}/v1/transactions/${userInfo.transaction_id}`, {})
      .then(function (response) {
        setShowAlert(false);
        setUserInfo({});
        getData();
      })
      .catch(function (error) {
        console.log(error.response?.data?.message);
      });
  };

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
    <View>
      {userInfo ? (
        <View>
          <OrderHeader />
          <ScrollView
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
                      marginTop: wp('50%'),
                    }}>
                    <View
                      style={{
                        position: 'relative',
                        flexDirection: 'column',
                        height: hp('20%'),
                        width: wp('90%'),
                        borderColor: '#ddd',
                        borderRadius: 10,
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: 'white',
                        elevation: 5,
                        alignContent: 'center',
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <Text
                          style={{
                            marginTop: 20,
                            fontFamily: 'PoppinsRegular',
                            color: '#333',
                            fontSize: 20,
                          }}>
                          Pesanan sedang dalam perjalanan
                        </Text>
                        <TouchableOpacity style={styles.buttonContainerLoading}>
                          <Image
                            style={{height: 100, width: 100}}
                            source={require('../assets/icons/loading-car.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <OrderHeader />
          <ScrollView
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
                      marginTop: wp('10%'),
                    }}>
                    <View
                      style={{
                        position: 'relative',
                        flexDirection: 'column',
                        width: wp('90%'),
                        borderColor: '#ddd',
                        borderRadius: 10,
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: 'white',
                        elevation: 5,
                        alignContent: 'center',
                      }}>
                      <View style={{alignItems: 'center', marginVertical : 30}}>
                        <Text
                          style={{
                            fontFamily: 'PoppinsRegular',
                            color: '#333',
                            fontSize: 20,
                            marginVertical: 20,
                            
                          }}>
                          Tambah Pesanan Baru
                        </Text>
                        <View style={styles.inputView}>
                          <TextInput
                            style={styles.TextInput}
                            keyboardType="numeric"
                            placeholderTextColor="#003f5c"
                            textAlign="right"
                            // onChangeText={(jumlah_bayar) =>
                            //   setJumlahBayar(jumlah_bayar)
                            // }

                            // value={jumlah_bayar}
                            // defaultValue={
                            //   `${
                            //     userInfo?.money_amount !== null ||
                            //     userInfo?.money_amount !== undefined
                            //       ? userInfo?.money_amount
                            //       : 0
                            //   }` ?? 0
                            // }
                          />
                        </View>
                        <View style={styles.inputView}>
                          <TextInput
                            style={styles.TextInput}
                     
                            placeholderTextColor="#003f5c"
                           
                            // onChangeText={(jumlah_bayar) =>
                            //   setJumlahBayar(jumlah_bayar)
                            // }

                            // value={jumlah_bayar}
                            // defaultValue={
                            //   `${
                            //     userInfo?.money_amount !== null ||
                            //     userInfo?.money_amount !== undefined
                            //       ? userInfo?.money_amount
                            //       : 0
                            //   }` ?? 0
                            // }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default OrderView;

const styles = StyleSheet.create({
  buttonContainerBatal: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

    width: 120,
    borderRadius: 30,
    backgroundColor: '#DC3535',
  },
  buttonContainerNewOrder: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 120,
    borderRadius: 30,
    backgroundColor: '#222222',
  },

  buttonContainerLoading: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 120,
    borderRadius: 30,
    // backgroundColor: '#222222',
  },
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
  body: {
    marginTop: 70,
  },
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
