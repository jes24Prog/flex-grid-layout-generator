
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
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FlexItemConfig {
  label: string;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  order: number;
}

interface FlexLayoutSettingsProps {
  flexItems: number;
  flexDirection: string;
  flexConfigs: FlexItemConfig[];
  setFlexConfigs: (configs: FlexItemConfig[]) => void;
  selectedItem: number;
  setSelectedItem: (item: number) => void;
}

const FlexLayoutSettings: React.FC<FlexLayoutSettingsProps> = ({
  flexItems,
  flexDirection,
  flexConfigs,
  setFlexConfigs,
  selectedItem,
  setSelectedItem,
}) => {
  const handleItemSelect = (value: string) => {
    setSelectedItem(parseInt(value));
  };

  const handleLabelChange = (index: number, value: string) => {
    const newConfigs = [...flexConfigs];
    newConfigs[index].label = value;
    setFlexConfigs(newConfigs);
  };

  const handleFlexGrowChange = (index: number, value: number[]) => {
    const newConfigs = [...flexConfigs];
    newConfigs[index].flexGrow = value[0];
    setFlexConfigs(newConfigs);
  };

  const handleFlexShrinkChange = (index: number, value: number[]) => {
    const newConfigs = [...flexConfigs];
    newConfigs[index].flexShrink = value[0];
    setFlexConfigs(newConfigs);
  };

  const handleFlexBasisChange = (index: number, value: string) => {
    const newConfigs = [...flexConfigs];
    newConfigs[index].flexBasis = value;
    setFlexConfigs(newConfigs);
  };

  const handleOrderChange = (index: number, value: number[]) => {
    const newConfigs = [...flexConfigs];
    newConfigs[index].order = value[0];
    setFlexConfigs(newConfigs);
  };

  const itemTypes = [
    { value: 'content', label: 'Content' },
    { value: 'sidebar', label: 'Sidebar' },
    { value: 'header', label: 'Header' },
    { value: 'footer', label: 'Footer' },
    { value: 'nav', label: 'Navigation' },
  ];

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Flex Layout Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="selectedItem">Select Flex Item</Label>
            <Select 
              value={selectedItem.toString()} 
              onValueChange={handleItemSelect}
            >
              <SelectTrigger id="selectedItem" className="custom-input">
                <SelectValue placeholder="Select a flex item" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: flexItems }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    Item {i + 1} - {flexConfigs[i]?.label || 'item'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {flexConfigs.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-medium">
                  Item {index + 1} - {item.label} (Order: {item.order})
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`item-label-${index}`}>Item Label</Label>
                    <Select
                      value={item.label}
                      onValueChange={(value) => handleLabelChange(index, value)}
                    >
                      <SelectTrigger id={`item-label-${index}`} className="custom-input">
                        <SelectValue placeholder="Select item type" />
                      </SelectTrigger>
                      <SelectContent>
                        {itemTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={`flex-grow-${index}`}>Flex Grow</Label>
                      <span className="text-sm text-muted-foreground">{item.flexGrow}</span>
                    </div>
                    <Slider
                      id={`flex-grow-${index}`}
                      min={0}
                      max={5}
                      step={1}
                      value={[item.flexGrow]}
                      onValueChange={(value) => handleFlexGrowChange(index, value)}
                      className="my-3"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={`flex-shrink-${index}`}>Flex Shrink</Label>
                      <span className="text-sm text-muted-foreground">{item.flexShrink}</span>
                    </div>
                    <Slider
                      id={`flex-shrink-${index}`}
                      min={0}
                      max={3}
                      step={1}
                      value={[item.flexShrink]}
                      onValueChange={(value) => handleFlexShrinkChange(index, value)}
                      className="my-3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`flex-basis-${index}`}>Flex Basis</Label>
                    <Select
                      value={item.flexBasis}
                      onValueChange={(value) => handleFlexBasisChange(index, value)}
                    >
                      <SelectTrigger id={`flex-basis-${index}`} className="custom-input">
                        <SelectValue placeholder="Select flex basis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="25%">25%</SelectItem>
                        <SelectItem value="33%">33%</SelectItem>
                        <SelectItem value="50%">50%</SelectItem>
                        <SelectItem value="66%">66%</SelectItem>
                        <SelectItem value="75%">75%</SelectItem>
                        <SelectItem value="100%">100%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={`order-${index}`}>Order</Label>
                      <span className="text-sm text-muted-foreground">{item.order}</span>
                    </div>
                    <Slider
                      id={`order-${index}`}
                      min={-5}
                      max={5}
                      step={1}
                      value={[item.order]}
                      onValueChange={(value) => handleOrderChange(index, value)}
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

export default FlexLayoutSettings;
