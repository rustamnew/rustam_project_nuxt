<script setup>
import { HighCode } from 'vue-highlight-code'
import 'vue-highlight-code/dist/style.css'

// TODO брать код участка из бекенда
const todoCode = ref(`<template>
    <q-card v-if="editMode === false" class="p-4 m-2.5 w-full md:w-80 flex flex-col">
        <h5 class="text-xl mb-3">
            {{ item.title }}
        </h5>

        <div v-if="item.text" class="text-base sm:text-lg mb-2">
            {{ item.text }}
        </div>

        <div class="flex flex-col mb-5">
            <q-checkbox
                v-for="step, index in item.steps"
                :key="index"
                v-model="step.checked"
                :label="step.title"
                class="q-custom-checkbox"
                @update:model-value="saveItem()"
            />
        </div>

        <q-btn color="primary" class="mt-auto" text-color="white" label="Редактировать" @click="editItem()" />
    </q-card>
</template>`)

// Изначально скрыть блок, какие то проблемы с nextTick
const todoCodeLoaded = ref(false)
onMounted(() => {
    todoCodeLoaded.value = true
})
</script>

<template>
    <q-spinner
        v-if="todoCodeLoaded === false"
        color="primary"
        size="3em"
        class=""
    />

    <HighCode
        v-if="todoCode && todoCodeLoaded"
        :text-editor="false"
        lang="vue"
        :code-value="todoCode"
        width="1000px"
        height="500px"
        class="highcode !text-base"
    />
</template>

<style scoped>
/* Доработки */
.highcode {
    max-width: 100%;
}
.highcode:deep(.code_area.srollbar_style) {
    overflow-y: auto;
    font-size: inherit;
    padding-right: 20px;
}
.highcode:deep(pre) {
    height: fit-content;
    display: flex;
    flex-direction: column;
}
.highcode:deep(pre > code) {
    font-size: inherit !important;
    overflow-x: auto;
}

/* Стилизованный горизонтальный скролл у блока с кодом  */
.highcode:deep(.code_area.srollbar_style code::-webkit-scrollbar) {
    width: 8px;
    height: 4px; /* Было 8px */
}
.highcode:deep(.code_area.srollbar_style code::-webkit-scrollbar-corner) {
    background-color: #eee;
}
.highcode:deep(.code_area.srollbar_style code::-webkit-scrollbar-thumb) {
    background: rgb(175, 171, 171);
}
.highcode:deep(.code_area.srollbar_style code::-webkit-scrollbar-track) {
    background-color: #eee;
}
</style>
