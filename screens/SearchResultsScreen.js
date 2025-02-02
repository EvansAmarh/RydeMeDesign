import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const places = [
  { id: '1', name: 'Pharmacy', latitude: 6.674409, longitude: -1.566662 },
  { id: '2', name: 'School of Business KSB KNUST)', latitude: 6.669156, longitude: -1.568180 },
  { id: '3', name: 'School Of Medical Sciences', latitude: 6.672944, longitude: -1.568335 },
  { id: '4', name: 'School of Graduate Students KNUST', latitude: 6.669926, longitude: -1.567517 },
  { id: '5', name: 'KSB GRADUATE STUDIES COMPLEX', latitude: 6.667852, longitude: -1.567531 },
  { id: '6', name: 'Faculty Of Social Sciences Complex', latitude: 6.666677, longitude: -1.567362 },
  { id: '7', name: 'College Of Health Sciences', latitude: 6.672349, longitude: -1.568382 },
  { id: '8', name: 'AFREhealth', latitude: 6.671671, longitude: -1.568004 },
  { id: '9', name: 'Aboagye Menyah Complex, College Of Science KNUST', latitude: 6.673323, longitude: -1.567493 },
  { id: '10', name: 'FACULTY OF BIOSCIENCES', latitude: 6.673473, longitude: -1.568868 },
  { id: '11', name: 'Emeralds Jewelry store', latitude: 6.672806, longitude: -1.569067 },
  { id: '12', name: 'Digital space technology', latitude: 6.672132, longitude: -1.569274 },
  { id: '13', name: 'Department of Theoretical and Applied Biology', latitude: 6.673479, longitude: -1.568799 },
  { id: '14', name: 'Kwame Nkrumah University Of Science and Technology, Department Of Chemistry', latitude: 6.673887, longitude: -1.568093 },
  { id: '15', name: 'KNUST Commercial Area', latitude: 6.68326, longitude: -1.57596 },
  { id: '16', name: 'KNUST HOSPITAL', latitude: 6.668611, longitude: -1.57384 },
  { id: '17', name: 'KFC KNUST', latitude: 6.68467, longitude: -1.57285 },
  { id: '18', name: 'Jubilee Mall', latitude: 6.68326, longitude: -1.57314 },
  { id: '19', name: 'KNUST Great Hall', latitude: 6.67471, longitude: -1.57267 },
  { id: '20', name: 'Prempeh II Library,KNUST,Kumasi', latitude: 6.67537, longitude: -1.57095 },
  { id: '21', name: 'The KNUST Wellness Centre', latitude: 6.68213, longitude: -1.56639 },
  { id: '22', name: 'Republic Hall,KNUST', latitude: 6.67848, longitude: -1.57199 },
  { id: '23', name: 'Queens Hall', latitude: 6.67760, longitude: -1.57240 },
  { id: '24', name: 'Independence Hall,KNUST', latitude: 6.67813, longitude: -1.57116 },
  { id: '25', name: 'University Hall, Katanga', latitude: 6.67290, longitude: -1.57156 },
  { id: '26', name: 'Unity Hall', latitude: 6.68026, longitude: -1.57020 },
  { id: '27', name: 'Brunei Complex', latitude: 6.66959, longitude: -1.57307 },
  { id: '28', name: 'Baby Brunei', latitude: 6.67086, longitude: -1.57293 },
  { id: '29', name: 'UNIVERSITY ACCOMODATION AND CONFERENCES IMPACT BUILDING, KNUST', latitude: 6.68081, longitude: -1.57204 },
  { id: '30', name: 'KNUST Student Clinic', latitude: 6.68037, longitude: -1.57247 },
  { id: '31', name: 'Otumfuo Osei Tutu II Hostel (SRC Hostel)', latitude: 6.68171, longitude: -1.57008 },
  { id: '32', name: 'Faculty Of Law, KNUST', latitude: 6.68298, longitude: -1.57497 },
  { id: '33', name: 'Faculty Of Law Auditorium', latitude: 6.68252, longitude: -1.57025 },
  { id: '34', name: 'KNUST Islamic Centre', latitude: 6.68304, longitude: -1.56961 },
  { id: '35', name: 'Pizzaman Chickenman - KNUST', latitude: 6.67883, longitude: -1.55866 },
  { id: '36', name: 'KNUST College of Engineering Innovation Centre (KNUST-CoE IC)', latitude: 6.67318, longitude: -1.56477 },
  { id: '37', name: 'Engineering Auditorium', latitude: 6.67330, longitude: -1.56353 },
  { id: '38', name: 'COE Petroleum Building', latitude: 6.67406, longitude: -1.576253 },
  { id: '39', name: 'Caesar Building (Vodafone Building)', latitude: 6.67352, longitude: -1.56305 },
  { id: '40', name: 'College of arts and social sciences', latitude: 6.67002, longitude: -1.56550 },
  { id: '41', name: 'Engineering Labs', latitude: 6.67328, longitude: -1.56494 },
  { id: '42', name: 'Department of Meteorology and Climate Science, KNUST', latitude: 6.67394, longitude: -1.56548 },
  { id: '43', name: 'LEARNING COMMONS', latitude: 6.67431, longitude: -1.56796 },
  { id: '44', name: 'Faculty of Pharmacy & Pharmaceutical Sciences KNUST', latitude: 6.67472, longitude: -1.56492 },
  { id: '45', name: 'Centre for Anti-infective Drug Discovery (KNUST)', latitude: 6.67409, longitude: -1.56430 },
  { id: '46', name: 'Faculty of Social Sciences KNUST', latitude: 6.67503, longitude: -1.56541 },
  { id: '47', name: 'CCB Auditorium', latitude: 6.67654, longitude: -1.56407 },
  { id: '48', name: 'Faculty of Agriculture', latitude: 6.67595, longitude: -1.56375 },
  { id: '49', name: 'Bush Canteen', latitude: 6.67595, longitude: -1.56432 },
  { id: '50', name: 'L.I. ANDOH BLOCK BUILDING', latitude: 6.67560, longitude: -1.56254 },
  { id: '51', name: 'Faculty of built environment', latitude: 6.67494, longitude: -1.56209 },
  { id: '52', name: 'Bamfo Kwakye Building', latitude: 6.67381, longitude: -1.56406 },
  { id: '53', name: 'KNUST Department of Planning', latitude: 6.67474, longitude: -1.56334 },
  { id: '54', name: 'Casely - Hayford Building', latitude: 6.67638, longitude: -1.56571 },
  { id: '55', name: 'Biological science block', latitude: 6.67426, longitude: -1.56613 },
  { id: '56', name: 'J. K. AMISSAH LECTURE THEATRE', latitude: 6.67401, longitude: -1.56763 },
  { id: '57', name: 'FACULTY OF BIOSCIENCES MUSEUM', latitude: 6.67402, longitude: -1.56649 },
  { id: '58', name: 'Department of Biochemistry and Biotechnology', latitude: 6.67520, longitude: -1.56997 },
  { id: '59', name: 'Paa Joe Stadium', latitude: 6.67788, longitude: -1.56809 },
  { id: '60', name: 'Silver Lobster Food Service', latitude: 6.67887, longitude: -1.57010 },
  { id: '61', name: 'AU gardens', latitude: 6.68191, longitude: -1.57307 },
  { id: '62', name: 'Sculpture Section, Dept. Of Painting and Sculpture, KNUST.', latitude: 6.68162, longitude: -1.57256 },
  { id: '63', name: 'Lecturers Bangalow', latitude: 6.67880, longitude: -1.57701 },
  { id: '64', name: 'Department of Economics', latitude: 6.67488, longitude: -1.56281 },
  { id: '65', name: 'Department of Communication Design', latitude: 6.68190, longitude: -1.57246 },
  { id: '66', name: 'Department of Educational Innovations in Science & Technology', latitude: 6.68207, longitude: -1.57120 },
  { id: '67', name: 'Integrated Rural Art and Industry', latitude: 6.68340, longitude: -1.57132 },
  { id: '68', name: 'MoneyGram', latitude: 6.68317, longitude: -1.57350 },
  { id: '69', name: 'Kumasi Business Incubator (KBI)', latitude: 6.68291, longitude: -1.57369 },
  { id: '70', name: 'GCB BANK KNUST BRANCH', latitude: 6.68387, longitude: -1.57449 },
  { id: '71', name: 'ICY CUP KNUST', latitude: 6.68426, longitude: -1.57291 },
  { id: '72', name: 'Ecobank', latitude: 6.68382, longitude: -1.57394 },
  { id: '73', name: 'Filling station, Old laundry', latitude: 6.68533, longitude: -1.57311 },
  { id: '74', name: 'Tech Credit Union Hostel', latitude: 6.67127, longitude: -1.57337 },
  { id: '75', name: 'Brunei Gym', latitude: 6.66990, longitude: -1.57478 },
  { id: '76', name: 'Hale and Hearty Sports Center', latitude: 6.68138, longitude: -1.56919 },
  { id: '77', name: 'KNUST Main Entrance', latitude: 6.68610, longitude: -1.56965 },
  { id: '78', name: 'Lomel Resturant and Food Processing', latitude: 6.68157, longitude: -1.57389 },
  { id: '79', name: 'Knust post office', latitude: 6.68387, longitude: -1.57450 },
  { id: '80', name: 'Unibank KNUST', latitude: 6.68376, longitude: -1.57179 },
  { id: '81', name: 'Republic Bank - KNUST Kumasi Branch', latitude: 6.68285, longitude: -1.57330 },
  { id: '82', name: 'Fidelity Bank - KNUST', latitude: 6.68316, longitude: -1.57358 },
  { id: '83', name: 'Barclays Bank Ghana KNUST', latitude: 6.68303, longitude: -1.57390 },
  { id: '84', name: 'Absa | Branch | KNUST', latitude: 6.68317, longitude: -1.57402 },
  { id: '85', name: 'J HARPER BUILDING', latitude: 6.68322, longitude: -1.57374 },
  { id: '86', name: 'Centre For Business Development(CBD), KNUST', latitude: 6.68329, longitude: -1.57523 },
  { id: '87', name: 'International Programmes Office', latitude: 6.68318, longitude: -1.57551 },
  { id: '88', name: 'Kingdom Books and Stationery, KNUST Branch', latitude: 6.68392, longitude: -1.57465 },
  { id: '89', name: 'UBA Ghana - KNUST Branch', latitude: 6.68345, longitude: -1.57491 },
  { id: '90', name: 'CAL Bank KNUST', latitude: 6.68473, longitude: -1.57410 },
  { id: '91', name: 'KNUST Transport', latitude: 6.68559, longitude: -1.57339 },
  { id: '92', name: 'Vodafone KNUST Office', latitude: 6.68489, longitude: -1.57331 },
  { id: '93', name: 'KNUST Table Tennis gym', latitude: 6.68559, longitude: -1.57285 },
  { id: '94', name: 'JP - KNUST Service Station', latitude: 6.68428, longitude: -1.57047 },
  { id: '95', name: 'The Protestant Chapel', latitude: 6.68503, longitude: -1.56871 },
  { id: '96', name: 'Arch Bishop Thomas Cranmer Anglican Church', latitude: 6.68420, longitude: -1.57004 },
  { id: '97', name: 'KNUST nursery school', latitude: 6.68290, longitude: -1.57165 },
  { id: '98', name: 'Royal Gate Hostel', latitude: 6.68348, longitude: -1.57808 },
  { id: '99', name: 'Helena Homestel', latitude: 6.68406, longitude: -1.57806 },
  { id: '100', name: 'Adjani Hostel', latitude: 6.68482, longitude: -1.57682 },
  { id: '101', name: 'Adwoa Akyaa Hostel', latitude: 6.68331, longitude: -1.57905 },
  { id: '102', name: 'Ultimate Hostel', latitude: 6.68406, longitude: -1.57977 },
  { id: '103', name: 'Dashley Hostel', latitude: 6.68599, longitude: -1.57708 },
  { id: '104', name: 'Standard Hostel', latitude: 6.68233, longitude: -1.58501 },
  { id: '105', name: 'blue ark hostel', latitude: 6.68623, longitude: -1.57575 },
  { id: '106', name: 'Kokroko Hostel', latitude: 6.68995, longitude: -1.57411 },
  { id: '107', name: 'Eden Hostel', latitude: 6.67810, longitude: -1.56336 },
  { id: '108', name: 'JITA Hostel', latitude: 6.67839, longitude: -1.56283 },
  { id: '109', name: 'Thy Kingdom Come Hostel', latitude: 6.67765, longitude: -1.56260 },
  { id: '110', name: 'Evandy Hostel (Annex) -Ayeduase', latitude: 6.67813, longitude: -1.56276 },
  { id: '111', name: 'Newstar Hostel', latitude: 6.67857, longitude: -1.56192 },
  { id: '112', name: 'Christ Citadel Hostel', latitude: 6.67783, longitude: -1.56357 },
  { id: '113', name: 'Diaspora Homestel', latitude: 6.67796, longitude: -1.56331 },
  { id: '114', name: 'Beman Nkwan Homestel', latitude: 6.67843, longitude: -1.56051 },
  { id: '115', name: 'Dr Sarfo Hostel', latitude: 6.67877, longitude: -1.56071 },
  { id: '116', name: 'Green Hostel', latitude: 6.68096, longitude: -1.55558 },
  { id: '117', name: 'Splendor Hostel', latitude: 6.67762, longitude: -1.55688 },
  { id: '118', name: 'Divine Kama Hostel', latitude: 6.67787, longitude: -1.55546 },
  { id: '119', name: 'Glory Be to God Hostel (Annex)', latitude: 6.67652, longitude: -1.55554 },
  { id: '120', name: 'Bethel Hostel', latitude: 6.67733, longitude: -1.55450 },
  { id: '121', name: 'Hallowed Hostel', latitude: 6.66438, longitude: -1.55840 },
  { id: '122', name: 'Nyantakyi hostel', latitude: 6.67750, longitude: -1.55035 },
  { id: '123', name: 'Queen Elizabeth Hostel', latitude: 6.67863, longitude: -1.54845 },
  { id: '124', name: 'Nyantakyi Samuel Hostel', latitude: 6.67674, longitude: -1.54389 },
  { id: '125', name: 'URBAN PLATINUM HOSTEL', latitude: 6.67522, longitude: -1.53929 },
  { id: '126', name: 'Buadi Executive Hostel', latitude: 6.67403, longitude: -1.53895 },
  { id: '127', name: 'Majestic hostel / Apartment', latitude: 6.67084, longitude: -1.53903 },
  { id: '128', name: '4 Seasons Hostel', latitude: 6.67217, longitude: -1.53877 },
  { id: '129', name: 'CNC Hostel', latitude: 6.67420, longitude: -1.54378 },
  { id: '130', name: 'Fortune Royal Hostel Ltd', latitude: 6.67748, longitude: -1.53373 },
  { id: '131', name: 'Family Renewal Homestel', latitude: 6.67519, longitude: -1.56250 },
  { id: '132', name: 'K Gee Hostel', latitude: 6.67628, longitude: -1.54267 },
  { id: '133', name: 'Dan Leo hostel', latitude: 6.67649, longitude: -1.54531 },
  { id: '134', name: 'Yellow Homestel', latitude: 6.67692, longitude: -1.54600 },
  { id: '135', name: 'Edenvale Hostel', latitude: 6.67640, longitude: -1.54639 },
  { id: '136', name: 'Grace Hostel', latitude: 6.67526, longitude: -1.54825 },
  { id: '137', name: 'Mushia hostel', latitude: 6.67416, longitude: -1.55001 },
  { id: '138', name: 'Viamens Hostel', latitude: 6.67383, longitude: -1.55001 },
  { id: '139', name: 'Gyazbe homestel', latitude: 6.67483, longitude: -1.55026 },
  { id: '140', name: 'Vic Hostel', latitude: 6.67390, longitude: -1.55026 },
  { id: '141', name: 'High Achievers Hostel', latitude: 6.67361, longitude: -1.54933 },
  { id: '142', name: 'Android Hostel', latitude: 6.67179, longitude: -1.55041 },
  { id: '143', name: 'Fosua Homes Hostel', latitude: 6.67107, longitude: -1.55268 },
  { id: '144', name: 'Nevada Hostel Limited', latitude: 6.67288, longitude: -1.55429 },
  { id: '145', name: 'Resurrection Hostel', latitude: 6.67304, longitude: -1.55412 },
  { id: '146', name: 'Lienda Ville Hostel', latitude: 6.67558, longitude: -1.55319 },
  { id: '147', name: 'Wisdom Seekers Hostel', latitude: 6.67340, longitude: -1.55480 },
  { id: '148', name: 'B-Mark Hostel', latitude: 6.67315, longitude: -1.55610 },
  { id: '149', name: 'Emmal Ville Hostel', latitude: 6.67211, longitude: -1.55629 },
  { id: '150', name: 'Beta Hostel', latitude: 6.67423, longitude: -1.55768 },
  { id: '151', name: 'Yahooda Hostel', latitude: 6.67463, longitude: -1.55657 },
  { id: '152', name: 'Delisa Hostel', latitude: 6.67408, longitude: -1.55792 },
  { id: '153', name: 'Asabek Hostel', latitude: 6.67481, longitude: -1.55790 },
  { id: '154', name: 'Samathel Hostel', latitude: 6.67424, longitude: -1.55713 },
  { id: '155', name: 'Nyberg Hostel', latitude: 6.67424, longitude: -1.55848 },
  { id: '156', name: 'Appiah Hostel', latitude: 6.67463, longitude: -1.55947 },
  { id: '157', name: 'Peace Hostel', latitude: 6.67441, longitude: -1.55929 },
  { id: '158', name: 'Millenium Hostel', latitude: 6.67466, longitude: -1.55998 },
  { id: '159', name: 'Paradise Hostel', latitude: 6.67458, longitude: -1.55961 },
  { id: '160', name: 'Frantina Hostel.', latitude: 6.67437, longitude: -1.56029 },
  { id: '161', name: 'Ankana HOSTEL', latitude: 6.67612, longitude: -1.56128 },
  { id: '162', name: 'Grace Homestel', latitude: 6.67660, longitude: -1.56096 },
  { id: '163', name: 'K&N Golden treasure Hostel', latitude: 6.67637, longitude: -1.56179 },
  { id: '164', name: 'Manu Memorial Hostel', latitude: 6.67568, longitude: -1.56249 },
  { id: '165', name: 'Christlike Hostel', latitude: 6.67407, longitude: -1.56214 },
  { id: '166', name: 'WAF Hostel', latitude: 6.67360, longitude: -1.56263 },
  { id: '167', name: 'Nana Adomah Hostel', latitude: 6.67283, longitude: -1.56246 },
  { id: '168', name: 'White House Hostel', latitude: 6.67320, longitude: -1.56217 },
  { id: '169', name: 'Christian Hostel', latitude: 6.67365, longitude: -1.56161 },
  { id: '170', name: 'FOT Hostel', latitude: 6.67488, longitude: -1.56192 },
  { id: '171', name: 'Morning Star Hostel', latitude: 6.67326, longitude: -1.56004 },
  { id: '172', name: 'Lion Of Judah Hostel', latitude: 6.67324, longitude: -1.56016 },
  { id: '173', name: 'Happy Family Hostel', latitude: 6.67201, longitude: -1.56055 },
  { id: '174', name: 'Frontline INN hostel', latitude: 6.67224, longitude: -1.56323 },
  { id: '175', name: 'Mac Hostel', latitude: 6.67115, longitude: -1.56225 },
  { id: '176', name: 'Jalex Hostel', latitude: 6.67090, longitude: -1.56243 },
  { id: '177', name: "St. Theresa's Hostel", latitude: 6.67132, longitude: -1.56119 },
  { id: '178', name: 'Frontline Apartment Hostel', latitude: 6.67187, longitude: -1.56082 },
  { id: '179', name: 'Amen Annex', latitude: 6.67126, longitude: -1.55993 },
  { id: '180', name: 'Amen Main Hostel', latitude: 6.67198, longitude: -1.55922 },
  { id: '181', name: 'Adom Bi Heights', latitude: 6.67230, longitude: -1.56012 },
  { id: '182', name: 'No Weapon Annex', latitude: 6.67060, longitude: -1.56106 },
  { id: '183', name: 'Ama Serwaa Hostel', latitude: 6.67030, longitude: -1.56052 },
  { id: '184', name: 'Franco Hostel', latitude: 6.66987, longitude: -1.56105 },

]

const SearchResultsScreen = ({ navigation, route }) => {
  const { query } = route.params;

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(query.toLowerCase())
  );

  const handlePlaceSelect = (place) => {
    navigation.navigate('Home', { location: place });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPlaces}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePlaceSelect(item)} style={styles.item}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No places found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default SearchResultsScreen;
