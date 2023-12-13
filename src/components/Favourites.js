import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Favourites = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{
              color: '#246f51',
              fontSize: 30,
              fontWeight: 400,
              marginTop: 50
          }}>
            Favourites tasks
        </Text>
    </View>
  )
}

export default Favourites

const styles = StyleSheet.create({})