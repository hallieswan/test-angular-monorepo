import { BoxplotPoint } from '@angular-monorepo/sage-visualizations';
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
    ],
    summary: [
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
    ],
    xAxisCategoryToTooltipText: {
      CAT1: 'Category 1',
      CAT2: 'Category 2',
      CAT3: 'Category 3',
    },
    xAxisTitle: 'BRAIN REGION',
    yAxisTitle: 'LOG 2 FOLD CHANGE',
    yAxisMax: 100,
    yAxisMin: -100,
    title: 'AD Diagnosis (males and females)',
    pointTooltipFormatter: (pt: BoxplotPoint) => {
      return `Value: ${pt.value}`;
    },
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/boxplot works!/gi)).toBeTruthy();
  },
};
