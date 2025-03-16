
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface GridPreviewProps {
  layoutType: string;
  rows: number;
  columns: number;
  flexItems: number;
  flexDirection: string;
  isCustomMode: boolean;
  rowConfigs: RowConfig[];
  flexConfigs: FlexItemConfig[];
  selectedRow: number;
  selectedItem: number;
}

const GridPreview: React.FC<GridPreviewProps> = ({
  layoutType,
  rows,
  columns,
  flexItems,
  flexDirection,
  isCustomMode,
  rowConfigs,
  flexConfigs,
  selectedRow,
  selectedItem,
}) => {
  // Generate colors based on column/item type
  const getItemColor = (type: string) => {
    switch (type) {
      case 'sidebar':
        return 'bg-blue-100/70';
      case 'header':
        return 'bg-green-100/70';
      case 'footer':
        return 'bg-purple-100/70';
      case 'nav':
        return 'bg-yellow-100/70';
      case 'content':
      default:
        return 'bg-white/70';
    }
  };

  // Generate styles for a cell in standard grid mode
  const getCellStyles = (row: number, col: number) => {
    return {
      className: `grid-cell p-4 aspect-[4/3]`
    };
  };

  // Generate styles for a custom grid layout cell
  const getCustomCellStyles = (row: number, colIndex: number) => {
    if (!rowConfigs[row] || !rowConfigs[row].columns[colIndex]) {
      return {
        className: 'grid-cell p-4 aspect-[4/3]',
        style: { width: `${100 / columns}%` }
      };
    }

    const column = rowConfigs[row].columns[colIndex];
    return {
      className: `grid-cell p-4 ${getItemColor(column.type)} ${row === selectedRow ? 'ring-2 ring-primary/30' : ''}`,
      style: { width: `${column.width}%` }
    };
  };

  // Generate styles for a flex item in standard mode
  const getFlexItemStyles = (index: number) => {
    return {
      className: 'grid-cell p-4 aspect-[4/3] flex-grow flex-shrink basis-0',
    };
  };

  // Generate styles for a custom flex layout item
  const getCustomFlexItemStyles = (index: number) => {
    if (!flexConfigs[index]) {
      return {
        className: 'grid-cell p-4 aspect-[4/3] flex-grow flex-shrink basis-0',
        style: {}
      };
    }

    const item = flexConfigs[index];
    return {
      className: `grid-cell p-4 ${getItemColor(item.label)} ${index === selectedItem ? 'ring-2 ring-primary/30' : ''}`,
      style: {
        flexGrow: item.flexGrow,
        flexShrink: item.flexShrink,
        flexBasis: item.flexBasis,
        order: item.order
      }
    };
  };

  // Render the standard grid
  const renderStandardGrid = () => {
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex w-full">
        {Array.from({ length: columns }).map((_, colIndex) => {
          const { className } = getCellStyles(rowIndex, colIndex);
          return (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className={className}
              style={{ width: `${100 / columns}%` }}
            >
              {rowIndex * columns + colIndex + 1}
            </div>
          );
        })}
      </div>
    ));
  };

  // Render the custom grid layout
  const renderCustomGrid = () => {
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex flex-wrap w-full">
        {rowConfigs[rowIndex]?.columns.map((_, colIndex) => {
          const { className, style } = getCustomCellStyles(rowIndex, colIndex);
          return (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className={className}
              style={style}
            >
              <div className="text-sm font-medium">
                {rowConfigs[rowIndex]?.columns[colIndex]?.type || 'content'}
              </div>
              <div className="text-xs text-muted-foreground">
                {rowConfigs[rowIndex]?.columns[colIndex]?.width || (100 / columns)}%
              </div>
            </div>
          );
        })}
      </div>
    ));
  };

  // Render the standard flex layout
  const renderStandardFlex = () => {
    return (
      <div 
        className={`flex ${flexDirection === 'column' ? 'flex-col' : 'flex-row'} w-full gap-2`}
        style={{ minHeight: flexDirection === 'column' ? '400px' : 'auto' }}
      >
        {Array.from({ length: flexItems }).map((_, index) => {
          const { className } = getFlexItemStyles(index);
          return (
            <div
              key={`flex-item-${index}`}
              className={className}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    );
  };

  // Render the custom flex layout
  const renderCustomFlex = () => {
    return (
      <div 
        className={`flex ${flexDirection === 'column' ? 'flex-col' : 'flex-row'} w-full gap-2`}
        style={{ minHeight: flexDirection === 'column' ? '400px' : 'auto' }}
      >
        {flexConfigs.map((_, index) => {
          const { className, style } = getCustomFlexItemStyles(index);
          return (
            <div
              key={`flex-item-${index}`}
              className={className}
              style={style}
            >
              <div className="text-sm font-medium">
                {flexConfigs[index]?.label || 'item'}
              </div>
              <div className="text-xs text-muted-foreground">
                grow: {flexConfigs[index]?.flexGrow || 1},
                shrink: {flexConfigs[index]?.flexShrink || 1},
                basis: {flexConfigs[index]?.flexBasis || 'auto'}
              </div>
              <div className="text-xs text-muted-foreground">
                order: {flexConfigs[index]?.order || 0}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full animate-fade-in h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Preview</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto pb-6 flex flex-col max-h-[600px]">
        <div className="flex flex-col w-full border border-border rounded-lg overflow-hidden">
          {layoutType === 'grid' ? (
            isCustomMode ? renderCustomGrid() : renderStandardGrid()
          ) : (
            isCustomMode ? renderCustomFlex() : renderStandardFlex()
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GridPreview;
