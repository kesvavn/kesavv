import "./WhatsAppButton.css";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}

export default WhatsAppButton;