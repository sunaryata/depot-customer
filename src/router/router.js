/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
// In App.js in a new project

import {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableHighlight,
} from 'react-native';
import {NavigationContainer, useIsFocused, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {MyLogin} from '../screens/Login';
import {Logout, Init} from '../redux/actions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMinus,
  faShop,
  faHistory,
  faPlus,
  faDroplet,
  faX,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import HomeView from '../screens/Home';
import HistoryView from '../screens/History';
import HistoryHeader from '../screens/HistoryHeader';
import HomeHeader from '../screens/HomeHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OrderHeader from '../screens/OrderHeader';
import {BASE_URL} from '../config';
import axios from 'axios';
import OrderView from '../screens/Order';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const token = useSelector(state => state.Reducers.authToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [statusDeliver, setStatusDeliver] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [amount, setAmount] = useState(0);

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };

  useEffect(() => {
    init();
    // getData();
  }, []);

  // const getData = () => {
  //   setIsLoading(true);
  //   authAxios
  //     .get(`/v1/transactions`, {})
  //     .then(res => {
  //       setUserInfo(res.data.data);
  //       setStatusDeliver(
  //         res.data.data.case_has_transactionstatus?.transaction_status_id,
  //       );
  //       // setAmount(res.data.data.money_total);
  //       setAmount(123);
  //       console.log('money total',res.data.data.money_total);
  //       setRefreshing(false);
  //     })
  //     .catch(e => {
  //       console.log(`register error ${e}`);
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  function Home() {
    return (
      <View style={{backgroundColor: '#344D67', flex: 1}}>
        {/* <HomeHeader /> */}
        <HomeView />
      </View>
    );
  }

  function EmptyScreen() {
  const navigation = useNavigation();

    return (
      <View style={{backgroundColor: '#344D67', flex: 1}}>
        {/* <OrderHeader /> */}
        <OrderView />
      </View>
    );
  }

  function Riwayat() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#344D67',
        }}>
        <HistoryView />
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  function MyTabs() {
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#171D24',
              position: 'absolute',
              bottom: 40,
              marginHorizontal: 20,
              height: 70,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowOffset: {
                width: 10,
                height: 10,
              },
              paddingHorizontal: 20,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 5,
              },

              tabBarLabel: 'Pemesanan',
              tabBarIcon: ({focused}) => (
                <View
                  // style={{
                  //   position: 'absolute',
                  //   top: '50%',
                  // }}

                  style={{
                    width: focused ? 50 : 40,
                    height: focused ? 50 : 40,
                    backgroundColor: '#2B343E',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={faDroplet}
                    size={focused ? 30 : 20}
                    color={focused ? 'white' : 'gray'}
                  />
                </View>
              ),
            }}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                Animated.spring(tabOffsetValue, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />

          <Tab.Screen
            name="Buat Pesanan"
            component={EmptyScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({focused, props, navigation}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Riwayat')}>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#FB2576',
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 70,
                      zIndex: 1,
                    }}>
                    <FontAwesomeIcon
                      icon={focused ? faXmark : faPlus}
                      size={40}
                      style={{color: 'black'}}
                    />
                  </View>
                </TouchableOpacity>
              ),
            }}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth(),
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <Tab.Screen
            name="Riwayat"
            component={Riwayat}
            options={{
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 5,
              },
              tabBarLabel: 'Riwayat',
              tabBarIcon: ({focused}) => (
                <View
                  // style={{
                  //   position: 'absolute',
                  //   top: '50%',
                  // }}

                  style={{
                    width: focused ? 50 : 40,
                    height: focused ? 50 : 40,
                    backgroundColor: '#2B343E',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={faHistory}
                    size={focused ? 30 : 20}
                    color={focused ? 'white' : 'gray'}
                  />
                </View>
              ),
            }}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 2,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
        </Tab.Navigator>
        <Animated.View
          style={{
            width: getWidth() - 50,
            height: 4,
            backgroundColor: '#FB2576',
            position: 'absolute',
            left: 70,
            bottom: 109,
            borderRadius: 50,

            transform: [
              {
                translateX: tabOffsetValue,
              },
            ],
          }} />
      </NavigationContainer>
    );
  }

  function getWidth() {
    let width = Dimensions.get('window').width;
    width = width - 89;

    return width / 3;
  }

  if (token !== null) {
    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          {/* <ActivityIndicator size="large" color='white' /> */}
          <Text style={{color: 'white'}}>Loading</Text>
        </View>
      );
    }
    return <MyTabs />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={MyLogin}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#182028',
    borderRadius: 25,
    marginHorizontal: width * 0.1,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default App;
