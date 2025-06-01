<template>
  <div>
    <label for="genre">Género</label>
    <select v-model="selected" @change="handleChange">
      <option disabled value="">Selecciona un género</option>
      <option v-for="g in genres" :key="g._id" :value="g.name">{{ g.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'GenreSelector',
  data() {
    return {
      genres: [],
      selected: '',
    };
  },
  emits: ['genre-changed'],
  mounted() {
    this.fetchGenres();
  },
  methods: {
    async fetchGenres() {
      try {
        const res = await fetch('https://c3-d-back-nkt5.onrender.com/api/genres');
        const data = await res.json();
        this.genres = data;
      } catch (err) {
        console.error('Error cargando géneros:', err);
      }
    },
    handleChange() {
      this.$emit('genre-changed', this.selected);
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 10px;
}
</style>
