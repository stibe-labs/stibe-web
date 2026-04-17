const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.css') || dirFile.endsWith('.js') && !dirFile.includes('node_modules') && !dirFile.includes('.next')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const replaceColors = (content) => {
  // Temporary tokens
  let newContent = content
    .replace(/bg-white/g, 'bg-__TMP__1')
    .replace(/bg-black/g, 'bg-white')
    .replace(/bg-__TMP__1/g, 'bg-black')

    .replace(/text-white/g, 'text-__TMP__2')
    .replace(/text-black/g, 'text-white')
    .replace(/text-__TMP__2/g, 'text-black')

    .replace(/border-white/g, 'border-__TMP__3')
    .replace(/border-black/g, 'border-white')
    .replace(/border-__TMP__3/g, 'border-black')

    .replace(/text-neutral-400/g, 'text-__TMP__4')
    .replace(/text-neutral-300/g, 'text-neutral-700')
    .replace(/text-__TMP__4/g, 'text-neutral-600')

    .replace(/text-neutral-500/g, 'text-__TMP__5')
    .replace(/text-neutral-200/g, 'text-neutral-800')
    .replace(/text-__TMP__5/g, 'text-neutral-500')

    .replace(/bg-neutral-200/g, 'bg-__TMP__6')
    .replace(/bg-__TMP__6/g, 'bg-neutral-800')
    
    .replace(/255,\s*255,\s*255/g, '__TMP__RGB')
    .replace(/0,\s*0,\s*0/g, '255, 255, 255')
    .replace(/__TMP__RGB/g, '0, 0, 0')

    // Inglobals.css
    .replace(/--background:\s*#050505/g, '--background: #ffffff')
    .replace(/--foreground:\s*#ffffff/g, '--foreground: #050505')
    .replace(/from-white/g, 'from-__TMP__7')
    .replace(/via-neutral-300/g, 'via-neutral-700')
    .replace(/to-neutral-500/g, 'to-neutral-800')
    .replace(/from-__TMP__7/g, 'from-black')

  return newContent;
};

const files = walkSync(path.join(__dirname, 'app'));
files.push(...walkSync(path.join(__dirname, 'components')));
files.push(path.join(__dirname, 'styles', 'globals.css'));
files.push(path.join(__dirname, 'tailwind.config.js'));

for (const file of files) {
  try {
    const original = fs.readFileSync(file, 'utf8');
    const modified = replaceColors(original);
    if (original !== modified) {
      fs.writeFileSync(file, modified);
      console.log('Modified: ' + file);
    }
  } catch(e) {}
}
