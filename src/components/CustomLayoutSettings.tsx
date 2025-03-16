
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ColumnConfig {
  type: string;
  width: number;
}

interface RowConfig {
  columns: ColumnConfig[];
}

interface CustomLayoutSettingsProps {
  rows: number;
  columns: number;
  rowConfigs: RowConfig[];
  setRowConfigs: (configs: RowConfig[]) => void;
  selectedRow: number;
  setSelectedRow: (row: number) => void;
}

const CustomLayoutSettings: React.FC<CustomLayoutSettingsProps> = ({
  rows,
  columns,
  rowConfigs,
  setRowConfigs,
  selectedRow,
  setSelectedRow,
}) => {
  const handleRowSelect = (value: string) => {
    setSelectedRow(parseInt(value));
  };

  const handleColumnTypeChange = (index: number, type: string) => {
    const newConfigs = [...rowConfigs];
    newConfigs[selectedRow].columns[index].type = type;
    setRowConfigs(newConfigs);
  };

  const handleWidthChange = (index: number, value: number[]) => {
    // Calculate proportional widths for all columns
    const newConfigs = [...rowConfigs];
    const currentRow = newConfigs[selectedRow];
    
    // Set the width for the current column
    currentRow.columns[index].width = value[0];
    
    // Adjust other columns proportionally to ensure total is 100%
    const currentTotal = currentRow.columns.reduce((sum, col) => sum + col.width, 0);
    
    if (currentTotal !== 100) {
      // Find how much we need to distribute to other columns
      const remainder = 100 - value[0];
      const otherColumns = currentRow.columns.filter((_, i) => i !== index);
      const otherColumnsTotal = otherColumns.reduce((sum, col) => sum + col.width, 0);
      
      // Distribute proportionally
      if (otherColumnsTotal > 0) {
        for (let i = 0; i < currentRow.columns.length; i++) {
          if (i !== index) {
            // Scale other columns proportionally
            const ratio = currentRow.columns[i].width / otherColumnsTotal;
            currentRow.columns[i].width = Math.round(remainder * ratio);
          }
        }
      }
      
      // Fix rounding errors to ensure total is 100%
      const finalTotal = currentRow.columns.reduce((sum, col) => sum + col.width, 0);
      if (finalTotal !== 100) {
        // Add or subtract the difference from the last column that's not the one being modified
        for (let i = currentRow.columns.length - 1; i >= 0; i--) {
          if (i !== index) {
            currentRow.columns[i].width += (100 - finalTotal);
            break;
          }
        }
      }
    }
    
    setRowConfigs(newConfigs);
  };

  const columnTypes = [
    { value: 'content', label: 'Content' },
    { value: 'sidebar', label: 'Sidebar' },
    { value: 'header', label: 'Header' },
    { value: 'footer', label: 'Footer' },
    { value: 'nav', label: 'Navigation' },
  ];

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Custom Layout Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="selectedRow">Select Row</Label>
            <Select 
              value={selectedRow.toString()} 
              onValueChange={handleRowSelect}
            >
              <SelectTrigger id="selectedRow" className="custom-input">
                <SelectValue placeholder="Select a row" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: rows }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    Row {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {rowConfigs[selectedRow]?.columns.map((column, colIndex) => (
              <AccordionItem key={colIndex} value={`column-${colIndex}`}>
                <AccordionTrigger className="text-sm font-medium">
                  Column {colIndex + 1} - {column.type} ({column.width}%)
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`column-type-${colIndex}`}>Column Type</Label>
                    <Select
                      value={column.type}
                      onValueChange={(value) => handleColumnTypeChange(colIndex, value)}
                    >
                      <SelectTrigger id={`column-type-${colIndex}`} className="custom-input">
                        <SelectValue placeholder="Select column type" />
                      </SelectTrigger>
                      <SelectContent>
                        {columnTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={`column-width-${colIndex}`}>Column Width</Label>
                      <span className="text-sm text-muted-foreground">{column.width}%</span>
                    </div>
                    <Slider
                      id={`column-width-${colIndex}`}
                      min={10}
                      max={100}
                      step={5}
                      value={[column.width]}
                      onValueChange={(value) => handleWidthChange(colIndex, value)}
                      className="my-3"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomLayoutSettings;
