import React from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import * as S from './styles';

import Background from '../../assets/home-background.png';
import Logo from '../../assets/logo.png';

const Home: React.FC = () => {
  const navigation = useNavigation();

  async function handleNavigate(): Promise<void> {
    navigation.navigate('MainBottom', {
      screen: 'Dashboard',
    });
  }

  return (
    <S.BackgroundImage
      source={Background}
      imageStyle={{
        width: 313,
        height: 427,
      }}
    >
      <S.Container>
        <Image source={Logo} />
        <S.Title>Uma verdadeira experiência Italiana.</S.Title>
      </S.Container>
      <S.NavigationButton onPress={() => handleNavigate()}>
        <S.ButtonText>Entrar no Restaurant</S.ButtonText>
        <S.IconContainer>
          <Icon name="log-in" size={24} color="#7A1818" />
        </S.IconContainer>
      </S.NavigationButton>
    </S.BackgroundImage>
  );
};

export default Home;
