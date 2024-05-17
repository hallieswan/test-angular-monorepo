/* Points to plot on the boxplot */
export type BoxplotPoint = {
  // x-axis category for this point
  xAxisCategory: string | number;
  // value of this point
  value: number;
  // if defined, will plot this point in the appropriate grid. otherwise, will not use grids.
  gridCategory?: string;
  // if defined, will use a different shape and color for each pointCategory.
  pointCategory?: string;
};

/* Pre-computed boxplot summary statistics */
export type BoxplotSummary = {
  // x-axis category for this boxplot
  xAxisCategory: string;
  min: number;
  firstQuartile: number;
  median: number;
  thirdQuartile: number;
  max: number;
  // if defined, will plot this boxplot in the appropriate grid. otherwise, will not use grids.
  gridCategory?: string;
};

export interface BoxplotProps {
  points: BoxplotPoint[];
  /* if defined, will be used to plot boxplots. otherwise, will calculate 
  boxplot summary statistics using the provided points. */
  summary?: BoxplotSummary[];
  title?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
  yAxisMin?: number;
  yAxisMax?: number;
  /* if defined, will be used to map x-axis categories to tooltip text and will 
  display a tooltip on each x-axis label, where key is the xAxisCategory and value 
  is the tooltipText. otherwise, tooltips will not be displayed. */
  xAxisCategoryToTooltipText?: Record<string, string>;
  /* if defined, will be used to format tooltip for each point. */
  pointTooltipFormatter?: (pt: BoxplotPoint) => string;
}
