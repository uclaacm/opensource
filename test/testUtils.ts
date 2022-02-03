import { render } from '@testing-library/react';
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

const Providers = ({ children }) => {
  return children;
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
};

// boilerplate code
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: JSX.Element, options = {}): any =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
