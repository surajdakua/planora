import "./About.css";
import photo from '../About/about.jpeg'

const About = () => {
  return (
    <>
        <section className="about-section" id="about">
            <div className="about-container">
                <div className="about-content">
                {/* LEFT: Text Section */}
                    <div className="about-text">
                        <h2>
                            Namaste <span className="namaste-emoji"> 🙏</span>
                        </h2>
                        <p>
                        I’m a passionate Software Engineer specializing in Java, Backend Development, and System Design.
                        Over the years, I’ve built scalable and high-performing systems, mastering everything from 
                        multithreading to low-level design.
                        </p>
                        <p>
                        My journey is driven by curiosity and innovation — I love turning complex problems into elegant solutions.
                        My ultimate ambition is to build my own tech company, <strong>Planora</strong>, that redefines travel planning
                        with smart, AI-powered solutions.
                        </p>
                    </div>
                    <div className="about-photo-container">
                        <img src={photo} alt="Suraj Dakua" className="about-photo" />
                    </div>
                </div>
            </div>
        </section>

        <section className="career-section" id="career">
            <h2>My Professional Journey</h2>
            <div className="timeline">
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <h3>🎓 2015 – 2019: Education</h3>
                    <p>Completed my B.Tech in Electronics & Tele-Comm, building a strong foundation in electronics, computer science fundamentals.</p>
                </div>
                </div>
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <h3>💻 2025 – Present: Senior Software Engineer at HERE Technologies.</h3>
                    <p>Working on backend systems using Java/Scala/Python, Spring Boot, and Scalable architectures. Gained deep expertise in mapping and location technology.</p>
                </div>
                </div>
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <h3>🚀 Future Vision</h3>
                    <p>Building <strong>Planora</strong> — a smart travel planning platform combining AI and creativity to make travel effortless and personalized.</p>
                </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default About;