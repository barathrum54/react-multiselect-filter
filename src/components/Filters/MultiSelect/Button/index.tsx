import React from 'react';
import "./style.css"
type ButtonProps = {
  text: string;
  onClick: () => void;
  isLoading: boolean;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, isLoading }) => {
  return (
    <button className='multi-select-button' onClick={onClick} disabled={isLoading}>{text}</button>
  );
};

export default Button;
