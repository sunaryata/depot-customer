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
import {useState, useEffect} from 'react';
import {BASE_URL} from '../config';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function HomeHeader({}) {
  const token = useSelector(state => state.Reducers.authToken);

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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    authAxios
      .get(`/v1/transactions`, {})
      .then(res => {
        setUserInfo(res.data.data);
        setStatusDeliver(
          res.data.data.case_has_transactionstatus?.transaction_status_id,
        );
        // setAmount(res.data.data.money_total);
        setAmount(res.data.data.money_total);
        console.log('money total', res.data.data.money_total);
        setRefreshing(false);
      })
      .catch(e => {
        console.log(`register error ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={160}
        customTop={130}
        showHeader={true}
        customBgColor="#FED049"
        customWavePattern="M0,32L18.5,26.7C36.9,21,74,11,111,37.3C147.7,64,185,128,222,133.3C258.5,139,295,85,332,96C369.2,107,406,181,443,224C480,267,517,277,554,266.7C590.8,256,628,224,665,224C701.5,224,738,256,775,250.7C812.3,245,849,203,886,186.7C923.1,171,960,181,997,192C1033.8,203,1071,213,1108,197.3C1144.6,181,1182,139,1218,112C1255.4,85,1292,75,1329,64C1366.2,53,1403,43,1422,37.3L1440,32L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"
        amount={amount}
      />
      {console.log('jumlah', amount)}
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
