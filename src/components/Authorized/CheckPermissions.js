import React from 'react';
import PromiseRender from './PromissRender';
import { CURRENT } from './index';

const checkPermissons = (authority, currentAuthority, target, Exception) => {
  if (!authority) {
    return target;
  }

  if (authority.constructor.name === 'Array') {
    if (authority.includes(currentAuthority)) {
      return target;
    }
    return Exception;
  }

  if (authority.constructor.name === 'String') {
    if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }

  if (authority.constructor.name === 'Promise') {
    return () => (
      <PromiseRender ok={target} error={Exception} promise={authority} />
    );
  }

  if (authority.constructor.name === 'Function') {
    try {
      const bool = authority();
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported perameters');
}

export { checkPermissons };
const check = (authority, target, Exception) => {
  return checkPermissons(authority, CURRENT, target, Exception);
}

export default check;
