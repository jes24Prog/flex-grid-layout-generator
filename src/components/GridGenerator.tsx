
import React, { useState, useEffect } from 'react';
import GridControls from './GridControls';
import CustomLayoutSettings from './CustomLayoutSettings';
import FlexLayoutSettings from './FlexLayoutSettings';
import GridPreview from './GridPreview';
import CodeOutput from './CodeOutput';
import { generateCode } from '../utils/codeGenerators';

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

const GridGenerator: React.FC = () => {
  // Main layout settings
  const [layoutType, setLayoutType] = useState<string>('grid');
  const [rows, setRows] = useState<number>(2);
  const [columns, setColumns] = useState<number>(2);
  const [flexItems, setFlexItems] = useState<number>(4);
  const [flexDirection, setFlexDirection] = useState<string>('row');
  const [outputFormat, setOutputFormat] = useState<string>('html-css');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  
  // Custom layout settings
  const [rowConfigs, setRowConfigs] = useState<RowConfig[]>([]);
  const [flexConfigs, setFlexConfigs] = useState<FlexItemConfig[]>([]);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  
  // Generated code
  const [generatedCode, setGeneratedCode] = useState<string>('');
  
  // Initialize or reset row configurations when grid settings change
  useEffect(() => {
    if (layoutType === 'grid') {
      initializeRowConfigs();
    }
  }, [rows, columns, layoutType]);
  
  // Initialize or reset flex configurations when flex settings change
  useEffect(() => {
    if (layoutType === 'flex') {
      initializeFlexConfigs();
    }
  }, [flexItems, layoutType]);
  
  // Generate code when any settings change
  useEffect(() => {
    try {
      const code = generateCode({
        layoutType,
        rows,
        columns,
        flexItems,
        flexDirection,
        isCustomMode,
        rowConfigs,
        flexConfigs,
        outputFormat,
      });
      setGeneratedCode(code);
    } catch (error) {
      console.error("Error generating code:", error);
      setGeneratedCode("// Error generating code. Please check your settings.");
    }
  }, [layoutType, rows, columns, flexItems, flexDirection, isCustomMode, rowConfigs, flexConfigs, outputFormat]);
  
  // Initialize row configurations
  const initializeRowConfigs = () => {
    const configs: RowConfig[] = [];
    
    for (let i = 0; i < rows; i++) {
      const rowColumns: ColumnConfig[] = [];
      const equalWidth = Math.floor(100 / columns);
      
      for (let j = 0; j < columns; j++) {
        rowColumns.push({
          type: 'content',
          width: equalWidth + (j === columns - 1 ? 100 - equalWidth * columns : 0)
        });
      }
      
      configs.push({ columns: rowColumns });
    }
    
    setRowConfigs(configs);
    
    // Reset selected row if necessary
    if (selectedRow >= rows) {
      setSelectedRow(0);
    }
  };

  // Initialize flex configurations
  const initializeFlexConfigs = () => {
    const configs: FlexItemConfig[] = [];
    
    for (let i = 0; i < flexItems; i++) {
      configs.push({
        label: 'content',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        order: 0
      });
    }
    
    setFlexConfigs(configs);
    
    // Reset selected item if necessary
    if (selectedItem >= flexItems) {
      setSelectedItem(0);
    }
  };
  
  const getLanguageFromFormat = (format: string): string => {
    if (format.startsWith('html')) return 'html';
    if (format.includes('tsx')) return 'tsx';
    return 'jsx';
  };
  
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 space-y-6">
          <GridControls
            layoutType={layoutType}
            setLayoutType={setLayoutType}
            rows={rows}
            setRows={setRows}
            columns={columns}
            setColumns={setColumns}
            flexItems={flexItems}
            setFlexItems={setFlexItems}
            flexDirection={flexDirection}
            setFlexDirection={setFlexDirection}
            outputFormat={outputFormat}
            setOutputFormat={setOutputFormat}
            isCustomMode={isCustomMode}
            setIsCustomMode={setIsCustomMode}
          />
          
          {isCustomMode && layoutType === 'grid' && rowConfigs.length > 0 && (
            <CustomLayoutSettings
              rows={rows}
              columns={columns}
              rowConfigs={rowConfigs}
              setRowConfigs={setRowConfigs}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
          )}

          {isCustomMode && layoutType === 'flex' && flexConfigs.length > 0 && (
            <FlexLayoutSettings
              flexItems={flexItems}
              flexDirection={flexDirection}
              flexConfigs={flexConfigs}
              setFlexConfigs={setFlexConfigs}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          )}
        </div>
        
        <div className="w-full md:w-2/3">
          <GridPreview
            layoutType={layoutType}
            rows={rows}
            columns={columns}
            flexItems={flexItems}
            flexDirection={flexDirection}
            isCustomMode={isCustomMode}
            rowConfigs={rowConfigs}
            flexConfigs={flexConfigs}
            selectedRow={selectedRow}
            selectedItem={selectedItem}
          />
        </div>
      </div>
      
      <CodeOutput 
        code={generatedCode} 
        language={getLanguageFromFormat(outputFormat)}
      />
    </div>
  );
};

export default GridGenerator;
