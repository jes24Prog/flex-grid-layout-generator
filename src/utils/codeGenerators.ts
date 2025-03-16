
interface ColumnConfig {
  type: string;
  width: number;
}

interface RowConfig {
  columns: ColumnConfig[];
}

interface FlexItemConfig {
  label: string;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  order: number;
}

interface CodeGeneratorParams {
  layoutType: string;
  rows: number;
  columns: number;
  flexItems: number;
  flexDirection: string;
  isCustomMode: boolean;
  rowConfigs: RowConfig[];
  flexConfigs: FlexItemConfig[];
  outputFormat: string;
}

export const generateCode = (params: CodeGeneratorParams): string => {
  const { layoutType, outputFormat } = params;

  if (layoutType === 'grid') {
    switch (outputFormat) {
      case 'html-css':
        return generateGridHtmlCss(params);
      case 'tsx-tailwind':
        return generateGridTsxTailwind(params);
      case 'tsx-bootstrap':
        return generateGridTsxBootstrap(params);
      case 'jsx-tailwind':
        return generateGridJsxTailwind(params);
      case 'jsx-bootstrap':
        return generateGridJsxBootstrap(params);
      default:
        return 'Select an output format to generate code.';
    }
  } else {
    switch (outputFormat) {
      case 'html-css':
        return generateFlexHtmlCss(params);
      case 'tsx-tailwind':
        return generateFlexTsxTailwind(params);
      case 'tsx-bootstrap':
        return generateFlexTsxBootstrap(params);
      case 'jsx-tailwind':
        return generateFlexJsxTailwind(params);
      case 'jsx-bootstrap':
        return generateFlexJsxBootstrap(params);
      default:
        return 'Select an output format to generate code.';
    }
  }
};

// Grid HTML + CSS Generator
const generateGridHtmlCss = (params: CodeGeneratorParams): string => {
  const { rows, columns, isCustomMode, rowConfigs } = params;
  
  let htmlCode = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Grid Layout</title>\n  <style>\n';
  
  // CSS
  htmlCode += '    /* Grid Layout Styles */\n';
  htmlCode += '    body {\n      margin: 0;\n      padding: 20px;\n      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n    }\n\n';
  
  if (isCustomMode) {
    htmlCode += '    .grid-container {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      gap: 10px;\n    }\n\n';
    htmlCode += '    .grid-row {\n      display: flex;\n      width: 100%;\n      gap: 10px;\n    }\n\n';
    
    // Generate styles for different column types
    htmlCode += '    /* Column type styles */\n';
    htmlCode += '    .sidebar {\n      background-color: #f0f4ff;\n      padding: 15px;\n      border-radius: 4px;\n    }\n\n';
    htmlCode += '    .header {\n      background-color: #f0fff4;\n      padding: 15px;\n      border-radius: 4px;\n    }\n\n';
    htmlCode += '    .footer {\n      background-color: #f8f0ff;\n      padding: 15px;\n      border-radius: 4px;\n    }\n\n';
    htmlCode += '    .nav {\n      background-color: #fffbf0;\n      padding: 15px;\n      border-radius: 4px;\n    }\n\n';
    htmlCode += '    .content {\n      background-color: #ffffff;\n      padding: 15px;\n      border-radius: 4px;\n      border: 1px solid #e5e7eb;\n    }\n\n';
    
    // Generate responsive styles
    htmlCode += '    /* Responsive styles */\n';
    htmlCode += '    @media (max-width: 768px) {\n';
    htmlCode += '      .grid-row {\n        flex-direction: column;\n      }\n\n';
    htmlCode += '      .grid-row > div {\n        width: 100% !important;\n        margin-bottom: 10px;\n      }\n';
    htmlCode += '    }\n';
  } else {
    htmlCode += '    .grid-container {\n      display: grid;\n';
    htmlCode += `      grid-template-columns: repeat(${columns}, 1fr);\n`;
    htmlCode += `      grid-template-rows: repeat(${rows}, auto);\n`;
    htmlCode += '      gap: 10px;\n';
    htmlCode += '    }\n\n';
    
    htmlCode += '    .grid-cell {\n';
    htmlCode += '      background-color: #ffffff;\n';
    htmlCode += '      padding: 20px;\n';
    htmlCode += '      text-align: center;\n';
    htmlCode += '      border: 1px solid #e5e7eb;\n';
    htmlCode += '      border-radius: 4px;\n';
    htmlCode += '    }\n\n';
    
    // Responsive styles
    htmlCode += '    /* Responsive styles */\n';
    htmlCode += '    @media (max-width: 768px) {\n';
    htmlCode += '      .grid-container {\n';
    htmlCode += '        grid-template-columns: 1fr;\n';
    htmlCode += '      }\n';
    htmlCode += '    }\n';
  }
  
  htmlCode += '  </style>\n</head>\n<body>\n';
  
  // HTML structure
  if (isCustomMode) {
    htmlCode += '  <div class="grid-container">\n';
    
    for (let i = 0; i < rows; i++) {
      htmlCode += '    <div class="grid-row">\n';
      
      for (let j = 0; j < rowConfigs[i].columns.length; j++) {
        const column = rowConfigs[i].columns[j];
        htmlCode += `      <div class="${column.type}" style="width: ${column.width}%;">\n`;
        htmlCode += `        ${column.type.charAt(0).toUpperCase() + column.type.slice(1)} ${i+1}-${j+1}\n`;
        htmlCode += '      </div>\n';
      }
      
      htmlCode += '    </div>\n';
    }
    
    htmlCode += '  </div>\n';
  } else {
    htmlCode += '  <div class="grid-container">\n';
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cellNumber = i * columns + j + 1;
        htmlCode += `    <div class="grid-cell">Cell ${cellNumber}</div>\n`;
      }
    }
    
    htmlCode += '  </div>\n';
  }
  
  htmlCode += '</body>\n</html>';
  
  return htmlCode;
};

// Flex HTML + CSS Generator
const generateFlexHtmlCss = (params: CodeGeneratorParams): string => {
  const { flexItems, flexDirection, isCustomMode, flexConfigs } = params;

  let htmlCode = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Flex Layout</title>\n  <style>\n';
  
  // CSS
  htmlCode += '    /* Flex Layout Styles */\n';
  htmlCode += '    body {\n      margin: 0;\n      padding: 20px;\n      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n    }\n\n';
  
  htmlCode += '    .flex-container {\n';
  htmlCode += '      display: flex;\n';
  htmlCode += `      flex-direction: ${flexDirection};\n`;
  htmlCode += '      width: 100%;\n';
  htmlCode += '      gap: 10px;\n';
  htmlCode += `      min-height: ${flexDirection === 'column' ? '400px' : 'auto'};\n`;
  htmlCode += '    }\n\n';
  
  if (isCustomMode) {
    // Generate styles for different item types
    htmlCode += '    /* Flex item type styles */\n';
    htmlCode += '    .sidebar {\n      background-color: #f0f4ff;\n      padding: 15px;\n      border-radius: 4px;\n    }\n\n';
    htmlCode += '    .header {\n      background-color: #f0fff4;\n      padding: 15px;\n      border-radius: 4px;\n    }\n\n';
    htmlCode += '    .footer {\n      background-color: #f8f0ff;\n      padding: 15px;\n      border-radius: 4px;\n    }\n\n';
    htmlCode += '    .nav {\n      background-color: #fffbf0;\n      padding: 15px;\n      border-radius: 4px;\n    }\n\n';
    htmlCode += '    .content {\n      background-color: #ffffff;\n      padding: 15px;\n      border-radius: 4px;\n      border: 1px solid #e5e7eb;\n    }\n\n';
  } else {
    htmlCode += '    .flex-item {\n';
    htmlCode += '      background-color: #ffffff;\n';
    htmlCode += '      padding: 20px;\n';
    htmlCode += '      text-align: center;\n';
    htmlCode += '      border: 1px solid #e5e7eb;\n';
    htmlCode += '      border-radius: 4px;\n';
    htmlCode += '      flex: 1;\n';
    htmlCode += '    }\n\n';
  }
  
  // Responsive styles
  htmlCode += '    /* Responsive styles */\n';
  htmlCode += '    @media (max-width: 768px) {\n';
  htmlCode += '      .flex-container {\n';
  htmlCode += '        flex-direction: column;\n';
  htmlCode += '      }\n';
  htmlCode += '    }\n';
  
  htmlCode += '  </style>\n</head>\n<body>\n';
  
  // HTML structure
  htmlCode += '  <div class="flex-container">\n';
  
  if (isCustomMode) {
    for (let i = 0; i < flexItems; i++) {
      const item = flexConfigs[i];
      htmlCode += `    <div class="${item.label}" style="flex-grow: ${item.flexGrow}; flex-shrink: ${item.flexShrink}; flex-basis: ${item.flexBasis}; order: ${item.order};">\n`;
      htmlCode += `      ${item.label.charAt(0).toUpperCase() + item.label.slice(1)} ${i+1}\n`;
      htmlCode += '    </div>\n';
    }
  } else {
    for (let i = 0; i < flexItems; i++) {
      htmlCode += `    <div class="flex-item">Item ${i+1}</div>\n`;
    }
  }
  
  htmlCode += '  </div>\n';
  htmlCode += '</body>\n</html>';
  
  return htmlCode;
};

// Grid TSX + TailwindCSS Generator
const generateGridTsxTailwind = (params: CodeGeneratorParams): string => {
  const { rows, columns, isCustomMode, rowConfigs } = params;
  
  let tsxCode = 'import React from "react";\n\n';
  tsxCode += 'const GridLayout: React.FC = () => {\n';
  tsxCode += '  return (\n';
  
  if (isCustomMode) {
    tsxCode += '    <div className="flex flex-col w-full gap-4">\n';
    
    for (let i = 0; i < rows; i++) {
      tsxCode += '      {/* Row ' + (i+1) + ' */}\n';
      tsxCode += '      <div className="flex flex-col md:flex-row w-full gap-4">\n';
      
      for (let j = 0; j < rowConfigs[i].columns.length; j++) {
        const column = rowConfigs[i].columns[j];
        const type = column.type;
        let bgColor = 'bg-white';
        
        switch (type) {
          case 'sidebar':
            bgColor = 'bg-blue-50';
            break;
          case 'header':
            bgColor = 'bg-green-50';
            break;
          case 'footer':
            bgColor = 'bg-purple-50';
            break;
          case 'nav':
            bgColor = 'bg-yellow-50';
            break;
          default:
            bgColor = 'bg-white';
        }
        
        tsxCode += `        {/* ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}-${j+1} */}\n`;
        tsxCode += `        <div className="w-full md:w-[${column.width}%] p-4 ${bgColor} border border-gray-200 rounded-lg">\n`;
        tsxCode += `          ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}-${j+1}\n`;
        tsxCode += '        </div>\n';
      }
      
      tsxCode += '      </div>\n';
    }
    
    tsxCode += '    </div>\n';
  } else {
    tsxCode += '    <div className="grid grid-cols-1 md:grid-cols-' + columns + ' gap-4">\n';
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cellNumber = i * columns + j + 1;
        tsxCode += '      <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">\n';
        tsxCode += `        Cell ${cellNumber}\n`;
        tsxCode += '      </div>\n';
      }
    }
    
    tsxCode += '    </div>\n';
  }
  
  tsxCode += '  );\n';
  tsxCode += '};\n\n';
  tsxCode += 'export default GridLayout;';
  
  return tsxCode;
};

// Flex TSX + TailwindCSS Generator
const generateFlexTsxTailwind = (params: CodeGeneratorParams): string => {
  const { flexItems, flexDirection, isCustomMode, flexConfigs } = params;

  let tsxCode = 'import React from "react";\n\n';
  tsxCode += 'const FlexLayout: React.FC = () => {\n';
  tsxCode += '  return (\n';
  
  tsxCode += `    <div className="flex ${flexDirection === 'column' ? 'flex-col' : 'flex-row'} w-full gap-4"${flexDirection === 'column' ? ' style={{ minHeight: "400px" }}' : ''}>\n`;
  
  if (isCustomMode) {
    for (let i = 0; i < flexItems; i++) {
      const item = flexConfigs[i];
      const type = item.label;
      let bgColor = 'bg-white';
      
      switch (type) {
        case 'sidebar':
          bgColor = 'bg-blue-50';
          break;
        case 'header':
          bgColor = 'bg-green-50';
          break;
        case 'footer':
          bgColor = 'bg-purple-50';
          break;
        case 'nav':
          bgColor = 'bg-yellow-50';
          break;
        default:
          bgColor = 'bg-white';
      }
      
      tsxCode += `      {/* ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1} */}\n`;
      tsxCode += `      <div className="p-4 ${bgColor} border border-gray-200 rounded-lg"\n`;
      tsxCode += `           style={{ flexGrow: ${item.flexGrow}, flexShrink: ${item.flexShrink}, flexBasis: "${item.flexBasis}", order: ${item.order} }}>\n`;
      tsxCode += `        ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}\n`;
      tsxCode += '      </div>\n';
    }
  } else {
    for (let i = 0; i < flexItems; i++) {
      tsxCode += `      <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg text-center">\n`;
      tsxCode += `        Item ${i+1}\n`;
      tsxCode += '      </div>\n';
    }
  }
  
  tsxCode += '    </div>\n';
  tsxCode += '  );\n';
  tsxCode += '};\n\n';
  tsxCode += 'export default FlexLayout;';
  
  return tsxCode;
};

// Grid TSX + Bootstrap Generator
const generateGridTsxBootstrap = (params: CodeGeneratorParams): string => {
  const { rows, columns, isCustomMode, rowConfigs } = params;
  
  let tsxCode = 'import React from "react";\n\n';
  tsxCode += '// Make sure to include Bootstrap CSS in your project\n';
  tsxCode += '// import "bootstrap/dist/css/bootstrap.min.css";\n\n';
  tsxCode += 'const GridLayout: React.FC = () => {\n';
  tsxCode += '  return (\n';
  tsxCode += '    <div className="container">\n';
  
  if (isCustomMode) {
    for (let i = 0; i < rows; i++) {
      tsxCode += '      {/* Row ' + (i+1) + ' */}\n';
      tsxCode += '      <div className="row gy-4 mb-4">\n';
      
      for (let j = 0; j < rowConfigs[i].columns.length; j++) {
        const column = rowConfigs[i].columns[j];
        const type = column.type;
        let bgClass = '';
        
        switch (type) {
          case 'sidebar':
            bgClass = 'bg-primary bg-opacity-10';
            break;
          case 'header':
            bgClass = 'bg-success bg-opacity-10';
            break;
          case 'footer':
            bgClass = 'bg-info bg-opacity-10';
            break;
          case 'nav':
            bgClass = 'bg-warning bg-opacity-10';
            break;
          default:
            bgClass = 'bg-light';
        }
        
        // Calculate Bootstrap column width (out of 12)
        const bsWidth = Math.round((column.width / 100) * 12);
        
        tsxCode += `        {/* ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}-${j+1} */}\n`;
        tsxCode += `        <div className="col-12 col-md-${bsWidth}">\n`;
        tsxCode += `          <div className="p-3 border rounded ${bgClass}">\n`;
        tsxCode += `            ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}-${j+1}\n`;
        tsxCode += '          </div>\n';
        tsxCode += '        </div>\n';
      }
      
      tsxCode += '      </div>\n';
    }
  } else {
    for (let i = 0; i < rows; i++) {
      tsxCode += '      <div className="row gy-4 mb-4">\n';
      
      for (let j = 0; j < columns; j++) {
        const cellNumber = i * columns + j + 1;
        // Calculate Bootstrap column width (out of 12)
        const bsWidth = Math.floor(12 / columns);
        
        tsxCode += `        <div className="col-12 col-md-${bsWidth}">\n`;
        tsxCode += '          <div className="p-3 border rounded bg-light text-center">\n';
        tsxCode += `            Cell ${cellNumber}\n`;
        tsxCode += '          </div>\n';
        tsxCode += '        </div>\n';
      }
      
      tsxCode += '      </div>\n';
    }
  }
  
  tsxCode += '    </div>\n';
  tsxCode += '  );\n';
  tsxCode += '};\n\n';
  tsxCode += 'export default GridLayout;';
  
  return tsxCode;
};

// Flex TSX + Bootstrap Generator
const generateFlexTsxBootstrap = (params: CodeGeneratorParams): string => {
  const { flexItems, flexDirection, isCustomMode, flexConfigs } = params;

  let tsxCode = 'import React from "react";\n\n';
  tsxCode += '// Make sure to include Bootstrap CSS in your project\n';
  tsxCode += '// import "bootstrap/dist/css/bootstrap.min.css";\n\n';
  tsxCode += 'const FlexLayout: React.FC = () => {\n';
  tsxCode += '  return (\n';
  tsxCode += '    <div className="container">\n';
  tsxCode += `      <div className="d-flex ${flexDirection === 'column' ? 'flex-column' : 'flex-row flex-wrap'} gap-3" ${flexDirection === 'column' ? 'style={{ minHeight: "400px" }}' : ''}>\n`;
  
  if (isCustomMode) {
    for (let i = 0; i < flexItems; i++) {
      const item = flexConfigs[i];
      const type = item.label;
      let bgClass = '';
      
      switch (type) {
        case 'sidebar':
          bgClass = 'bg-primary bg-opacity-10';
          break;
        case 'header':
          bgClass = 'bg-success bg-opacity-10';
          break;
        case 'footer':
          bgClass = 'bg-info bg-opacity-10';
          break;
        case 'nav':
          bgClass = 'bg-warning bg-opacity-10';
          break;
        default:
          bgClass = 'bg-light';
      }
      
      tsxCode += `        {/* ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1} */}\n`;
      tsxCode += `        <div className="p-3 border rounded ${bgClass}" \n`;
      tsxCode += `             style={{ flexGrow: ${item.flexGrow}, flexShrink: ${item.flexShrink}, flexBasis: "${item.flexBasis}", order: ${item.order} }}>\n`;
      tsxCode += `          ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}\n`;
      tsxCode += '        </div>\n';
    }
  } else {
    for (let i = 0; i < flexItems; i++) {
      tsxCode += `        <div className="flex-grow-1 p-3 border rounded bg-light text-center">\n`;
      tsxCode += `          Item ${i+1}\n`;
      tsxCode += '        </div>\n';
    }
  }
  
  tsxCode += '      </div>\n';
  tsxCode += '    </div>\n';
  tsxCode += '  );\n';
  tsxCode += '};\n\n';
  tsxCode += 'export default FlexLayout;';
  
  return tsxCode;
};

// Grid JSX + TailwindCSS Generator - Similar to TSX but without types
const generateGridJsxTailwind = (params: CodeGeneratorParams): string => {
  const { rows, columns, isCustomMode, rowConfigs } = params;
  
  // Convert TSX to JSX by removing type annotations
  let jsxCode = 'import React from "react";\n\n';
  jsxCode += 'const GridLayout = () => {\n';
  jsxCode += '  return (\n';
  
  if (isCustomMode) {
    jsxCode += '    <div className="flex flex-col w-full gap-4">\n';
    
    for (let i = 0; i < rows; i++) {
      jsxCode += '      {/* Row ' + (i+1) + ' */}\n';
      jsxCode += '      <div className="flex flex-col md:flex-row w-full gap-4">\n';
      
      for (let j = 0; j < rowConfigs[i].columns.length; j++) {
        const column = rowConfigs[i].columns[j];
        const type = column.type;
        let bgColor = 'bg-white';
        
        switch (type) {
          case 'sidebar':
            bgColor = 'bg-blue-50';
            break;
          case 'header':
            bgColor = 'bg-green-50';
            break;
          case 'footer':
            bgColor = 'bg-purple-50';
            break;
          case 'nav':
            bgColor = 'bg-yellow-50';
            break;
          default:
            bgColor = 'bg-white';
        }
        
        jsxCode += `        {/* ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}-${j+1} */}\n`;
        jsxCode += `        <div className="w-full md:w-[${column.width}%] p-4 ${bgColor} border border-gray-200 rounded-lg">\n`;
        jsxCode += `          ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}-${j+1}\n`;
        jsxCode += '        </div>\n';
      }
      
      jsxCode += '      </div>\n';
    }
    
    jsxCode += '    </div>\n';
  } else {
    jsxCode += '    <div className="grid grid-cols-1 md:grid-cols-' + columns + ' gap-4">\n';
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cellNumber = i * columns + j + 1;
        jsxCode += '      <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">\n';
        jsxCode += `        Cell ${cellNumber}\n`;
        jsxCode += '      </div>\n';
      }
    }
    
    jsxCode += '    </div>\n';
  }
  
  jsxCode += '  );\n';
  jsxCode += '};\n\n';
  jsxCode += 'export default GridLayout;';
  
  return jsxCode;
};

// Flex JSX + TailwindCSS Generator
const generateFlexJsxTailwind = (params: CodeGeneratorParams): string => {
  const { flexItems, flexDirection, isCustomMode, flexConfigs } = params;

  let jsxCode = 'import React from "react";\n\n';
  jsxCode += 'const FlexLayout = () => {\n';
  jsxCode += '  return (\n';
  
  jsxCode += `    <div className="flex ${flexDirection === 'column' ? 'flex-col' : 'flex-row'} w-full gap-4"${flexDirection === 'column' ? ' style={{ minHeight: "400px" }}' : ''}>\n`;
  
  if (isCustomMode) {
    for (let i = 0; i < flexItems; i++) {
      const item = flexConfigs[i];
      const type = item.label;
      let bgColor = 'bg-white';
      
      switch (type) {
        case 'sidebar':
          bgColor = 'bg-blue-50';
          break;
        case 'header':
          bgColor = 'bg-green-50';
          break;
        case 'footer':
          bgColor = 'bg-purple-50';
          break;
        case 'nav':
          bgColor = 'bg-yellow-50';
          break;
        default:
          bgColor = 'bg-white';
      }
      
      jsxCode += `      {/* ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1} */}\n`;
      jsxCode += `      <div className="p-4 ${bgColor} border border-gray-200 rounded-lg"\n`;
      jsxCode += `           style={{ flexGrow: ${item.flexGrow}, flexShrink: ${item.flexShrink}, flexBasis: "${item.flexBasis}", order: ${item.order} }}>\n`;
      jsxCode += `        ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}\n`;
      jsxCode += '      </div>\n';
    }
  } else {
    for (let i = 0; i < flexItems; i++) {
      jsxCode += `      <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg text-center">\n`;
      jsxCode += `        Item ${i+1}\n`;
      jsxCode += '      </div>\n';
    }
  }
  
  jsxCode += '    </div>\n';
  jsxCode += '  );\n';
  jsxCode += '};\n\n';
  jsxCode += 'export default FlexLayout;';
  
  return jsxCode;
};

// Grid JSX + Bootstrap Generator - Similar to TSX but without types
const generateGridJsxBootstrap = (params: CodeGeneratorParams): string => {
  const { rows, columns, isCustomMode, rowConfigs } = params;
  
  let jsxCode = 'import React from "react";\n\n';
  jsxCode += '// Make sure to include Bootstrap CSS in your project\n';
  jsxCode += '// import "bootstrap/dist/css/bootstrap.min.css";\n\n';
  jsxCode += 'const GridLayout = () => {\n';
  jsxCode += '  return (\n';
  jsxCode += '    <div className="container">\n';
  
  if (isCustomMode) {
    for (let i = 0; i < rows; i++) {
      jsxCode += '      {/* Row ' + (i+1) + ' */}\n';
      jsxCode += '      <div className="row gy-4 mb-4">\n';
      
      for (let j = 0; j < rowConfigs[i].columns.length; j++) {
        const column = rowConfigs[i].columns[j];
        const type = column.type;
        let bgClass = '';
        
        switch (type) {
          case 'sidebar':
            bgClass = 'bg-primary bg-opacity-10';
            break;
          case 'header':
            bgClass = 'bg-success bg-opacity-10';
            break;
          case 'footer':
            bgClass = 'bg-info bg-opacity-10';
            break;
          case 'nav':
            bgClass = 'bg-warning bg-opacity-10';
            break;
          default:
            bgClass = 'bg-light';
        }
        
        // Calculate Bootstrap column width (out of 12)
        const bsWidth = Math.round((column.width / 100) * 12);
        
        jsxCode += `        {/* ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}-${j+1} */}\n`;
        jsxCode += `        <div className="col-12 col-md-${bsWidth}">\n`;
        jsxCode += `          <div className="p-3 border rounded ${bgClass}">\n`;
        jsxCode += `            ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}-${j+1}\n`;
        jsxCode += '          </div>\n';
        jsxCode += '        </div>\n';
      }
      
      jsxCode += '      </div>\n';
    }
  } else {
    for (let i = 0; i < rows; i++) {
      jsxCode += '      <div className="row gy-4 mb-4">\n';
      
      for (let j = 0; j < columns; j++) {
        const cellNumber = i * columns + j + 1;
        // Calculate Bootstrap column width (out of 12)
        const bsWidth = Math.floor(12 / columns);
        
        jsxCode += `        <div className="col-12 col-md-${bsWidth}">\n`;
        jsxCode += '          <div className="p-3 border rounded bg-light text-center">\n';
        jsxCode += `            Cell ${cellNumber}\n`;
        jsxCode += '          </div>\n';
        jsxCode += '        </div>\n';
      }
      
      jsxCode += '      </div>\n';
    }
  }
  
  jsxCode += '    </div>\n';
  jsxCode += '  );\n';
  jsxCode += '};\n\n';
  jsxCode += 'export default GridLayout;';
  
  return jsxCode;
};

// Flex JSX + Bootstrap Generator
const generateFlexJsxBootstrap = (params: CodeGeneratorParams): string => {
  const { flexItems, flexDirection, isCustomMode, flexConfigs } = params;

  let jsxCode = 'import React from "react";\n\n';
  jsxCode += '// Make sure to include Bootstrap CSS in your project\n';
  jsxCode += '// import "bootstrap/dist/css/bootstrap.min.css";\n\n';
  jsxCode += 'const FlexLayout = () => {\n';
  jsxCode += '  return (\n';
  jsxCode += '    <div className="container">\n';
  jsxCode += `      <div className="d-flex ${flexDirection === 'column' ? 'flex-column' : 'flex-row flex-wrap'} gap-3" ${flexDirection === 'column' ? 'style={{ minHeight: "400px" }}' : ''}>\n`;
  
  if (isCustomMode) {
    for (let i = 0; i < flexItems; i++) {
      const item = flexConfigs[i];
      const type = item.label;
      let bgClass = '';
      
      switch (type) {
        case 'sidebar':
          bgClass = 'bg-primary bg-opacity-10';
          break;
        case 'header':
          bgClass = 'bg-success bg-opacity-10';
          break;
        case 'footer':
          bgClass = 'bg-info bg-opacity-10';
          break;
        case 'nav':
          bgClass = 'bg-warning bg-opacity-10';
          break;
        default:
          bgClass = 'bg-light';
      }
      
      jsxCode += `        {/* ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1} */}\n`;
      jsxCode += `        <div className="p-3 border rounded ${bgClass}" \n`;
      jsxCode += `             style={{ flexGrow: ${item.flexGrow}, flexShrink: ${item.flexShrink}, flexBasis: "${item.flexBasis}", order: ${item.order} }}>\n`;
      jsxCode += `          ${type.charAt(0).toUpperCase() + type.slice(1)} ${i+1}\n`;
      jsxCode += '        </div>\n';
    }
  } else {
    for (let i = 0; i < flexItems; i++) {
      jsxCode += `        <div className="flex-grow-1 p-3 border rounded bg-light text-center">\n`;
      jsxCode += `          Item ${i+1}\n`;
      jsxCode += '        </div>\n';
    }
  }
  
  jsxCode += '      </div>\n';
  jsxCode += '    </div>\n';
  jsxCode += '  );\n';
  jsxCode += '};\n\n';
  jsxCode += 'export default FlexLayout;';
  
  return jsxCode;
};
