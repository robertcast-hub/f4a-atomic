// ORGANISMO · FaqAccordion = lista de preguntas que se abren y cierran (estado local)
import { useState } from 'react';
import { Icon } from '../atoms/Icon';

export const FaqAccordion = ({ items }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map((f, i) => (
        <div className={`faq__item ${open === i ? 'is-open' : ''}`} key={f.q}>
          <h2 className="faq__q">
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}<Icon name="chevron" />
            </button>
          </h2>
          {open === i && <p className="faq__a">{f.a}</p>}
        </div>
      ))}
    </div>
  );
};
