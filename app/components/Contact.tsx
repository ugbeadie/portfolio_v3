"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `\nName: ${formData.name}\n\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n    `;

    window.location.href = `mailto:ugbeadie3@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      className="py-32 px-6 md:px-12 bg-background text-text relative z-20 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* LEFT */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.06em]"
            >
              Let's build <br />
              <span className="text-[#ab8bff] italic">together</span>
            </motion.h2>

            <p className="text-text-secondary text-lg max-w-md mt-8 leading-relaxed">
              Whether you need a web developer, a mobile developer, or someone
              to discuss your ideas with, I'm here to help.
            </p>
          </div>

          <div className="mt-16 space-y-4 text-lg">
            <Magnetic>
              <a
                href="mailto:ugbeadie3@gmail.com"
                className="inline-block hover:text-[#ab8bff] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#ab8bff] after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                ugbeadie3@gmail.com
              </a>
            </Magnetic>
          </div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <form className="space-y-8 font-['Inter']" onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="relative group">
              <input
                type="text"
                id="name"
                placeholder=" "
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block w-full bg-transparent border-b border-border py-4 font-sans text-xl text-text-secondary focus:outline-none focus:border-[#ab8bff] transition-colors peer"
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-4 font-display text-text-secondary text-xl transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#ab8bff] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm"
              >
                What's your name?
              </label>
            </div>

            {/* EMAIL */}
            <div className="relative group pt-4">
              <input
                type="email"
                id="email"
                placeholder=" "
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full bg-transparent border-b border-border py-4 font-sans text-xl text-text-secondary focus:outline-none focus:border-[#ab8bff] transition-colors peer"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-8 font-display text-text-secondary text-xl transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#ab8bff] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm"
              >
                Your email address?
              </label>
            </div>

            {/* MESSAGE */}
            <div className="relative group pt-4">
              <textarea
                id="message"
                rows={4}
                placeholder=" "
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="block w-full bg-transparent border-b border-border py-4 font-sans text-xl text-text-secondary focus:outline-none focus:border-[#ab8bff] transition-colors resize-none peer"
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-8 font-display text-text-secondary text-xl transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#ab8bff] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm"
              >
                Tell me about your project
              </label>
            </div>

            {/* BUTTON */}
            <div className="pt-8">
              <Magnetic>
                <button
                  type="submit"
                  className="font-sans group relative flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-medium overflow-hidden w-full md:w-auto transition-colors"
                >
                  <span className="uppercase relative z-10 flex items-center gap-2 text-sm">
                    Send Message
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-[#ab8bff] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-full" />
                </button>
              </Magnetic>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
