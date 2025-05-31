<template>
    <div class="modal">
        <div class="modal-content">
            <h3>Agregar Nuevo Género</h3>
            <form @submit.prevent="submitGenre">
                <input v-model="genreName" type="text" placeholder="Nombre del género" required />
                <div class="actions">
                    <button type="submit">Guardar</button>
                    <button @click="$emit('cancel')">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
export default {
    name: 'AddGenre',
    data() {
        return {
            genreName: ''
        };
    },
    methods: {
        submitGenre() {
            if (!this.isFormValid) return;

            const genre = {
                name: this.genreName
            };

            this.$emit('add-genre', genre); 
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
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
        }

        .modal-content h3 {
            margin-bottom: 20px;
        }

        .modal-content form {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .modal-content form input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    </style>
