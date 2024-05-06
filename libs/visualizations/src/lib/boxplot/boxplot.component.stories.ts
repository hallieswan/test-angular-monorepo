import type { Meta, StoryObj } from '@storybook/angular';
import { BoxplotComponent } from './boxplot.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<BoxplotComponent> = {
  component: BoxplotComponent,
  title: 'BoxplotComponent',
};
export default meta;
type Story = StoryObj<BoxplotComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/boxplot works!/gi)).toBeTruthy();
  },
};
