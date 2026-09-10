import {
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Thank you! Your message has been submitted."
    );
  };

  return (
    <main className="contact-page">

      <section className="contact-header">

        <span>Get in touch</span>

        <h1>Contact Us</h1>

        <p>
          Have a question about our menu, orders or cafe?
          We'd love to hear from you.
        </p>

      </section>

      <section className="contact-container">

        <div className="contact-info">

          <div className="contact-info-card">
            <MapPin size={24} />

            <div>
              <h3>Visit Us</h3>

              <p>
                Maliahabad,
                Lucknow, Uttar Pradesh
                226102
              </p>
            </div>
          </div>

          <div className="contact-info-card">
            <Phone size={24} />

            <div>
              <h3>Call Us</h3>

              <p>+91 7839309007</p>
            </div>
          </div>

          <div className="contact-info-card">
            <Mail size={24} />

            <div>
              <h3>Email Us</h3>

              <p>thedebugger009@gmail.com</p>
            </div>
          </div>

          <div className="contact-info-card">
            <Clock size={24} />

            <div>
              <h3>Opening Hours</h3>

              <p>
                Monday - Sunday
                <br />
                8:00 AM - 10:00 PM
              </p>
            </div>
          </div>

        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <h2>Send Us a Message</h2>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Message</label>

            <textarea
              rows="5"
              placeholder="How can we help you?"
              required
            />
          </div>

          <button
            type="submit"
            className="place-order-button"
          >
            Send Message
          </button>

        </form>

      </section>

    </main>
  );
}

export default Contact;