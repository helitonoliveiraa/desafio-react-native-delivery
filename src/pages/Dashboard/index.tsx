import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import Logo from '../../assets/logo-header.png';
import SearchInput from '../../components/SearchInput';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import { useTheme } from '../../context/index';

import * as S from './styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  formattedPrice: string;
}

interface Category {
  id: number;
  title: string;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const { toggleTheme, currentTheme } = useTheme();

  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isFoodVisible, setIsFoodVisible] = useState(false);
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  async function handleNavigate(id: number): Promise<void> {
    // Navigate do ProductDetails page
    navigation.navigate('FoodDetails', { id });
  }

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const { data } = await api.get<Food[]>('/foods', {
        params: {
          name_like: searchValue,
          category_like: selectedCategory,
        },
      });

      const formattedData = data.map(food => ({
        ...food,
        formattedPrice: formatValue(food.price),
      }));

      setFoods(formattedData);

      setTimeout(() => {
        setIsFoodVisible(true);
      }, 2000);
    }

    loadFoods();
  }, [selectedCategory, searchValue]);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/categories');

      setCategories(response.data);

      setTimeout(() => {
        setIsCategoryVisible(true);
      }, 2000);

      // setIsCategoryVisible(true);
    }

    loadCategories();
  }, []);

  function handleSelectCategory(id: number): void {
    setSelectedCategory(selectedCategory === id ? undefined : id);
  }

  return (
    <S.Container>
      <S.Header>
        <Image source={Logo} />
        <S.ToggleButton onPress={toggleTheme}>
          {currentTheme.title === 'light' ? (
            <Icon name="sun" size={24} color={currentTheme.colors.secondary} />
          ) : (
            <Icon name="moon" size={24} color={currentTheme.colors.texts} />
          )}
        </S.ToggleButton>
      </S.Header>
      <S.FilterContainer>
        <SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Qual comida você procura?"
        />
      </S.FilterContainer>
      <ScrollView>
        <S.CategoryContainer>
          <S.Title>Categorias</S.Title>
          <S.CategorySlider
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map(category => (
              <ShimmerPlaceholder
                key={category.id}
                style={styles.categoryItem}
                visible={isCategoryVisible}
              >
                <S.CategoryItem
                  key={category.id}
                  isSelected={category.id === selectedCategory}
                  onPress={() => handleSelectCategory(category.id)}
                  activeOpacity={0.6}
                  testID={`category-${category.id}`}
                >
                  <Image
                    style={{ width: 56, height: 56 }}
                    source={{ uri: category.image_url }}
                  />

                  <S.CategoryItemTitle
                    isSelected={category.id === selectedCategory}
                  >
                    {category.title}
                  </S.CategoryItemTitle>
                </S.CategoryItem>
              </ShimmerPlaceholder>
            ))}
          </S.CategorySlider>
        </S.CategoryContainer>
        <S.FoodsContainer>
          <S.Title>Pratos</S.Title>
          <S.FoodList>
            {foods.map(food => (
              <S.Food
                key={food.id}
                onPress={() => handleNavigate(food.id)}
                activeOpacity={0.6}
                testID={`food-${food.id}`}
              >
                <S.FoodImageContainer>
                  <ShimmerPlaceholder
                    style={styles.foodImg}
                    visible={isFoodVisible}
                  >
                    <Image
                      style={{ width: 88, height: 88 }}
                      source={{ uri: food.thumbnail_url }}
                    />
                  </ShimmerPlaceholder>
                </S.FoodImageContainer>
                <S.FoodContent>
                  <ShimmerPlaceholder
                    style={styles.foodTitle}
                    visible={isFoodVisible}
                  >
                    <S.FoodTitle>{food.name}</S.FoodTitle>
                  </ShimmerPlaceholder>

                  <ShimmerPlaceholder
                    style={styles.foodDescription}
                    visible={isFoodVisible}
                  >
                    <S.FoodDescription>{food.description}</S.FoodDescription>
                  </ShimmerPlaceholder>

                  <ShimmerPlaceholder
                    style={styles.foodPrice}
                    visible={isFoodVisible}
                  >
                    <S.FoodPricing>{food.formattedPrice}</S.FoodPricing>
                  </ShimmerPlaceholder>
                </S.FoodContent>
              </S.Food>
            ))}
          </S.FoodList>
        </S.FoodsContainer>
      </ScrollView>
    </S.Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  categoryItem: {
    height: 120,
    width: 120,
    borderRadius: 8,
    marginRight: 8,
  },

  foodContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 16,
  },

  foodImg: {
    width: 88,
    height: 88,
    borderRadius: 40,
  },

  foodTitle: {
    width: 150,
  },

  foodDescription: {
    width: 200,
    marginTop: 2,
  },

  foodPrice: {
    width: 80,
    marginTop: 2,
  },
});
