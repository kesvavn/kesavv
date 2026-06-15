import { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Stats.css";

function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Counter function
  const AnimatedCounter = ({ end, duration = 1000, decimals = 0 }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime = null;

      const animate = (time) => {
        if (!startTime) startTime = time;

        const progress = time - startTime;
        const currentValue = Math.min(progress / duration, 1) * end;

        setValue(currentValue);

        if (progress < duration) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [end, duration]);

    return <>{value.toFixed(decimals)}</>;
  };

  return (
    <div className="statistics-section" ref={sectionRef}>
      <Container>
        <Row className="statistics-row text-center">

          <Col xs={6} md={3} className="statistics-item">
            <h2 className="statistics-number">
              <AnimatedCounter end={18} />+
            </h2>
            <p className="statistics-label">Years of Experience</p>
          </Col>

          <Col xs={6} md={3} className="statistics-item">
            <h2 className="statistics-number">
              <AnimatedCounter end={2.5} decimals={1} />K+
            </h2>
            <p className="statistics-label">Events Covered</p>
          </Col>

          <Col xs={6} md={3} className="statistics-item">
            <h2 className="statistics-number">
              <AnimatedCounter end={2.3} decimals={1} />K+
            </h2>
            <p className="statistics-label">Satisfied Clients</p>
          </Col>

          <Col xs={6} md={3} className="statistics-item">
            <h2 className="statistics-number">
              <AnimatedCounter end={4.8} decimals={1} />
            </h2>
            <p className="statistics-label">Customer Rating</p>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Stats;