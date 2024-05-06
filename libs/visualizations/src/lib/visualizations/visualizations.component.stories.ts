import type { Meta, StoryObj } from '@storybook/angular';
import { VisualizationsComponent } from './visualizations.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<VisualizationsComponent> = {
  component: VisualizationsComponent,
  title: 'VisualizationsComponent',
};
export default meta;
type Story = StoryObj<VisualizationsComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/visualizations works!/gi)).toBeTruthy();
  },
};
