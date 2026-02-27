const fs = require('fs');
const file = 'src/components/AuthPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Container scrolling and fixed bg
content = content.replace('min-h-screen w-full flex items-center justify-center bg-cover bg-center relative px-4 py-10', 'fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-cover bg-center px-4 py-10');
content = content.replace(/className=\"relative z-10 w-full max-w-md bg-white\/10 backdrop-blur-xl border border-white\/20 rounded-\[40px\] p-8 md:p-12 shadow-2xl\"/g, 'className=\"relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]\"');

// Label text colors
content = content.replace(/text-white\/50 ml-1/g, 'text-white/80 ml-1');

// Input styles with left padding (icons)
content = content.replace(/bg-white\/5 border border-white\/10 rounded-2xl py-4 pl-12 pr-4 text-white /g, 'bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 ');

// Input styles without left padding (selects, dates)
content = content.replace(/bg-white\/5 border border-white\/10 rounded-2xl py-4 px-4 text-white /g, 'bg-white rounded-2xl py-4 px-4 text-gray-800 font-medium ');

// Select options should have text color
content = content.replace(/className=\"bg-gray-900\"/g, 'className=\"text-gray-800 bg-white\"');

// Input Icons color inside inputs
content = content.replace(/text-white\/40/g, 'text-gray-400');

fs.writeFileSync(file, content);
console.log('Update complete');
