// @ts-nocheck: going to remove this

import { useState } from 'react'

import AppPage from '../../AppPage'

import H3 from '../../../../typography/H3'
import Button from '../../../../interaction/Button'
import TextInput from '../../../../forms/TextInput'

import {
  useGetLibrariesQuery,
  useLazyGetLibrariesQuery,
  useCreateLibraryMutation,
  useUpdateLibraryMutation,
  useDeleteLibraryMutation,
} from '../../../../../store/apis/libraries'

import { PAGE_LAYOUT } from '../../../../../store/slices/layout'

function LibrariesPage() {
  const [libraryIdToUpdate, setLibraryIdToUpdate] = useState(0)
  const [libraryBodyToUpdate, setLibraryBodyToUpdate] = useState()
  const [libraryToDelete, setLibraryToDelete] = useState()

  // Create
  const [createLibrary] = useCreateLibraryMutation()

  // Update
  const [updateLibrary, updateLibraryResult] = useUpdateLibraryMutation()

  // Detete
  const [deleteLibrary, deleteLibrartResult] = useDeleteLibraryMutation()

  // Standard
  const {
    data: allLibrariesResponse,
    isLoading: allLibrariesLoading,
    error: allLibrariesError,
  } = useGetLibrariesQuery({ take: 9999, skip: 0, order: 'asc' })
  const allLibraries = allLibrariesResponse || []

  // Lazy
  const [fetchUserLibraries, fetchUserLibrariesRequest] = useLazyGetLibrariesQuery()
  const {
    data: userLibrariesResponse,
  } = fetchUserLibrariesRequest
  const userLibraries = userLibrariesResponse || []

  return (
    <AppPage layout={PAGE_LAYOUT['standard']} pageTitle="API: Libraries">
      <H3>Create library()</H3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const name = ((e.target as HTMLElement)?.querySelector('input[name="test"]') as HTMLInputElement)?.value
          createLibrary({
            name,
            paths: ['/'],
          })
        }}
        method="post"
        style={{ display: 'flex', gap: 10 }}
      >
        <TextInput name="test" type="text" placeholder="Name" />
        <Button type="submit">
          POST /libraries
        </Button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <H3>useGetLibrariesQuery()</H3>
      <p><strong>Loading:</strong> {allLibrariesLoading.toString()}</p>
      <p><strong>Error:</strong> {!!allLibrariesError && (allLibrariesError)?.data?.error}</p>
      <p><strong>Error status:</strong> {!!allLibrariesError && (allLibrariesError)?.status}</p>
      <p><strong>Error message:</strong> {!!allLibrariesError && (allLibrariesError)?.data?.message}</p>
      <p><strong>Data:</strong> {!!allLibrariesError && (allLibrariesError)?.data?.message}</p>
      <p style={{ margin: 20 }}>
        {allLibraries ? JSON.stringify(allLibraries) : '(No data)'}
      </p>

      <hr style={{ margin: '30px 0' }} />

      <H3>useLazyGetLibrariesQuery()</H3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchUserLibraries({ take: 9999, skip: 0, order: 'asc' })
        }}
        method="post"
      >
        <Button type="submit">
          GET /libraries
        </Button>
        <p style={{ margin: 20 }}>
          {userLibraries ? JSON.stringify(userLibraries) : '(No data)'}
        </p>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <H3>useUpdateLibraryMutation()</H3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          try {
            const formData = JSON.parse(libraryBodyToUpdate)
            updateLibrary({ id: libraryIdToUpdate, body: formData  })
          } catch (e) {
            console.error('Invalid JSON')
          }
        }}
        method="post"
      >
        <input type="text" name="library-id-to-update" value={libraryIdToUpdate} onChange={(e) => setLibraryIdToUpdate(e.target.value)} />
        <div style={{ margin: '10px 0' }}>
          <textarea style={{ width: 300, height: 200 }} placeholder="Put JSON" name="library-to-update" value={libraryBodyToUpdate} onChange={(e) => setLibraryBodyToUpdate(e.target.value)} />
        </div>
        <Button type="submit">
          PATCH /library/:id
        </Button>
        <p><strong>Loading:</strong> {updateLibraryResult.isLoading.toString()}</p>
        <p><strong>Error:</strong> {!!updateLibraryResult.isError && updateLibraryResult.isError?.data?.error}</p>
        <p><strong>Error status:</strong> {!!updateLibraryResult.isError && updateLibraryResult?.status}</p>
        <p><strong>Error message:</strong> {!!updateLibraryResult.isError && updateLibraryResult?.data?.message}</p>
        <p><strong>Data:</strong> {!!updateLibraryResult.data && (allLibrariesError)?.data?.message}</p>
        <p style={{ margin: 20 }}>
          {updateLibraryResult ? JSON.stringify(updateLibraryResult) : '(No data)'}
        </p>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <H3>useDeleteLibraryMutation()</H3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          deleteLibrary(libraryToDelete)
        }}
        method="post"
      >
        <input type="number" name="library-to-delete" value={libraryToDelete} onChange={(e) => setLibraryToDelete(e.target.value)} />
        <Button type="submit">
          DELETE /library/:id
        </Button>
        <p><strong>Loading:</strong> {deleteLibrartResult.isLoading.toString()}</p>
        <p><strong>Error:</strong> {!!deleteLibrartResult.isError && deleteLibrartResult.isError?.data?.error}</p>
        <p><strong>Error status:</strong> {!!deleteLibrartResult.isError && deleteLibrartResult?.status}</p>
        <p><strong>Error message:</strong> {!!deleteLibrartResult.isError && deleteLibrartResult?.data?.message}</p>
        <p><strong>Data:</strong> {!!deleteLibrartResult.data && (allLibrariesError)?.data?.message}</p>
        <p style={{ margin: 20 }}>
          {deleteLibrartResult ? JSON.stringify(deleteLibrartResult) : '(No data)'}
        </p>
      </form>
    </AppPage>
  )
}

export default LibrariesPage
