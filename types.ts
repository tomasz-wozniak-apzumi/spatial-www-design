import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  icon: LucideIcon;
  isSolution?: boolean; // To trigger the badge
  content: {
    forWho: string;
    when: string;
    what: string;
    effect: string;
    differentiator: string;
  };
}

export interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

export interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  image: string;
  isBlog?: boolean;
}

export interface CaseStudyItem {
  id: string;
  clientKey: string;
  titleKey: string;
  descKey: string;
  resultsKeys: string[];
  tags: {
    area: string;
    tech: string;
    industry: string;
  };
  imageType: 'glasses' | 'tablet' | 'laptop';
  readTime: string;
}