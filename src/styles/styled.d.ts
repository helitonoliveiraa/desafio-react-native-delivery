import 'styled-components';

import { light as lightTheme } from './themes';

export type Theme = typeof lightTheme;

declare module 'styled-component' {
  export interface DefaultTheme extends Theme {}
}
