const fs = require('fs');
const path = require('path');

const stitchDir = path.join(__dirname, 'stitch');
const pagesDir = path.join(__dirname, 'frontend', 'src', 'pages');

if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Ensure unique CSS is collected
let globalCss = fs.readFileSync(path.join(__dirname, 'frontend', 'src', 'index.css'), 'utf8');

const convertHtmlToJsx = (html) => {
  // Convert basic attributes
  let jsx = html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/fill-opacity/g, 'fillOpacity')
    .replace(/onclick="[^"]*"/g, 'onClick={() => {}}')
    .replace(/onsubmit="[^"]*"/g, 'onSubmit={(e) => e.preventDefault()}')
    .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    
  // Handle style attributes
  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = p1.split(';').filter(s => s.trim()).reduce((acc, curr) => {
      let [key, value] = curr.split(':');
      if (key && value) {
        key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc.push(`${key}: '${value.trim()}'`);
      }
      return acc;
    }, []);
    return `style={{ ${styleObj.join(', ')} }}`;
  });

  // Self close tags
  jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');

  return jsx;
};

const extractCss = (html) => {
  const match = html.match(/<style>([\s\S]*?)<\/style>/i);
  if (match) {
    return match[1];
  }
  return '';
};

const files = ['about.html', 'user.html', 'login.html', 'register.html'];

files.forEach(file => {
  const content = fs.readFileSync(path.join(stitchDir, file), 'utf8');
  
  // Extract CSS
  const fileCss = extractCss(content);
  // append it avoiding duplicates
  // To avoid duplicates properly is hard, but we can just append
  globalCss += `\n/* From ${file} */\n${fileCss}`;
  
  // Extract body content between header and footer
  let bodyContent = '';
  // Try to find content between </header> and <footer>
  // Since some pages might have different structures, let's extract everything inside <body>...</body> 
  // and then remove floating headers and footers.
  
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    let bodyHtml = bodyMatch[1];
    
    // Remove the shared header and footer markup 
    bodyHtml = bodyHtml.replace(/<header class="header-floating-wrap"[\s\S]*?<\/header>/i, '<Navbar />');
    bodyHtml = bodyHtml.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/i, '<Footer />');
    // Remove any script tags
    bodyHtml = bodyHtml.replace(/<script>([\s\S]*?)<\/script>/gi, '');
    
    const jsxContent = convertHtmlToJsx(bodyHtml);
    
    const componentName = file.charAt(0).toUpperCase() + file.slice(1).replace('.html', '');
    
    const reactComponent = `
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ${componentName} = () => {
  return (
    <>
      ${jsxContent}
    </>
  );
};

export default ${componentName};
`;
    fs.writeFileSync(path.join(pagesDir, `${componentName}.jsx`), reactComponent);
    console.log(`Created ${componentName}.jsx`);
  }
});

fs.writeFileSync(path.join(__dirname, 'frontend', 'src', 'index.css'), globalCss);
console.log('Updated index.css');

