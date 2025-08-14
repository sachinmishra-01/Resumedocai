import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here,
    // e.g., send the data to a backend API or an email service.
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl text-blue-900">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, please don't hesitate to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Email</h3>
                <p className="mt-1 text-gray-600">Send us an email for any inquiries.</p>
                <a href="mailto:support@resumedoc.ai" className="text-blue-600 hover:underline font-medium">
                  resumedoc@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Phone</h3>
                <p className="mt-1 text-gray-600">Give us a call during business hours.</p>
                <a href="tel:+911234567890" className="text-blue-600 hover:underline font-medium">
                  +91 94544 33563
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Office Location</h3>
                <p className="mt-1 text-gray-600">Kanpur, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {isSubmitted ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                <p className="mt-2 text-gray-600">Your message has been sent successfully. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <input type="text" name="subject" id="subject" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={formData.subject} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" id="message" rows="4" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Send size={18} />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;