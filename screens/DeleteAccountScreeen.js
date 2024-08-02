import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteAccountScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const confirmDeletion = async () => {
    setLoading(true);
    try {
      // Retrieve the current username from AsyncStorage
      const username = await AsyncStorage.getItem('currentUsername');

      // Remove the user data associated with the username
      if (username) {
        await AsyncStorage.removeItem(username);
      }

      // Clear the current username
      await AsyncStorage.removeItem('currentUsername');

      // Navigate to the sign-in screen
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Delete Account"
        color="#f5b301"
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#8BA818" />
            ) : (
              <>
                <Button
                  title="Yes, Delete"
                  onPress={confirmDeletion}
                  color="#ff0000"
                />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(!modalVisible)}
                  color="#8BA818"
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default DeleteAccountScreen;
