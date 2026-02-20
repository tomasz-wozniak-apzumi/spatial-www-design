import React from 'react';
import { Facebook, Share2 } from 'lucide-react';
import TextBlock from './TextBlock';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-apzumi-red rounded-sm flex items-center justify-center">
              <span className="font-bold text-white text-xs">a</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">apzumi</span>
          </div>
          
          <div className="space-y-1">
             <p><TextBlock id="footer_address_1">APZUMI Sp. z o.o. spółka komandytowa</TextBlock></p>
             <p><TextBlock id="footer_address_2">ul. Feliksa Nowowiejskiego 5</TextBlock></p>
             <p><TextBlock id="footer_address_3">61-731 Poznań</TextBlock></p>
             <p><TextBlock id="footer_contact">contact@apzumi.com</TextBlock></p>
          </div>
        </div>

        <div className="text-right space-y-1">
          <p>KRS: 0000450818</p>
          <p>NIP: 7831696924</p>
          <p>REGON: 302352722</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <TextBlock id="footer_copyright">© 2024 Apzumi. All rights reserved.</TextBlock>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
             <Facebook size={16} />
          </div>
          <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
             <Share2 size={16} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;