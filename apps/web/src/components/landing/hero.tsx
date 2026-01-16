"use client";

import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight, Scissors, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="min-h-[calc(100svh-4.5rem)] flex flex-col justify-between items-center text-center px-4 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 -z-50">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(240,6%,5%)]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(45, 67%, 52%, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, hsl(45, 67%, 52%, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial gold glow from center-top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, hsl(45, 67%, 52%, 0.08) 0%, transparent 50%)',
          }}
        />

        {/* Secondary green glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 80%, hsl(145, 34%, 26%, 0.06) 0%, transparent 40%)',
          }}
        />

        {/* Bottom decorative line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(45, 67%, 52%, 0.4), transparent)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center"
      >
        {/* Professional badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm">
            <Scissors className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Video Editing</span>
            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-block font-bold tracking-tighter text-4xl md:text-[4.5rem] leading-[0.95]"
        >
          <h1 className="text-foreground">
            <span className="inline-block">Cut.</span>{" "}
            <span className="inline-block">Create.</span>{" "}
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(46,76%,63%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Captivate.
            </motion.span>
          </h1>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-3xl md:text-5xl font-bold">
              <span className="text-foreground">VLOG</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(145,34%,26%)]">CUT</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-8 text-base sm:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Professional video editing, beautifully simple.
          <span className="text-foreground/80"> Powerful tools that run entirely in your browser.</span>
        </motion.p>

        {/* Feature pills */}
        <motion.div
          className="mt-6 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {['No watermarks', 'Free forever', 'No signup required', 'Privacy-first'].map((feature, index) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              className="px-3 py-1 text-sm rounded-full border border-border/50 bg-secondary/30 text-muted-foreground"
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link href="/projects">
            <Button
              type="button"
              variant="primary-gradient"
              size="lg"
              className="px-8 h-12 text-base font-semibold"
            >
              Start Editing
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

    </div>
  );
}
