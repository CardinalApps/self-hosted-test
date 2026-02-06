import { createAsyncThunk } from '@reduxjs/toolkit'
import homeServerAPI from '../../../../lib/homeserver/homeServerAPI'
import { AppDispatch, RootState } from '../../..'
import { STORE_KEY } from '../constants'

export type InstanceRes = {
  instanceId: string,
  serverName: string,
}

/**
 * Check the instance ID of this server.
 */
const fetchInstance = createAsyncThunk<
  InstanceRes,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>(`${STORE_KEY}/fetchInstance`, async (data: void, thunkAPI) => {
  const cached = thunkAPI.getState().homeServer.instanceId

  if (!cached) {
    const res = await homeServerAPI<InstanceRes>('/instance')

    if (res) {
      return res
    } else {
      throw new Error()
    }

  }
})

export default fetchInstance
