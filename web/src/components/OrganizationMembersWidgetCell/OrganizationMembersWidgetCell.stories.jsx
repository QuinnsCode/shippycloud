import {
  Loading,
  Empty,
  Failure,
  Success,
} from './OrganizationMembersWidgetCell'
import { standard } from './OrganizationMembersWidgetCell.mock'

const meta = {
  title: 'Cells/OrganizationMembersWidgetCell',
  tags: ['autodocs'],
}

export default meta

export const loading = {
  render: () => {
    return Loading ? <Loading /> : <></>
  },
}

export const empty = {
  render: () => {
    return Empty ? <Empty /> : <></>
  },
}

export const failure = {
  render: (args) => {
    return Failure ? <Failure error={new Error('Oh no')} {...args} /> : <></>
  },
}

export const success = {
  render: (args) => {
    return Success ? <Success {...standard()} {...args} /> : <></>
  },
}
