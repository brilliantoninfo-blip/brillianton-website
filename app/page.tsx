"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Globe, GraduationCap, TrendingUp, MapPin, Star } from "lucide-react";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import FocusAreas from "@/sections/FocusAreas";
import StatsSection from "@/sections/StatsSection";
import WebinarsSection from "@/sections/WebinarsSection";
import ExchangeFeature from "@/sections/ExchangeFeature";
import FellowshipHighlights from "@/sections/FellowshipHighlights";
import GlobalMentorship from "@/sections/GlobalMentorship";
import TestimonialsSection from "@/sections/TestimonialsSection";
import InstagramSection from "@/sections/InstagramSection";

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <AboutSection />
      <FocusAreas />
      <StatsSection />
      <WebinarsSection />
      <ExchangeFeature />
      <FellowshipHighlights />
      <GlobalMentorship />
      <TestimonialsSection />
      <InstagramSection />
    </div>
  );
}

