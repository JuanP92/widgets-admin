import React from 'react';
import { createDocsTemplate } from '@teambit/docs.docs-template';

/**
 * use the provider to inject and wrap your component overview
 * with common needs like [routing](), [theming]() and [data fetching]().
 */
// eslint-disable-next-line react/prop-types
export function DocsProvider({ children }) {
  return <div>{children}</div>;
}

/**
 * customize the bit documentation template or
 * replace this with one of your own.
 */
export default createDocsTemplate(DocsProvider);
