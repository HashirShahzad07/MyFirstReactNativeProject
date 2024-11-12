import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,ImageBackground, Switch } from 'react-native';
import styles from '../styles/LoginScreenStyles'; 
import nameIcon from '../assets/images/name.png'
import emailIcon from '../assets/images/email.png'; // Import your email icon
import passwordIcon from '../assets/images/password.png'
import hideIcon from '../assets/images/Hide.png'
import googleIcon from '../assets/images/google.png'
import facebookIcon from '../assets/images/facebook.png'
import XIcon from '../assets/images/twitter.png';
import loginBot from '../assets/images/LoginBot.png'
import upperRec from '../assets/images/RectangleUpper.png'


const SignupScreen = ({navigation}) => {
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
      <Text style={styles.titleSignup}>Signup</Text>

    

    <View style={styles.inputContainer}>
        <Image source={nameIcon} style={styles.iconName} />
            <TextInput 
            placeholder="Name" 
            placeholderTextColor="#54545480"
            style={styles.input} 
            />
    </View>

    <View style={styles.inputContainer}>
        <Image source={emailIcon} style={styles.icon} />
        <TextInput 
          placeholder="E-mail" 
          placeholderTextColor="#54545480"
          style={styles.input} 
        />
      </View>

      {/* Password Input */}
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

      

      
      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Signup</Text>
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
      
     
      <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')}>
      <Text style={styles.signupText}>
      Already have an account?  <Text style={styles.signupLink}>Login</Text>
      </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
