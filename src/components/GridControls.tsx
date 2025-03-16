
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
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
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

interface GridControlsProps {
  layoutType: string;
  setLayoutType: (type: string) => void;
  rows: number;
  setRows: (rows: number) => void;
  columns: number;
  setColumns: (columns: number) => void;
  flexItems: number;
  setFlexItems: (items: number) => void;
  flexDirection: string;
  setFlexDirection: (direction: string) => void;
  outputFormat: string;
  setOutputFormat: (format: string) => void;
  isCustomMode: boolean;
  setIsCustomMode: (isCustom: boolean) => void;
}

const GridControls: React.FC<GridControlsProps> = ({
  layoutType,
  setLayoutType,
  rows,
  setRows,
  columns,
  setColumns,
  flexItems,
  setFlexItems,
  flexDirection,
  setFlexDirection,
  outputFormat,
  setOutputFormat,
  isCustomMode,
  setIsCustomMode,
}) => {
  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setRows(value);
    }
  };

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 12) {
      setColumns(value);
    }
  };

  const handleFlexItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 12) {
      setFlexItems(value);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Layout Generator</CardTitle>
        <CardDescription>
          Configure your layout and generate code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="layoutType">Layout Type</Label>
          <Select
            value={layoutType}
            onValueChange={setLayoutType}
          >
            <SelectTrigger id="layoutType" className="custom-input">
              <SelectValue placeholder="Select layout type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Grid</SelectItem>
              <SelectItem value="flex">Flex</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="layout" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="layout" className="flex-1">Layout Settings</TabsTrigger>
            <TabsTrigger value="output" className="flex-1">Output Format</TabsTrigger>
          </TabsList>
          
          <TabsContent value="layout" className="space-y-4">
            {layoutType === 'grid' ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rows">Rows (max 10)</Label>
                  <Input
                    id="rows"
                    type="number"
                    min="1"
                    max="10"
                    value={rows}
                    onChange={handleRowChange}
                    className="custom-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="columns">Columns (max 12)</Label>
                  <Input
                    id="columns"
                    type="number"
                    min="1"
                    max="12"
                    value={columns}
                    onChange={handleColumnChange}
                    className="custom-input"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="flexDirection">Orientation</Label>
                  <Select
                    value={flexDirection}
                    onValueChange={setFlexDirection}
                  >
                    <SelectTrigger id="flexDirection" className="custom-input">
                      <SelectValue placeholder="Select flex direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row">Row</SelectItem>
                      <SelectItem value="column">Column</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flexItems">Flex Items (max 12)</Label>
                  <Input
                    id="flexItems"
                    type="number"
                    min="1"
                    max="12"
                    value={flexItems}
                    onChange={handleFlexItemsChange}
                    className="custom-input"
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch 
                id="customMode" 
                checked={isCustomMode}
                onCheckedChange={setIsCustomMode}
              />
              <Label htmlFor="customMode">Enable Custom Layout Mode</Label>
            </div>
          </TabsContent>
          
          <TabsContent value="output" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="outputFormat">Output Format</Label>
              <Select
                value={outputFormat}
                onValueChange={setOutputFormat}
              >
                <SelectTrigger id="outputFormat" className="custom-input">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html-css">HTML + CSS</SelectItem>
                  <SelectItem value="tsx-tailwind">TSX + TailwindCSS</SelectItem>
                  <SelectItem value="tsx-bootstrap">TSX + Bootstrap</SelectItem>
                  <SelectItem value="jsx-tailwind">JSX + TailwindCSS</SelectItem>
                  <SelectItem value="jsx-bootstrap">JSX + Bootstrap</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GridControls;
