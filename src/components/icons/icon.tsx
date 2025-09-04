
"use client";

import {
  Flame, Zap, Compass, Sparkles, UserCheck, Award,
  CalendarCheck2, MessageCircleReply, Globe, HeartHandshake,
  Target as TargetIcon, LucideIcon
} from 'lucide-react';
import type { ComponentType } from 'react';

const icons: Record<string, LucideIcon> = {
  Flame,
  Zap,
  Compass,
  Sparkles,
  Explore: Sparkles,
  UserCheck,
  CalendarCheck2,
  MessageCircleReply,
  Globe,
  HeartHandshake,
  TargetIcon,
  Award,
};

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const IconComponent = icons[name] || Award; // Fallback to Award icon
  return <IconComponent className={className} />;
};
