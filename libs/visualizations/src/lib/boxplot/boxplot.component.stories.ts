import { CategoryPoint } from '@angular-monorepo/sage-visualizations';
import type { Meta, StoryObj } from '@storybook/angular';
import { BoxplotComponent } from './boxplot.component';

const meta: Meta<BoxplotComponent> = {
  component: BoxplotComponent,
  title: 'BoxplotComponent',
  argTypes: {
    pointTooltipFormatter: { type: 'function', control: 'function' },
  },
};
export default meta;
type Story = StoryObj<BoxplotComponent>;

export const NoData: Story = {
  args: {},
};

export const StaticSummary: Story = {
  args: {
    points: [
      { xAxisCategory: 'CAT1', value: 25 },
      { xAxisCategory: 'CAT2', value: 35 },
      { xAxisCategory: 'CAT3', value: 45 },
      { xAxisCategory: 'CAT4', value: 55 },
    ],
    summaries: [
      {
        xAxisCategory: 'CAT1',
        min: 10,
        firstQuartile: 20,
        median: 30,
        thirdQuartile: 40,
        max: 50,
      },
      {
        xAxisCategory: 'CAT2',
        min: 15,
        firstQuartile: 25,
        median: 35,
        thirdQuartile: 45,
        max: 55,
      },
      {
        xAxisCategory: 'CAT3',
        min: 20,
        firstQuartile: 30,
        median: 40,
        thirdQuartile: 50,
        max: 60,
      },
      {
        xAxisCategory: 'CAT4',
        min: 20,
        firstQuartile: 30,
        median: 40,
        thirdQuartile: 50,
        max: 60,
      },
    ],
    xAxisCategoryToTooltipText: {
      CAT1: 'Category 1',
      CAT2: 'Category 2',
      CAT3: 'Category 3',
      CAT4: 'Category 4',
    },
    xAxisTitle: 'BRAIN REGION',
    yAxisTitle: 'LOG 2 FOLD CHANGE',
    yAxisMax: 100,
    yAxisMin: -100,
    title: 'AD Diagnosis (males and females)',
    pointTooltipFormatter: (pt: CategoryPoint) => {
      return `Value: ${pt.value}`;
    },
  },
};

export const DynamicSummary: Story = {
  args: {
    points: [
      { xAxisCategory: 'Control1', value: 573, pointCategory: 'Female' },
      { xAxisCategory: 'Control1', value: 317, pointCategory: 'Female' },
      { xAxisCategory: 'Control1', value: 759, pointCategory: 'Female' },
      { xAxisCategory: 'Control2', value: 809, pointCategory: 'Female' },
      { xAxisCategory: 'Control2', value: 537, pointCategory: 'Female' },
      { xAxisCategory: 'Control2', value: 590, pointCategory: 'Female' },
      { xAxisCategory: 'Experimental', value: 596, pointCategory: 'Female' },
      { xAxisCategory: 'Experimental', value: 416, pointCategory: 'Female' },
      { xAxisCategory: 'Experimental', value: 626, pointCategory: 'Female' },
      { xAxisCategory: 'Control1', value: 877, pointCategory: 'Male' },
      { xAxisCategory: 'Control1', value: 699, pointCategory: 'Male' },
      { xAxisCategory: 'Control1', value: 854, pointCategory: 'Male' },
      { xAxisCategory: 'Control2', value: 550, pointCategory: 'Male' },
      { xAxisCategory: 'Control2', value: 919, pointCategory: 'Male' },
      { xAxisCategory: 'Control2', value: 407, pointCategory: 'Male' },
      { xAxisCategory: 'Experimental', value: 982, pointCategory: 'Male' },
      { xAxisCategory: 'Experimental', value: 336, pointCategory: 'Male' },
      { xAxisCategory: 'Experimental', value: 856, pointCategory: 'Male' },
    ],
    xAxisTitle: 'MODEL',
    yAxisTitle: '#objects/sqmm',
    pointTooltipFormatter: (pt: CategoryPoint) =>
      `${pt.pointCategory}: ${pt.value}`,
  },
};
