<template>
  <div id="app">
    <!-- Navbar -->
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">
        <img alt="Vue logo" src="./assets/logo.png" width="40" height="40"/>
        <span class="ml-2">Admin Dashboard</span>
      </b-navbar-brand>
    </b-navbar>

    <!-- Main Content -->
    <b-container class="mt-4">
      <b-row>
        <!-- Serviços -->
        <b-col md="4">
          <h2>Serviços</h2>
          <div v-if="servicos.length">
            <b-card v-for="servico in servicos" :key="servico.id" class="mb-3" :class="{ 'bg-light': isCardVisible(servico.id) }">
              <template #header>
                <div class="d-flex justify-content-between">
                  <b-dropdown text="..." variant="link">
                    <b-dropdown-item @click="toggleCard(servico.id)">Ocultar</b-dropdown-item>
                    <!-- Add other dropdown items if needed -->
                  </b-dropdown>
                  <b-icon icon="eye" @click="toggleCard(servico.id)" class="cursor-pointer"></b-icon>
                </div>
              </template>
              <b-card-title>{{ servico.nome }}</b-card-title>
              <b-card-text>{{ servico.descricao }}</b-card-text>
            </b-card>
          </div>
          <p v-else>Loading servicos...</p>
        </b-col>

        <!-- Usuários -->
        <b-col md="4">
          <h2>Usuários</h2>
          <div v-if="users.length">
            <b-card v-for="user in users" :key="user.id" class="mb-3" :class="{ 'bg-light': isCardVisible(user.id) }">
              <template #header>
                <div class="d-flex justify-content-between">
                  <b-dropdown text="..." variant="link">
                    <b-dropdown-item @click="toggleCard(user.id)">Ocultar</b-dropdown-item>
                    <!-- Add other dropdown items if needed -->
                  </b-dropdown>
                  <b-icon icon="eye" @click="toggleCard(user.id)" class="cursor-pointer"></b-icon>
                </div>
              </template>
              <b-card-title>{{ user.nome }}</b-card-title>
              <b-card-text>{{ user.email }}</b-card-text>
            </b-card>
          </div>
          <p v-else>Loading users...</p>
        </b-col>

        <!-- Solicitacoes de Serviços -->
        <b-col md="4">
          <h2>Solicitações de Serviços</h2>
          <div v-if="solicitacoes.length">
            <b-card v-for="solicitacao in solicitacoes" :key="solicitacao.id" class="mb-3" :class="{ 'bg-light': isCardVisible(solicitacao.id) }">
              <template #header>
                <div class="d-flex justify-content-between">
                  <b-dropdown text="..." variant="link">
                    <b-dropdown-item @click="toggleCard(solicitacao.id)">Ocultar</b-dropdown-item>
                    <!-- Add other dropdown items if needed -->
                  </b-dropdown>
                  <b-icon icon="eye" @click="toggleCard(solicitacao.id)" class="cursor-pointer"></b-icon>
                </div>
              </template>
              <b-card-title>Solicitação {{ solicitacao.id }}</b-card-title>
              <b-card-text>Status: {{ solicitacao.status }}</b-card-text>
            </b-card>
          </div>
          <p v-else>Loading solicitacoes...</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { BIcon } from 'bootstrap-vue'

export default {
  name: 'App',
  components: {
    BIcon
  },
  data() {
    return {
      servicos: [],
      users: [],
      solicitacoes: [],
      visibleCards: new Set()
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const [servicosResponse, usersResponse, solicitacoesResponse] = await Promise.all([
          axios.get('/api/servicos'),
          axios.get('/api/users'),
          axios.get('/api/solicitacoesServicos')
        ])
        this.servicos = servicosResponse.data
        this.users = usersResponse.data
        this.solicitacoes = solicitacoesResponse.data
      } catch (error) {
        console.error('Erro ao conectar à API:', error)
      }
    },
    toggleCard(id) {
      if (this.visibleCards.has(id)) {
        this.visibleCards.delete(id)
      } else {
        this.visibleCards.add(id)
      }
    },
    isCardVisible(id) {
      return this.visibleCards.has(id) ? 'bg-transparent' : 'bg-light'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.b-card {
  cursor: pointer;
  backdrop-filter: blur(10px);
}
.b-card-title, .b-card-text {
  font-size: 14px;
}
.b-navbar {
  background-color: #28a745;
}
.b-icon {
  cursor: pointer;
}
</style>
