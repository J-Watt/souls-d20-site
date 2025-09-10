"use client";

import { motion } from "framer-motion";
import DiscordWidget from "@/components/DiscordWidget";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <motion.section 
        className="title"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <h1>Contact</h1>
        <p>
          Have questions about Souls D20, want to join a campaign, or just chat with the community?<br />
          Reach out through the options below.
        </p>
      </motion.section>

      <div className="mx-auto max-w-4xl px-4 space-y-12">
        {/* Email */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div className="text-center space-y-4" variants={fadeInUp}>
            <h2>Email</h2>
            <p>
              <a 
                href="mailto:vgtimis133@gmail.com"
                className="text-2xl font-semibold hover:underline transition-all duration-300"
              >
                vgtimis133@gmail.com
              </a>
            </p>
          </motion.div>
        </motion.section>

        {/* Discord */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div className="space-y-6" variants={fadeInUp}>
            <h2 className="text-center">Discord</h2>
            <DiscordWidget />
          </motion.div>
        </motion.section>
      </div>

      <div className="h-16"></div>
    </div>
  );
}