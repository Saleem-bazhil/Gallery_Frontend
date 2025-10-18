import React from "react";
import { ArrowRight, Sparkles, Shield, Cloud } from "lucide-react";
import heroImage from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden lg:p-14 p-4 bg-background text-foreground">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-glass border border-border">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                AI-Powered Photo Management
              </span>
            </div>

            <h1 className="text-4xl lg:text-7xl font-bold leading-tight gradient-text font-Agbalumo">
              Your Smart, Secure
              <span className="block bg-gradient-hero bg-clip-text">
                Photo Companion
              </span>
            </h1>

            <p className="text-xl text-muted-foreground poppins-regular max-w-xl">
              Automatically tag and organize your photos with AI. Keep your
              memories safe and perfectly sorted.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                to="/image-gallery"
                className="indigo-btn"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link className="w-full lg:w-auto flex items-center justify-center py-3 px-8 text-primary text-lg font-medium bg-background border border-primary rounded-xl hover:bg-primary hover:text-background">
              Watch Demo
              </Link>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">End-to-End Encrypted</p>
                  <p className="text-xs text-muted-foreground">
                    Your privacy matters
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Cloud className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Cloud Sync</p>
                  <p className="text-xs text-muted-foreground">
                    Access anywhere
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-scale-in z-0">
            <div className="absolute inset-0 bg-gradient-hero blur-3xl opacity-20 animate-pulse" />
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border">
              <img
                src={heroImage}
                alt="SmartGallery AI Dashboard"
                className="w-full h-auto"
              />
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 p-6 rounded-xl bg-card border border-border shadow-lg backdrop-blur-sm animate-float m-2">
              <p className="text-sm text-muted-foreground mb-1">
                Photos Organized
              </p>
              <p className="text-3xl font-bold bg-card border-border gradient-text">
                100+
              </p>
            </div>

            <div
              className="absolute -top-6 -right-6 p-6 rounded-xl bg-card border border-border shadow-lg backdrop-blur-sm animate-float m-2"
              style={{ animationDelay: "1s" }}
            >
              <p className="text-sm text-muted-foreground mb-1">AI Accuracy</p>
              <p className="text-3xl font-bold bg-card border-border gradient-text">
                99.9%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
