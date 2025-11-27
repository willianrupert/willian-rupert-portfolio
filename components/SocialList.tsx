import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { SocialLink } from '../types';

const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/willianrupert', icon: Github, username: '@willianrupert' },
  { label: 'LinkedIn', href: '#', icon: Linkedin, username: 'Willian Rupert' },
  { label: 'Email', href: 'mailto:contact@willian.dev', icon: Mail, username: 'contact@willian.dev' },
  { label: 'Twitter', href: '#', icon: Twitter, username: '@willian_dev' },
];

export const SocialList: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 h-full justify-center">
      {SOCIALS.map((social, i) => (
        <a
          key={i}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-white/10 text-white group-hover:bg-blue-500/20 group-hover:text-blue-200 transition-colors">
              <social.icon size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white/90">{social.label}</span>
              <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">{social.username}</span>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      ))}
    </div>
  );
};