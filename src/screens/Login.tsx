/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Login} from '../redux/actions';
export const MyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(Login(email, password));
  };

  return (
    <View style={styles.container}>
      <View style={{height: '30%'}}>
        <Image
          source={require('../assets/icons/water.png')}
          style={{height: '100%', width: 200}}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="No. HP"
          placeholderTextColor="#003f5c"
          keyboardType="numeric"
          onChangeText={value => setEmail(value)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="kata sandi"
          keyboardType="numeric"
          placeholderTextColor="#003f5c"
          onChangeText={value => setPassword(value)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => submit()}>
        <Text style={styles.loginText}>MASUK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344D67',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },

  image: {
    marginBottom: 40,
    height: '30%',
  },

  inputView: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '90%',
    height: 50,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    // alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    color: '#003f5c',
    fontSize: 24,
    marginStart: 12,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#59C1BD',
  },
  loginText: {
    color: 'white',
  },
});
