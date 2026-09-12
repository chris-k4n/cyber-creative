import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TESTIMONIALS = [
  {
    author: 'James Hallagher',
    role: 'Marketer',
    avatar: '/assets/img/testi/testi-author-5.png',
    quote: 'Curabitur accumsan nec aliquam mauris placat primis lacinia egestas congue facilisis ligula leo sociosqu consequat.'
  },
  {
    author: 'Amelia Harper',
    role: 'Owner',
    avatar: '/assets/img/testi/testi-author-6.png',
    quote: 'Curabitur accumsan nec aliquam mauris placat primis lacinia egestas congue facilisis ligula leo sociosqu consequat.'
  },
  {
    author: 'Victoria Madison',
    role: 'Writer',
    avatar: '/assets/img/testi/testi-author-2.png',
    quote: 'Curabitur accumsan nec aliquam mauris placat primis lacinia egestas congue facilisis ligula leo sociosqu consequat.'
  },
  {
    author: 'Daniel Joseph',
    role: 'Writer',
    avatar: '/assets/img/testi/testi-author-1.png',
    quote: 'Curabitur accumsan nec aliquam mauris placat primis lacinia egestas congue facilisis ligula leo sociosqu consequat.'
  },
  {
    author: 'Victoria Morris',
    role: 'Developer',
    avatar: '/assets/img/testi/testi-author-3.png',
    quote: 'Curabitur accumsan nec aliquam mauris placat primis lacinia egestas congue facilisis ligula leo sociosqu consequat.'
  }
];

const PROJECTS_ACCORDION = [
  {
    id: 'collapseOne',
    num: '01',
    category: 'UI/UX Design',
    title: 'Marketing Solution For Brand',
    desc: 'Conubia elementum sodales molestie tempus gravida massa porta. Iaculis gravida feugiat tempor nulla orci imperdiet at aenean.',
    image: '/assets/img/project/project-1.png'
  },
  {
    id: 'collapseTwo',
    num: '02',
    category: 'Digital Marketing',
    title: 'Sass Mobile Dashboard Design',
    desc: 'Conubia elementum sodales molestie tempus gravida massa porta. Iaculis gravida feugiat tempor nulla orci imperdiet at aenean.',
    image: '/assets/img/project/project-1.png'
  },
  {
    id: 'collapseThree',
    num: '03',
    category: 'Application Design',
    title: 'App Design and Development',
    desc: 'Conubia elementum sodales molestie tempus gravida massa porta. Iaculis gravida feugiat tempor nulla orci imperdiet at aenean.',
    image: '/assets/img/project/project-1.png'
  },
  {
    id: 'collapseFour',
    num: '04',
    category: 'Software Development',
    title: 'Medical Website Development',
    desc: 'Conubia elementum sodales molestie tempus gravida massa porta. Iaculis gravida feugiat tempor nulla orci imperdiet at aenean.',
    image: '/assets/img/project/project-1.png'
  }
];

function ClientFeedbackSlider() {
  const totalItems = TESTIMONIALS.length;
  // Start centered on Victoria Madison (totalItems + 2 = index 7)
  const [slideIndex, setSlideIndex] = useState(totalItems + 2);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(360);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartXRef = useRef(0);
  const gap = 24;

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(window.innerWidth < 768 ? 290 : 360);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play: continuously advances smoothly on its own
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev + 1);
    }, 3400);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  // Seamless loop reset when transition finishes
  const handleTransitionEnd = () => {
    if (slideIndex >= totalItems * 2) {
      setIsTransitioning(false);
      setSlideIndex(slideIndex - totalItems);
    } else if (slideIndex < totalItems) {
      setIsTransitioning(false);
      setSlideIndex(slideIndex + totalItems);
    }
  };

  // Re-enable smooth transition after silent teleport
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Mouse & Touch Drag interactions
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setIsTransitioning(false);
    dragStartXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartXRef.current);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTransitioning(true);
    if (dragOffset < -60) {
      setSlideIndex((prev) => prev + 1);
    } else if (dragOffset > 60) {
      setSlideIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsTransitioning(false);
    dragStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - dragStartXRef.current);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTransitioning(true);
    if (dragOffset < -50) {
      setSlideIndex((prev) => prev + 1);
    } else if (dragOffset > 50) {
      setSlideIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  const step = cardWidth + gap;
  const currentCenterOffset = slideIndex * step + cardWidth / 2 - dragOffset;
  const activeDotIndex = ((slideIndex % totalItems) + totalItems) % totalItems;
  const allSlides = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div
      className="client-slider-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handleMouseUp();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="client-slider-track"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(calc(50vw - ${currentCenterOffset}px))`,
          transition: isTransitioning
            ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
            : 'none',
          gap: `${gap}px`
        }}
      >
        {allSlides.map((item, idx) => (
          <div
            key={idx}
            className="client-feedback-card"
            style={{ width: `${cardWidth}px`, flex: `0 0 ${cardWidth}px` }}
          >
            <div className="client-feedback-thumb">
              <img src={item.avatar} alt={item.author} draggable={false} />
            </div>
            <h4 className="author-name">{item.author}</h4>
            <span className="author-role">{item.role}</span>
            <p className="author-quote">"{item.quote}"</p>
          </div>
        ))}
      </div>

      {/* Pagination bullets */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '45px'
        }}
      >
        {TESTIMONIALS.map((_, i) => {
          const isActive = activeDotIndex === i;
          return (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIsTransitioning(true);
                setSlideIndex(totalItems + i);
              }}
              style={{
                width: isActive ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: isActive
                  ? 'var(--cc-primary)'
                  : 'rgba(255, 255, 255, 0.22)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)'
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState('collapseFour');
  const [activeProject, setActiveProject] = useState('collapseOne');

  return (
    <div className="home-wrapper">
      {/* 1. HERO SECTION (Identical to template index.html) */}
      <section className="hero-section">
        <div className="hero-bg-shape">
          <img src="/assets/img/bg-img/hero-bg-shape.png" alt="shape" />
        </div>
        <div className="hero-shape">
          <img src="/assets/img/shapes/hero-shape-1.png" alt="shape" />
        </div>
        <div className="hero-images">
          <img src="/assets/img/images/hero-img-1.png" alt="hero" />
          <img src="/assets/img/images/hero-img-2.png" alt="hero" />
          <img src="/assets/img/images/hero-img-3.png" alt="hero" />
        </div>
        <div className="hero-img">
          <img src="/assets/img/images/hero-img.png" alt="hero" />
        </div>
        <div className="container">
          <div className="hero-content">
            <h4 className="sub-title anim-text">Transforming</h4>
            <h2 className="title anim-text">Visions into</h2>
            <h3 className="bottom-title anim-text">Digital Reality</h3>
            <Link to="/about" className="hero-btn" aria-label="Explore About">
              <i className="fa-thin fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WORK PROCESS SECTION (Identical to template index.html) */}
      <section className="process-section pt-130 fade-wrapper">
        <div className="bg-shape">
          <img src="/assets/img/shapes/process-shape.png" alt="shape" />
        </div>
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              Work Process
            </h4>
            <h2 className="section-title overflow-hidden" data-text-animation data-split="word" data-duration="1">
              Follow 4 Easy Work Steps
            </h2>
          </div>
          <div className="row gy-lg-0 gy-5">
            <div className="col-lg-3 col-md-6">
              <div className="process-item fade-top">
                <div className="process-icon">
                  <div className="icon-border"></div>
                  <img className="dark-img" src="/assets/img/icon/process-1.png" alt="icon" />
                  <img className="light-img" src="/assets/img/icon/process-1-light.png" alt="icon" />
                </div>
                <div className="process-content">
                  <h3 className="title">Project Processing</h3>
                  <p>
                    Cursus euismod dictumst a non dis nisi <br />sociosqu mauris.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-item fade-top">
                <div className="process-icon">
                  <div className="icon-border"></div>
                  <img className="dark-img" src="/assets/img/icon/process-2.png" alt="icon" />
                  <img className="light-img" src="/assets/img/icon/process-2-light.png" alt="icon" />
                </div>
                <div className="process-content">
                  <h3 className="title">High Quality Products</h3>
                  <p>
                    Cursus euismod dictumst a non dis nisi <br />sociosqu mauris.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-item fade-top">
                <div className="process-icon">
                  <div className="icon-border"></div>
                  <img className="dark-img" src="/assets/img/icon/process-3.png" alt="icon" />
                  <img className="light-img" src="/assets/img/icon/process-3-light.png" alt="icon" />
                </div>
                <div className="process-content">
                  <h3 className="title">Huge Choice Products</h3>
                  <p>
                    Cursus euismod dictumst a non dis nisi <br />sociosqu mauris.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-item fade-top">
                <div className="process-icon">
                  <div className="icon-border"></div>
                  <img className="dark-img" src="/assets/img/icon/process-4.png" alt="icon" />
                  <img className="light-img" src="/assets/img/icon/process-4-light.png" alt="icon" />
                </div>
                <div className="process-content">
                  <h3 className="title">Quality Finished</h3>
                  <p>
                    Cursus euismod dictumst a non dis nisi <br />sociosqu mauris.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="process-text wow fade-in-bottom" data-wow-delay="400ms">
          <img className="dark-img" src="/assets/img/images/process-img.png" alt="process" />
          <img className="process-img-light light-img" src="/assets/img/images/process-img-light.png" alt="process" />
        </div>
      </section>

      {/* 3. ABOUT SECTION (Identical to template index.html) */}
      <section className="about-section pb-130">
        <div className="round-shape">
          <img src="/assets/img/shapes/round-shape.png" alt="shape" />
        </div>
        <div className="about-wrap">
          <div className="shape">
            <img src="/assets/img/shapes/about-dot-shape.png" alt="shape" />
          </div>
          <div className="row about-wrapper align-items-center">
            <div className="col-lg-7">
              <div className="about-content fade-wrapper">
                <div className="section-heading mb-0">
                  <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
                    About Our Company
                  </h4>
                  <h2 className="section-title overflow-hidden" data-text-animation data-split="word" data-duration="1">
                    We provide best web design <br />solution in city
                  </h2>
                  <p className="fade-top">
                    Digital marketing is the act of promoting and selling products and services by leveraging online marketing tactics such as social media marketing, search marketing, and email marketing. When you get down to it, digital marketing is simply marketing.
                  </p>
                  <div className="about-btn fade-top">
                    <Link to="/about" className="rr-primary-btn">
                      Get Started Now<i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="about-img-wrap">
                <div className="img-shape"></div>
                <div className="about-img reveal">
                  <img className="img-1" src="/assets/img/images/about-img.jpg" alt="img" />
                </div>
                <div className="about-img-2 reveal">
                  <img className="img-2" src="/assets/img/images/about-img-1.jpg" alt="img" />
                </div>
              </div>
            </div>
          </div>
          <div className="about-text">
            <img className="dark-img" src="/assets/img/images/about-text.png" alt="about" />
            <img className="light-img" src="/assets/img/images/about-text-light.png" alt="about" />
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (Identical to template index.html) */}
      <section className="service-section pb-130 fade-wrapper">
        <div className="shape">
          <img src="/assets/img/shapes/service-shape-1.png" alt="shape" />
        </div>
        <div className="bg-color"></div>
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              What We Offer For You
            </h4>
            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
              Services We Provide
            </h2>
          </div>
          <div className="row gy-lg-0 gy-4">
            {/* 01 Designing */}
            <div className="col-lg-3 col-md-6">
              <div className="service-item md-pb-30 fade-top">
                <h4 className="service-text">
                  <Link to="/services">/Designing</Link>
                </h4>
                <div className="service-thumb">
                  <div className="overlay-color"></div>
                  <div className="transparent-shape">
                    <img src="/assets/img/shapes/service-shape.png" alt="shape" />
                  </div>
                  <img src="/assets/img/service/service-2.jpg" alt="service" />
                  <div className="service-icon">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50.3639 36.3801L45.2404 33.8184L41.9797 25.3365C41.9413 25.2363 41.8826 25.145 41.8074 25.0684C41.7321 24.9918 41.6419 24.9315 41.5423 24.8914L21.3101 16.8039C21.1686 16.7476 21.0138 16.7339 20.8646 16.7644C20.7155 16.7949 20.5785 16.8684 20.4705 16.9758L17.7721 19.6742C17.6661 19.7822 17.5939 19.9187 17.5641 20.0671C17.5343 20.2155 17.5482 20.3693 17.6042 20.5099L25.6916 40.7421C25.7317 40.8417 25.792 40.9319 25.8686 41.0072C25.9452 41.0824 26.0365 41.1411 26.1368 41.1794L34.6186 44.4402L37.1803 49.5636C37.2343 49.6766 37.3146 49.775 37.4145 49.8504C37.5144 49.9258 37.6309 49.9761 37.7544 49.9971C37.7959 50.001 37.8378 50.001 37.8793 49.9971C38.0861 49.9962 38.2841 49.9134 38.4299 49.7667L50.5669 37.6297C50.6563 37.5435 50.7237 37.4373 50.7638 37.3198C50.8039 37.2023 50.8154 37.077 50.7973 36.9541C50.7764 36.8307 50.726 36.7142 50.6506 36.6143C50.5752 36.5144 50.4768 36.434 50.3639 36.3801Z" fill="currentColor" />
                    </svg>
                  </div>
                  <Link to="/services" className="service-btn">
                    Read Details <i className="fa-regular fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* 02 Development */}
            <div className="col-lg-3 col-md-6">
              <div className="service-item md-pb-30 fade-top">
                <h4 className="service-text">
                  <Link to="/services">/Development</Link>
                </h4>
                <div className="service-thumb">
                  <div className="overlay-color"></div>
                  <div className="transparent-shape">
                    <img src="/assets/img/shapes/service-shape.png" alt="shape" />
                  </div>
                  <img src="/assets/img/service/service-1.jpg" alt="service" />
                  <div className="service-icon">
                    <svg width="51" height="50" viewBox="0 0 51 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.96582 0C8.59527 0 7.46745 1.12782 7.46745 2.4984V29.1651C7.46745 30.2773 9.13574 30.2773 9.13574 29.1651V8.33663H42.4642V29.1651C42.439 30.3014 44.1564 30.3014 44.1308 29.1651V2.4984C44.1308 1.12782 43.0047 0 41.6341 0H9.96582Z" fill="currentColor" />
                    </svg>
                  </div>
                  <Link to="/services" className="service-btn">
                    Read Details <i className="fa-regular fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* 03 User Experience */}
            <div className="col-lg-3 col-md-6">
              <div className="service-item item-3 fade-top">
                <h4 className="service-text">
                  <Link to="/services">/User Experience</Link>
                </h4>
                <div className="service-thumb">
                  <div className="overlay-color"></div>
                  <div className="transparent-shape">
                    <img src="/assets/img/shapes/service-shape.png" alt="shape" />
                  </div>
                  <img src="/assets/img/service/service-3.jpg" alt="service" />
                  <div className="service-icon">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.0491 13.9814C22.483 12.8947 22.5755 11.6017 23.2903 10.6067C23.5142 10.2953 23.9481 10.2242 24.2596 10.4479C24.5711 10.6717 24.6422 11.1057 24.4184 11.4172C24.0113 11.984 23.9586 12.7206 24.281 13.3396C24.5998 13.9516 25.223 14.3291 25.9115 14.3291Z" fill="currentColor" />
                    </svg>
                  </div>
                  <Link to="/services" className="service-btn">
                    Read Details <i className="fa-regular fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* 04 Mobile Solution */}
            <div className="col-lg-3 col-md-6">
              <div className="service-item fade-top">
                <h4 className="service-text">
                  <Link to="/services">/Mobile Solution</Link>
                </h4>
                <div className="service-thumb">
                  <div className="overlay-color"></div>
                  <div className="transparent-shape">
                    <img src="/assets/img/shapes/service-shape.png" alt="shape" />
                  </div>
                  <img src="/assets/img/service/service-4.jpg" alt="service" />
                  <div className="service-icon">
                    <svg width="51" height="50" viewBox="0 0 51 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M41.3442 15.5832L36.0374 10.2764C35.9281 10.1661 35.7901 10.0886 35.6391 10.0525C35.4881 10.0163 35.33 10.023 35.1826 10.0719C35.0353 10.1207 34.9044 10.2096 34.8048 10.3288C34.7052 10.4479 34.6408 10.5924 34.6189 10.7462Z" fill="currentColor" />
                    </svg>
                  </div>
                  <Link to="/services" className="service-btn">
                    Read Details <i className="fa-regular fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION (Identical to template index.html) */}
      <section className="faq-section pt-130 pb-130">
        <div className="faq-shape">
          <img src="/assets/img/shapes/faq-shape-1.png" alt="shape" />
        </div>
        <div className="faq-top-shape"></div>
        <div className="container">
          <div className="row gy-lg-0 gy-4">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="faq-content">
                <div className="section-heading">
                  <h4 className="sub-heading after-none" data-text-animation="fade-in" data-duration="1.5">
                    Just Ask us some question
                  </h4>
                  <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                    Digital Solution That Improve Your Agency Growth
                  </h2>
                </div>
                <div className="accordion fade-wrapper" id="accordionExampleTwo">
                  <div className="accordion-item fade-top">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className={`accordion-button ${activeFaq === 'collapseFour' ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === 'collapseFour' ? '' : 'collapseFour')}
                      >
                        What kind of services do you offer?
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeFaq === 'collapseFour' ? 'show' : ''}`}>
                      <div className="accordion-body">
                        Risus cum orci sollicitudin fringilla lectus neque rhoncus eget pretium magna, accumsan ante torquent a pellentesque tellus fermentum cursus.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item fade-top">
                    <h2 className="accordion-header" id="headingFive">
                      <button
                        className={`accordion-button ${activeFaq === 'collapseFive' ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === 'collapseFive' ? '' : 'collapseFive')}
                      >
                        What kind of technology do you use?
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeFaq === 'collapseFive' ? 'show' : ''}`}>
                      <div className="accordion-body">
                        Risus cum orci sollicitudin fringilla lectus neque rhoncus eget pretium magna, accumsan ante torquent a pellentesque tellus fermentum cursus.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item fade-top">
                    <h2 className="accordion-header" id="headingSix">
                      <button
                        className={`accordion-button ${activeFaq === 'collapseSix' ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === 'collapseSix' ? '' : 'collapseSix')}
                      >
                        How much experience do you have?
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeFaq === 'collapseSix' ? 'show' : ''}`}>
                      <div className="accordion-body">
                        Risus cum orci sollicitudin fringilla lectus neque rhoncus eget pretium magna, accumsan ante torquent a pellentesque tellus fermentum cursus.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="faq-img reveal text-center">
                <img src="/assets/img/images/faq-img.png" alt="faq" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RUNNING TEXT TESTIMONIAL TICKER */}
      <div
        className="running-text testi"
        style={{
          position: 'relative',
          zIndex: 1,
          marginBottom: '20px',
          overflow: 'hidden'
        }}
      >
        <div className="carouselTicker carouselTicker-nav" data-speed="fast" style={{ overflow: 'hidden' }}>
          <ul
            className="text-anim carouselTicker__list"
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'marqueeScroll 25s linear infinite',
              alignItems: 'center',
              margin: 0,
              padding: 0
            }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          >
            <li>CUSTOMER TESTIMONIAL .</li>
            <li>CLIENT FEEDBACKS .</li>
            <li>CUSTOMER TESTIMONIAL .</li>
            <li>CLIENT FEEDBACKS .</li>
            <li>CUSTOMER TESTIMONIAL .</li>
            <li>CLIENT FEEDBACKS .</li>
            <li>CUSTOMER TESTIMONIAL .</li>
            <li>CLIENT FEEDBACKS .</li>
          </ul>
        </div>
      </div>

      {/* 7. CLIENT FEEDBACKS AUTO-SLIDER SECTION */}
      <section
        className="testimonial-section overflow-hidden"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '20px',
          paddingBottom: '80px'
        }}
      >
        <ClientFeedbackSlider />
      </section>

      {/* 8. PROJECT GALLERY ACCORDION SECTION */}
      <section className="project-section pt-130 pb-130">
        <div className="container">
          <div className="project-top heading-space align-items-end fade-wrapper">
            <div className="section-heading mb-0">
              <h4 className="sub-heading after-none" data-text-animation="fade-in" data-duration="1.5">
                Project Showcase
              </h4>
              <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                Let’s Look Our Recent <br /> Project Gallery
              </h2>
            </div>
            <div className="project-top-btn fade-top">
              <Link to="/portfolio" className="rr-primary-btn">
                View More Project<i className="fa-regular fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="project-accordion fade-wrapper">
            <div className="accordion" id="projectAccordion">
              {PROJECTS_ACCORDION.map((proj) => {
                const isOpen = activeProject === proj.id;
                return (
                  <div className="accordion-item project-item fade-top" key={proj.id}>
                    <h2 className="accordion-header" id={`heading_${proj.id}`}>
                      <button
                        className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setActiveProject(isOpen ? '' : proj.id)}
                      >
                        <span className="project-content">
                          <span className="number">{proj.num}</span>
                          <span className="project-right">
                            <span className="category">{proj.category}</span>
                            <span className="title">{proj.title}</span>
                          </span>
                        </span>
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                      <div className="accordion-body">
                        <div className="hover-content">
                          <div className="content-left">
                            <p>{proj.desc}</p>
                            <Link to="/portfolio" className="rr-primary-btn">
                              View Details<i className="fa-regular fa-arrow-right"></i>
                            </Link>
                          </div>
                          <div className="content-right">
                            <div className="project-thumb">
                              <img src={proj.image} alt={proj.title} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 9. DOUBLE RUNNING MARQUEE TICKERS (Identical to template index.html) */}
      <div className="running-text running-1">
        <div className="carouselTicker carouselTicker-nav" data-speed="fast" style={{ overflow: 'hidden' }}>
          <ul className="text-anim carouselTicker__list" style={{ display: 'flex', width: 'max-content', animation: 'marqueeScroll 26s linear infinite' }}>
            <li>Digital Solution</li>
            <li>Development</li>
            <li>Strategy</li>
            <li>Creative Agency</li>
            <li>Design</li>
            <li>Solution</li>
            <li>Branding</li>
            <li>Idea</li>
            <li>Strategy</li>
            <li>Creative Agency</li>
            <li>Design</li>
            <li>Solution</li>
            <li>Digital Solution</li>
            <li>Development</li>
            <li>Strategy</li>
            <li>Creative Agency</li>
          </ul>
        </div>
      </div>

      <div className="running-text">
        <div className="carouselTicker carouselTicker-start" data-speed="fast" style={{ overflow: 'hidden' }}>
          <ul className="text-anim carouselTicker__list" style={{ display: 'flex', width: 'max-content', animation: 'marqueeScroll 24s linear infinite reverse' }}>
            <li>Digital Solution</li>
            <li>Development</li>
            <li>Strategy</li>
            <li>Creative Agency</li>
            <li>Design</li>
            <li>Solution</li>
            <li>Branding</li>
            <li>Idea</li>
            <li>Strategy</li>
            <li>Creative Agency</li>
            <li>Design</li>
            <li>Solution</li>
            <li>Digital Solution</li>
            <li>Development</li>
            <li>Strategy</li>
            <li>Creative Agency</li>
          </ul>
        </div>
      </div>

      {/* 10. BLOG SECTION (Identical to template index.html) */}
      <section className="blog-section pt-130 pb-130 fade-wrapper">
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              NEWS & LATEST UPDATES
            </h4>
            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
              Check Our Company Inside Story
            </h2>
          </div>
          <div className="post-wrap">
            <div className="post-card-wrap fade-top">
              <div className="post-card">
                <div className="post-thumb">
                  <img src="/assets/img/blog/post-1.jpg" alt="post" />
                </div>
                <div className="post-content-wrap">
                  <div className="post-content">
                    <ul className="post-meta">
                      <li><i className="fa-sharp fa-regular fa-clock"></i>25 June, 2024</li>
                      <li><i className="fa-light fa-user"></i>Post by: Admin</li>
                    </ul>
                    <h3 className="title">
                      <Link to="/about">The Future-Focused Strategies of Our Forward-Thinking Web Design Agency</Link>
                    </h3>
                    <Link to="/about" className="rr-primary-btn blog-btn">
                      Read More <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-card-wrap fade-top">
              <div className="post-card">
                <div className="post-thumb">
                  <img src="/assets/img/blog/post-2.jpg" alt="post" />
                </div>
                <div className="post-content-wrap">
                  <div className="post-content">
                    <ul className="post-meta">
                      <li><i className="fa-sharp fa-regular fa-clock"></i>25 June, 2024</li>
                      <li><i className="fa-light fa-user"></i>Post by: Admin</li>
                    </ul>
                    <h3 className="title">
                      <Link to="/about">A Deep Dive into the Impactful Branding Strategies of Our Web Design Agency</Link>
                    </h3>
                    <Link to="/about" className="rr-primary-btn blog-btn">
                      Read More <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-card-wrap fade-top">
              <div className="post-card">
                <div className="post-thumb">
                  <img src="/assets/img/blog/post-3.jpg" alt="post" />
                </div>
                <div className="post-content-wrap">
                  <div className="post-content">
                    <ul className="post-meta">
                      <li><i className="fa-sharp fa-regular fa-clock"></i>25 June, 2024</li>
                      <li><i className="fa-light fa-user"></i>Post by: Admin</li>
                    </ul>
                    <h3 className="title">
                      <Link to="/about">How Our Web Design Agency Ensures Your Website Rises to the Top of Search Rankings</Link>
                    </h3>
                    <Link to="/about" className="rr-primary-btn blog-btn">
                      Read More <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. SPONSOR SECTION (Identical to template index.html) */}
      <section className="sponsor-section pb-130">
        <div className="container">
          <div className="sponsor-wrap">
            <div className="sponsor-item item-1">
              <h3 className="title">
                WORKED WITH <br />GLOBAL LARGEST <br /> BRANDS
              </h3>
            </div>
            <div className="sponsor-item">
              <a href="#"><img src="/assets/img/sponsor/sponsor-1.png" alt="sponsor" /></a>
            </div>
            <div className="sponsor-item">
              <a href="#"><img src="/assets/img/sponsor/sponsor-2.png" alt="sponsor" /></a>
            </div>
            <div className="sponsor-item">
              <a href="#"><img src="/assets/img/sponsor/sponsor-3.png" alt="sponsor" /></a>
            </div>
            <div className="sponsor-item">
              <a href="#"><img src="/assets/img/sponsor/sponsor-4.png" alt="sponsor" /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
