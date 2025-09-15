"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="title"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <h1>Support Souls D20</h1>
        <p>
          Look forward to more content like book materials, a monster manual, GM resources, character sheets, and more.
        </p>
      </motion.section>

      <div className="mx-auto max-w-6xl px-4 space-y-16">
        {/* Section 1 - Patreon Support */}
        <motion.section 
          className="grid md:grid-cols-2 gap-8 items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div variants={fadeInUp}>
            <h2>Support</h2>
            <p>
              Become a supporter and gain an exclusive role in our Discord community that gives you early access to art, book content,
              priority placement in campaigns, and behind-the-scenes updates related to Souls D20.
            </p>
          </motion.div>
          
          <motion.a
            href="https://www.patreon.com/SoulsD20"
            target="_blank"
            rel="noopener noreferrer"
            className="panel flex flex-col items-center justify-center gap-3 py-6 px-4 hover:bg-white/5 transition-colors cursor-pointer"
            variants={fadeInUp}
          >
            <span className="text-xl font-semibold text-gold">Become a patron</span>
            <Image
              src="/images/support/patreon-logo.png"
              alt="Patreon"
              width={180}
              height={45}
              className="h-12 w-auto object-contain"
            />
          </motion.a>
        </motion.section>

        {/* Section 2 - Donations */}
        <motion.section 
          className="grid md:grid-cols-2 gap-8 items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div variants={fadeInUp}>
            <h2>Donations</h2>
            <p>
              Donations will help fund more great art and further design for the book!
            </p>
          </motion.div>
          
          <motion.div
            className="panel flex flex-col items-center justify-center gap-3 py-6 px-4 hover:bg-white/5 transition-colors"
            variants={fadeInUp}
          >
            <span className="text-xl font-semibold text-gold">Donate with</span>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
              <input type="hidden" name="business" value="5FGGMENPSR3LU" />
              <input type="hidden" name="no_recurring" value="0" />
              <input type="hidden" name="item_name"
                  value="Donations and payments are put toward more content like book materials, a monster manual, character sheets, and more!" />
              <input type="hidden" name="currency_code" value="USD" />
              <button type="submit" className="cursor-pointer">
                <Image
                  src="/images/support/paypal-logo.png"
                  alt="PayPal"
                  width={250}
                  height={60}
                  className="h-15 w-auto object-contain hover:brightness-110 transition-all"
                />
              </button>
            </form>
          </motion.div>
        </motion.section>

        {/* Section 3 - Origins */}
        <motion.section 
          className="grid md:grid-cols-2 gap-8 items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div 
            className="panel aspect-[4/3] relative overflow-hidden"
            variants={fadeInUp}
          >
            <Image
              src="/images/support/group-photo-origins.jpg"
              alt="Souls D20 group - Origins"
              fill
              className="object-cover"
            />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <p>
              Souls D20 started as a fun and chaotic side project between a small group of friends. After playing and having fun with it 
              for more than a year, we decided to expand the book and add new players. Six years later, the book has gone through countless 
              patches and multiple massive updates. Now we have the game being played and tested by more than ten testers who have logged 
              thousands of campaign hours.
            </p>
          </motion.div>
        </motion.section>

        {/* Section 4 - The Team */}
        <motion.section 
          className="grid md:grid-cols-2 gap-8 items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div variants={fadeInUp}>
            <p>
              The growing Souls D20 team includes passionate contributors dedicated to curating the rulebook, building online tools to make 
              play easier, creating incredible artwork, and growing our Discord community.
            </p>
            <p>
              We're always excited to include new players in the Souls D20 experience, come ask questions if you want to learn more! We'll 
              happily guide you through building characters, learning the rules, and getting into the game.
            </p>
          </motion.div>
          
          <motion.div 
            className="panel aspect-[4/3] relative overflow-hidden"
            variants={fadeInUp}
          >
            <Image
              src="/images/support/team-contributors.jpg"
              alt="Souls D20 team contributors"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.section>

        {/* Section 5 - Testimonials */}
        <motion.section 
          className="space-y-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div className="space-y-6" variants={staggerChildren}>
            {/* Zand Testimonial */}
            <motion.blockquote className="panel" variants={fadeInUp}>
              <p className="text-lg italic mb-4">
                "Very few systems let me kill my character every week, then create a new one that is wildly different."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/support/zand-avatar.png"
                    alt="Zand"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <cite className="text-gold font-semibold not-italic">
                  - Zand, longtime player, most deaths in a campaign
                </cite>
              </div>
            </motion.blockquote>

            {/* Kelly Testimonial */}
            <motion.blockquote className="panel" variants={fadeInUp}>
              <p className="text-lg italic mb-4">
                "So Random! I never know what fresh Hell my toon will fall into each session. It really keeps you on your toes! Never get attached 
                to your toon, or build a very thorough character backstory - you're wasting your time."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/support/kelly-avatar.png"
                    alt="Kelly"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <cite className="text-gold font-semibold not-italic">
                  - Kelly
                </cite>
              </div>
            </motion.blockquote>

            {/* Liz Testimonial */}
            <motion.blockquote className="panel" variants={fadeInUp}>
              <p className="text-lg italic mb-4">
                "I played my character Bazgalith for a year or more, these other fools just didn't realize that there is a ring of sacrifice. 
                (Also you can have a cat companion - what's not to love?!)"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/support/liz-avatar.png"
                    alt="Liz"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <cite className="text-gold font-semibold not-italic">
                  - Liz
                </cite>
              </div>
            </motion.blockquote>
          </motion.div>
        </motion.section>
      </div>

      {/* Bottom spacing */}
      <div className="h-16"></div>
    </div>
  );
}
