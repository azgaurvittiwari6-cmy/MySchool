import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

// --- Components ---

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <a href="/">
            <img src="/logo.jpg" alt="Trinity School Logo" className="nav-logo" />
          </a>
        </div>
        
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="navLinks">
          <a href="#" className="nav-link active">Home</a>
          <a href="#faculty" className="nav-link">Leadership</a>
          <a href="#events" className="nav-link">Events</a>
          <a href="#facilities" className="nav-link">Facilities</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <button onClick={toggleTheme} className="theme-btn">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a href="#admissions" className="btn btn-secondary btn-sm">Enquire Now</a>
        </div>

        <button 
          className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  )
}

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true)
      }
    }, { threshold: 0.5 })

    if (countRef.current) observer.observe(countRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [hasStarted, end, duration])

  return <span ref={countRef}>{count}{suffix}</span>
}


const Hero = () => (
  <section className="hero-modern">
    <div className="hero-bg-image-container">
      <img src="https://www.trinityschool.in/uploads/slider/banner_692acedc42c38.jpg" alt="Trinity School Campus" className="hero-bg-image" />
    </div>
    <div className="hero-overlay-dark"></div>
    <div className="container hero-container fade-in">
      <div className="hero-breadcrumb">Home / The School / <span className="active-crumb">Overview</span></div>
      <div className="hero-content-modern">
        <div className="hero-badge">Sector 14, Omaxe City</div>
        <h1 className="hero-title">Premier Education in Bahadurgarh</h1>
        <p className="hero-motto">"Toil & Perseverance"</p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number"><Counter end={20} suffix="+" /></span>
            <span className="stat-label">Years of Excellence</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">CBSE</span>
            <span className="stat-label">Affiliated School</span>
          </div>
          <div className="stat-item">
            <span className="stat-number"><Counter end={100} suffix="%" /></span>
            <span className="stat-label">Result Track</span>
          </div>
        </div>
        <div className="hero-actions">
          <a href="https://www.trinityschool.in/uploads/banner/1729066415trinity-banner.jpg" target="_blank" className="btn btn-secondary">Trinity School App</a>
          <a href="https://www.uniapply.com/school/trinity-school-sector-14-bahadurgarh-jhajjar/" target="_blank" className="btn btn-outline">Apply via UniApply</a>
        </div>
      </div>
    </div>
  </section>
)



const Faculty = () => (
  <section className="section-padding faculty reveal" id="faculty">
    <div className="container">
      <div className="section-header text-center">
        <h2 className="section-title">Our Leadership</h2>
        <div className="title-underline"></div>
        <p className="section-subtitle">Meet the visionaries behind Trinity School's excellence.</p>
      </div>
      
      <div className="faculty-grid">
        <div className="faculty-card">
          <div className="faculty-img-wrapper">
             <img src="/principal.jpg" alt="Principal" />
          </div>
          <h3>Principal</h3>
          <p>Trinity School</p>
        </div>
      </div>
    </div>
  </section>
)

const Highlights = () => (
  <section className="section-padding highlights secondary-bg reveal" id="why-trinity">
    <div className="container">
      <div className="section-header text-center">
        <h2 className="section-title">Why Trinity School?</h2>
        <div className="title-underline"></div>
        <p className="section-subtitle">Empowering students with knowledge, discipline, and holistic growth.</p>
      </div>
      
      <div className="highlights-grid">
        {[
          { icon: '📚', title: 'Academic Excellence', text: 'Strict adherence to CBSE curriculum with modern teaching methods.' },
          { icon: '🚀', title: 'Holistic Growth', text: 'From sports to arts, we believe in nurturing every facet of a child.' },
          { icon: '🛡️', title: 'Safe Environment', text: 'A secure campus with 24/7 surveillance and dedicated staff.' },
          { icon: '💡', title: 'Modern Facilities', text: 'Smart classrooms, advanced labs, and a resource-rich library.' }
        ].map((item, idx) => (
          <div key={idx} className="highlight-card">
            <div className="card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  
  const faqs = [
    { q: "What is the admission procedure?", a: "Admissions are based on a simple interaction with the child and parents. You can apply via UniApply or visit the school for an inquiry form." },
    { q: "Is transport facility available?", a: "Yes, we provide safe and secure GPS-enabled transport across Bahadurgarh and nearby areas." },
    { q: "What are the school timings?", a: "Nursery to UKG: 8:30 AM - 12:30 PM. Classes 1 to 10: 8:00 AM - 2:30 PM." },
    { q: "Does the school offer extracurricular activities?", a: "Absolutely! We have dedicated periods for sports, music, dance, and arts every week." }
  ]

  return (
    <section className="section-padding faq-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Common Questions</h2>
          <div className="title-underline"></div>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${activeIndex === i ? 'active' : ''}`} onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
              <div className="faq-question">
                <h4>{faq.q}</h4>
                <span className="faq-icon">{activeIndex === i ? '-' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



const Gallery = () => {
  const images = [
    { src: "data:image/jpeg;base64,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氣勢磅礴，具有藝術感。", alt: "School Visual 1" },
    { src: "https://lh4.googleusercontent.com/proxy/0UktG9BWu9aRwKQwMQblHxuZC3kzohxATD-1-PQ0WOc3WjdAktI6iOBAKXLJqrqyZS2Va0kciOGKy38sW6XXdAVpOgvCWLKFAHH9tcyynag3Y2tc", alt: "School Visual 2" }
  ]

  return (
    <section className="section-padding gallery reveal" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Campus Gallery</h2>
          <div className="title-underline"></div>
        </div>
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div key={idx} className="gallery-item">
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


const InquiryForm = () => {
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      e.target.reset()
    }, 3000)
  }

  return (
    <section className="section-padding inquiry-section reveal" id="admissions">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Admission Inquiry</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Fill out the form below and we'll get back to you shortly.</p>
        </div>
        
        <div className="form-container">
          {submitted ? (
            <div className="success-message">
              <h3>✅ Thank You!</h3>
              <p>Your inquiry has been submitted successfully. Our team will contact you soon.</p>
            </div>
          ) : (
            <form id="admissionForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Parent Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" className="form-control" placeholder="Enter your mobile number" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Grade Interested In</label>
                <select className="form-control" required>
                  <option value="">Select Grade</option>
                  <option value="nursery">Nursery / LKG / UKG</option>
                  <option value="primary">Grade 1 - 5</option>
                  <option value="middle">Grade 6 - 8</option>
                  <option value="secondary">Grade 9 - 10</option>
                </select>
              </div>
              <div className="form-group">
                <label>Your Message (Optional)</label>
                <textarea className="form-control" rows="4" placeholder="Any specific questions?"></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit Inquiry</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

const Facilities = () => (
  <section className="section-padding facilities reveal" id="facilities">
    <div className="container">
      <div className="section-header text-center">
        <h2 className="section-title">Campus Facilities</h2>
        <div className="title-underline"></div>
        <p className="section-subtitle">Providing a world-class environment for holistic development.</p>
      </div>
      
      <div className="facilities-grid">
        {[
          { icon: '🚌', title: 'School Conveyance', text: 'GPS-enabled safe transport across Bahadurgarh and nearby areas.', badge: 'Transport', source: 'source-collage-1', slice: 'slice-conveyance' },
          { icon: '🛡️', title: 'CCTV & Security', text: '24/7 high-definition surveillance ensuring a safe campus for every child.', badge: 'Safety', source: 'source-collage-1', slice: 'slice-cctv' },
          { icon: '🤖', title: 'AI & Robotics', text: 'State-of-the-art lab for hands-on experience with modern technology and coding.', badge: 'Technology', source: 'source-collage-1', slice: 'slice-robotics' },
          { icon: '🎨', title: 'Arts & Music', text: 'Nurturing creativity through dedicated periods for music, dance, and fine arts.', badge: 'Creative', source: 'source-collage-1', slice: 'slice-arts' },
          { icon: '💻', title: 'ICT (Computer Lab)', text: 'Advanced computing facilities with high-speed internet and modern software.', badge: 'Academic', source: 'source-collage-1', slice: 'slice-ict' },
          { icon: '🏥', title: 'Medical Facilities', text: 'Well-equipped infirmary with trained staff for immediate health care needs.', badge: 'Health', source: 'source-collage-2', slice: 'slice-medical' },
          { icon: '🛝', title: 'Play Spaces & Grounds', text: 'Spacious and safe outdoor areas for physical activities and motor skill development.', badge: 'Sports', source: 'source-collage-2', slice: 'slice-playground' },
          { icon: '🏀', title: 'Multipurpose Court', text: 'Professional grade court for skating, basketball, and various sports training.', badge: 'Athletics', source: 'source-collage-2', slice: 'slice-court' },
          { icon: '📚', title: 'Library', text: 'A resource-rich library with a vast collection of books to foster a love for reading.', badge: 'Academic', source: 'source-collage-2', slice: 'slice-library' },
          { icon: '🔬', title: 'Laboratories', text: 'Fully equipped modern labs for Science, Math, and experiential learning.', badge: 'Modern', source: 'source-collage-2', slice: 'slice-labs' },
          { icon: '🏫', title: 'Spacious Class Rooms', text: 'Digital smart classrooms designed for comfort and interactive learning.', badge: 'Infrastructure', source: 'source-collage-2', slice: 'slice-classrooms' }
        ].map((facility, idx) => (
          <div key={idx} className="facility-item">
            <div className={`facility-image ${facility.source} ${facility.slice}`}>
              <span className="facility-badge">{facility.badge}</span>
            </div>
            <div className="facility-info">
              <div className="facility-title-flex">
                <span className="facility-icon-small">{facility.icon}</span>
                <h3>{facility.title}</h3>
              </div>
              <p>{facility.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Location = () => (
  <section className="section-padding location reveal" id="contact">
    <div className="container">
      <div className="section-header text-center">
        <h2 className="section-title">Visit Us</h2>
        <div className="title-underline"></div>
      </div>

      <div className="location-grid">
        <div className="contact-card">
          <div className="contact-info-item">
            <span className="icon">📍</span>
            <div>
              <h4>Our Location</h4>
              <p>Omaxe City, Sector 14, Bahadurgarh, Jhajjar, Haryana - 124507</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="icon">📞</span>
            <div>
              <h4>Call Us</h4>
              <p>+91 12345 67890<br />(Primary Contact)</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="icon">✉️</span>
            <div>
              <h4>Email Us</h4>
              <p>mail@trinityschool.in<br />info@trinityschool.in</p>
            </div>
          </div>
          <div className="mt-2">
            <a href="https://www.google.com/maps/place/28.680583+76.89178" target="_blank" className="btn btn-primary w-full text-center">Open in Google Maps →</a>
          </div>
        </div>
        
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111956.1!2d76.8917!3d28.6805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0b00799732bd%3A0xc33e14316a3c09f3!2sTrinity%20School%2C%20Omaxe%20City!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-info">
        <h3>Trinity School</h3>
        <p>Omaxe City, Sector 14, Bahadurgarh,<br />Jhajjar, Haryana - 124507</p>
        <p>Email: mail@trinityschool.in</p>
        <p>Phone: +91 12345 67890</p>
      </div>
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">Admissions</a></li>
          <li><a href="#">Academic Calendar</a></li>
          <li><a href="#">Facilities</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Trinity School. All rights reserved.</p>
    </div>
  </footer>
)

// Main App Component
const App = () => {
  useEffect(() => {
    // Reveal animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active')
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div id="app-inner">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Facilities />

        <Gallery />
        <Faculty />
        <section className="cta-banner reveal">
          <div className="container cta-flex">
            <h2>Ready to Shape Your Future?</h2>
            <a href="#admissions" className="btn btn-secondary">Enquire Now</a>
          </div>
        </section>
        <FAQ />
        <InquiryForm />
        <Location />
      </main>
      <Footer />
    </div>
  )
}

const rootElement = document.getElementById('app')
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<App />)
}
