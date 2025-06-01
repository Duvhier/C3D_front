<!-- src/components/AddAuthor.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Agregar Nuevo Autor</h3>
      <form @submit.prevent="submitAuthor">
        <input v-model="author.name" type="text" placeholder="Nombre del autor" required />
        <input v-model="author.nationality" type="text" placeholder="Nacionalidad" required />
        <input
          v-model="author.coverUrl"
          @input="updateCoverPreview"
          type="url"
          placeholder="URL de la imagen del autor"
          required
        />

        <div v-if="author.coverPreview" class="preview">
          <p>Vista previa:</p>
          <img :src="author.coverPreview" alt="Vista previa del autor" />
        </div>

        <div class="actions">
          <button type="submit">Guardar</button>
          <button type="button" @click="$emit('cancel')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: {
        name: '',
        nationality: '',
        coverUrl: '',
        coverPreview: ''
      }
    };
  },
  methods: {
    updateCoverPreview() {
      this.author.coverPreview = this.author.coverUrl;
    },
    submitAuthor() {
      const newAuthor = {
        name: this.author.name,
        nationality: this.author.nationality,
        cover: this.author.coverUrl
      };

      this.$emit('add-author', newAuthor);

      this.author = {
        name: '',
        nationality: '',
        coverUrl: '',
        coverPreview: ''
      };
    }
  }
};
</script>

<style scoped>

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
.preview img {
  max-width: 100%;
  max-height: 200px;
  margin-top: 0.5rem;
  border-radius: 8px;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}


</style>
