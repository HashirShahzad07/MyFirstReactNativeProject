import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ImageBackground, Animated, Dimensions, Alert,Modal,modalVisible } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import start from '../assets/images/start.png';
import pause from '../assets/images/pause.png';
import typeImg from '../assets/images/typeImg.png';
import background from '../assets/images/background.png'
import { BackgroundImage } from 'react-native-elements/dist/config';

const Type1Screen = ({ navigation }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const [intervalId, setIntervalId] = useState(null);
  const sidebarAnim = useState(new Animated.Value(-Dimensions.get('window').width))[0];
  const screenWidth = Dimensions.get('window').width;
  const [reps, setReps] = useState(0);
  const [sounds, setSounds] = useState({
    stop: null,
    go: null,
    perfect: null,
  });

  // Load random number of reps
  useEffect(() => {
    const randomReps = Math.floor(Math.random() * 51) + 50;
    setReps(randomReps);
  }, []);

  // Load sounds on component mount
  useEffect(() => {
    const loadSounds = async () => {
      const stopSound = new Audio.Sound();
      const goSound = new Audio.Sound();
      const perfectSound = new Audio.Sound();

      try {
        await stopSound.loadAsync(require('../../assets/stop.mp3'));
        await goSound.loadAsync(require('../../assets/go.mp3'));
        await perfectSound.loadAsync(require('../../assets/perfect.mp3'));

        setSounds({ stop: stopSound, go: goSound, perfect: perfectSound });
      } catch (error) {
        console.error('Error loading sound:', error);
        Alert.alert("Error loading sounds. Please try again.");
      }
    };

    loadSounds();

    return () => {
      sounds.stop?.unloadAsync();
      sounds.go?.unloadAsync();
      sounds.perfect?.unloadAsync();
    };
  }, []);

  // Play sound if it's loaded
  const playSound = async (sound) => {
    if (sound && sound._loaded) {  // Ensure the sound is loaded
      try {
        await sound.replayAsync();
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    } else {
      console.log('Sound not loaded yet');
    }
  };

  // Random delay function
  const getRandomDelay = () => Math.floor(Math.random() * 6 + 2) * 1000;

  // Play the isometric sequence
  const playIsometricSequence = async () => {
    if (!sounds.stop || !sounds.go || !sounds.perfect) {
      Alert.alert("Sounds are not fully loaded yet. Please try again.");
      return;
    }

    setIsPlaying(true);
    for (let i = 0; i < reps; i++) {
      if (!isPlaying) break;

      await playSound(sounds.stop);
      await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
      await playSound(sounds.go);

      await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
    }

    if (isPlaying) {
      await playSound(sounds.perfect);
      setIsPlaying(false);
    }
  };

  // Pause functionality
  const handlePausePress = async () => {
    setIsPlaying(false);

    // Stop any currently playing sounds
    try {
      await sounds.stop?.stopAsync();
      await sounds.go?.stopAsync();
      await sounds.perfect?.stopAsync();
    } catch (error) {
      console.error("Error stopping sounds:", error);
    }

    // Clear the interval if it's running
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    // setReps(0);
  };

  // Sidebar toggle functionality
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(sidebarAnim, {
      toValue: sidebarVisible ? -screenWidth : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Swipe gesture for sidebar
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
        <Text style={styles.titleType}>Type 1</Text>
      </View>
      <Image 
      source={background} 
      style={styles.backgroundImage}
        // You can use "cover" or "contain"
    />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.pauseBtn} onPress={playIsometricSequence}>
          <Image source={start} style={styles.pauseBtnImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.startBtn} onPress={handlePausePress}>
          <Image source={pause} style={styles.startBtnImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.TypeBtn} onPress={() => setModalVisible(true)}>
        <Image source={typeImg} style={styles.TypeBtnImage}  />
      </TouchableOpacity>
      

      <Text style={styles.subtitle}>Max 1 High intensity set/exercise</Text>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
        <Text style={styles.toggleButtonText}>≡</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileButton}>
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
          <Animated.View style={styles.sidebar}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#36373B',
  },
  backgroundImage:{
    width:450,
    height:650,


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
  titleType: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center',
    color: '#fff'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    color: '#DDDDDD',
    marginTop: 36,
    position: 'absolute',
    bottom: 160,
  },
  buttonContainer: {
    position: 'absolute',
    left: 40,
    // backgroundColor: '#36373B',
    paddingBottom: 10,
    alignItems: 'left',
    width: '50%',
  },
  pauseBtn: {
    width: 150,
    height: 70,
    padding: 0,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseBtnImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  startBtn: {
    width: 150,
    height: 70,
    padding: 0,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtnImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  TypeBtn: {
    position: 'absolute',
    right: 30,
    width: 150,
    height: 70,
    padding: 0,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TypeBtnImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
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
  profileButton: {
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
  profileButtonText: {
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
    marginTop: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 5,
    marginTop: 40,
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

export default Type1Screen;
