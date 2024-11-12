import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Modal } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import chatBot from '../assets/images/Chat-bot.png';
import start from '../assets/images/start.png';

const Welcome = ({ navigation }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const sidebarAnim = useState(new Animated.Value(-Dimensions.get('window').width))[0];
  const screenWidth = Dimensions.get('window').width;

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);

    Animated.timing(sidebarAnim, {
      toValue: sidebarVisible ? -screenWidth : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: sidebarAnim } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationX < -screenWidth * 0.3) {
      setSidebarVisible(false);
      Animated.timing(sidebarAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(sidebarAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.title}>QUANTUM REP</Text>
      </View>
      
      <Image 
        source={chatBot}
        style={styles.image}
      />

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {/* Start Button opens Modal */}
      <TouchableOpacity 
        style={styles.buttonContainer} 
        onPress={() => setModalVisible(true)} // Open modal on press
      >
        <Image 
          source={start}
          style={styles.startBtn}
        />
      </TouchableOpacity>

      <Text style={styles.subtitle}>Experience unique, unpredictable sessions that boost intensity, delivering fast and impressive results</Text>
      
      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={toggleSidebar} 
      >
        <Text style={styles.toggleButtonText}>≡</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.profileButton} 
      >
        <Text style={styles.profileButtonText}>ALGOPAN</Text>
      </TouchableOpacity>

      {sidebarVisible && (
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              handleGestureEnd(nativeEvent);
            }
          }}
        >
          <Animated.View style={styles.sidebar }>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Menu</Text>
              <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SomeScreen')}>
              <Text style={styles.sidebarItem}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
              <Text style={styles.sidebarItem}>Option 2</Text>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      )}

      {/* Modal for Type Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose a Type</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Type1Screen'); // Navigate to Type1Screen
              }}
            >
              <Text style={styles.modalButtonText}>Type 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Type2Screen'); // Navigate to Type2Screen
              }}
            >
              <Text style={styles.modalButtonText}>Type 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Existing styles
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#36373B',
  },
  nav: {
    height: 120,
    width: '100%',
    backgroundColor: '#25262A',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 75,
    textAlign: 'center',
    color: '#979EA8'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    color: '#DDDDDD',
    marginTop: 36,
  },
  image: {
    width: 435, 
    height: 305, 
    marginBottom: 0,
  },
  startBtn: {
    width: 190,
    height: 90,
    marginTop: -70,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonContainer: {
    backgroundColor: '#36373B',
    paddingBottom: 10,
    alignItems: 'center',
    width: '50%',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#25262A',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton:{
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#25262A',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',

  },
  profileButtonText:{
    color: '#FFFFFF',
    fontSize: 8,
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: '#25262A',
    paddingTop: 20,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    marginTop:40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 5,
    marginTop:40,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  sidebarItem: {
    fontSize: 18,
    color: '#FFFFFF',
    marginVertical: 10,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#25262A',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#36373B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  modalCloseButton: {
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: '#DDDDDD',
    fontSize: 16,
  },
});

export default Welcome;
