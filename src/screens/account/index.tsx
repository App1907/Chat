import {View, Text } from 'react-native';
import React from 'react';

const Account = () => {
    return (
        <View>
            <Text> Account </Text>
        </View>
    )
}

export default Account;










// import { StyleSheet, Text, View } from 'react-native';
// import React, { useState } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// const Account = () => {
//     const [msgs, setMsgs] = useState([
//         {
//           _id: 1,
//           text: "Hello developer",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "React Native",
//             avatar: "https://placeimg.com/140/140/any"
//           }
//         }
//       ])
//   return (
//     <SafeAreaProvider>
//     <GiftedChat
//     messages={msgs}
//     onSend={(messages) => {
//         setMsgs((prev)=> GiftedChat.append(prev, messages))
        
//       }}
//     user={{
//       _id: 1
//     }}
//   />
//     </SafeAreaProvider>
//   )
// }

// export default Account;

// const styles = StyleSheet.create({})


