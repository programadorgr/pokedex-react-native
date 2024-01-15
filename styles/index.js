import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');
export const cardStyles = StyleSheet.create({
  container: {
    /* width: 200, */
    width: '45%',
    height: height * 0.4,
    backgroundColor: '#1b1b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: '5%',
    marginBottom: 18,
    borderColor: '#000',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 8,
    textTransform: 'capitalize',
  },
  number: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    marginRight: '5%',
    marginBottom: '4%',
  },
  title: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  search: {
    backgroundColor: '#8fbcec',
    borderRadius: 12,
    paddingLeft: 20,
    fontSize: 16,
    color: '#ffffff',
  },
});

export const favoritesStyles = StyleSheet.create({
  container: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 18,
  },
});

export const homeStyles = StyleSheet.create({
  container: {
    marginLeft: '5%',
    marginTop: 18,
  },
});

export const aboutStyles = StyleSheet.create({
  container: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 18,
  },
  parrafo: {
    fontSize: 23,
    marginTop: 20,
    marginBottom: 20,
  },
  usuarios: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 10,
  },
});

export const ErrorStyles = StyleSheet.create({
  container: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 12,
    textAlign: 'center',
  },
  tipo: {
    fontSize: 23,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  mensaje: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
});
