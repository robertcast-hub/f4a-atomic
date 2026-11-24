// ÁTOMO · Image
// Imagen con carga diferida y respaldo: si la ruta falla, muestra un recuadro neutro.
import { useState } from 'react';

export const Image = ({ src, alt = '', className = '', ...rest }) => {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return <span className={`img-fallback ${className}`.trim()} role={alt ? 'img' : undefined} aria-label={alt || undefined} />;
  }
  return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setFailed(true)} {...rest} />;
};
