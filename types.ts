import { LucideIcon } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  username?: string;
}

export interface TechStackItem {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}