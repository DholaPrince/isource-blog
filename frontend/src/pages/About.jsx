import "../styles/about.css"

function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About iSource</h1>
          <p className="hero-subtitle">Empowering Writers & Developers to Earn While They Learn</p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-section mission-vision">
        <div className="section-content">
          <div className="mission-box">
            <h2>Our Mission</h2>
            <p>
              We believe that quality content creation and web development skills shouldn't be gatekept. iSource is a
              platform where writers monetize their articles through Google AdSense, and developers gain real-world MERN
              stack experience while earning.
            </p>
          </div>
          <div className="vision-box">
            <h2>Our Vision</h2>
            <p>
              To create a thriving community where content creators and developers can build sustainable income streams
              while continuously learning, growing, and contributing to a knowledge-sharing ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="about-section what-we-do">
        <h2>What We Do</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">📝</div>
            <h3>Article Platform</h3>
            <p>
              Write, publish, and monetize articles across multiple categories. Leverage Google AdSense to earn passive
              income while building your portfolio.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚀</div>
            <h3>MERN Development Hub</h3>
            <p>
              Build real projects, gain hands-on experience with MongoDB, Express, React, and Node.js. Connect with
              opportunities and potential clients.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔍</div>
            <h3>SEO-Optimized Content</h3>
            <p>
              Our platform is built for discoverability. Articles are structured for search engines, helping your
              content reach a wider audience and maximize earnings.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-section why-us">
        <h2>Why Choose iSource?</h2>
        <ul className="benefits-list">
          <li>
            <span className="check-icon">✓</span>
            <strong>Dual Income Streams:</strong> Monetize through AdSense and MERN development opportunities
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>Beginner Friendly:</strong> Resources and guides to help you start immediately
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>Community Driven:</strong> Learn from other writers and developers in our ecosystem
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>Real Projects:</strong> Build portfolio-worthy projects while earning
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>Growth Focused:</strong> Continuous learning resources and skill development
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>No Hidden Fees:</strong> Transparent platform with fair monetization terms
          </li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="about-section cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of content creators and developers who are earning from their skills on iSource.</p>
        <div className="cta-buttons">
          <a href="/categories" className="cta-button primary">
            Explore Articles
          </a>
          <a href="/" className="cta-button secondary">
            Get Started Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
