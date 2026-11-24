// ORGANISMO · HeroBanner = titular + texto + botón + abanico de portadas + selector de diapositiva
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '../atoms/Heading';
import { Image } from '../atoms/Image';

export const HeroBanner = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  return (
    <section className="hero" aria-roledescription="carrusel" aria-label="Destacados">
      <div className="hero__copy">
        <p className="hero__kicker">{slide.kicker}</p>
        <Heading level={1} size="display">{slide.titulo}</Heading>
        <p className="hero__text">{slide.texto}</p>
        <Link to={slide.to} className="btn btn-accent btn-lg">{slide.cta}</Link>
        <div className="hero__dots">
          {slides.map((s, i) => (
            <button key={s.titulo} type="button" className={i === index ? 'is-active' : ''}
              aria-label={`Ir a diapositiva ${i + 1}`} aria-current={i === index} onClick={() => setIndex(i)} />
          ))}
        </div>
      </div>
      <div className="hero__covers" aria-hidden="true">
        {slide.imagenes.map((src) => <Image key={src} src={src} className="hero__cover" />)}
      </div>
    </section>
  );
};
