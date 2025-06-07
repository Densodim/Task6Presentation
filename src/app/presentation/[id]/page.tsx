'use client';

import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks';
import {
  fetchSlides,
  selectLoading,
  selectSlide,
} from '../../../../lib/store/slideSlice';

export default function RevealPresentation() {
  const dispatch = useAppDispatch();
  const slides = useAppSelector(selectSlide);
  const loading = useAppSelector(selectLoading);

  const deckRef = useRef<Reveal.Api | null>(null);
  const revealElRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const presentationId: string | undefined = pathname
    .split('/')
    .filter(Boolean)
    .pop();

  useEffect(() => {
    if (presentationId) {
      dispatch(fetchSlides(presentationId));
    }
  }, [dispatch, presentationId]);

  useEffect(() => {
    if (loading || !revealElRef.current) return;

    deckRef.current = new Reveal(revealElRef.current, {
      transition: 'slide',
    });

    deckRef.current.initialize();

    return () => {
      if (deckRef.current) {
        deckRef.current.destroy();
        deckRef.current = null;
      }
    };
  }, [loading]);

  if (loading) {
    return <div>Loading slides...</div>;
  }

  return (
    <div className="reveal" ref={revealElRef}>
      <div className="slides">
        {slides.map((slide) => (
          <section
            key={slide.id}
            style={{ background: slide.background || undefined }}
          >
            <h2>Slide #{slide.order}</h2>
            <p>ID: {slide.id}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
