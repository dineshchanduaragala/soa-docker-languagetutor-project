import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
})

function getErrorMessage(error, fallback) {
  if (error.response?.data?.fieldErrors) {
    const fieldErrors = Object.entries(error.response.data.fieldErrors)
      .map(([field, msg]) => `${field}: ${msg}`)
      .join(', ')
    return `Validation failed - ${fieldErrors}`
  }
  const responseMessage = error.response?.data?.message
  if (responseMessage) return responseMessage
  if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
    return 'The server could not be reached. Check that the backend is running and try again.'
  }
  return fallback
}

export async function getTutors() {
  try {
    const { data } = await api.get('/tutors/displayall')
    return Array.isArray(data) ? data : []
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to load tutors. Please try again.'), { cause: error })
  }
}

export async function getTutorById(id) {
  try {
    const { data } = await api.get(`/tutors/display/${id}`)
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error, `Unable to find tutor with ID ${id}.`), { cause: error })
  }
}

export async function createTutor(tutor) {
  try {
    const { data } = await api.post('/tutors/addtutor', tutor)
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to save this tutor. Please check the details and try again.'), { cause: error })
  }
}

export async function updateTutor(id, tutor) {
  try {
    const { data } = await api.put(`/tutors/update/${id}`, tutor)
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to update this tutor. Please check the details and try again.'), { cause: error })
  }
}

export async function deleteTutor(id) {
  try {
    await api.delete(`/tutors/delete/${id}`)
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to remove this tutor. Please try again.'), { cause: error })
  }
}
