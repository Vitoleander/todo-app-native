import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Finished = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{
              color: '#246f51',
              fontSize: 30,
              fontWeight: 400,
              marginTop: 50
          }}>
            Finished tasks 
        </Text>
    </View>
  )
}

export default Finished

const styles = StyleSheet.create({})