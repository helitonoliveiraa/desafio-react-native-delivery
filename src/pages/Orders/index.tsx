import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import * as S from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  thumbnail_url: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const { data } = await api.get<Food[]>('/orders');

      const formattedData = data.map(food => ({
        ...food,
        formattedPrice: formatValue(food.price),
      }));

      setOrders(formattedData);
    }

    loadOrders();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Meus pedidos</S.HeaderTitle>
      </S.Header>

      <S.FoodsContainer>
        <S.FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <S.Food key={item.id} activeOpacity={0.6}>
              <S.FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </S.FoodImageContainer>
              <S.FoodContent>
                <S.FoodTitle>{item.name}</S.FoodTitle>
                <S.FoodDescription>{item.description}</S.FoodDescription>
                <S.FoodPricing>{item.formattedPrice}</S.FoodPricing>
              </S.FoodContent>
            </S.Food>
          )}
        />
      </S.FoodsContainer>
    </S.Container>
  );
};

export default Orders;
