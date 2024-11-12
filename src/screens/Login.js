import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,ImageBackground, Switch } from 'react-native';
import styles from '../styles/LoginScreenStyles'; 
import emailIcon from '../assets/images/email.png'; // Import your email icon
import passwordIcon from '../assets/images/password.png'
import hideIcon from '../assets/images/Hide.png'
import googleIcon from '../assets/images/google.png'
import facebookIcon from '../assets/images/facebook.png'
import XIcon from '../assets/images/twitter.png';
import loginBot from '../assets/images/LoginBot.png'
import upperRec from '../assets/images/RectangleUpper.png'


const LoginScreen = ({ navigation }) => {
  const [rememberMe, setRememberMe] = React.useState(false);

  const toggleSwitch = () => setRememberMe(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.imgwrapper}>
      <View 
    >
      <Image 
        source={loginBot} 
        style={styles.image}
      />
      </View>
    </View>
    <View style={styles.DetailWrapper}>
      <Text style={styles.title}>Login</Text>

     
      <View style={styles.inputContainer}>
        <Image source={emailIcon} style={styles.icon} />
        <TextInput 
          placeholder="E-mail" 
          placeholderTextColor="#54545480"
          style={styles.input} 
        />
      </View>


      <View style={styles.inputContainer}>
      <Image source={passwordIcon} style={styles.icon} />
        <TextInput 
          placeholder="Password" 
          secureTextEntry 
          placeholderTextColor="#54545480"
          style={styles.input} 
        />
         <Image source={hideIcon} style={styles.icon} />
      </View>

      <View style={styles.rememberContainer}>
        <Text style={styles.rememberText}>Remember me</Text>
        <Switch 
          trackColor={{ false: "#767577", true: "#81b0ff" }} 
          thumbColor={rememberMe ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={rememberMe}
        />
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.navigate('Welcome')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* <Text style={styles.orText}>Or</Text> */}
      
      {/* <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={googleIcon} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={facebookIcon} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={XIcon} style={styles.socialIcon} />
        </TouchableOpacity>
      </View> */}
     
      <TouchableOpacity onPress={()=> navigation.navigate('SignupScreen')}>
      <Text style={styles.signupText}>
      Don’t have an account?   <Text style={styles.signupLink}>Signup</Text>
      </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
