// ÁTOMO · Heading
// Título semántico: `level` decide la etiqueta (h1…h6) y `size` el tamaño visual, por separado.
export const Heading = ({ level = 2, size, children, className = '', ...rest }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={`heading heading--${size ?? level} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};
