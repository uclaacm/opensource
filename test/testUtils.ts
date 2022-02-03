import { render } from '@testing-library/react';
import React from 'react';

// boilerplate code
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: ({children}) => children, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
