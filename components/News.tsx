import React from 'react';
import { NewsItem } from '../types';
import TextBlock from './TextBlock';

const newsItems: NewsItem[] = [
  {
    id: 1,
    category: 'AKTUALNOŚCI',
    date: 'June 10, 2024',
    title: 'Apzumi Spatial nawiązało współpracę z DigiLens ARGO™',
    image: 'https://picsum.photos/id/20/600/400',
    isBlog: false
  },
  {
    id: 2,
    category: 'CASE STUDY',
    date: 'May 22, 2024',
    title: 'Optymalizacja procesów logistycznych dla branży automotive',
    image: 'https://picsum.photos/id/180/600/400',
    isBlog: false
  },
  {
    id: 3,
    category: 'BLOG',
    date: 'April 15, 2024',
    title: 'Jak zabezpieczyć dane w erze Przemysłu 4.0?',
    image: 'https://picsum.photos/id/60/600/400',
    isBlog: true
  }
];

const News: React.FC = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-apzumi-dark mb-10">
          <TextBlock id="news_heading">Aktualności i Case Studies</TextBlock>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                {item.id === 1 && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                    <TextBlock id="news_badge">Nowość</TextBlock>
                  </span>
                )}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex items-center gap-2 text-xs mb-2">
                <span className={`font-bold uppercase ${item.category === 'AKTUALNOŚCI' ? 'text-red-500' : 'text-blue-600'}`}>
                  <TextBlock id={`news_cat_${item.id}`}>{item.category}</TextBlock>
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">
                  <TextBlock id={`news_date_${item.id}`}>{item.date}</TextBlock>
                </span>
              </div>
              <h3 className="font-bold text-apzumi-dark text-lg leading-snug group-hover:text-blue-700 transition-colors">
                <TextBlock id={`news_title_${item.id}`}>{item.title}</TextBlock>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;