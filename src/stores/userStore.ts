import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'

const useUserStore = defineStore('user', () => {

  // Criando usuario só pra inicializar a variável.
  const storeUser = ref<User>({
    id: 9999999999,
    email: '',
    fullName: '',
    roles: [
      {
        id: 9999999999,
        name: '',
        permissions: [{ id: 9999999999, name: '' }],
      },
    ],
    authorities: [
      {authority: ''}
    ]
  })

  function setUser(user: User) {
    storeUser.value = user;
  }

  return { setUser, storeUser }
}
, {
  //  usando plugin para persistir o usuario no front. de qualquer forma,
  //  se o token ou cookie expirar a requisição vai falhar e ele vai pro login.
  // Não dá pra usar session storage. nao vem o objeto inicial ( id : 99999999...)
  // Quando não há usuario settado, e ai quebra o app.vue
  persist: {
    pick: ['storeUser'],
  },
}
)

export default useUserStore;
