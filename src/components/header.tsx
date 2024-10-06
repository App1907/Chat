import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/dimension';
import { Icons } from '../assets';

const Header = ({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* <View style={{ flexDirection: 'row' }}> */}
          {/* <Image source={Icons.backicon} style={styles.img} /> */}
          {/* <Text style={styles.headertext}>Chats</Text> */}
        {/* </View> */}

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Chats</Text>
          <Text style={styles.headerSubtitle}>45 Contacts</Text>
        </View>

        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Image source={Icons.add} style={styles.img} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.14436619718,
    backgroundColor: '#2A7BBB',
  },
  row: {
    marginTop: SCREEN_HEIGHT * 0.07394366197,
    marginLeft: SCREEN_WIDTH * 0.04071246819,
    marginRight: SCREEN_WIDTH * 0.04071246819,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.0469483568,
  },
  img: {
    height: SCREEN_HEIGHT * 0.0469483568,
    width: SCREEN_WIDTH * 0.10178117048,
  },
  headertext: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'semibold',
    color: '#FFFFFF',
    marginLeft: SCREEN_WIDTH * 0.04071246819,
    paddingTop: SCREEN_HEIGHT * 0.0117370892,
    paddingBottom: SCREEN_HEIGHT * 0.0117370892,
  },


  headerTextContainer: {
    flex: 1,
    marginLeft: 20,
  },
  headerTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 13,
  },
});

export default Header;








// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import React from 'react';
// import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/dimension';
// import { Icons } from '../assets';

// const Header = ({ setShowModal }) => { // Receive setModalVisible
//   return (
//     <View style={styles.container}>
//       <View style={styles.row}>
//         <View style={{ flexDirection: 'row' }}>
//           {/* <Image source={Icons.backicon} style={styles.img} /> */}
//           <Text style={styles.headertext}>Chats</Text>
//           {/* <Text style={styles.headertext}>Chats</Text> */}
//         </View>
//         <TouchableOpacity onPress={() => setShowModal(true)}> 
//           <Image source={Icons.adduser} style={styles.img} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   container: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT * 0.14436619718,
//     backgroundColor: '#2A7BBB',
//   },
//   row: {
//     marginTop: SCREEN_HEIGHT * 0.07394366197,
//     marginLeft: SCREEN_WIDTH * 0.04071246819,
//     marginRight: SCREEN_WIDTH * 0.04071246819,
//     justifyContent: 'space-between',
//     flexDirection: "row",
//     height: SCREEN_HEIGHT * 0.0469483568,
//   },
//   img: {
//     height: SCREEN_HEIGHT * 0.0469483568,
//     width: SCREEN_WIDTH * 0.10178117048,
//   },
//   headertext: {
//     fontSize: 18,
//     lineHeight: 20,
//     fontWeight: 'semibold',
//     color: '#FFFFFF',
//     marginLeft: SCREEN_WIDTH * 0.04071246819,
//     paddingTop: SCREEN_HEIGHT * 0.0117370892,
//     paddingBottom: SCREEN_HEIGHT * 0.0117370892,
//   },
// });