'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Page {
  id: number;
  src: string;
}

interface Config {
  totalPages: number;
}

interface FlipbookProps {
  demoPath: string;
}

export default function Flipbook({ demoPath }: FlipbookProps) {

  // Lazy image component that shows placeholder until loaded
  interface LazyImageProps {
    src: string;
    alt: string;
    shouldLoad: boolean;
    style: React.CSSProperties;
  }

  function LazyImage({ src, alt, shouldLoad, style }: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      if (shouldLoad && !isLoaded) {
        const img = new Image();
        img.onload = () => setIsLoaded(true);
        img.src = src;
      }
    }, [shouldLoad, src, isLoaded]);

    if (!shouldLoad || !isLoaded) {
      // Placeholder div with data-img attribute
      return (
        <div
          data-img={src}
          style={{
            ...style,
            // background: 'linear-gradient(135deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)',
            // backgroundSize: '200% 200%',
            // animation: 'shimmer 1.5s ease-in-out infinite',
          }}
        />
      );
    }

    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={style}
      />
    );
  }

  const bookRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPhysicalPage, setCurrentPhysicalPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Request fullscreen from parent iframe container
  const requestFullscreen = useCallback(() => {
    window.parent.postMessage('fullscreen', '*');
  }, []);

  // Listen for fullscreen state updates from parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'fullscreen:enter' || event.data === 'fullscreen:exit') {
        setIsFullscreen(event.data === 'fullscreen:enter');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Fetch config from JSON file
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${demoPath}/config.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch config');
        }
        const config: Config = await response.json();
        // Calculate padding based on total pages (e.g., 14 pages = 2 digits, 100 pages = 3 digits)
        const paddingLength = String(config.totalPages).length;
        // Generate page data dynamically based on totalPages
        const generatedPages: Page[] = Array.from({ length: config.totalPages }, (_, i) => ({
          id: i + 1,
          src: `${demoPath}/output/page-${String(i + 1).padStart(paddingLength, '0')}.png`,
        }));
        setPages(generatedPages);
      } catch (error) {
        console.error('Error loading config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [demoPath]);

  // Pair images: each physical page shows 2 images (front and back)
  // Each physical page shows: front = image[2*i], back = image[2*i+1]
  const physicalPageCount = Math.floor(pages.length / 2);
  const pageCount = physicalPageCount; // No covers, just content pages

  // Calculate which images should be loaded based on current page
  // Load images within 2 physical page flips (4 images before and after)
  const shouldLoadImage = useCallback((imageIndex: number) => {
    const currentImageStart = currentPhysicalPage * 2;
    const preloadRange = 2; // 2 physical pages = 4 images
    const minIndex = Math.max(0, currentImageStart - preloadRange * 2);
    const maxIndex = Math.min(pages.length - 1, currentImageStart + (preloadRange * 2) + 1);
    return imageIndex >= minIndex && imageIndex <= maxIndex;
  }, [currentPhysicalPage, pages.length]);

  // Track scroll position to determine current page
  useEffect(() => {
    if (!containerRef.current || pages.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageFlipHeight = window.innerHeight * 0.25;
      // Calculate which physical page we're on based on scroll position
      const estimatedPage = Math.floor(scrollY / pageFlipHeight);
      const clampedPage = Math.max(0, Math.min(estimatedPage, physicalPageCount - 1));
      setCurrentPhysicalPage(clampedPage);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pages.length, physicalPageCount]);

  useEffect(() => {
    if (!bookRef.current || !containerRef.current || pages.length === 0) return;

    const book = bookRef.current;
    const pageElements = book.querySelectorAll<HTMLElement>('.book__page');

    // Set initial z-index and z position based on total page count
    // pageElements.forEach((page, index) => {
    //   // First page starts at positive z, others go progressively back
    //   gsap.set(page, { z: index === 0 ? pageElements.length : -index * 1 });
    // });

    // Scale book on initial scroll
    // gsap.to(book, {
    //   scrollTrigger: {
    //     trigger: containerRef.current,
    //     scrub: 1,
    //     start: 'top top',
    //     end: () => window.innerHeight * 0.25,
    //   },
    //   scale: 1,
    // });

    // Animate each page flip
    pageElements.forEach((page, index) => {
      // Rotate page
      gsap.to(page, {
        rotateY: `-=${180}`,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          start: () => (index + 1) * (window.innerHeight * 0.25),
          end: () => (index + 2) * (window.innerHeight * 0.25),
        },
      });

      // Move page z position - dynamic based on total pages
      // gsap.to(page, {
      //   z: index === 0 ? -pageElements.length : index,
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     scrub: 1,
      //     start: () => (index + 1) * (window.innerHeight * 0.25),
      //     end: () => (index + 1.5) * (window.innerHeight * 0.25),
      //   },
      // });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pages]);

  // Scroll height: each page flip uses ~25vh; we have pageCount pages (incl. covers).
  // Use 50vh per page (like codepen) so there's enough scroll to reach all flips.
  const scrollHeightVh = pageCount * 45;

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: '100vh', background: '#4d4d4d' }}>
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: '100vh', background: '#4d4d4d' }}>
        <div className="text-white">No pages found in config</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full relative h-full "
      style={{
        height: `calc(${scrollHeightVh} * 1vh)`,
        background: '#e4e4e4',
        overflowX: 'hidden',
        // overflowY: "scroll"
      }}
    >
      {/* Fullscreen button - iOS Glass Effect */}
      <button
        onClick={requestFullscreen}
        className="fixed top-4 right-4 z-50 rounded-full p-3 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        style={{
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          // border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
        }}
      >
        {isFullscreen ? (
          // Minimize icon (exit fullscreen)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0, 0, 0, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '20px', height: '20px' }}
          >
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        ) : (
          // Maximize icon (enter fullscreen)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0, 0, 0, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '20px', height: '20px' }}

          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        )}
      </button>
      <div
        ref={bookRef}
        className="book flex flex-col items-center"
        style={{
          height: '96%',
          position: 'fixed',
          width: '48%',
          right: '2%',
          top: '2%',


          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%) scale(0.5)',
          // transform: 'scale(0.8)',
          transformStyle: 'preserve-3d',
          perspective: '1600px',
        }}
      >
        {Array.from({ length: physicalPageCount }, (_, pageIndex) => {
          const actualPageIndex = pageIndex + 1;
          const frontImageIndex = pageIndex * 2;
          const backImageIndex = pageIndex * 2 + 1;

          return (
            <div
              key={`page-${pageIndex}`}
              className="page book__page"
              style={{
                '--page-index': actualPageIndex,
                position: 'absolute',
                // left: '0%',
                // top: '50%',
                // borderRadius: '0 5% 5% 0',
                // transform: 'translate(0, -50%)',
                height: '100%',
                width: '100%',
                // z-index logic:
                // - Turned pages (left side): higher index = on top (range: 1 to currentPhysicalPage)
                // - Unturned pages (right side): lower index = on top (range: pageCount+1 to pageCount*2)
                zIndex: pageIndex < currentPhysicalPage
                  ? pageIndex + 1
                  : pageCount + (pageCount - pageIndex),
                transformOrigin: '0% 50%',
                transformStyle: 'preserve-3d',
              } as React.CSSProperties}
            >
              <div
                className="page__half page__half--front"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: 'rotateY(0deg) translate3d(0, 0, 0px)',
                  backfaceVisibility: 'hidden',
                  background: 'transparent',
                  // clipPath: 'inset(0 0.5% 0 0.5%)',
                }}
              >
                <LazyImage
                  src={pages[frontImageIndex].src}
                  alt={`Page ${frontImageIndex + 1}`}
                  shouldLoad={shouldLoadImage(frontImageIndex)}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '0 8px 8px 0',
                    objectFit: 'contain',
                    zIndex: 2,
                    objectPosition: 'left'
                  }}
                />

              </div>
              <div
                className="page__half page__half--back"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: 'rotateY(180deg) translate3d(0, 0, 0)',
                  // borderRadius: '5% 0 0 5%',
                  background: 'transparent',
                  backfaceVisibility: 'hidden',
                  // clipPath: 'inset(0 0.5% 0 0.5%)',
                }}
              >
                <LazyImage
                  src={pages[backImageIndex].src}
                  alt={`Page ${backImageIndex + 1}`}
                  shouldLoad={shouldLoadImage(backImageIndex)}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px 0 0 8px',
                    objectFit: 'contain',
                    zIndex: 2,
                    objectPosition: 'right'
                  }}
                />

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
