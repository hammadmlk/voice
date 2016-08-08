
export default function authenticator () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      name: 'Hammad Malik',
      username: 'hammadm',
    }), 2000)
  })
}

export function checkIfAuthed (store) {
  return store.getState().auth.isAuthed
}

export function logout () {
  console.info('Logged Out!')
}
