import React from 'react';

interface EMWProps {
  children: React.ReactNode;
}

/**
 * Simple wrapper component that just renders its children
 * EMW = Element/Component Wrapper
 */
const EMW: React.FC<EMWProps> = ({ children }) => children;

export default EMW;
