import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-6 md:px-12 bg-zinc-900 text-white relative z-20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-['Playfair_Display'] text-6xl md:text-8xl text-white mb-6 leading-[0.9]"
            >
              Let's build <br />
              <span className="text-[#ab8bff] italic">together</span>.
            </motion.h2>
            <p className="font-['Inter'] text-zinc-400 text-lg md:text-xl max-w-md mt-8">
              Whether you need a technical evangelist, a community strategy, or
              compelling technical content, I'm here to help.
            </p>
          </div>

          <div className="mt-16 space-y-4 font-['Inter'] text-lg">
            <Magnetic>
              <a
                href="mailto:hello@adieugbe.com"
                className="inline-block hover:text-[#ab8bff] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#ab8bff] after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                hello@adieugbe.com
              </a>
            </Magnetic>
            <div className="text-zinc-500">Global / Remote</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <form
            className="space-y-8 font-['Inter']"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative group">
              <input
                type="text"
                id="name"
                placeholder=" "
                className="block w-full bg-transparent border-b border-zinc-700 py-4 text-xl text-white focus:outline-none focus:border-[#ab8bff] transition-colors peer"
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-4 text-zinc-500 text-xl transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#ab8bff] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm"
              >
                What's your name?
              </label>
            </div>

            <div className="relative group pt-4">
              <input
                type="email"
                id="email"
                placeholder=" "
                className="block w-full bg-transparent border-b border-zinc-700 py-4 text-xl text-white focus:outline-none focus:border-[#ab8bff] transition-colors peer"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-8 text-zinc-500 text-xl transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#ab8bff] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm"
              >
                Your email address?
              </label>
            </div>

            <div className="relative group pt-4">
              <textarea
                id="message"
                rows={4}
                placeholder=" "
                className="block w-full bg-transparent border-b border-zinc-700 py-4 text-xl text-white focus:outline-none focus:border-[#ab8bff] transition-colors resize-none peer"
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-8 text-zinc-500 text-xl transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#ab8bff] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm"
              >
                Tell me about your project
              </label>
            </div>

            <div className="pt-8">
              <Magnetic>
                <button className="group relative flex items-center justify-center gap-3 bg-white text-zinc-900 px-10 py-5 rounded-full font-medium overflow-hidden w-full md:w-auto">
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    Send Message{" "}
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
