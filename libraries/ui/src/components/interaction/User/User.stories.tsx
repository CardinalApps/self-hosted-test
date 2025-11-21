import type { Meta, StoryObj } from '@storybook/react'
import User from './User'

const meta = {
  title: 'Interaction/User',
  component: User,
  argTypes: {},
} satisfies Meta<typeof User>
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {

  },
}

export default meta
