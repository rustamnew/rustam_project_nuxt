<script setup>
import { useData } from '../composables/useData'
import { useAuthStore } from '../store/auth'
import TodoItem from './TodoItem.vue'

const alerts = [
    { message: 'Сохранено', bgColor: 'green', position: 'bottom-right' },
    { message: 'Ошибка', bgColor: 'red', position: 'bottom-right' },
]

const authStore = useAuthStore()

const todo = ref(await useData('todo', 'get'))

function addTodoItem() {
    todo.value.push({ // push
        id: -1,
        title: '',
        text: '',
        steps: [],
    })
}

function removeItem(index) {
    todo.value.splice(index, 1)
    saveTodo()
}

async function saveTodo(item, index) {
    if (item && item.id === -1 && authStore.guest === true) {
        item.id = todo.value.length + 1
        todo.value[index] = item
    }
    else if (item) {
        todo.value[index] = item
    }

    todo.value = await useData('todo', 'save', todo.value)

    useNotification(alerts[0])
}
</script>

<template>
    <div class="flex justify-center">
        <TodoItem
            v-for="item, index in todo"
            :key="index"
            :item-prop="item"
            :index="index"
            @save="saveTodo($event, index)"
            @remove="removeItem(index)"
        />

        <span v-if="!todo.length" class="empty">Нет задач</span>
    </div>

    <q-btn label="Добавить задачу" color="positive" text-color="white" class="mt-5 mx-auto" @click="addTodoItem()" />
</template>
